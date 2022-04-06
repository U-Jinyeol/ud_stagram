import Grid from "../elements/Grid";
import styled from "styled-components";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import Permit from "../shared/Permit";

const Post = (props) => {
  return (
    <>
      <Grid>
        <Grid is_flex width="400px" margin="0 auto 0 auto">
          <Grid is_flex margin="0 auto 0 0">
            <ProfileImage />
            <p style={{ margin: "0 auto 0 0", fontWeight: "800" }}>U_D</p>
          </Grid>
          <Grid is_flex>
            <p
              style={{
                width: "180px",
                textAlign: "center",
                fontWeight: "800",
              }}
            >
              2021-02-27 10:00:00
            </p>
          </Grid>
        </Grid>
        <Grid is_flex width="400px" margin="0 auto 0 auto">
          <AspectOutter>
            <AspectInner />
          </AspectOutter>
        </Grid>
        <Grid width="400px" margin="0 auto 0 auto">
          <AiOutlineHeart size={25} />
          <AiOutlineComment size={25} />
        </Grid>
        <Grid is_flex width="400px" margin="0 auto 0 auto">
          <p
            style={{
              fontWeight: "800",
              width: "400px",
              margin: "0",
            }}
          >
            "봄바람 휘날리며~" <br />
            #벚꽃 #벚꽃엔딩 #장범준 #벚꽃연금
          </p>
        </Grid>
        <Grid is_flex width="400px" margin="0 auto 0 auto">
          <p
            style={{
              color: "gray",
              fontSize: "14px",
              fontWeight: "600",
              width: "400px",
              margin: "5px 0 0 0",
            }}
          >
            댓글 10개
          </p>
        </Grid>
        <Permit>
          <PostBtn>+</PostBtn>
        </Permit>
      </Grid>
    </>
  );
};

const ProfileImage = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 36px;
  background-image: url("https://item.kakaocdn.net/do/1cda57498b8d6a45129ea2292902819d7154249a3890514a43687a85e6b6cc82");
  background-size: cover;
  margin: 0 10px 0 0;
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

const PostBtn = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  background-color: #8596e5;
  color: white;
  font-weight: 800;
  font-size: 50px;
  line-height: 55px;
  padding: 0;
  cursor: pointer;
  position: fixed;
  border: none;
  right: 250px;
  bottom: 20px;
`;

export default Post;
