import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store'
import SearchScreen from './src/screens/SearchScreen';

const App = () => (
  <Provider store={store}>
    <SearchScreen />
  </Provider>
);

export default App;
