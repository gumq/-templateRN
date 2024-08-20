import React from 'react';
import { NotifierWrapper } from 'react-native-notifier';
import { Provider } from 'react-redux';
import { store } from './src/store'
import AppContainer from './src/screens/AppContainer';
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NotifierWrapper>
          <AppContainer />
        </NotifierWrapper>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
