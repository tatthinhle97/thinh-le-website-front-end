const white = {
  id: 0,
  hover: {
    primaryColor: 'hover:text-white',
    secondaryColor: 'hover:text-black',
    accentColor700: 'hover:text-white-accent-color-700'
  },
  primaryColor: 'text-white',
  secondaryColor: 'text-black',
  secondaryColor600: 'text-gray-600',
  accentColor700: 'text-white-accent-color-700',
  group: {
    data: {
      selected: {
        primaryColor: 'group-data-selected:text-white'
      }
    }
  },
  data: {
    focus: {
      primaryColor: 'data-focus:text-white'
    }
  },
  invalid600: 'text-white-invalid-600'
}

const black = {
  id: 1,
  hover: {
    primaryColor: 'hover:text-black',
    secondaryColor: 'hover:text-white',
    accentColor700: 'hover:text-black-accent-color-700'
  },
  primaryColor: 'text-black',
  secondaryColor: 'text-white',
  secondaryColor600: 'text-gray-600', // [Debt]
  accentColor700: 'text-black-accent-color-700', // [Debt]
  group: {
    data: {
      selected: {
        primaryColor: 'group-data-selected:text-black'
      }
    }
  },
  data: {
    focus: {
      primaryColor: 'data-focus:text-black' // [Debt]
    }
  },
  invalid600: 'text-black-invalid-600'
}

const textThemeConstant = {
  white,
  black
}

export default textThemeConstant
