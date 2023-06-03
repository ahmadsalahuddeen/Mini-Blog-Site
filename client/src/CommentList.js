import axios from 'axios'
import React, {useState, useEffect} from 'react'

function CommentList({comments}) {



const renderedComments = comments.map(comment =>{
    return <li key={comment.id}>{comment.content} </li>
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