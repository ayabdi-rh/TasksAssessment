import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./pages/Login";
import { useGetUser } from "./api/auth";
import { UserType } from "./dto/user.dto";

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
      navigate("/signup");
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  return null;
};

const AppContent = () => {
  const { data: user } = useGetUser();
  return (
    <>
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login />} />
          </>
        ) : (
          <></>
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
