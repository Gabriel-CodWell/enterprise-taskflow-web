import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/useAuthStore'
import { useTaskStore } from '@/stores/useTaskStore'
import { TaskCard } from '@/components/TaskCard'
import { CreateTaskModal } from '@/components/CreateTaskModal'

// ── Dashboard Page ────────────────────────────────────────────────────

export function DashboardPage() {
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)
  const { tasks, isLoading, error, fetchPendingTasks, createTask, completeTask } = useTaskStore()

  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  // Fetch tasks on mount
  useEffect(() => {
    fetchPendingTasks()
  }, [fetchPendingTasks])

  // Filter tasks by search query
  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return tasks

    const query = searchQuery.toLowerCase()
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query),
    )
  }, [tasks, searchQuery])

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const handleCreateTask = async (title: string, description: string) => {
    setIsCreating(true)
    const success = await createTask({
      title,
      description: description || undefined,
    })
    setIsCreating(false)

    if (success) {
      setIsModalOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface-950">
      {/* ── Header ───────────────────────────────────────────────── */}
      <header className="border-b border-surface-800 bg-surface-900/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-600/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h1 className="text-lg font-semibold text-white">TaskFlow</h1>
          </div>

          <button
            id="logout-button"
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg text-sm font-medium text-surface-400 
                       hover:text-white hover:bg-surface-800 transition-all duration-200 cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Pending Tasks</h2>
            <p className="text-surface-400 text-sm mt-1">
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} awaiting completion
            </p>
          </div>

          <button
            id="create-task-button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white
                       bg-brand-600 hover:bg-brand-500 active:scale-[0.98] transition-all duration-200
                       shadow-lg shadow-brand-600/25 hover:shadow-brand-500/30 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Task
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            id="search-tasks"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks by title or description..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-surface-900/60 border border-surface-700/40 text-white placeholder-surface-500
                       outline-none transition-all duration-200
                       focus:border-brand-500/60 focus:ring-2 focus:ring-brand-500/20"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md flex items-center justify-center text-surface-500 hover:text-white hover:bg-surface-700 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-danger-500/10 border border-danger-500/20 text-danger-500 text-sm mb-6">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <span>{error}</span>
            <button
              onClick={fetchPendingTasks}
              className="ml-auto text-xs font-medium underline hover:text-danger-400 transition-colors cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* ── Task List ──────────────────────────────────────────── */}
        {isLoading ? (
          // Loading skeleton
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-surface-900/60 border border-surface-700/40 rounded-xl p-5 animate-pulse">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-surface-700/50 rounded-lg w-2/3" />
                    <div className="h-4 bg-surface-700/30 rounded-lg w-1/2" />
                    <div className="flex gap-3">
                      <div className="h-4 bg-surface-700/30 rounded-md w-28" />
                      <div className="h-4 bg-surface-700/30 rounded-md w-16" />
                    </div>
                  </div>
                  <div className="w-9 h-9 bg-surface-700/30 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredTasks.length > 0 ? (
          // Task cards
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} onComplete={completeTask} />
            ))}
          </div>
        ) : tasks.length > 0 && searchQuery ? (
          // No search results
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 rounded-2xl bg-surface-800 flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h3 className="text-white font-medium">No results found</h3>
            <p className="text-surface-500 text-sm mt-1">
              No tasks match "<span className="text-surface-300">{searchQuery}</span>"
            </p>
          </div>
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-success-500/10 border border-success-500/20 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-white font-medium text-lg">All caught up!</h3>
            <p className="text-surface-500 text-sm mt-1 max-w-sm">
              There are no pending tasks at the moment. Create a new one to get started.
            </p>
          </div>
        )}
      </main>

      {/* ── Create Task Modal ────────────────────────────────────── */}
      <CreateTaskModal
        isOpen={isModalOpen}
        isLoading={isCreating}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTask}
      />
    </div>
  )
}
