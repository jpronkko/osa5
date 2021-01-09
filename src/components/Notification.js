import React, { useState, useImperativeHandle } from 'react'

const Notification = React.forwardRef((_props, ref)  => {
  const [isVisible, setVisible] = useState(false)
  const [message, setMessage] = useState({ text: '', isError: true })
  const msgTime = 4000

  const show = (message, isError) => {
    setMessage( { text: message, isError: isError } )
    setVisible( true )
    setTimeout(() => {
      setVisible(false)
    }, msgTime)
  }

  useImperativeHandle(ref, () => {
    return {
      show
    }
  })

  const errorStyle = {
    backgroundColor: 'yellow',
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 10,
    borderRadius: 10
  }

  const normalStyle = {
    borderColor: 'green',
    borderStyle: 'solid',
    borderWidth: 10,
    borderRadius: 10
  }

  if(isVisible) {
    return (
      <div id='notification' style={ message.isError ? errorStyle : normalStyle }>
        <p>{ message.text }</p>
      </div>
    )}
  else {
    return null
  }
})

Notification.displayName = 'Notification'
export default Notification