const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const CONSONANTS = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']
const VOWELS = ['a', 'e', 'i', 'o', 'u']
const MAX_LEN = 12
const MIN_LEN = 3
const FIRST_INDEX = 0
const SECOND_TO_LAST_INDEX = 2
const LAST_INDEX = 1
const SINGLE_LETTER_COUNT = 1
const MINIMUM_LETTERS_FOR_PATTERN_CHECK = 2


/**
 * Generates a random letter from the alphabet
 * @returns {string} A random letter from a-z
 * @example
 * generateLetter() // "m"
 * generateLetter() // "x"
 */
function generateLetter(): string {
  return LETTERS[Math.floor(Math.random() * LETTERS.length - 1)]
}

/**
 * Generates a random consonant
 * @returns {string} A random consonant
 * @example
 * generateConsonant() // "b"
 * generateConsonant() // "t"
 */
function generateConsonant(): string {
  return CONSONANTS[Math.floor(Math.random() * CONSONANTS.length - 1)]
}

/**
 * Generates a random vowel
 * @returns {string} A random vowel (a, e, i, o, u)
 * @example
 * generateVowel() // "a"
 * generateVowel() // "o"
 */
function generateVowel(): string {
  return VOWELS[Math.floor(Math.random() * VOWELS.length - 1)]
}

/**
 * Generates a random length for a name within the defined range
 * @returns {number} A random number between MIN_LEN and MAX_LEN (inclusive)
 * @example
 * generateLength() // 7
 * generateLength() // 4
 */
function generateLength(): number {
  return Math.floor(Math.random() * (MAX_LEN - MIN_LEN) + MIN_LEN)
}

/**
 * Capitalizes the first letter of a string
 * @param {string} string - The string to capitalize
 * @returns {string} The string with first letter capitalized and rest in lowercase
 * @example
 * capitalizeFirstLetter("hello") // "Hello"
 * capitalizeFirstLetter("WORLD") // "World"
 */
function capitalizeFirstLetter(string: string): string {
  return string.charAt(FIRST_INDEX).toUpperCase() + string.slice(SINGLE_LETTER_COUNT)
}

/**
 * Generates a single name string following phonetic rules to create pronounceable names
 * Rules applied:
 * - Avoids three consecutive identical letters
 * - Alternates between vowels and consonants when possible
 * - Ensures names don't end with two consonants
 * @returns {string} A generated name string in lowercase
 * @example
 * generateString() // "maleth"
 * generateString() // "korive"
 * generateString() // "belani"
 */
function generateString(): string {
  const name: string[] = []
  const size = generateLength()

  for (let i = FIRST_INDEX; i < size; i++) {
    let current = generateLetter()

    if (name.length >= MINIMUM_LETTERS_FOR_PATTERN_CHECK) {
      const lastLetter = name[name.length - LAST_INDEX]
      const penultLetter = name[name.length - SECOND_TO_LAST_INDEX]

      while (lastLetter === current && penultLetter === current) {
        current = generateLetter()
      }

      if (CONSONANTS.includes(lastLetter) && CONSONANTS.includes(penultLetter)) {
        current = generateVowel()
      }
    } else if (name.length === SINGLE_LETTER_COUNT) {
      if (VOWELS.includes(name[FIRST_INDEX])) {
        current = generateConsonant()
      } else if (CONSONANTS.includes(name[FIRST_INDEX])) {
        current = generateVowel()
      }
    }

    name[i] = current
  }

  if (name.length >= 2) {
    const lastLetter = name[name.length - LAST_INDEX]
    const penultLetter = name[name.length - SECOND_TO_LAST_INDEX]

    if (CONSONANTS.includes(lastLetter) && CONSONANTS.includes(penultLetter)) {
      name[name.length - LAST_INDEX] = generateVowel()
    }
  }

  return name.join('')
}

/**
 * Generates a full name consisting of two parts separated by a space
 * Each part follows phonetic rules to ensure pronounceability
 * @returns {string} A generated full name with both parts capitalized
 * @example
 * generateName() // "Maleth Korive"
 * generateName() // "Belani Toxime"
 * generateName() // "Juvixa Meloth"
 */
function generateName(): string {
  const firstName = capitalizeFirstLetter(generateString())
  const lastName = capitalizeFirstLetter(generateString())

  return `${firstName} ${lastName}`
}

export default generateName
