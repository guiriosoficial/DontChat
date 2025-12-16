const MAX_RGB_COLOR_VALUE = 255;
const LUMINANCE_RED = 0.299;
const LUMINANCE_GREEN = 0.587;
const LUMINANCE_BLUE = 0.114;
const CONTRAST_THRESHOLD = 0.6;
const MIN_LUMINANCE_CONTRAST = 0;
const HEX_BASE = 16;
const HEX_LENGTH = 2;
const PAD_CHAR = '0';

/**
 * Generates a random number between 0 and 255 (RGB color range)
 * @returns {number} Random number between 0 and 255
 * @example
 * generateNumber() // 142.35821...
 */
function generateNumber(): number {
  return Math.random() * MAX_RGB_COLOR_VALUE
}

/**
 * Converts an RGB color value to hexadecimal format
 * @param {number} color - RGB color value (0-255)
 * @returns {string} Two-character hexadecimal representation
 * @example
 * rgbToHexa(255) // "ff"
 * rgbToHexa(42) // "2a"
 */
function rgbToHexa(color: number): string {
  return Math
    .floor(color)
    .toString(HEX_BASE)
    .padStart(HEX_LENGTH, PAD_CHAR)
}

/**
 * Generates a random dark color in hexadecimal format
 * Uses luminance calculations to ensure the color is dark enough for good contrast
 * @returns {string} A hexadecimal color string (e.g., "#1a2b3c")
 * @example
 * generateColor() // "#2a4b6c"
 */
function generateColor(): string {
  let red = generateNumber()
  let green = generateNumber()
  let blue = generateNumber()

  const coefficient = (
    red * LUMINANCE_RED +
    green * LUMINANCE_GREEN +
    blue * LUMINANCE_BLUE
  ) / MAX_RGB_COLOR_VALUE - CONTRAST_THRESHOLD

  if (coefficient > MIN_LUMINANCE_CONTRAST) {
    red = red * coefficient
    green = green * coefficient
    blue = blue * coefficient
  }

  return `#${rgbToHexa(red)}${rgbToHexa(green)}${rgbToHexa(blue)}`
}

export default generateColor
