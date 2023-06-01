import axios from 'axios'
import React, {useState, useEffect} from 'react'

function CommentList({postId}) {

const [comments, setComments] = useState([])

const fetchData = async ()=>{
    const res = await axios.get(`http://localhost:4000/posts/${postId}/comments`)
setComments(res.data)



}

useEffect(()=>{
    fetchData()
},[])


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