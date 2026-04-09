import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation, DrawerActions } from '@react-navigation/native';


type RootDrawerParamList = {
  MainTabs: undefined;
  settings: undefined;
  home: undefined;
  explore: undefined;
  profile: undefined;
};

export const useDrawerNavigation = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  
  const closeDrawer = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };
  
  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };
  
  return {
    navigation,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  };
};