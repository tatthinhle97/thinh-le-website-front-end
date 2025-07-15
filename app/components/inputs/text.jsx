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

export default function TextInput({
  containerClassName,
  id,
  isRequired = false,
  isReadonly = false,
  inputClassName,
  // If true, it will apply default built-in validation, and have :invalid state
  shouldValidate = false,
  label,
  shouldDisplayLabel = true,
  name,
  onValueChange,
  placeholder = '',
  prefix, // a jsx element
  validationMessage = 'This is a required field',
  value
}) {
  const {
    outlineTheme,
    textTheme
  } = useSelector(themeStates)

  return <div className={containerClassName}>
    {renderUtility.renderIfTrue(
      shouldDisplayLabel, <label htmlFor={id}
        className={'leading-6 font-medium'}>
        {label}{isRequired && !isReadonly ? ' (*)' : ''}
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
      <input
        aria-label={label}
        type={'text'}
        value={value}
        id={id}
        required={isRequired}
        name={name}
        placeholder={placeholder}
        className={stringUtility.merge([
          'w-full focus:outline-0',
          inputClassName
        ])}
        onChange={onValueChange} />
    </div>
    {renderUtility.renderIfTrue(shouldValidate, <p
      className={stringUtility.merge([
        'mt-2 text-small-1 hidden peer-has-[input:invalid]:block',
        textTheme.invalid600
      ])}>
      {validationMessage}
    </p>)}
  </div>
}
