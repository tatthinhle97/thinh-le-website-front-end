import stringUtility from '../../utilities/string.jsx'

export default function IconButton({
  children, ariaLabel, ref, type = 'button', onClick, className
}) {
  return <button
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
