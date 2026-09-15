function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-600/20 mb-2">
          <svg className="w-8 h-8 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Enterprise TaskFlow
        </h1>
        <p className="text-surface-400 text-sm">
          Setup concluído com sucesso — pronto para o próximo passo.
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-surface-500 pt-2">
          <span className="inline-block w-2 h-2 rounded-full bg-success-500 animate-pulse" />
          React + TypeScript + Vite + Tailwind CSS v4
        </div>
      </div>
    </div>
  )
}

export default App
