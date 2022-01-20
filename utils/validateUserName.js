function validateUserName(userName) {
    const trimUserName = userName?.trim()

    return trimUserName?.length > 2 && trimUserName?.length < 28
}

module.exports = validateUserName
