import { StoreProvider, rootStore } from "@/src/root-store";
import { NavigationContainer } from '@react-navigation/native';
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import RootRoute from "./src/navigations/app";
import store from "./src/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <StoreProvider value={rootStore}>
        <NavigationContainer>
          <RootRoute />
        </NavigationContainer>
        <Toast position="top" bottomOffset={50} visibilityTime={2000}/>
      </StoreProvider>
    </Provider>
  );
}

