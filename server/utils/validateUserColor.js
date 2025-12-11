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
 * Checks if the color provided is dark enough.
 * @param {string} userColor - Color in hexadecimal format
 * @returns {boolean} - TRUE if the color is valid (dark), FALSE otherwise.
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
 * Calculates the relative luminance of an RGB color
 * @param {number} red - Red channel value (0-255)
 * @param {number} green - Green channel value (0-255)
 * @param {number} blue - Blue channel value (0-255)
 * @returns {number} - Normalized luminance (0-1)
 */
function calculateLuminance(red, green, blue) {
    const { RED, GREEN, BLUE } = LUMINANCE_COEFFICIENTS;

    return (red * RED + green * GREEN + blue * BLUE) / MAX_RGB_COLOR_VALUE;
}

module.exports = validateUserColor
