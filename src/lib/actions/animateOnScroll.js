// actions/animateOnScroll.js
/**
 * @param {Element} node
 */
export function animateOnScroll(node) {
    // @ts-ignore
    node.style.opacity = '0';
    // @ts-ignore
    node.style.transform = 'translateY(20px)';

    const handleIntersection = (/** @type {any[]} */ entries) => {
        entries.forEach((/** @type {{ isIntersecting: any; }} */ entry) => {
            if (entry.isIntersecting) {
                // @ts-ignore
                node.style.opacity = '1';
                // @ts-ignore
                node.style.transform = 'translateY(0)';
                // @ts-ignore
                node.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.1,
    });

    observer.observe(node);

    return {
        destroy() {
            observer.unobserve(node);
        },
    };
}
