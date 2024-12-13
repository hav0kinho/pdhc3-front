import AppNavigation from "./src/navigation/AppNavigator";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
      <Toast />
    </Provider>
  );
}
