import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ROUTES } from "../constants/navigation";

export type RootStackParamList = {
  [ROUTES.AUTH.LOGIN]: undefined;
  [ROUTES.AUTH.REGISTER]: undefined;
  [ROUTES.MAIN.HOME]: undefined;
  [ROUTES.MAIN.EXPLORE]: undefined;
  [ROUTES.MAIN.PROFILE]: { userId?: string };
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof ROUTES.AUTH.LOGIN
>;
export type ProfileScreenRouteProp = RouteProp<
  RootStackParamList,
  typeof ROUTES.MAIN.PROFILE
>;
