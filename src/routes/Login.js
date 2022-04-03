import { useState } from "react";
import styled from "styled-components";

import Grid from "../elements/Grid";
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  //로그인 버튼 클릭 시 쿠키 생성 함수
  const login = () => {
    setCookie("user_id", "haha", 3);
    setCookie("user_pwd", "pppp", 3);
  };

  return (
    <>
      <Grid padding="16px">
        <H1>Login</H1>

        <Grid is_flex padding="16px px">
          <Form>
            {/* input 박스의 required는 서버로 제출되기 전 반드시 채워져 있어야 하는 입력 필드를 명시한다. */}
            {/* <form> 태그 내에 입력된 데이터를 서버로 전달 */}
            {/* input 태그 내 value는 여러가지 사용법이 있는데 서버에 제출용으로도 쓴다. 지금은 useState에서 정의한 이메일,PWD를 보내는 용도 */}
            <Label>아이디</Label>
            <Input
              type="email"
              placeholder="Email"
              required
              value={id}
              onChange={(e) => {
                setId(e.target.value);
              }}
            ></Input>
            <Label>비밀번호</Label>
            <Input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Input>
          </Form>
        </Grid>
        <Button onClick={login}>로그인 하기</Button>
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
