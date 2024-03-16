import React from 'react'
import AuthVideo from '../assets/Video.mp4'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {
    // const [ username, setusername ] = useState( '' )
    // const [ email, setemail ] = useState( '' )
    // const [ password, setpassword ] = useState( '' )
    // const [ confirmpassword, setconfirmpassword ] = useState( '' )

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm()

    const navigate = useNavigate()

    const onsubmit = async ( data ) => {

        const res = await fetch( `http://localhost:8000/auth/login`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(
                data
            )
        } )

        const responseData = await res.json()
        // if ( !res.ok )
        // {
        //     alert( 'Submission failed ..!' )
        //     return;
        // }

        console.log( responseData );
        if ( responseData.errors )
        {
            responseData.errors.forEach( ( error ) => {
                setError( error.path, {
                    type: 'server', // You can specify the type if needed
                    message: error.msg,
                } );
            } );
        }
        const userData = JSON.stringify( {
            _id: responseData.user._id,
            username: responseData.user.username,
            email: responseData.user.email,
            image: responseData.user.image,
        } )
        console.log( userData );
        localStorage.setItem( 'logindata', userData )
        navigate( '/' )
        toast.success( 'Congratulations, you have successfully logged in!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        } );
    }


    return (
        <div className='relative flex md:justify-start sm:items-center sm:justify-center w-full h-screen'>

            {/* // video here  */ }
            <div className="xl:flex lg:flex md:hidden sm:hidden flex-col w-1/3 ">
                {/* Video */ }
                <div className="relative w-full h-screen ">
                    <video
                        src={ AuthVideo }
                        type="video/mp4"
                        loop
                        controls={ false }
                        muted
                        autoPlay
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <div className='relative flex justify-center items-center mt-3 flex-col w-2/3 h-screen px-4 py-6'>
                <div className="absolute top-10 left-10 z-50 bg-white border-2 border-gray-500 mr-3  px-3 py-3 rounded-lg">
                    <a href="/" className="text-black">
                        <AiOutlineArrowLeft size={ 27 } />
                    </a>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={ 5000 }
                    hideProgressBar={ false }
                    newestOnTop={ false }
                    closeOnClick
                    rtl={ false }
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                {/* Same as */ }
                <ToastContainer />

                <div className='w-full ml-4 mt-4'>
                    <h2 className='font-bold text-black text-3xl px-4 mt-4 mb-10'>Login to Celebrity</h2>

                    <div className='w-2/3 ml-3'>
                        <form action="/" method="post" onSubmit={ handleSubmit( onsubmit ) } className="flex flex-col justify-start items-start w-full h-auto mx-5 my-4">
                            <label htmlFor="email" className="font-bold my-2 text-2xl ">Email</label>
                            {
                                errors.email &&
                                (
                                    < span className='text-red-100 text-lg'>{ errors.email.message }</span>
                                )
                            }
                            <input
                                className='w-full mb-6 py-2 px-4 h-14 rounded-xl bg-white border-2 transition-transform duration-300 transform focus:scale-105 focus:shadow-md focus:outline-none focus:shadow-pink-300 focus:border-2 focus:border-pink-300'
                                { ...register( 'email' ) }
                                type="email" name="email" required />

                            <label htmlFor="password" className="font-bold my-2 text-2xl">Password</label>
                            {
                                errors.password &&
                                (
                                    < span className='text-red-100 text-lg'>{ errors.password.message }</span>
                                )
                            }

                            <input
                                className='w-full mb-6 py-2 px-4 h-14 rounded-xl bg-white border-2 transition-transform duration-300 transform focus:scale-105 focus:shadow-md focus:outline-none focus:shadow-pink-300 focus:border-2 focus:border-pink-300'
                                { ...register( 'password' ) }
                                type="password" name="password" required />

                            <div className='text-gray-500 mb-4 text-lg'>Don't you have an account ?
                                <Link to={ '/Auth/signup' } className='underline underline-offset-2	'>
                                    Sign up
                                </Link>
                            </div>


                            <button disabled={ isSubmitting } type="submit" className="flex justify-center mt-3 px-6 py-3 text-center bg-black text-white font-semibold rounded-lg w-full transition duration-300 ease-in-out transform hover:text-stone-950 hover:bg-white hover:border-2 hover:border-black ">
                                { isSubmitting ? (
                                    <div className="w-6 h-6 border-t-4 border-r-4 border-blue-500 rounded-full animate-spin"></div>
                                ) : (
                                    'Submit'
                                ) }
                            </button>
                        </form>
                    </div>

                </div>

            </div>
        </div >
    )
}

export default Login
