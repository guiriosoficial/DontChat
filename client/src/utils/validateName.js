const MIN_LEN = 2
const MAX_LEN = 28

function validateName(nickName = '') {
  try {
    const trimNickName = nickName?.trim()
    const nickNameLength = trimNickName?.length

    if (nickNameLength > MIN_LEN && nickNameLength < MAX_LEN) return true

    return false
  } catch {
    return false
  }
}

export default validateName
