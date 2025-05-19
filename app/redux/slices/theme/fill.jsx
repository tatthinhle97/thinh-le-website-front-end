import {createSlice} from '@reduxjs/toolkit'
import fillThemeConstant from '../../../constants/themes/fill.jsx'
import fillThemeUtility from '../../../utilities/theme/fill.jsx'

const fillThemeSlice = createSlice({
  name: 'fillTheme',
  initialState: fillThemeUtility
    .getById(fillThemeConstant.white.id),
  reducers: {
    updateFillTheme: (_state, _action) => {
      return _action.payload
    }
  }
})

export const {updateFillTheme} = fillThemeSlice.actions
export default fillThemeSlice
