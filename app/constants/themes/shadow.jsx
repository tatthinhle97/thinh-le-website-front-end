const shared = {
  opacity: {
    twenty: {
      accentColor700: 'shadow-white-accent-color-700/20'
    }
  }
}

const white = {
  id: 0,
  ...shared
}

const black = {
  id: 1,
  ...shared
}

const shadowThemeConstant = {
  white,
  black
}

export default shadowThemeConstant
