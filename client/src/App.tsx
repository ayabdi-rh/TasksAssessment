import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './features/auth/pages/Login'
import { useGetUser } from './features/auth/api/auth'
import { UserType } from './features/auth/dto/user.dto'
import Tasks from './features/tasks/pages/Tasks'
import SignUp from './features/auth/pages/Signup'

const queryClient = new QueryClient()

const Application = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router basename="/" key="routerKey">
        <AppContent />
      </Router>
    </QueryClientProvider>
  )
}

// RedirectToAppropriatePage component: Handles redirection based on user authentication status
const RedirectToAppropriatePage = ({ user }: { user?: UserType }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/tasks') // Redirect to tasks page if user is authenticated
    } else {
      navigate('/login') // Redirect to login page if user is not authenticated
    }
  }, [user, navigate])

  return null
}

// AppContent component: Manages the main content and routing of the application
const AppContent = () => {
  const { data: user, isLoading } = useGetUser() // Fetch user data
  return (
    <>
      <Routes>
        {!user && !isLoading ? (
          <>
            {/* Routes for unauthenticated users */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        ) : (
          <>
            {/* Routes for authenticated users */}
            <Route path="/tasks" element={<Tasks />} />
          </>
        )}
        {/* Default routes for redirection */}
        <Route path="/" element={<RedirectToAppropriatePage user={user} />} />
        <Route path="*" element={<RedirectToAppropriatePage user={user} />} />
      </Routes>

      {/* Toast container for notifications */}
      <ToastContainer position="top-right" className="z-[1000000]" closeOnClick={false} />
    </>
  )
}

export default Application
