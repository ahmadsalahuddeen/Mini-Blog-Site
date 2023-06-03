import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

function PostList() {
  const [posts, setPosts] = useState({});

  const getPost = async () => {
    await axios.get("http://localhost:4003/posts").then((res) => {
      setPosts(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    getPost();
  }, []);

  const renderPosts = Object.values(posts).map((post) => {
    return (
      <>
        <div
          key={post.id}
          className="card"
          style={{ width: "30%", marginBottom: "20px" }}
        >
          <div className="card-body">
            <h3>{post.title}</h3>
            <CommentList comments={post.comments} />
            <CommentCreate postId={post.id}/>
          </div>
        </div>
      </>
    );
  });

  return <div className="d-flex flex-row flex-wrap justify-content-between">{renderPosts}</div>;
}

export default PostList;
