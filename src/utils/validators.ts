export const validators = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  password: (password: string): boolean => {
    return password.length >= 6;
  },
  
  name: (name: string): boolean => {
    return name.length >= 2 && name.length <= 50;
  },
  
  phone: (phone: string): boolean => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  },
};