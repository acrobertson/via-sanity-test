import sanity from '../lib/sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const imageBuilder = imageUrlBuilder(sanity);

const imageUrlFor = (source: SanityImageSource) => imageBuilder.image(source);

export default imageUrlFor;
