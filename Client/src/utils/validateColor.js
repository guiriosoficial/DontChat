const MAX_COLOR_VALUE = 255;
const LUMINANCE_RED = 0.299;
const LUMINANCE_GREEN = 0.587;
const LUMINANCE_BLUE = 0.114;
const CONTRAST_THRESHOLD = 0.6;
const MIN_LUMINANCE_CONTRAST = 0;
const HEX_BASE = 16;
const HEX_LENGTH = 2;
const PAD_CHAR = '0';
const INITIAL_USER_COLOR = '#FFFFFF'


function validateColor(userColor = INITIAL_USER_COLOR) {
  try {
    const c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(userColor)
    const r = parseInt(c[1], HEX_BASE)
    const g = parseInt(c[2], HEX_BASE)
    const b = parseInt(c[3], HEX_BASE)

    const q = (
      r * LUMINANCE_RED +
      g * LUMINANCE_GREEN +
      b * LUMINANCE_BLUE
    ) / MAX_COLOR_VALUE - CONTRAST_THRESHOLD

    if (q > MIN_LUMINANCE_CONTRAST) {
      return false
    }
    return true
  } catch {
    return false
  }
}

export default validateColor
