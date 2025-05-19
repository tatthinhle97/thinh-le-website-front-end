const white = {
  id: 0,
  active: {
    accentColor700: 'active:border-white-accent-color-700'
  },
  after: {
    accentColor700: 'after:border-white-accent-color-700'
  },
  before: {
    accentColor700: 'before:border-white-accent-color-700',
    top: {
      secondaryColor: 'before:border-t-black'
    }
  },
  hover: {
    accentColor700: 'hover:border-white-accent-color-700'
  },
  primaryColor: 'border-white',
  secondaryColor: 'border-black',
  secondaryColor300: 'border-gray-300',
  accentColor700: 'border-white-accent-color-700',
  opacity: {
    ten: {
      secondaryColor: 'border-black/10'
    }
  }
}

const black = {
  id: 1,
  active: {
    accentColor700: 'active:border-black-accent-color-700' // [Debt]
  },
  after: {
    accentColor700: 'after:border-black-accent-color-700'
  },
  before: {
    accentColor700: 'before:border-black-accent-color-700'
  },
  hover: {
    accentColor700: 'hover:border-black-accent-color-700'
  },
  primaryColor: 'border-black',
  secondaryColor: 'border-white',
  secondaryColor300: 'border-gray-300', // [Debt]
  accentColor700: 'border-black-accent-color-700',
  opacity: {
    ten: {
      secondaryColor: 'border-white/10'
    }
  }
}

const borderThemeConstant = {
  white,
  black
}

export default borderThemeConstant
