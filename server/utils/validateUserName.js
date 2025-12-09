const MIN_LEN = 2
const MAX_LEN = 28

function validateUserName(userName = '') {
    try {
        const trimUserName = userName?.trim()
        const userNameLength = trimUserName?.length

        return userNameLength > MIN_LEN && userNameLength < MAX_LEN
    } catch {
        return false
    }
}

module.exports = validateUserName
