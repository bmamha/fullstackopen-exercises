const Notification = ({ message }) => {

    const notificationStyle = {
        color: 'green',
        fontStyle: 'bold',
        fontSize: 20,
        paddingTop: '3px',
        border: '3px solid',
        backgroundColor: 'rgba(7,149,66,0.12)',
        borderRadius: '5px',
        padding: '10px'

    }
    
    if (message === null) {
      return null
    }
  
    return (
      <div style= {notificationStyle}>
        {message}

      </div>
    )
  }


  export default Notification