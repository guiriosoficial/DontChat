function validateUserName(userName = '') {
    try {
        const trimUserName = userName?.trim()
        const userNameLength = trimUserName?.length

        return userNameLength > 2 && userNameLength < 28
    } catch {
        return false
    }
}

module.exports = validateUserName
