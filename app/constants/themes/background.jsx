const white = {
  id: 0,
  accentColor100: 'bg-white-accent-color-100',
  accentColor700: 'bg-white-accent-color-700',
  after: {
    primaryColor: 'after:bg-white',
    secondaryColor: 'after:bg-black'
  },
  before: {
    primaryColor: 'before:bg-white',
    secondaryColor: 'before:bg-black'
  },
  data: {
    focus: {
      accentColor700: 'data-[focus]:bg-white-accent-color-700'
    }
  },
  hover: {
    accentColor700: 'hover:bg-white-accent-color-700',
    secondaryColor: 'hover:bg-black'
  },
  invalid600: 'bg-white-invalid-600',
  opacity: {
    fifty: {
      secondaryColor: 'bg-black/50'
    },
    ninety: {
      primaryColor: 'bg-white/90'
    }
  },
  primaryColor: 'bg-white',
  secondaryColor: 'bg-black',
  secondaryColor100: 'bg-gray-100',
  secondaryColor200: 'bg-gray-200',
  secondaryColor300: 'bg-gray-300',
  valid600: 'bg-white-valid-600',
  warning400: 'bg-white-warning-400'
}

const black = {
  id: 1,
  accentColor100: 'bg-black-accent-color-100',
  accentColor700: 'bg-black-accent-color-700',
  after: {
    primaryColor: 'after:bg-black',
    secondaryColor: 'after:bg-white'
  },
  before: {
    primaryColor: 'before:bg-black',
    secondaryColor: 'before:bg-white'
  },
  data: {
    focus: {
      accentColor700: 'data-[focus]:bg-black-accent-color-700'
    }
  },
  hover: {
    accentColor700: 'hover:bg-black-accent-color-700',
    secondaryColor: 'hover:bg-white'
  },
  invalid600: 'bg-black-invalid-600',
  opacity: {
    fifty: {
      secondaryColor: 'bg-white/50'
    },
    ninety: {
      primaryColor: 'bg-black/90'
    }
  },
  primaryColor: 'bg-black',
  secondaryColor: 'bg-white',
  secondaryColor100: 'bg-gray-100', // [Debt]
  secondaryColor200: 'bg-gray-100', // [Debt]
  secondaryColor300: 'bg-gray-300', // [Debt]
  valid600: 'bg-black-valid-600', // [Debt]
  warning400: 'bg-black-warning-400' // [Debt]
}

const backgroundThemeConstant = {
  white,
  black
}

export default backgroundThemeConstant
