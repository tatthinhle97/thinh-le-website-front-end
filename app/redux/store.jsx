import {configureStore} from '@reduxjs/toolkit'
import borderThemeSlice from './slices/theme/border.jsx'
import colorThemeSlice from './slices/theme/color.jsx'
import shadowThemeSlice from './slices/theme/shadow.jsx'
import outlineThemeSlice from './slices/theme/outline.jsx'
import backgroundThemeSlice from './slices/theme/background.jsx'
import textThemeSlice from './slices/theme/text.jsx'

const store = configureStore({
  reducer: {
    backgroundTheme: backgroundThemeSlice.reducer,
    borderTheme: borderThemeSlice.reducer,
    colorTheme: colorThemeSlice.reducer,
    outlineTheme: outlineThemeSlice.reducer,
    shadowTheme: shadowThemeSlice.reducer,
    textTheme: textThemeSlice.reducer
  }
})

export default store
