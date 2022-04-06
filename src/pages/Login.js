import { useState } from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { actionCreators } from "../redux/modules/user";

import Grid from "../elements/Grid";
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";

import { authService } from "../shared/firebase";

import { emailCheck } from "../shared/common";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const login = () => {
    if (id === "" || password === "") {
      window.alert("아이디 혹은 비밀번호가 공란입니다.");
      return;
    }

    if (!emailCheck(id)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }

    dispatch(actionCreators.loginFB(id, password));
  };

  return (
    <>
      <Grid padding="16px">
        <H1>Login</H1>

        <Grid is_flex padding="16px">
          <Form>
            {/* input 박스의 required는 서버로 제출되기 전 반드시 채워져 있어야 하는 입력 필드를 명시한다. */}
            {/* <form> 태그 내에 입력된 데이터를 서버로 전달 */}
            {/* input 태그 내 value는 여러가지 사용법이 있는데 서버에 제출용으로도 쓴다. 지금은 useState에서 정의한 이메일,PWD를 보내는 용도 */}
            <Label>아이디</Label>
            <Input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => {
                setId(e.target.value);
              }}
            ></Input>
            <Label>비밀번호</Label>
            <Input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Input>
          </Form>
        </Grid>
        <Button
          onClick={() => {
            console.log("로그인했어");
            login();
          }}
        >
          로그인 하기
        </Button>
      </Grid>
    </>
  );
};

const Form = styled.form`
  display: inline-block;
  width: 300px;
`;

const Input = styled.input`
  display: block;
  max-width: 300px;
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  margin: 5px auto 5px auto;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  display: block;
  max-width: 300px;
  width: 100%;
  height: 30px;
  border: 0;
  margin: 10px auto 10px auto;
  box-sizing: border-box;
  :hover {
    border: 1px solid #ddd;
    box-shadow: 0px 0px 4px gray;
    font-weight: 800;
  }
  cursor: pointer;
`;

const H1 = styled.h1`
  text-align: center;
`;

const Label = styled.label`
  display: block;
  text-align: left;
  font-size: 10px;
  margin-bottom: 0px;
`;

export default Login;
