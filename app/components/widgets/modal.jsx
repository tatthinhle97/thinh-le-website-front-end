import {CancelCircleIcon, CheckmarkCircle01Icon} from '@hugeicons-pro/core-solid-rounded'
import {HugeiconsIcon} from '@hugeicons/react'
import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import iconConstant from '../../constants/icon.jsx'
import statusConstant from '../../constants/status.jsx'
import stringUtility from '../../utilities/string.jsx'
import PrimaryButton from '../buttons/primary.jsx'

const themeStates = createStructuredSelector(
  {
    backgroundTheme: (_state) => _state.backgroundTheme,
    textTheme: (_state) => _state.textTheme
  },
  createSelector
)

export default function Modal({
  type = statusConstant.error,
  title = 'Error',
  description = 'Something went wrong!',
  shouldShowModal = true,
  onModalClose = () => {},
  onPrimaryButtonClick = () => {},
  primaryButtonText = 'Ok'
}) {
  const {
    backgroundTheme,
    textTheme
  } = useSelector(themeStates)

  function getIconByType(_type) {
    switch (_type) {
      case statusConstant.error:
        return <HugeiconsIcon
          icon={CancelCircleIcon}
          size={iconConstant.sizeBig5}
          className={textTheme.invalid} />
      default:
        return <HugeiconsIcon
          icon={CheckmarkCircle01Icon}
          size={iconConstant.sizeBig5}
          className={textTheme.valid} />
    }
  }

  return <Dialog open={shouldShowModal} onClose={onModalClose} className='relative z-50'>
    <DialogBackdrop
      transition
      className={stringUtility.merge([
        'fixed inset-0 transition-opacity data-closed:opacity-0',
        'data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in',
        backgroundTheme.opacity.fifty.secondaryColor
      ])} />

    <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
      <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
        <DialogPanel
          transition
          className={stringUtility.merge([
            'relative transform overflow-hidden transition-all',
            'rounded-lg shadow-xl sm:w-full sm:max-w-lg p-6',
            'data-enter:ease-out data-enter:duration-300',
            'data-leave:duration-200 data-leave:ease-in',
            'data-closed:translate-y-4 data-closed:opacity-0 data-closed:sm:translate-y-0 data-closed:sm:scale-95',
            backgroundTheme.primaryColor
          ])}>
          <div className={stringUtility.merge([
            'mx-auto flex w-min items-center justify-center rounded-full mb-6'
          ])}>
            {getIconByType(type)}
          </div>
          <div className='text-center mb-6'>
            <DialogTitle as='h3' className='font-semibold mb-2'>
              {title}
            </DialogTitle>
            <div>
              <p className={`small-text ${textTheme.secondaryColor600}`}>
                {description}
              </p>
            </div>
          </div>
          <div className='flex justify-center'>
            <PrimaryButton
              ariaLabel={'Search listings button'}
              type={'button'}
              onClick={onPrimaryButtonClick}
              className={'button-link-text w-full sm:w-1/2'}>
              {primaryButtonText}
            </PrimaryButton>
          </div>
        </DialogPanel>
      </div>
    </div>
  </Dialog>
}
