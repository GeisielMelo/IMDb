import React, { useEffect, useState } from 'react'

type Severity = 'info' | 'warning' | 'error'

export const useDisplayAlert = () => {
  const [showAlert, setShowAlert] = useState(false)
  const [message, setMessage] = useState<string>('')
  const [severity, setSeverity] = useState<Severity>('info')

  useEffect(() => {
    if (showAlert) {
      const timeoutId = setTimeout(() => {
        setShowAlert(false)
        setMessage('')
        setSeverity('info')
      }, 3000)

      return () => clearTimeout(timeoutId)
    }
  }, [showAlert])

  const displayAlert = (msg: string, severity: Severity) => {
    setMessage(msg)
    setSeverity(severity)
    setShowAlert(true)
  }

  const Alert: React.FC = () => {
    let type
    switch (severity) {
      case 'error':
        type = 'px-2 py-2 rounded shadow bg-[rgb(211,47,47)]'
        break
      case 'warning':
        type = 'px-2 py-2 rounded shadow bg-[rgb(245,124,0)]'
        break
      default:
        type = 'px-2 py-2 rounded shadow bg-[rgb(2,136,209)]'
        break
    }

    return showAlert ? (
      <div className='fixed bottom-40 w-full flex justify-center px-8 text-white z-50'>
        <h1 className={type}>{message}</h1>
      </div>
    ) : null
  }

  return { Alert, displayAlert }
}
