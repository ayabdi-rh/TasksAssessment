import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { axiosPrivate } from ".";
import { UserSchema, UserType } from "../dto/user.dto";
import { toast } from "react-toastify";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const { data } = await axiosPrivate.get("/auth/me");
        console.log(data);
        return UserSchema.parse(data);
      } catch (error: any) {
        console.log(error.message);
        throw error;
      }
    },
    retry() {
      return false;
    },
  }) as UseQueryResult<UserType>;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      try {
        const { data } = await axiosPrivate.post("/auth/login", payload);
        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Logged In successfully");
      window.location.href = "/";
    },
    onError: (error: any) => {
      toast.error(error.response.data.error);
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: async (payload: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }) => {
      try {
        const { data } = await axiosPrivate.post("/auth/signup", payload);
        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Logged In successfully");
      window.location.href = "/";
    },
    onError: (error: any) => {
      toast.error(error.response.data.error);
    },
  });
};
