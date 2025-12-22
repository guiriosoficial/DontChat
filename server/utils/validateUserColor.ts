const DEFAULT_VALUE = '#FFFFFF'
const DARKNESS_THRESHOLD = 0.6
const LUMINANCE_COEFFICIENTS = {
    RED: 0.299,
    GREEN: 0.587,
    BLUE: 0.114
}
const HEX_BASE = 16
const HEX_COLOR_REGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
const MAX_RGB_COLOR_VALUE = 255

/**
 * Validates if a color is dark enough for good contrast
 * @param {string} userColor - Color in hexadecimal format (e.g., "#1a2b3c" or "1a2b3c")
 * @returns {boolean} True if the color is valid (dark enough), false otherwise
 * @example
 * validateColor("#000000") // true (black is dark)
 * validateColor("#ffffff") // false (white is too light)
 * validateColor("invalid") // false (invalid format)
 */
function validateUserColor(userColor = DEFAULT_VALUE) {
    try {
        const colorMatch = HEX_COLOR_REGEX.exec(userColor)

        if (!colorMatch) return false

        const [, redHex, greenHex, blueHex] = colorMatch

        const red = parseInt(redHex, HEX_BASE);
        const green = parseInt(greenHex, HEX_BASE);
        const blue = parseInt(blueHex, HEX_BASE);

        const luminance = calculateLuminance(red, green, blue);

        return luminance <= DARKNESS_THRESHOLD;

    } catch {
        return false
    }
}

/**
 * Calculates the relative luminance of an RGB color using standard coefficients
 * @param {number} red - Red channel value (0-255)
 * @param {number} green - Green channel value (0-255)
 * @param {number} blue - Blue channel value (0-255)
 * @returns {number} Normalized luminance value (0-1), where 0 is darkest and 1 is lightest
 * @example
 * calculateLuminance(0, 0, 0) // 0 (black)
 * calculateLuminance(255, 255, 255) // 1 (white)
 * calculateLuminance(128, 64, 192) // ~0.4
 */
function calculateLuminance(red, green, blue) {
    const { RED, GREEN, BLUE } = LUMINANCE_COEFFICIENTS;

    return (red * RED + green * GREEN + blue * BLUE) / MAX_RGB_COLOR_VALUE;
}

export default validateUserColor
