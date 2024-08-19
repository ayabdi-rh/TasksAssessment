import { FormEvent, useState } from "react";
import { useSignup } from "../api/auth";
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { mutate: signup } = useSignup();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
      isValid = false;
    } else {
      newErrors.firstName = "";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    } else {
      newErrors.lastName = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      signup(formData);
    }
  };

  const isFormValid = Object.values(formData).every(
    (value) => value.trim() !== ""
  );

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up To Manage Your Tasks
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          action="#"
          method="POST"
          className="space-y-3"
          onSubmit={handleSubmit}
        >
          <Input
            name="email"
            type="email"
            onChange={handleChange}
            required
            label="Email Address"
            autoComplete="email"
            error={errors.email}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          />

          <Input
            name="password"
            type="password"
            onChange={handleChange}
            required
            label="Password"
            autoComplete="current-password"
            error={errors.password}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          />

          <Input
            name="firstName"
            type="firstName"
            onChange={handleChange}
            required
            label="First Name"
            autoComplete="firstName"
            error={errors.firstName}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          />
          <Input
            name="lastName"
            type="lastName"
            onChange={handleChange}
            required
            label="Last Name"
            autoComplete="lastName"
            error={errors.lastName}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          />

          <div>
            <Button type="submit" disabled={!isFormValid} className="mt-10">
              Sign Up
            </Button>
          </div>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            onClick={() => navigate("/login")}
            className="font-semibold leading-6 text-orange-600 hover:text-orange-500 hover:underline cursor-pointer"
          >
            Login Here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
