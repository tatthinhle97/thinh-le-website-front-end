import stringUtility from '../../utilities/string.jsx'

export default function IconButton({
  children,
  ariaLabel,
  ref,
  type = 'button',
  onClick,
  className,
  isDisabled = false
}) {
  return <button
    disabled={isDisabled}
    aria-label={ariaLabel}
    ref={ref}
    type={type}
    onClick={onClick}
    className={stringUtility.merge([
      className
    ])}>
    {children}
  </button>
}
