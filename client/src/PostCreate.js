import React from 'react'
import axios from 'axios';
import { useState } from 'react';

function PostCreate (){
    const [title, setTitle] = useState('')
    const handlePostSubmit = async (e)=>{
        e.preventDefault()
       await axios.post('http://posts-clusterip-srv:4002/posts', {
            title
        })
        setTitle('')
    }
return <>


<form onSubmit={handlePostSubmit} >

<div >
<label htmlFor="" className='form-label'>Post Title</label>
<input minLength={3} type="text" value={title} onChange={e=> setTitle(e.target.value)} className='form-control' />

</div>
<button type="submit" className='btn btn-primary mt-3'>Submit</button>
</form>

</>
}

export default PostCreate;


