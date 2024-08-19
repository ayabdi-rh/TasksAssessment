import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import { useGetUser } from "./api/auth";
import { UserType } from "./dto/user.dto";
import Tasks from "./pages/Tasks";
import SignUp from "./pages/Signup";

const queryClient = new QueryClient();

const Application = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router basename="/" key="routerKey">
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
};

const RedirectToAppropriatePage = ({ user }: { user?: UserType }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      navigate("/tasks");
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  return null;
};

const AppContent = () => {
  const { data: user, isLoading } = useGetUser();
  return (
    <>
      <Routes>
        {!user && !isLoading ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp/>} />
          </>
        ) : (
          <>
            <Route path="/tasks" element={<Tasks />} />
          </>
        )}
        <Route path="/" element={<RedirectToAppropriatePage user={user} />} />
        <Route path="*" element={<RedirectToAppropriatePage user={user} />} />
      </Routes>

      <ToastContainer
        position="top-right"
        className="z-[1000000]"
        closeOnClick={false}
      />
    </>
  );
};

export default Application;
