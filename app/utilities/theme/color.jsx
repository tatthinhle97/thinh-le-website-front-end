import colorThemeConstant from '../../constants/themes/color.jsx'

const getById = (_id) => {
  return _id === colorThemeConstant.white.id
    ? colorThemeConstant.white
    : colorThemeConstant.black
}

const colorThemeUtility = {
  getById
}

export default colorThemeUtility
