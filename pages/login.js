import React, { useEffect } from 'react'
import tw from "tailwind-styled-components"
import { useRouter } from 'next/router'
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth'
import { auth, provider } from '../firebase'

const Login = () => {

    const router = useRouter()

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                router.push('/')
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Wrapper>
            <UberLogo src="https://i.ibb.co/n6LWQM4/Post.png" />
            <Title>Log in to access your account</Title>
            <HeadImage src='https://i.ibb.co/CsV9RYZ/login-image.png' />
            <SigninButton onClick={() => signInWithPopup(auth, provider)}>
                Sign in with Google
            </SigninButton>
        </Wrapper>
    )
}

export default Login

const Wrapper = tw.div`
    flex flex-col h-screen bg-gray-200 p-4
`

const SigninButton = tw.button`
    bg-black text-white text-center py-4 mt-8 self-enter w-full border-white border-solid border-4 rounded-md
`

const UberLogo = tw.img`
    w-20 h-auto object-contain self-start
`

const Title = tw.div`
    text-3xl pt-6 text-gray-500
`

const HeadImage = tw.img`
    object-contain w-full
`