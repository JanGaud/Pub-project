// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from '@prismicio/client';

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

/**
 * Item in *nav → Link*
 */
export interface NavDocumentDataLinkItem {
	/**
	 * Label field in *nav → Link*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: nav.link[].label
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	label: prismic.KeyTextField;

	/**
	 * Link field in *nav → Link*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: nav.link[].link
	 * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
	 */
	link: prismic.LinkField;
}

/**
 * Content for nav documents
 */
interface NavDocumentData {
	/**
	 * Logo field in *nav*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: nav.logo
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	logo: prismic.ImageField<never>;

	/**
	 * Link field in *nav*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: nav.link[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#group
	 */
	link: prismic.GroupField<Simplify<NavDocumentDataLinkItem>>;
}

/**
 * nav document from Prismic
 *
 * - **API ID**: `nav`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type NavDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<
	Simplify<NavDocumentData>,
	'nav',
	Lang
>;

type PageDocumentDataSlicesSlice =
	| ContactSlice
	| GallerySlice
	| AboutSlice
	| BannerSlice
	| RichTextSlice;

/**
 * Content for Page documents
 */
interface PageDocumentData {
	/**
	 * Title field in *Page*
	 *
	 * - **Field Type**: Title
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	title: prismic.TitleField;

	/**
	 * Slice Zone field in *Page*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#slices
	 */
	slices: prismic.SliceZone<PageDocumentDataSlicesSlice> /**
	 * Meta Title field in *Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: page.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */;
	meta_title: prismic.KeyTextField;

	/**
	 * Meta Description field in *Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: page.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	meta_description: prismic.KeyTextField;

	/**
	 * Meta Image field in *Page*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Page document from Prismic
 *
 * - **API ID**: `page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PageDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<
	Simplify<PageDocumentData>,
	'page',
	Lang
>;

/**
 * Content for settings documents
 */
interface SettingsDocumentData {
	/**
	 * Business Name field in *settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.business_name
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	business_name: prismic.KeyTextField;

	/**
	 * Email field in *settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.email
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	email: prismic.KeyTextField;

	/**
	 * Address field in *settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.address
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	address: prismic.KeyTextField;

	/**
	 * Phone field in *settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.phone
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	phone: prismic.KeyTextField;

	/**
	 * Website field in *settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.website
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	website: prismic.KeyTextField;

	/**
	 * Location field in *settings*
	 *
	 * - **Field Type**: GeoPoint
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.location
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#geopoint
	 */
	location: prismic.GeoPointField;

	/**
	 * Google Maps Api Key field in *settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.google_maps_api_key
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	google_maps_api_key: prismic.KeyTextField;
}

/**
 * settings document from Prismic
 *
 * - **API ID**: `settings`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SettingsDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<
	Simplify<SettingsDocumentData>,
	'settings',
	Lang
>;

export type AllDocumentTypes = NavDocument | PageDocument | SettingsDocument;

/**
 * Primary content in *About → Default → Primary*
 */
export interface AboutSliceDefaultPrimary {
	/**
	 * Title field in *About → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	title: prismic.KeyTextField;

	/**
	 * Description field in *About → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.default.primary.desciption
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	desciption: prismic.KeyTextField;

	/**
	 * Logo field in *About → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.default.primary.logo
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	logo: prismic.ImageField<never>;
}

/**
 * Default variation for About Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type AboutSliceDefault = prismic.SharedSliceVariation<
	'default',
	Simplify<AboutSliceDefaultPrimary>,
	never
>;

/**
 * Slice variation for *About*
 */
type AboutSliceVariation = AboutSliceDefault;

/**
 * About Shared Slice
 *
 * - **API ID**: `about`
 * - **Description**: About
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type AboutSlice = prismic.SharedSlice<'about', AboutSliceVariation>;

/**
 * Item in *Banner → Default → Primary → Slide*
 */
export interface BannerSliceDefaultPrimarySlideItem {
	/**
	 * Hero Image field in *Banner → Default → Primary → Slide*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: banner.default.primary.slide[].hero_image
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	hero_image: prismic.ImageField<never>;
}

/**
 * Item in *Banner → Default → Primary → CTA*
 */
export interface BannerSliceDefaultPrimaryCtaItem {
	/**
	 * Label field in *Banner → Default → Primary → CTA*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Lorem ipsum
	 * - **API ID Path**: banner.default.primary.cta[].label
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	label: prismic.KeyTextField;

	/**
	 * Link field in *Banner → Default → Primary → CTA*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: banner.default.primary.cta[].link
	 * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
	 */
	link: prismic.LinkField;
}

/**
 * Primary content in *Banner → Default → Primary*
 */
export interface BannerSliceDefaultPrimary {
	/**
	 * Slide field in *Banner → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: banner.default.primary.slide[]
	 * - **Documentation**: https://prismic.io/docs/field#group
	 */
	slide: prismic.GroupField<Simplify<BannerSliceDefaultPrimarySlideItem>>;

	/**
	 * CTA field in *Banner → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: banner.default.primary.cta[]
	 * - **Documentation**: https://prismic.io/docs/field#group
	 */
	cta: prismic.GroupField<Simplify<BannerSliceDefaultPrimaryCtaItem>>;

	/**
	 * Title field in *Banner → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: banner.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	title: prismic.KeyTextField;

	/**
	 * Slogan field in *Banner → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: banner.default.primary.slogan
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	slogan: prismic.KeyTextField;
}

/**
 * Default variation for Banner Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BannerSliceDefault = prismic.SharedSliceVariation<
	'default',
	Simplify<BannerSliceDefaultPrimary>,
	never
>;

/**
 * Slice variation for *Banner*
 */
type BannerSliceVariation = BannerSliceDefault;

/**
 * Banner Shared Slice
 *
 * - **API ID**: `banner`
 * - **Description**: Banner
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BannerSlice = prismic.SharedSlice<'banner', BannerSliceVariation>;

/**
 * Item in *Contact → Default → Primary → Phone Input*
 */
export interface ContactSliceDefaultPrimaryPhoneInputItem {
	/**
	 * Label field in *Contact → Default → Primary → Phone Input*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.default.primary.phone_input[].label
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	label: prismic.KeyTextField;

	/**
	 * Icon field in *Contact → Default → Primary → Phone Input*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.default.primary.phone_input[].icon
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	icon: prismic.KeyTextField;
}

/**
 * Item in *Contact → Default → Primary → Adresse Input*
 */
export interface ContactSliceDefaultPrimaryAdresseInputItem {
	/**
	 * Label field in *Contact → Default → Primary → Adresse Input*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.default.primary.adresse_input[].label
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	label: prismic.KeyTextField;

	/**
	 * Icon field in *Contact → Default → Primary → Adresse Input*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.default.primary.adresse_input[].icon
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	icon: prismic.KeyTextField;
}

/**
 * Item in *Contact → Default → Primary → Email Input*
 */
export interface ContactSliceDefaultPrimaryEmailInputItem {
	/**
	 * Label field in *Contact → Default → Primary → Email Input*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.default.primary.email_input[].label
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	label: prismic.KeyTextField;

	/**
	 * Icon field in *Contact → Default → Primary → Email Input*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.default.primary.email_input[].icon
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	icon: prismic.KeyTextField;
}

/**
 * Primary content in *Contact → Default → Primary*
 */
export interface ContactSliceDefaultPrimary {
	/**
	 * Location field in *Contact → Default → Primary*
	 *
	 * - **Field Type**: GeoPoint
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.default.primary.location
	 * - **Documentation**: https://prismic.io/docs/field#geopoint
	 */
	location: prismic.GeoPointField;

	/**
	 * Title field in *Contact → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	title: prismic.KeyTextField;

	/**
	 * Disclaimer field in *Contact → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.default.primary.disclaimer
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	disclaimer: prismic.KeyTextField;

	/**
	 * Form Logo field in *Contact → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.default.primary.form_logo
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	form_logo: prismic.ImageField<never>;

	/**
	 * Phone Input field in *Contact → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.default.primary.phone_input[]
	 * - **Documentation**: https://prismic.io/docs/field#group
	 */
	phone_input: prismic.GroupField<Simplify<ContactSliceDefaultPrimaryPhoneInputItem>>;

	/**
	 * Adresse Input field in *Contact → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.default.primary.adresse_input[]
	 * - **Documentation**: https://prismic.io/docs/field#group
	 */
	adresse_input: prismic.GroupField<Simplify<ContactSliceDefaultPrimaryAdresseInputItem>>;

	/**
	 * Email Input field in *Contact → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.default.primary.email_input[]
	 * - **Documentation**: https://prismic.io/docs/field#group
	 */
	email_input: prismic.GroupField<Simplify<ContactSliceDefaultPrimaryEmailInputItem>>;
}

/**
 * Default variation for Contact Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ContactSliceDefault = prismic.SharedSliceVariation<
	'default',
	Simplify<ContactSliceDefaultPrimary>,
	never
>;

/**
 * Slice variation for *Contact*
 */
type ContactSliceVariation = ContactSliceDefault;

/**
 * Contact Shared Slice
 *
 * - **API ID**: `contact`
 * - **Description**: Contact
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ContactSlice = prismic.SharedSlice<'contact', ContactSliceVariation>;

/**
 * Item in *Gallery → Default → Primary → Thumbnail*
 */
export interface GallerySliceDefaultPrimaryThumbnailItem {
	/**
	 * Image field in *Gallery → Default → Primary → Thumbnail*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gallery.default.primary.thumbnail[].image
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Primary content in *Gallery → Default → Primary*
 */
export interface GallerySliceDefaultPrimary {
	/**
	 * Title field in *Gallery → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gallery.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	title: prismic.KeyTextField;

	/**
	 * Image field in *Gallery → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gallery.default.primary.image
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	image: prismic.ImageField<never>;

	/**
	 * Thumbnail field in *Gallery → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gallery.default.primary.thumbnail[]
	 * - **Documentation**: https://prismic.io/docs/field#group
	 */
	thumbnail: prismic.GroupField<Simplify<GallerySliceDefaultPrimaryThumbnailItem>>;
}

/**
 * Default variation for Gallery Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type GallerySliceDefault = prismic.SharedSliceVariation<
	'default',
	Simplify<GallerySliceDefaultPrimary>,
	never
>;

/**
 * Slice variation for *Gallery*
 */
type GallerySliceVariation = GallerySliceDefault;

/**
 * Gallery Shared Slice
 *
 * - **API ID**: `gallery`
 * - **Description**: Gallery
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type GallerySlice = prismic.SharedSlice<'gallery', GallerySliceVariation>;

/**
 * Primary content in *RichText → Default → Primary*
 */
export interface RichTextSliceDefaultPrimary {
	/**
	 * Content field in *RichText → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Lorem ipsum...
	 * - **API ID Path**: rich_text.default.primary.content
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	content: prismic.RichTextField;
}

/**
 * Default variation for RichText Slice
 *
 * - **API ID**: `default`
 * - **Description**: RichText
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type RichTextSliceDefault = prismic.SharedSliceVariation<
	'default',
	Simplify<RichTextSliceDefaultPrimary>,
	never
>;

/**
 * Slice variation for *RichText*
 */
type RichTextSliceVariation = RichTextSliceDefault;

/**
 * RichText Shared Slice
 *
 * - **API ID**: `rich_text`
 * - **Description**: RichText
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type RichTextSlice = prismic.SharedSlice<'rich_text', RichTextSliceVariation>;

declare module '@prismicio/client' {
	interface CreateClient {
		(
			repositoryNameOrEndpoint: string,
			options?: prismic.ClientConfig
		): prismic.Client<AllDocumentTypes>;
	}

	namespace Content {
		export type {
			NavDocument,
			NavDocumentData,
			NavDocumentDataLinkItem,
			PageDocument,
			PageDocumentData,
			PageDocumentDataSlicesSlice,
			SettingsDocument,
			SettingsDocumentData,
			AllDocumentTypes,
			AboutSlice,
			AboutSliceDefaultPrimary,
			AboutSliceVariation,
			AboutSliceDefault,
			BannerSlice,
			BannerSliceDefaultPrimarySlideItem,
			BannerSliceDefaultPrimaryCtaItem,
			BannerSliceDefaultPrimary,
			BannerSliceVariation,
			BannerSliceDefault,
			ContactSlice,
			ContactSliceDefaultPrimaryPhoneInputItem,
			ContactSliceDefaultPrimaryAdresseInputItem,
			ContactSliceDefaultPrimaryEmailInputItem,
			ContactSliceDefaultPrimary,
			ContactSliceVariation,
			ContactSliceDefault,
			GallerySlice,
			GallerySliceDefaultPrimaryThumbnailItem,
			GallerySliceDefaultPrimary,
			GallerySliceVariation,
			GallerySliceDefault,
			RichTextSlice,
			RichTextSliceDefaultPrimary,
			RichTextSliceVariation,
			RichTextSliceDefault
		};
	}
}
