import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, PostForm } from '../componant'

function EditPost() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const neviagte = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                }
            })
        } else {
            neviagte('/')
        }
    }, [slug, neviagte])
    return post ? (<div className="py-8"> <Container >
        <PostForm post={post} />
    </Container> </div>) : null
}

export default EditPost