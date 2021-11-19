import React from "react";
import { Provider } from "react-redux";
import "./App.scss";
import "./assets/styles/index.scss";
import Home from "./pages/home";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Home />
      </div>
    </Provider>
  );
}

export default App;
