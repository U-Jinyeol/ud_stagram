import { useState } from "react";
//firebase.js에서 임포트하고 선언해준 auth를 가져옴
import { authService } from "./firebase";
import Header from "../components/Header";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "../routes/Login";
import Home from "../routes/Home";

//리덕스에서 히스토리를 사용하게끔 하기위한 작업?
//원래는 BrowserRouter가 들어가지만 바꿔준다.
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

function App() {
  //로그인과 로그인 아닐 시의 화면을 보여주기 위해 로그인 상태를 나타내는 state 값 생성
  //초기값은 false로 로그인 안하고 있도록 설정
  //firerbase에서 auth의 기능 중 하나인 currentUser는 로그인 여부를 판단해준다.
  const [isLogin, setIsLogin] = useState(authService.currentUser);

  return (
    <>
      <Header></Header>
      <ConnectedRouter history={history}>
        <Switch>
          {isLogin ? (
            <Route exact path="/" component={Home}></Route>
          ) : (
            <Route exact path="/" component={Login}></Route>
          )}
        </Switch>
      </ConnectedRouter>
    </>
  );
}

export default App;
