import type {Dimensions} from '../../types/internal';

const decoder = new TextDecoder();

const dimensionsStartPositionIfFried = 32;
const dimensionsStartRegularPosition = 16;

const getView = (screenshot: Uint8Array, offset: number): DataView<ArrayBufferLike> =>
  new DataView(screenshot.buffer, screenshot.byteOffset + offset);

const getUtf8String = (screenshot: Uint8Array, start = 0, end = screenshot.length): string =>
  decoder.decode(screenshot.slice(start, end));

const heightPositionOffset = 4;

const readUint32 = (screenshot: Uint8Array, offset = 0): number =>
  getView(screenshot, offset).getUint32(0, false);

const pngFriedChunkName = 'CgBI';

const pngFriedStartPosition = 12;

/**
 * Get dimensions (height and width) of PNG image (by `Uint8Array` buffer with image).
 */
export const getPngDimensions = (screenshot: Uint8Array): Dimensions => {
  const isFried =
    getUtf8String(
      screenshot,
      pngFriedStartPosition,
      pngFriedStartPosition + pngFriedChunkName.length,
    ) === pngFriedChunkName;

  if (isFried) {
    return {
      height: readUint32(screenshot, dimensionsStartPositionIfFried + heightPositionOffset),
      width: readUint32(screenshot, dimensionsStartPositionIfFried),
    };
  }

  return {
    height: readUint32(screenshot, dimensionsStartRegularPosition + heightPositionOffset),
    width: readUint32(screenshot, dimensionsStartRegularPosition),
  };
};
