import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../componant'
import appwriteService from '../appwrite/conf'

function AllPost() {
    const [post, setPost] = useState([])
    useEffect(() => { }, [])

    appwriteService.getPost([]).then((post) => {
        if (post) {
            setPost(post.documents)
        }
    })
    return (
        <div className='  w-full py-8 '>

            <Container>
                <div className="flex flex-wrap ">  {
                    post.map(() => (
                        <div key={post.$id} className='p-2 w-1/2' >
                            <PostCard post={post} />
                        </div>
                    ))}  </div>
            </Container>
        </div>
    )
}

export default AllPost