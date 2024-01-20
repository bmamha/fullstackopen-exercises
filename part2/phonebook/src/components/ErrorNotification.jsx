const ErrorNotification = ({ message }) => {

    const errorStyle = {
        color: 'red',
        fontStyle: 'bold',
        fontSize: 20,
        paddingTop: '3px',
        border: '3px solid',
        backgroundColor: 'lightred',
        borderRadius: '5px',
        padding: '10px',

    }
    
    if (message === null) {
      return null
    }
  
    return (
      <div style= {errorStyle}>
        {message}

      </div>
    )
  }


  export default ErrorNotification