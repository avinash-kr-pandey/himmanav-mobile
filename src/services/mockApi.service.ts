// services/mockApi.service.ts
// ✅ YAHI EK FILE HAI JISE BAAD MEIN DELETE KARNA HAI

const MOCK_DELAY = 800; // Simulate network delay

// Mock user data
const mockUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@gmail.com",
    mobile_number: "9876543210",
    user_type: "admin",
    companies: [{ company_slug: "test-company" }],
    password: "123456",
  },
  {
    id: "2",
    name: "Employee User",
    email: "employee@gmail.com",
    mobile_number: "9876543211",
    user_type: "employee",
    companies: [{ company_slug: "test-company" }],
    password: "123456",
  },
];

class MockApiService {
  // Mock POST requests
  async post(url: string, data?: any, config?: any) {
    await this.delay();

    console.log(`Mock API POST Call: ${url}`, data);

    // Login endpoint
    if (url === "/auth/login") {
      const user = mockUsers.find(
        (u) => u.email === data?.email && u.password === data?.password,
      );

      if (user) {
        const { password, ...userWithoutPassword } = user;
        return {
          data: {
            success: true,
            message: "Login successful",
            token: `mock-jwt-token-${Date.now()}`,
            user: userWithoutPassword,
          },
        };
      } else {
        throw {
          response: {
            status: 401,
            data: { message: "Invalid email or password" },
          },
        };
      }
    }

    // Register endpoint
    if (url === "/auth/register") {
      const existingUser = mockUsers.find((u) => u.email === data?.email);
      if (existingUser) {
        throw {
          response: {
            status: 409,
            data: { message: "User already exists" },
          },
        };
      }

      // ✅ Fix: Add companies array to new user
      const newUser = {
        id: String(mockUsers.length + 1),
        name: data?.name,
        email: data?.email,
        mobile_number: data?.mobile_number,
        user_type: "employee",
        companies: [{ company_slug: "test-company" }], // ✅ Added missing companies
        password: data?.password,
      };

      mockUsers.push(newUser);
      const { password, ...userWithoutPassword } = newUser;

      return {
        data: {
          success: true,
          message: "Registration successful",
          token: `mock-jwt-token-${Date.now()}`,
          user: userWithoutPassword,
        },
      };
    }

    // Forgot Password endpoint
    if (url === "/auth/forgot-password") {
      const user = mockUsers.find((u) => u.email === data?.email);
      if (!user) {
        throw {
          response: {
            status: 404,
            data: { message: "Email not found" },
          },
        };
      }

      return {
        data: {
          success: true,
          message: "Password reset link sent to your email",
        },
      };
    }

    // Logout endpoint
    if (url === "/auth/logout") {
      return {
        data: {
          success: true,
          message: "Logged out successfully",
        },
      };
    }

    // Default response
    return {
      data: {
        success: true,
        message: "Mock API response",
      },
    };
  }

  // Mock GET requests
  async get(url: string, config?: any) {
    await this.delay();

    console.log(`Mock API GET Call: ${url}`);

    if (url === "/user/profile") {
      return {
        data: {
          success: true,
          data: {
            id: "1",
            name: "Admin User",
            email: "admin@gmail.com",
            mobile_number: "9876543210",
          },
        },
      };
    }

    if (url === "/companies") {
      return {
        data: {
          success: true,
          data: [
            { id: "1", name: "Test Company 1", slug: "test-company-1" },
            { id: "2", name: "Test Company 2", slug: "test-company-2" },
          ],
        },
      };
    }

    return {
      data: {
        success: true,
        data: null,
      },
    };
  }

  // Mock PUT requests
  async put(url: string, data?: any, config?: any) {
    await this.delay();
    console.log(`Mock API PUT Call: ${url}`, data);
    return {
      data: {
        success: true,
        message: "Updated successfully",
        data: data,
      },
    };
  }

  // Mock DELETE requests
  async delete(url: string, config?: any) {
    await this.delay();
    console.log(`Mock API DELETE Call: ${url}`);
    return {
      data: {
        success: true,
        message: "Deleted successfully",
      },
    };
  }

  // Helper method for delay
  private delay() {
    return new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  }
}

export const mockApi = new MockApiService();
