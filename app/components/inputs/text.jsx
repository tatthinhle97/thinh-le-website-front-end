import {useImperativeHandle, useRef} from 'react'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import useInputValidation from '../../hooks/input-validation.jsx'
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
  type = 'text',
  inputClassName,
  // If true, it will apply default built-in validation, and have :invalid state
  shouldValidate = false,
  label,
  shouldDisplayLabel = true,
  name,
  onValueChange,
  placeholder = '',
  prefix, // a jsx element
  value,
  ref
}) {
  const {
    outlineTheme,
    textTheme
  } = useSelector(themeStates)

  const inputRef = useRef(null)

  // Expose the real input element to the parent via forwarded ref
  useImperativeHandle(ref, () => inputRef.current)

  const {validationMessage} = useInputValidation(
    shouldValidate,
    inputRef.current,
    value
  )

  return <div className={containerClassName}>
    {renderUtility.renderIfTrue(
      shouldDisplayLabel, <label htmlFor={id}
        className={'leading-6 font-medium'}>
        {label}{isRequired && !isReadonly ? ' (*)' : ''}
      </label>)}
    {isReadonly
      ? <p className={stringUtility.merge([
        shouldDisplayLabel ? 'mt-1' : '',
        'break-all'
      ])}>{value}</p>
      : <div className={stringUtility.merge([
        shouldDisplayLabel ? 'mt-2' : '',
        'flex rounded-lg py-2 px-4 peer',
        'outline-solid outline-1 has-[input:focus-within]:outline-2',
        'has-[input:focus-within]:outline-offset-1',
        shouldValidate
          ? stringUtility.merge([
            'has-[input:invalid]:outline-2 has-[input:invalid]:outline-offset-1',
            outlineTheme.has.input.invalid
          ])
          : '',
        outlineTheme.secondaryColor300,
        outlineTheme.has.input.focusWithin.accentColor700
      ])}>
        {prefix}
        <input
          ref={inputRef}
          aria-label={label}
          type={type}
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
      </div>}
    {renderUtility.renderIfTrue(shouldValidate, <p
      className={stringUtility.merge([
        'mt-2 small-text hidden peer-has-[input:invalid]:block break-all',
        textTheme.invalid
      ])}>
      {validationMessage}
    </p>)}
  </div>
}
