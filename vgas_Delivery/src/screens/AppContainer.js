import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { getListFetchLanguageDetails, getListFetchLanguageType, getListFetchLocale } from '../store/accLanguages/thunk'

import { colors } from '../themes';
import { MainStackNavigator } from './navigation/StackNavigator';

const AppContainer = () => {
  const dispatch = useDispatch();

  const {
    languageTypes,
    languageDetails,
  } = useSelector(state => state.Language);

  // useEffect(() => {
  //   dispatch(getListFetchLocale());
  //   dispatch(getListFetchLanguageType());
  //   dispatch(getListFetchLanguageDetails());
  // }, [dispatch]);


  // if (languageDetails === null || languageTypes === null) {
  //   return (
  //     <View style={styles.noLanguages}>
  //       <ActivityIndicator color={colors.red} size="large" />
  //     </View>
  //   );
  // }

  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  noLanguages: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default AppContainer;
