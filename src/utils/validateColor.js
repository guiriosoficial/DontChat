function validateColor(userColor) {
  try {
    const c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(userColor)
    const r = parseInt(c[1], 16)
    const g = parseInt(c[2], 16)
    const b = parseInt(c[3], 16)

    const q = ((r * 0.299 + g * 0.587 + b * 0.114) / 255) - 0.6

    if (q > 0) {
      return false
    } return true
  } catch {
    return false
  }
}

export default validateColor
