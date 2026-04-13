// store/slices/profileApi.ts
import { baseApi } from "./baseApi";

export interface User {
  id: number;
  name: string;
  email: string;
  number?: string;
  phone?: string;
  user_type: string;
  profile_image?: string | null;
  uid?: string;
  email_verified_at?: string | null;
  created_at?: string;
  address?: string;
  company?: string;
  location?: string;
}

export interface Session {
  token_id: string;
  ip_address: string;
  location: string;
  created_at: string;
  last_used_at: string;
}

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get Profile - GET /user/profile
    getProfile: builder.query<User, void>({
      query: () => "/user/profile",
      providesTags: ["Profile"],
      transformResponse: (response: any) => response.user || response,
    }),

    // Update Profile - POST /user/{id}
    updateProfile: builder.mutation<User, { id: number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/user/${id}`,
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: ["Profile"],
    }),

    // Get Login Sessions - GET /login-sessions
    getLoginSessions: builder.query<
      { total_logins: number; sessions: Session[] },
      void
    >({
      query: () => "/login-sessions",
      providesTags: ["Session"],
    }),

    // ❌ REMOVE this entire changePassword endpoint (already in authApi.ts)
    // changePassword: builder.mutation<...>({...}),

    // Send Email OTP - POST /send-email-verification-otp
    sendEmailVerificationOtp: builder.mutation<
      { success: boolean; message: string },
      { email: string }
    >({
      query: (data) => ({
        url: "/send-email-verification-otp",
        method: "POST",
        body: data,
      }),
    }),

    // Verify Email - POST /verify-email
    verifyEmail: builder.mutation<
      { success: boolean; message: string },
      { email: string; otp: string }
    >({
      query: (data) => ({
        url: "/verify-email",
        method: "POST",
        body: data,
      }),
    }),

    // Update Email with OTP - POST /update-email
    updateEmail: builder.mutation<
      { success: boolean; message: string },
      { old_email: string; new_email: string; otp: string }
    >({
      query: (data) => ({
        url: "/update-email",
        method: "POST",
        body: data,
      }),
    }),

    // Send Phone OTP - POST /send-phone-otp
    sendPhoneOtp: builder.mutation<
      { success: boolean; message: string },
      { phone: string }
    >({
      query: (data) => ({
        url: "/send-phone-otp",
        method: "POST",
        body: data,
      }),
    }),

    // Update Phone with OTP - POST /update-phone
    updatePhone: builder.mutation<
      { success: boolean; message: string },
      { old_phone: string; new_phone: string; otp: string }
    >({
      query: (data) => ({
        url: "/update-phone",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Export hooks - Remove useChangePasswordMutation
export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetLoginSessionsQuery,
  // useChangePasswordMutation, // ❌ Remove this
  useSendEmailVerificationOtpMutation,
  useVerifyEmailMutation,
  useUpdateEmailMutation,
  useSendPhoneOtpMutation,
  useUpdatePhoneMutation,
} = profileApi;
