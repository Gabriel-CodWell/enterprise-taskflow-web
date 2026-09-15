import { useState } from 'react'
import type { TaskItem } from '@/types'

// ── Task Card Component ───────────────────────────────────────────────

interface TaskCardProps {
  task: TaskItem
  onComplete: (id: string) => Promise<boolean>
}

export function TaskCard({ task, onComplete }: TaskCardProps) {
  const [isCompleting, setIsCompleting] = useState(false)

  const handleComplete = async () => {
    setIsCompleting(true)
    await onComplete(task.id)
    setIsCompleting(false)
  }

  const formattedDate = new Date(task.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="group bg-surface-900/60 border border-surface-700/40 rounded-xl p-5 hover:border-surface-600/60 transition-all duration-200">
      <div className="flex items-start justify-between gap-4">
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium truncate">
            {task.title}
          </h3>
          {task.description && (
            <p className="text-surface-400 text-sm mt-1.5 line-clamp-2">
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-3 mt-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-surface-500">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formattedDate}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-warning-500/10 text-warning-500 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-warning-500" />
              Pending
            </span>
          </div>
        </div>

        {/* Complete Button */}
        <button
          onClick={handleComplete}
          disabled={isCompleting}
          className="shrink-0 mt-1 w-9 h-9 rounded-lg flex items-center justify-center
                     text-surface-500 hover:text-success-500 hover:bg-success-500/10 
                     border border-transparent hover:border-success-500/20
                     transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          title="Mark as completed"
        >
          {isCompleting ? (
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
