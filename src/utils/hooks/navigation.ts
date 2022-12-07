import { RouteParamList } from '@navigation';
import { useNavigationState } from '@react-navigation/native';

export const useNavigationPersistence = () => {
  const state = useNavigationState<RouteParamList, any>((s) => s);
  console.log(state);
};
