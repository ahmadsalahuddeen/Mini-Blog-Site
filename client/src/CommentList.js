import axios from 'axios'
import React, {useState, useEffect} from 'react'

function CommentList({comments}) {



const renderedComments = comments.map(comment =>{
let content;
if(comment.status === 'Approved'){
  content = comment.content
}
if(comment.status === 'Pending'){
  content = 'Comment await Moderation'
}
if(comment.status === 'Rejected'){
  content = 'Comment approval rejected'
}

    return <li key={comment.id}>{content} </li>
})

  return (
    <div>
<ul>
    {renderedComments}
</ul>

    </div>
  )
}

export default CommentList