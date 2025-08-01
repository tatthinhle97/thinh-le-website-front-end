const white = {
  id: 0,
  focus: {
    accentColor700: 'focus:outline-white-accent-color-700'
  },
  has: {
    input: {
      focusWithin: {
        accentColor700: 'has-[input:focus-within]:outline-white-accent-color-700'
      },
      invalid: 'has-[input:invalid]:outline-white-invalid'
    }
  },
  secondaryColor300: 'outline-gray-300',
  invalid: 'invalid:outline-white-invalid'
}

const black = {
  id: 1,
  focus: {
    accentColor700: 'focus:outline-black-accent-color-700' // [Debt]
  },
  has: {
    input: {
      focusWithin: {
        accentColor700: 'has-[input:focus-within]:outline-black-accent-color-700' // [Debt]
      },
      invalid: 'has-[input:invalid]:outline-black-invalid' // [Debt]
    }
  },
  secondaryColor300: 'outline-gray-300', // [Debt]
  invalid: 'invalid:outline-black-invalid' // [Debt]
}

const outlineThemeConstant = {
  white,
  black
}

export default outlineThemeConstant
