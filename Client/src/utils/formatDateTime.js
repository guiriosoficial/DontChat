function formatDateTime(dateTime) {
  const formatString = (value) => String(value).padStart(2, '0')
  const now = new Date(dateTime)
  const year = formatString(now.getFullYear())
  const month = formatString(now.getMonth() + 1)
  const day = formatString(now.getDate())
  const hours = formatString(now.getHours())
  const minutes = formatString(now.getMinutes())

  return `${year}/${month}/${day} ${hours}:${minutes}`
}

export default formatDateTime
