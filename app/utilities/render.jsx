const renderIfTrue = (_condition, _jsx) => {
  return _condition ? _jsx : <></>
}

const renderUtility = {
  renderIfTrue
}

export default renderUtility
