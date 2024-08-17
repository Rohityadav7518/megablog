import { Link, useNavigate } from "react-router-dom"
import { Logout, Logo, Container } from "../index"
import { useSelector } from "react-redux"



function Header() {
    const authStatus = useSelector((state) =>
        state.auth.status)
    const navigate = useNavigate()

    const NavItems = [{

        name: "Home",
        slug: "/",
        active: true
    }, {
        name: "Login",
        slug: "/Login",
        active: !authStatus
    },
    {
        name: "SignUp",
        slug: "/SignUp",
        active: !authStatus
    },
    {
        name: "AllPost",
        slug: "/AllPost",
        active: !authStatus
    },
    {
        name: "AddPost",
        slug: "/AddPost",
        active: authStatus
    },



    ]




    return (
        <header className=" py-3 bg-gray-500 shadow ">
            <Container>
                <nav className="flex ">
                    <div className="mr-4">
                        <Link to='/'>
                            <Logo width='70px' /> </Link>
                    </div>
                    <ul className="flex ml-auto "> {NavItems.map((item) => item.active ? (<li key={item.name}> <button className=" inline-block py-6 px-2  duration-200 hover:bg-blue-200 rounded-full  " onClick={() => navigate(item.slug)}>  {item.name}</button> </li>) : null)}  {authStatus && (<li><Logout />  </li>)}  </ul>

                </nav>

            </Container>

        </header>
    )
}

export default Header