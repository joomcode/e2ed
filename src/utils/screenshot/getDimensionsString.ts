import type {Dimensions, DimensionsString} from '../../types/internal';

/**
 * Get dimensions string (`200x100`) by dimensions object.
 */
export const getDimensionsString = (dimensions: Dimensions): DimensionsString =>
  `${dimensions.width}x${dimensions.height}` as DimensionsString;
