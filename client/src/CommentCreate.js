import axios from "axios";
import React, { useState } from "react";

function CommentCreate({ postId }) {
const [content, setContent] =  useState('')

const handleSubmit =async (e)=> {
e.preventDefault();
await axios.post(`http://localhost:4000/posts/${postId}/comments`, {
    content
})
setContent('')
}

    return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">New Comment</label>
          <input type="text" value={content} onChange={e => setContent(e.target.value)} className="form-control mt-2" />
        </div>
        <button type="submit" className="btn btn-primary mt-2">comment</button>
      </form>
    </div>
  );
}

export default CommentCreate;
