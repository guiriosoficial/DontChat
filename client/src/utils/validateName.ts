const MIN_LEN = 2
const MAX_LEN = 28
const DEFAULT_VALUE = ''

/**
 * Validates if a username meets the length requirements
 * Checks if the trimmed username length is within the acceptable range
 * @param {string} userName - The username string to validate
 * @returns {boolean} True if the name is valid (length between 3-27 characters), false otherwise
 * @example
 * validateName("John") // true
 * validateName("Jo") // false (too short)
 * validateName("A".repeat(30)) // false (too long)
 * validateName(" valid ") // true (gets trimmed to "valid")
 * validateName(null) // false (handles null/undefined safely)
 */
function validateName(userName: string = DEFAULT_VALUE): boolean {
  try {
    const trimUserName = userName?.trim()
    const userNameLength = trimUserName?.length

    return userNameLength > MIN_LEN && userNameLength < MAX_LEN;
  } catch {
    return false
  }
}

export default validateName
