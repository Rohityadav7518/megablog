import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({
    children, authentication = true
}) {

    const neviagte = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)
    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            neviagte("/login")
        } else if (!authentication && authStatus !== authentication) {
            neviagte("/")
        }
        setLoader(false)
    }, [authStatus, neviagte, authentication])

    return loader ? <h1>loading... </h1> : <> {children} </>
}

