import textThemeConstant from '../../constants/themes/text.jsx'

const getById = (_id) => {
  return _id === textThemeConstant.white.id
    ? textThemeConstant.white
    : textThemeConstant.black
}

const textThemeUtility = {
  getById
}

export default textThemeUtility
