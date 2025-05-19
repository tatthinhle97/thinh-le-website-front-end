import {createSlice} from '@reduxjs/toolkit'
import textThemeUtility from '../../../utilities/theme/text.jsx'
import textThemeConstant from '../../../constants/themes/text.jsx'

const textThemeSlice = createSlice({
  name: 'textTheme',
  initialState: textThemeUtility
    .getById(textThemeConstant.white.id),
  reducers: {
    updateTextTheme: (_state, _action) => {
      return _action.payload
    }
  }
})

export const {updateTextTheme} = textThemeSlice.actions
export default textThemeSlice
