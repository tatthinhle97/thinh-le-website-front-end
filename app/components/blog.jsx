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
  containerClassName,
  children
}) {
  const {
    textTheme
  } = useSelector(themeStates)

  return <section>
    <div className={stringUtility.merge([
      'container-layout py-24 lg:py-32 px-6',
      containerClassName
    ])}>
      <time
        dateTime={dateCreated}
        className={`${textTheme.secondaryColor600}`}>
        {dateTimeUtility.formatLongDate(dateCreated)}
      </time>
      <h1 className={'text-4xl lg:text-5xl font-semibold tracking-tight text-pretty mt-2 mb-8'}>
        {title}
      </h1>
      {children}
    </div>
  </section>
}
