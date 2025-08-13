import {useImperativeHandle, useRef, useState} from 'react'
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

export default function TextAreaInput({
  containerClassName,
  id,
  isRequired = false,
  isReadonly = false,
  isDisabled = false,
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
  placeholder = '',
  prefix, // a jsx element
  canResize = false,
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
        className={'font-medium'}>
        {label}{isRequired && !isReadonly ? ' (*)' : ''}
      </label>)}
    <div className={stringUtility.merge([
      shouldDisplayLabel ? 'mt-2' : '',
      'flex rounded-lg py-2 px-4 peer',
      'outline-solid outline-1 has-[input:focus-within]:outline-2',
      'has-[input:focus-within]:outline-offset-1',
      shouldValidate
        ? stringUtility.merge([
          'has-[textarea:invalid]:outline-2 has-[textarea:invalid]:outline-offset-1',
          outlineTheme.has.textarea.invalid
        ])
        : '',
      outlineTheme.secondaryColor300,
      outlineTheme.has.textarea.focusWithin.accentColor700
    ])}>
      {prefix}
      <textarea
        disabled={isDisabled}
        required={isRequired}
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
    {renderUtility.renderIfTrue(shouldValidate, <p
      className={stringUtility.merge([
        'mt-2 small-text hidden peer-has-[textarea:invalid]:block break-all',
        textTheme.invalid
      ])}>
      {validationMessage}
    </p>)}
  </div>
}
