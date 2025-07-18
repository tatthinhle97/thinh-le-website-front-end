import {createSlice} from '@reduxjs/toolkit'
import colorThemeConstant from '../../../constants/themes/color.jsx'
import colorThemeUtility from '../../../utilities/theme/color.jsx'

const colorThemeSlice = createSlice({
  name: 'colorTheme',
  initialState: colorThemeUtility
    .getById(colorThemeConstant.white.id),

  reducers: {
    updateColorTheme: (_state, _action) => {
      return _action.payload
    }
  }
})

// [Tip]: Action creators are generated for each case reducer function.
export const {updateColorTheme} = colorThemeSlice.actions
export default colorThemeSlice
