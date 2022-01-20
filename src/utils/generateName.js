
function generateName() {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']
    const vowels = ['a', 'e', 'i', 'o', 'u']
    
    const generateLetter = () => letters[Math.floor(Math.random() * letters.length - 1)]
    const generateConsoant = () => consonants[Math.floor(Math.random() * consonants.length - 1)]
    const generateVowel = () => vowels[Math.floor(Math.random() * vowels.length - 1)]
    
    let name = []
    
    const nameLength = () => name.length
    const lastLetter = () => name[nameLength() - 1]
    const penultLetter = () =>  name[nameLength() - 2]
    
    const max = 12
    const min = 3
    const size = Math.floor(Math.random() * (max - min) + min)
    
    const generateString = () => {
        name = []

        for (let i = 0; i <= size; i++) {
            let current = generateLetter()
    
            if (nameLength() >= 2) {
                while (lastLetter() === current && penultLetter() === current) {
                    current = generateLetter()
                }
    
                if (consonants.includes(lastLetter()) && consonants.includes(penultLetter())) {
                    current = generateVowel()
                }
            } else {
                if (vowels.includes(name[0])) {
                    current = generateConsoant()
                } else if (consonants.includes(name[0])) {
                    current = generateVowel()
                }
            }
    
            name[i] = current
        }
    
        if (consonants.includes(lastLetter()) && consonants.includes(penultLetter())) {
            name[nameLength() - 1] = generateVowel()
        }
    
        name = name.join('')
        name = name.substr(0, 1).toUpperCase() + name.substr(1)

        return name
    }
    return `${generateString()} ${generateString()}`
}

export default generateName
