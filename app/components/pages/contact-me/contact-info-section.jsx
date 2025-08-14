import {MailSend02Icon} from '@hugeicons-pro/core-solid-rounded'
import {HugeiconsIcon} from '@hugeicons/react'
import React, {useState} from 'react'
import contactMeApi from '../../../apis/contact-me.js'
import statusConstant from '../../../constants/status.jsx'
import PrimaryButton from '../../buttons/primary.jsx'
import TextInput from '../../inputs/text.jsx'
import TextAreaInput from '../../inputs/textarea.jsx'
import Modal from '../../widgets/modal.jsx'

export default function ContactInfoSection() {
  const [shouldValidateForm, setShouldValidateForm] = useState(false)
  const [firstNameValue, setFirstNameValue] = useState('')
  const [lastNameValue, setLastNameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [phoneNumberValue, setPhoneNumberValue] = useState('')
  const [messageValue, setMessageValue] = useState('')
  const [shouldShowModal, setShouldShowModal] = useState(false)
  const [modal, setModal] = useState({
    title: '',
    description: '',
    type: ''
  })

  const onFirstNameValueChange = (_event) => {
    setFirstNameValue(_event.target.value)
  }

  const onLastNameValueChange = (_event) => {
    setLastNameValue(_event.target.value)
  }

  const onEmailValueChange = (_event) => {
    setEmailValue(_event.target.value)
  }

  const onPhoneNumberValueChange = (_event) => {
    setPhoneNumberValue(_event.target.value)
  }

  const onMessageValueChange = (_event) => {
    setMessageValue(_event.target.value)
  }

  const onContactFormSubmit = async (_event) => {
    _event.preventDefault()

    if (!_event.target.checkValidity()) {
      setShouldValidateForm(true)
      return
    }

    const formData = new FormData(_event.target)
    const contactMeDto = Object.fromEntries(formData.entries())

    contactMeApi.sendContactForm(contactMeDto)
      .then(() => {
        setModal({
          title: 'Success',
          description: 'Your message has been sent.',
          type: statusConstant.success
        })
        setShouldShowModal(true)
        setFirstNameValue('')
        setLastNameValue('')
        setEmailValue('')
        setPhoneNumberValue('')
        setMessageValue('')
      }).catch(() => {
        setModal({
          title: 'Error',
          description: 'Server error! please try again later.',
          type: statusConstant.error
        })
        setShouldShowModal(true)
      })

    setShouldValidateForm(false)
  }

  return <section className='container-layout p-b-content-section px-6'>
    <Modal
      type={modal.type}
      shouldShowModal={shouldShowModal}
      onModalClose={setShouldShowModal}
      title={modal.title}
      description={modal.description}
      onPrimaryButtonClick={() => setShouldShowModal(false)} />
    <form onSubmit={onContactFormSubmit} noValidate className='max-w-lg mx-auto'>
      <div className='mx-auto max-w-xl lg:mr-0 lg:max-w-lg'>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 mb-6'>
          <TextInput
            id={'firstName'}
            label={'First name'}
            isRequired={true}
            shouldValidate={shouldValidateForm}
            name={'firstName'}
            onValueChange={onFirstNameValueChange}
            value={firstNameValue} />
          <TextInput
            id={'lastName'}
            label={'Last name'}
            name={'lastName'}
            onValueChange={onLastNameValueChange}
            value={lastNameValue} />
          <div className='sm:col-span-2'>
            <TextInput
              id={'email'}
              type={'email'}
              label={'Email'}
              isRequired={true}
              shouldValidate={shouldValidateForm}
              name={'email'}
              onValueChange={onEmailValueChange}
              value={emailValue} />
          </div>
          <div className='sm:col-span-2'>
            <TextInput
              id={'phoneNumber'}
              type={'tel'}
              label={'Phone number'}
              name={'phoneNumber'}
              onValueChange={onPhoneNumberValueChange}
              value={phoneNumberValue} />
          </div>
          <div className='sm:col-span-2'>
            <TextAreaInput
              isRequired={true}
              id={'message'}
              rows={7}
              label={'Message'}
              shouldValidate={shouldValidateForm}
              name={'message'}
              value={messageValue}
              onValueChange={onMessageValueChange} />
          </div>
        </div>
        <div className='flex justify-center'>
          <PrimaryButton
            ariaLabel={'Search listings button'}
            type={'submit'}
            className={'button-link-leading-icon min-w-fit'}>
            <HugeiconsIcon icon={MailSend02Icon} size={21} />
            Send
          </PrimaryButton>
        </div>
      </div>
    </form>
  </section>
}
