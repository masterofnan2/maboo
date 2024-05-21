import React from "react";
import { AppRoutes } from "../utilities/routes/routes";
import useFonts from "../utilities/hooks/useFonts";
import { Provider } from "react-redux";
import store from "../utilities/redux/store";
import GlobalsProvider from "../utilities/globals/GlobalsProvider";

const App = React.memo(() => {
  useFonts();

  return <Provider store={store}>
    <GlobalsProvider>
      <AppRoutes />
    </GlobalsProvider>
  </Provider>
})

export default App;