const PAD_LENGTH = 2
const PAD_CHAR = '0'

function formatDateTime(dateTime = new Date()) {
  const formatString = (value) => String(value).padStart(PAD_LENGTH, PAD_CHAR)
  const now = new Date(dateTime)
  const year = formatString(now.getFullYear())
  const month = formatString(now.getMonth() + 1)
  const day = formatString(now.getDate())
  const hours = formatString(now.getHours())
  const minutes = formatString(now.getMinutes())

  return `${year}/${month}/${day} ${hours}:${minutes}`
}

export default formatDateTime
