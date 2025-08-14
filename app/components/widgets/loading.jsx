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
    textTheme: (_state) => _state.textTheme
  },
  createSelector
)

export default function Loading({
  containerClassName,
  title = 'Loading data'
}) {
  const {
    textTheme
  } = useSelector(themeStates)

  return (
    <div className={stringUtility.merge([
      'flex gap-2 italic items-center',
      textTheme.secondaryColor600,
      containerClassName
    ])}>
      <HugeiconsIcon
        icon={Loading02Icon}
        size={iconConstant.defaultSize}
        className={'animate-spin'} />
      <p>{title}</p>
    </div>
  )
}
