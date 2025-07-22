import {useSelector} from 'react-redux'
import {Link} from 'react-router'
import {createSelector, createStructuredSelector} from 'reselect'
import dateTimeUtility from '../../utilities/datetime.jsx'
import stringUtility from '../../utilities/string.jsx'

const themeStates = createStructuredSelector(
  {
    backgroundTheme: (_state) => _state.backgroundTheme,
    textTheme: (_state) => _state.textTheme
  },
  createSelector
)

export default function BlogCard({
  link,
  backgroundImageClass,
  date,
  tags,
  title,
  description
}) {
  const {
    backgroundTheme,
    textTheme
  } = useSelector(themeStates)

  return <article className={'flex flex-col gap-6'}>
    <Link
      aria-label={description}
      className={stringUtility.merge([
        'block aspect-3/2 bg-contain rounded-2xl',
        backgroundImageClass
      ])}
      to={{
        pathname: link
      }}>
    </Link>
    <div className='flex flex-col'>
      <time
        dateTime={date}
        className={stringUtility.merge([
          'small-text mb-2',
          textTheme.secondaryColor600
        ])}>
        {dateTimeUtility.formatLongDate(date)}
      </time>
      <Link
        aria-label={title}
        to={{
          pathname: link
        }}>
        <h3 className={`mb-8 font-semibold text-lg/6 lg:text-xl/6 ${textTheme.hover.accentColor700}`}>
          {title}
        </h3>
      </Link>
      <p className={stringUtility.merge([
        'line-clamp-3',
        textTheme.secondaryColor600
      ])}>
        {description}
      </p>
    </div>
    <div className={stringUtility.merge([
      'flex gap-2 items-center small-text',
      textTheme.secondaryColor600
    ])}>
      {tags.map((_tag, _index) => {
        return (
          <button
            key={_index}
            aria-label={_tag}
            className={stringUtility.merge([
              'font-medium rounded-normal px-2 py-1',
              backgroundTheme.secondaryColor100
            ])}>{_tag}
          </button>
        )
      })}
    </div>
  </article>
}
