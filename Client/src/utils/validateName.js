function validateName(nickName = '') {
  try {
    const trimNickName = nickName?.trim()
    const nickNameLength = trimNickName?.length
  
    if (nickNameLength > 2 && nickNameLength < 28) {
      return true
    } return false
  } catch {
    return false
  }
}

export default validateName
