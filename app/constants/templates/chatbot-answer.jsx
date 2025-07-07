const pageNavigationTemplates = [
  'Please visit the ',
  'You might want to check out the ',
  'Please navigate to the ',
  'You can find more info on the ',
  'This page will help you: '
]

function pickRandomTemplate(_templates) {
  return _templates[Math.floor(Math.random() * _templates.length)]
}

const chatbotAnswerTemplateConstant = {
  pageNavigationTemplates,
  pickRandomTemplate
}

export default chatbotAnswerTemplateConstant
