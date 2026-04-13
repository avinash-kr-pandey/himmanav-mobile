// store/slices/authApi.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseApi } from "./baseApi";

// Helper function for safe AsyncStorage operations
const safeSetItem = async (key: string, value: string) => {
  try {
    if (AsyncStorage) {
      await AsyncStorage.setItem(key, value);
      return true;
    }
    console.warn(`AsyncStorage not available, cannot set ${key}`);
    return false;
  } catch (error) {
    console.error(`Error setting ${key}:`, error);
    return false;
  }
};

const safeRemoveItem = async (key: string) => {
  try {
    if (AsyncStorage) {
      await AsyncStorage.removeItem(key);
      return true;
    }
    console.warn(`AsyncStorage not available, cannot remove ${key}`);
    return false;
  } catch (error) {
    console.error(`Error removing ${key}:`, error);
    return false;
  }
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch Profile - GET user/profile
    fetchProfile: builder.query<any, void>({
      query: () => ({
        url: "user/profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    // Login - POST c-login
    login: builder.mutation<
      {
        access_token: string;
        user: any;
        message: string;
        error: string;
        expires_in: number;
      },
      { number: string; password: string; fcm_token?: string }
    >({
      query: (credentials) => ({
        url: "c-login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.access_token) {
            await safeSetItem("auth_token", data.access_token);
            if (data.user) {
              await safeSetItem("user_data", JSON.stringify(data.user));
            }
          }
        } catch (error) {
          console.error("Login error:", error);
        }
      },
      invalidatesTags: ["Profile"],
    }),

    // Register - POST register
    register: builder.mutation<
      { message: string; user?: any; success?: boolean },
      {
        name: string;
        mobile_number: string;
        email?: string;
        password: string;
        password_confirmation: string;
      }
    >({
      query: (userData) => ({
        url: "register",
        method: "POST",
        body: userData,
      }),
    }),

    // Logout - POST logout
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          await safeRemoveItem("auth_token");
          await safeRemoveItem("user_data");
        } catch (error) {
          console.error("Logout error:", error);
        }
      },
      invalidatesTags: ["Profile"],
    }),

    // Forgot Password - POST password/forgot
    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (data) => ({
        url: "password/forgot",
        method: "POST",
        body: data,
      }),
    }),

    // Verify OTP - POST password/verify-otp
    verifyOtp: builder.mutation<
      { message: string; success: boolean },
      {
        email: string;
        otp: string;
        password: string;
        password_confirmation: string;
      }
    >({
      query: (data) => ({
        url: "password/verify-otp",
        method: "POST",
        body: data,
      }),
    }),

    // Reset Password - POST password/reset
    resetPassword: builder.mutation<
      { message: string; success: boolean },
      {
        email: string;
        otp: string;
        password: string;
        password_confirmation: string;
      }
    >({
      query: (data) => ({
        url: "password/reset",
        method: "POST",
        body: data,
      }),
    }),

    // Change Password - POST password/change
    changePassword: builder.mutation<
      { success: boolean; message: string },
      {
        oldPassword: string;
        newPassword: string;
        logout_from_everywhere?: number;
      }
    >({
      query: (data) => ({
        url: "password/change",
        method: "POST",
        body: {
          old_password: data.oldPassword,
          new_password: data.newPassword,
          logout_from_everywhere: data.logout_from_everywhere || 0,
        },
      }),
    }),

    // Fetch My Companies - GET my-companies
    fetchMyCompanies: builder.query<any, void>({
      query: () => ({
        url: "my-companies",
        method: "GET",
      }),
      providesTags: ["Company"],
    }),

    // Select Company - POST selectedCompanies/{id}
    selectedCompany: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `selectedCompanies/${id}`,
        method: "POST",
      }),
    }),

    // Fetch Selected Company - GET selectedCompanies
    fetchSelectedCompany: builder.query<any, void>({
      query: () => ({
        url: "selectedCompanies",
        method: "GET",
      }),
      providesTags: ["Company"],
    }),

    // Admin Register - POST register-admin
    adminRegister: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "register-admin",
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: ["Profile"],
    }),

    // Send Admin OTP - POST send-admin-otp
    sendAdminOtp: builder.mutation<{ request_id: string }, { number: string }>({
      query: (otp) => ({
        url: "send-admin-otp",
        method: "POST",
        body: otp,
      }),
    }),

    // Fetch Login Sessions - GET login-sessions
    fetchLoginSessions: builder.query<any, void>({
      query: () => ({
        url: "login-sessions",
        method: "GET",
      }),
      providesTags: ["Session"],
    }),

    // Fetch Users - GET users
    fetchUsers: builder.query<any, void>({
      query: () => ({
        url: "users",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // Create User - POST users
    createUser: builder.mutation<any, any>({
      query: (newUser) => ({
        url: "users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),

    // Delete User - DELETE users/{id}
    deleteUser: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    // Update User - POST update-profile/{id}
    updateUser: builder.mutation<any, { id: number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `update-profile/${id}`,
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: ["Profile"],
    }),

    // Fetch Packages Plans - GET all-packages
    fetchPackagesPlans: builder.query<any, void>({
      query: () => ({
        url: "all-packages",
        method: "GET",
      }),
      providesTags: ["Package"],
    }),

    // Fetch Single Package Plan - GET all-packages/{id}
    fetchSinglePackagePlan: builder.query<any, number | null>({
      query: (id) => ({
        url: `all-packages/${id}`,
        method: "GET",
      }),
      providesTags: ["Package"],
    }),

    // Fetch Packages - GET packages
    fetchPackages: builder.query<any, void>({
      query: () => ({
        url: "packages",
        method: "GET",
      }),
      providesTags: ["Package"],
    }),

    // Fetch Business Categories - GET all-business-categories
    fetchBusinessCategories: builder.query<any[], void>({
      query: () => ({
        url: "all-business-categories",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    // Update Profile Image - POST update-profile-image
    updateProfileImage: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "update-profile-image",
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

// Export hooks
export const {
  useFetchProfileQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useFetchMyCompaniesQuery,
  useSelectedCompanyMutation,
  useFetchSelectedCompanyQuery,
  useAdminRegisterMutation,
  useSendAdminOtpMutation,
  useFetchLoginSessionsQuery,
  useFetchUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useFetchPackagesPlansQuery,
  useFetchSinglePackagePlanQuery,
  useFetchPackagesQuery,
  useFetchBusinessCategoriesQuery,
  useUpdateProfileImageMutation,
} = authApi;

export default authApi;
