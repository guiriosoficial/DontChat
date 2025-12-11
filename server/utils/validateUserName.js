const MIN_LEN = 2
const MAX_LEN = 28
const DEFAULT_VALUE = ''

/**
 * Checks if the username meets the length criteria
 * @param {string} userName - String to be validated
 * @returns {boolean} - TRUE if the name is valid, FALSE otherwise
 */
function validateUserName(userName = DEFAULT_VALUE) {
    try {
        const trimUserName = userName?.trim()
        const userNameLength = trimUserName?.length

        return userNameLength > MIN_LEN && userNameLength < MAX_LEN
    } catch {
        return false
    }
}

module.exports = validateUserName
