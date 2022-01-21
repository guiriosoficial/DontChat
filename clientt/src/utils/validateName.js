function validateName(nickName) {
  const trimNickName = nickName?.trim()

  if (trimNickName?.length > 2 && trimNickName?.length < 28) {
    return true
  } return false
}

export default validateName
