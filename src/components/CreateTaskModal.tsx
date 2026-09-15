import { useState, type FormEvent } from 'react'

// ── Create Task Modal ─────────────────────────────────────────────────

interface CreateTaskModalProps {
  isOpen: boolean
  isLoading: boolean
  onClose: () => void
  onSubmit: (title: string, description: string) => void
}

export function CreateTaskModal({ isOpen, isLoading, onClose, onSubmit }: CreateTaskModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit(title.trim(), description.trim())
    setTitle('')
    setDescription('')
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-lg bg-surface-900 border border-surface-700/50 rounded-2xl shadow-2xl shadow-black/30 animate-[slideUp_0.2s_ease-out]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-800">
          <h2 className="text-lg font-semibold text-white">New Task</h2>
          <button
            id="modal-close"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-surface-400 hover:text-white hover:bg-surface-800 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="task-title" className="block text-sm font-medium text-surface-300">
              Title <span className="text-danger-500">*</span>
            </label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Review quarterly logistics report"
              required
              autoFocus
              className="w-full px-4 py-3 rounded-xl bg-surface-800/80 border border-surface-600/50 text-white placeholder-surface-500 
                         outline-none transition-all duration-200
                         focus:border-brand-500/60 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="task-description" className="block text-sm font-medium text-surface-300">
              Description <span className="text-surface-500">(optional)</span>
            </label>
            <textarea
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details about this task..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-surface-800/80 border border-surface-600/50 text-white placeholder-surface-500 
                         outline-none transition-all duration-200 resize-none
                         focus:border-brand-500/60 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              id="modal-cancel"
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-surface-400 hover:text-white hover:bg-surface-800 transition-all duration-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              id="modal-submit"
              type="submit"
              disabled={isLoading || !title.trim()}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200
                         bg-brand-600 hover:bg-brand-500 active:scale-[0.98]
                         disabled:opacity-50 disabled:cursor-not-allowed
                         shadow-lg shadow-brand-600/25 cursor-pointer"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating...
                </span>
              ) : (
                'Create Task'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
