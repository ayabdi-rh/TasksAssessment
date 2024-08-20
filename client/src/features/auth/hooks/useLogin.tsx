import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../api/auth";

export const useLogin = () => {
  const { mutate: logIn, isPending } = useLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    logIn(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isFormValid = Object.values(formData).every(
    (value) => value.trim() !== ""
  );

  return {
    navigate,
    handleChange,
    handleLogin,
    isFormValid,
    isLoading: isPending
  };
};
