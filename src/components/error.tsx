type ErrorProps = {
  message: string
  onDissmis?: () => void
}

export const Error = ({ message, onDissmis: onDismiss }: ErrorProps) => {
  return (
    <div className="error-message">
      <div className="error-content">
        <span className="error-icon">!</span>
        <span>{message}</span>
      </div>
      {onDismiss && (
        <button className="error-dismiss" onClick={onDismiss}>
          Dismiss
        </button>
      )}
    </div>
  )
}
