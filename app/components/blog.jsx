import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import dateTimeUtility from '../utilities/datetime.jsx'
import stringUtility from '../utilities/string.jsx'

const themeStates = createStructuredSelector(
  {
    textTheme: (_state) => _state.textTheme
  },
  createSelector
)

export default function Blog({
  dateCreated,
  title,
  children
}) {
  const {
    textTheme
  } = useSelector(themeStates)

  return <section>
    <div className={stringUtility.merge([
      'container-layout section-pt section-px'
    ])}>
      <time
        dateTime={dateCreated}
        className={textTheme.secondaryColor600}>
        {dateTimeUtility.formatLongDate(dateCreated)}
      </time>
      <h1 className={'text-big-4 font-bold mt-2 mb-12'}>
        {title}
      </h1>
      {children}
    </div>
  </section>
}
