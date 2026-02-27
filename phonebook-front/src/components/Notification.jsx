const Notification = ({ message, style }) => {

  const succeedStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  
  const errorStyle = {
    ...succeedStyle,
    color: 'red',
  }

  if (message === null) {
    return null
  }

  return <div style= {style === 'success' ?  succeedStyle : errorStyle}>{message}</div>
}

export default Notification