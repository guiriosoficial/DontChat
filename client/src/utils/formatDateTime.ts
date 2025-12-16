const PAD_LENGTH = 2
const MONTH_INDEX = 1
const PAD_CHAR = '0'

/**
 * Formats a Date object into a readable string format (YYYY/MM/DD HH:MM:SS)
 * @param {Date} dateTime - The date to format. Defaults to current date/time
 * @returns {string} Formatted date string in YYYY/MM/DD HH:MM format
 * @example
 * formatDateTime(new Date('2023-12-25T14:30:00')) // "2023/12/25 14:30:00"
 * formatDateTime() // Current date and time formatted
 */
function formatDateTime(dateTime: Date = new Date()): string {
  const now = new Date(dateTime)
  const year = formatString(now.getFullYear())
  const month = formatString(now.getMonth() + MONTH_INDEX)
  const day = formatString(now.getDate())
  const hours = formatString(now.getHours())
  const minutes = formatString(now.getMinutes())
  const seconds = formatString(now.getSeconds())

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
}

/**
 * Formats a number to string with leading zeros if needed
 * @param {number} value - The number to format
 * @returns {string} String with leading zeros to ensure minimum length
 * @example
 * formatString(5) // "05"
 * formatString(12) // "12"
 */
function formatString(value: number): string {
  return String(value).padStart(PAD_LENGTH, PAD_CHAR)
}

export default formatDateTime
