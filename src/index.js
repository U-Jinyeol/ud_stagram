import React from "react";
import ReactDOM from "react-dom";
import App from "./shared/App";
import { Provider } from "react-redux";
import store from "./redux/configureStore";

//스토어를 컴포넌트에 주입! 할 때는 provider라는 것을 쓰고
//store를 값으로 삽입해준다

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
