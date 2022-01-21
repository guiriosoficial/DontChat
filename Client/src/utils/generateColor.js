function generateColor() {
    const generateNumber = () => Math.random() * 255
    let r = generateNumber()
    let g = generateNumber()
    let b = generateNumber()

    const c = ((r * 0.299 + g * 0.587 + b * 0.114) / 255) - 0.6

    if (c > 0) {
      r = r * c
      g = g * c
      b = b * c
    }

    const rgbToHexa = (color) => Math.floor(color).toString(16).padStart(2, '0')

    return `#${rgbToHexa(r)}${rgbToHexa(g)}${rgbToHexa(b)}`
}

export default generateColor
