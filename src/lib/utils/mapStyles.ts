// src/lib/utils/mapStyles.ts

// Snazzy Maps styles array (Map styling can be adjusted to your needs)
// Snazzy Maps styles array
const mapStyles = [
    {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [{ saturation: 36 }, { color: '#ffffff' }, { lightness: 40 }]
    },
    {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [{ visibility: 'off' }, { color: '#000000' }, { lightness: 16 }]
    },
    {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }]
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [{ color: '#c0c0c0' }, { lightness: 20 }, { visibility: 'on' }]
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#000000' }, { lightness: 17 }, { weight: 1.2 }, { visibility: 'off' }]
    },
    {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{ color: '#000000' }, { lightness: 20 }]
    },
    {
        featureType: 'landscape',
        elementType: 'geometry.fill',
        stylers: [{ color: '#3f3f3f' }]
    },
    {
        featureType: 'landscape',
        elementType: 'geometry.stroke',
        stylers: [{ visibility: 'off' }]
    },
    {
        featureType: 'landscape.man_made',
        elementType: 'geometry.fill',
        stylers: [
            { color: '#333333' },
            { visibility: 'on' },
            { saturation: '0' },
            { lightness: '0' },
            { gamma: '1.00' }
        ]
    },
    {
        featureType: 'landscape.man_made',
        elementType: 'geometry.stroke',
        stylers: [{ visibility: 'off' }]
    },
    {
        featureType: 'landscape.natural',
        elementType: 'geometry.fill',
        stylers: [
            { color: '#2b2b2b' },
            { visibility: 'on' },
            { gamma: '1' },
            { lightness: '0' },
            { saturation: '0' }
        ]
    },
    {
        featureType: 'landscape.natural',
        elementType: 'geometry.stroke',
        stylers: [{ visibility: 'off' }]
    },
    {
        featureType: 'landscape.natural.landcover',
        elementType: 'geometry.fill',
        stylers: [{ visibility: 'off' }, { color: '#ff0000' }]
    },
    {
        featureType: 'landscape.natural.landcover',
        elementType: 'geometry.stroke',
        stylers: [{ visibility: 'off' }]
    },
    {
        featureType: 'landscape.natural.terrain',
        elementType: 'geometry.fill',
        stylers: [{ visibility: 'on' }, { color: '#222222' }]
    },
    {
        featureType: 'landscape.natural.terrain',
        elementType: 'geometry.stroke',
        stylers: [{ visibility: 'off' }]
    },
    {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{ color: '#000000' }, { lightness: 21 }]
    },
    {
        featureType: 'poi',
        elementType: 'geometry.fill',
        stylers: [{ color: '#4a4a4a' }, { visibility: 'on' }]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [{ color: '#ac9455' }, { lightness: '0' }, { gamma: '1.00' }]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#000000' }, { lightness: 29 }, { weight: 0.2 }]
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{ color: '#ac9455' }, { lightness: '0' }]
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry.fill',
        stylers: [{ color: '#ac9455' }]
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry.stroke',
        stylers: [{ visibility: 'off' }]
    },
    {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [{ color: '#000000' }, { lightness: 16 }]
    },
    {
        featureType: 'road.local',
        elementType: 'geometry.fill',
        stylers: [{ color: '#222222' }]
    },
    {
        featureType: 'road.local',
        elementType: 'geometry.stroke',
        stylers: [{ visibility: 'off' }]
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#000000' }, { lightness: 19 }]
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#000000' }, { lightness: 17 }]
    },
    {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [{ color: '#1a1a1a' }]
    }
];

export default mapStyles;
