export const ROUTES = {
  AUTH: {
    LOGIN: 'Login',
    REGISTER: 'Register',
    FORGOT_PASSWORD: 'ForgotPassword',
  },
  MAIN: {
    HOME: 'Home',
    EXPLORE: 'Explore',
    PROFILE: 'Profile',
  },
  TAB: {
    HOME_TAB: 'HomeTab',
    EXPLORE_TAB: 'ExploreTab',
    PROFILE_TAB: 'ProfileTab',
  },
} as const;

export type RootStackParamList = {
  [ROUTES.AUTH.LOGIN]: undefined;
  [ROUTES.AUTH.REGISTER]: undefined;
  [ROUTES.MAIN.HOME]: undefined;
  [ROUTES.MAIN.EXPLORE]: undefined;
  [ROUTES.MAIN.PROFILE]: undefined;
};