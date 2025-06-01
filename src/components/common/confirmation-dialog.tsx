import { useEffect } from "react"

interface ConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description?: string
}

export default function ConfirmationDialog({
                                             isOpen,
                                             onClose,
                                             onConfirm,
                                             title,
                                             description,
                                           }: ConfirmationDialogProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", onKeyDown)
    } else {
      document.removeEventListener("keydown", onKeyDown)
    }

    return () => document.removeEventListener("keydown", onKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-xl w-full max-w-sm p-6 text-white">
        {/* Title */}
        <h2 id="confirm-title" className="text-lg font-semibold mb-2">
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p className="text-sm text-slate-400 mb-6">{description}</p>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-slate-600 text-slate-300 hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
