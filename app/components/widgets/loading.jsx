import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import iconConstant from '../../constants/icon.jsx'
import stringUtility from '../../utilities/string.jsx'
import {
  Loading02Icon
} from '@hugeicons-pro/core-solid-rounded'
import {HugeiconsIcon} from '@hugeicons/react'

const themeStates = createStructuredSelector(
  {
    backgroundTheme: (_state) => _state.backgroundTheme,
    borderTheme: (_state) => _state.borderTheme,
    textTheme: (_state) => _state.textTheme
  },
  createSelector
)

export default function Loading({
  containerClassName,
  title = 'Loading data'
}) {
  const {
    backgroundTheme,
    borderTheme,
    textTheme
  } = useSelector(themeStates)

  return (
    <div className={stringUtility.merge([
      'flex gap-2 italic items-center',
      textTheme.secondaryColor600,
      containerClassName
    ])}>
      <p>{title}</p>
      <HugeiconsIcon
        icon={Loading02Icon}
        size={iconConstant.defaultSize}
        className={'animate-spin'} />
    </div>
  )
}
