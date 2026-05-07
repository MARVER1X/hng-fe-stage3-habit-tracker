import ProtectedRoute from '@/components/shared/ProtectedRoute';

/**
 * Dashboard Page Route.
 * Protected by authentication wrapper.
 * Complies with Section 10/12 of the TRD.
 */
export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <main 
        className="min-h-screen bg-white flex flex-col items-center p-6"
        data-testid="dashboard-page"
      >
        <div className="w-full max-w-2xl">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">My Habits</h1>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              + New Habit
            </button>
          </header>

          <section className="flex flex-col items-center justify-center py-20 text-center" data-testid="empty-state">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No habits yet</h3>
            <p className="text-gray-500 mt-1">Start your first habit today and build a streak!</p>
          </section>
        </div>
      </main>
    </ProtectedRoute>
  );
}
