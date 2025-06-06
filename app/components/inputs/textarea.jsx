import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import renderUtility from '../../utilities/render.jsx'
import stringUtility from '../../utilities/string.jsx'

const themeStates = createStructuredSelector(
  {
    outlineTheme: (_state) => _state.outlineTheme,
    textTheme: (_state) => _state.textTheme
  },
  createSelector
)

export default function TextAreaInput({
  containerClassName,
  id,
  inputClassName,
  // If true, it will apply default built-in validation, and have :invalid state
  shouldValidate = false,
  label,
  shouldDisplayLabel = true,
  name,
  value,
  rows = 4,
  onKeyDown,
  onValueChange,
  placeholder = 'Please input',
  prefix, // a jsx element
  canResize = false,
  inputRef
}) {
  const {
    outlineTheme
  } = useSelector(themeStates)

  return <div className={containerClassName}>
    {renderUtility.renderIfTrue(
      shouldDisplayLabel, <label htmlFor={id}
        className={'font-medium'}>
        {label}
      </label>)}
    <div className={stringUtility.merge([
      shouldDisplayLabel ? 'mt-2' : '',
      'flex rounded-normal py-2 px-4 peer',
      'outline-solid outline-1 has-[input:focus-within]:outline-2',
      'has-[input:focus-within]:outline-offset-1',
      shouldValidate
        ? stringUtility.merge([
          'has-[input:invalid]:outline-2 has-[input:invalid]:outline-offset-1',
          outlineTheme.has.input.invalid600
        ])
        : '',
      outlineTheme.secondaryColor300,
      outlineTheme.has.input.focusWithin.accentColor700
    ])}>
      {prefix}
      <textarea
        ref={inputRef}
        aria-label={label}
        id={id}
        value={value}
        rows={rows}
        name={name}
        placeholder={placeholder}
        className={stringUtility.merge([
          canResize ? 'resize' : 'resize-none',
          'w-full focus:outline-0',
          inputClassName
        ])}
        onKeyDown={onKeyDown}
        onChange={onValueChange}>
      </textarea>
    </div>
  </div>
}
