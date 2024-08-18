import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { axiosPrivate, axiosPublic } from ".";
import { UserSchema, UserType } from "../dto/user.dto";

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
  }) as UseQueryResult<UserType>;
};

const authenticationAPI = {
  getUser: async () => {
    const { data } = await axiosPrivate.get("/auth/admin/user");
    // return IProfileUser.parse(data)
    return data;
  },
  signUp: async (credentials: Object) => {
    return await axiosPublic.post("/auth/signup", credentials);
  },
  logIn: async (credentials: Object) => {
    return await axiosPublic.post("/auth/login", credentials, {
      withCredentials: true,
    });
  },
  forgotPassword: async (credentials: Object) => {
    return await axiosPublic.post("/auth/forgot-password", credentials);
  },

  resetPassword: async (credentials: Object) => {
    return await axiosPublic.post("/auth/reset-password", credentials);
  },
};

export default authenticationAPI;
