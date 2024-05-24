import React from "react";
import { AppRoutes } from "../utilities/routes/routes";
import { Provider } from "react-redux";
import store from "../utilities/redux/store";
import GlobalsProvider from "../utilities/globals/GlobalsProvider";

const App = React.memo(() => {
  return <Provider store={store}>
    <GlobalsProvider>
      <AppRoutes />
    </GlobalsProvider>
  </Provider>
})

export default App;