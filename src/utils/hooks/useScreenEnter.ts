import { DependencyList, EffectCallback, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export const useScreenEnter = (effect: EffectCallback, deps: DependencyList) => {
  useFocusEffect(useCallback(effect, deps));
};
