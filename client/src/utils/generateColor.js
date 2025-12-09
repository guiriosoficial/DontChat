const MAX_COLOR_VALUE = 255;
const LUMINANCE_RED = 0.299;
const LUMINANCE_GREEN = 0.587;
const LUMINANCE_BLUE = 0.114;
const CONTRAST_THRESHOLD = 0.6;
const MIN_LUMINANCE_CONTRAST = 0;
const HEX_BASE = 16;
const HEX_LENGTH = 2;
const PAD_CHAR = '0';

function generateColor() {
  const generateNumber = () => Math.random() * MAX_COLOR_VALUE
  let r = generateNumber()
  let g = generateNumber()
  let b = generateNumber()

  const c = (
    r * LUMINANCE_RED +
    g * LUMINANCE_GREEN +
    b * LUMINANCE_BLUE
  ) / MAX_COLOR_VALUE - CONTRAST_THRESHOLD

  if (c > MIN_LUMINANCE_CONTRAST) {
    r = r * c
    g = g * c
    b = b * c
  }

  const rgbToHexa = (color) => Math
    .floor(color)
    .toString(HEX_BASE)
    .padStart(HEX_LENGTH, PAD_CHAR)

  return `#${rgbToHexa(r)}${rgbToHexa(g)}${rgbToHexa(b)}`
}

export default generateColor
