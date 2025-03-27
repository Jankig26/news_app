import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/components/navigation/DrawerNavigator";
import { Provider } from "react-redux";
import { store } from "./src/components/redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
