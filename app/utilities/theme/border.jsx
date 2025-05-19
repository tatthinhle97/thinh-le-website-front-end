import borderThemeConstant from '../../constants/themes/border.jsx'

const getById = (_id) => {
  return _id === borderThemeConstant.white.id
    ? borderThemeConstant.white
    : borderThemeConstant.black
}

const borderThemeUtility = {
  getById
}

export default borderThemeUtility
