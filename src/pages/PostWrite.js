import React from "react";
import Grid from "../elements/Grid";
import styled from "styled-components";
import Upload from "../shared/Upload";

const PostWrite = (props) => {
  return (
    <>
      <Grid padding="16px">
        <Grid is_flex width="400px" margin="0 auto 10px auto">
          <H1>게시글 작성</H1>
        </Grid>
        <Grid is_flex width="400px" margin="0 auto 0 auto">
          <Upload
            style={{
              width: "400px",
              margin: "15px 0 0 0",
              fontWeight: "800",
              textAlign: "left",
            }}
          ></Upload>
        </Grid>
        <Grid is_flex width="400px" margin="0 auto 0 auto">
          <h5
            style={{
              width: "400px",
              margin: "15px 0 0 0",
              fontWeight: "800",
              textAlign: "left",
            }}
          >
            미리보기
          </h5>
        </Grid>
        <Grid is_flex width="400px" margin="0 auto 0 auto">
          <AspectOutter>
            <AspectInner />
          </AspectOutter>
        </Grid>
        <Grid is_flex width="400px" margin="0 auto 0 auto">
          <h5
            style={{
              width: "400px",
              margin: "15px 0 0 0",
              fontWeight: "800",
              textAlign: "left",
            }}
          >
            게시글 내용
          </h5>
        </Grid>
        <Grid is_flex width="400px" margin="0 auto 0 auto">
          <Textbox
            rows={10}
            placeholder="내용을 입력하세요"
            onChange={() => {}}
          />
        </Grid>
      </Grid>
    </>
  );
};

const H1 = styled.h1`
  text-align: center;
  font-size: 20px;
  width: 400px;
  margin: 15px 0 0 0;
  font-weight: 800;
  text-align: left;
`;

const AspectOutter = styled.div`
  width: 400px;
  min-width: 250px;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url("https://image.ytn.co.kr/general/jpg/2022/0327/202203272117137188_t.jpg");
  background-size: cover;
`;

const Textbox = styled.textarea`
  min-width: 400px;
  width: 100%;
  margin: 0 auto 0 auto;
  min-height: 150px;
`;

export default PostWrite;
