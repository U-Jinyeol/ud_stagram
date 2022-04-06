import React from "react";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";

const PostDetail = (props) => {
  return (
    <React.Fragment>
      <CommentWrite />
      <CommentList />
    </React.Fragment>
  );
};

export default PostDetail;
