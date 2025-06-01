import { useState, useCallback } from 'react'

export const useDeleteConfirmation = (onDelete: () => void) => {
  const [isConfirming, setIsConfirming] = useState(false)

  const handleDeleteClick = useCallback(() => {
    if (!isConfirming) {
      setIsConfirming(true)
      // Reset confirmation state after 2 seconds
      setTimeout(() => {
        setIsConfirming(false)
      }, 2000)
    } else {
      onDelete()
      setIsConfirming(false)
    }
  }, [isConfirming, onDelete])

  return {
    isConfirming,
    handleDeleteClick,
  }
}
