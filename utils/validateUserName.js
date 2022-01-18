function validateUserName(userName) {
    return userName?.trim() && userName?.trim().length < 30
}

module.exports = validateUserName
