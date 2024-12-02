import React, { useContext, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';


import { FcGoogle } from 'react-icons/fc';
import { AuthProviderContext } from './AuthProvider';
import Swal from 'sweetalert2';



const Login = () => {
    const emailRef = useRef();
    const navigate = useNavigate();
    const { signInWithGoogle, loginUser, setMail } = useContext(AuthProviderContext);
    const [error, setError] = useState("");
    const location = useLocation();

    //Login with email, password
    const handleLogin = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        setError("");
        // console.log(email,password);
        loginUser(email, password)
            .then((res) => {
                // console.log(result.user);
                const lastSignInTime = res?.user?.metadata?.lastSignInTime;

                const loginInfo = {email, lastSignInTime};

                fetch(`https://coffee-store-server-alpha-gules.vercel.app/users`, {
                    method:"PATCH",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(loginInfo)
                   })
                   .then(res => res.json())
                   .then(data => {
                    console.log(data);
                    if(data.modifiedCount > 0){
                        Swal.fire({
                            title: 'Success!',
                            text: 'Coffee Updated Successfully',
                            icon: 'success',
                            confirmButtonText: 'Cool'
                          })
                    }
                   })

                e.target.reset();
                navigate(location?.state ? location.state : '/addCoffee');
            })
            .catch((err) => {
                const errorMessage = err.message;
                const errorCode = errorMessage.match(/\(([^)]+)\)/)?.[1];
                setError(errorCode || 'Unknown error');
                // setError(err.message);
            });

    }

    //Login with Google
    const handleLoginWithGoogle = () => {
        signInWithGoogle()
            .then(() => {
                navigate(location?.state ? location.state : '/');
            })
            .catch((err) => {
                // setError({ ...error, login: err.code })
                const errorMessage = err.message;
                const errorCode = errorMessage.match(/\(([^)]+)\)/)?.[1];
                setError(errorCode || 'Unknown error');

            });
    }

    const handleForgetSecretKey = () => {

        const email = emailRef.current.value;
        setMail(email);
        navigate("/auth/forget-secret-key");



    }
    return (

        <div className="flex justify-center py-8 items-center ">
            <div className="card bg-base-100  w-[90%] sm:w-[60%] md:w-[50%] lg:w-[35%] mx-auto shadow-2xl p-1 sm:p-2">
                <h1 className="text-xl sm:text-3xl font-bold text-center mt-3">Login now!</h1>
                <form onSubmit={handleLogin} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input ref={emailRef} type="email" placeholder="email" name='email' className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" name='password' className="input input-bordered" required />
                        {
                            error && <label className="label text-red-600 text-xs">
                                {error}
                            </label>
                        }
                        <label onClick={handleForgetSecretKey} className="label abel-text-alt link link-hover">
                            <Link className="label-text-alt link link-hover">Forgot password?</Link>
                        </label>

                    </div>
                    <div className="form-control mt-6">
                        <button className="p-2 rounded-xl  bg-teal-600 text-white text-base sm:text-lg font-bold">Login</button>
                    </div>
                </form>
                <div className="flex items-center mb-4 w-[80%] mx-auto">
                    <div className="flex-grow border-t-2 border-black"></div>
                    <span className="mx-4 text-gray-500 font-medium text-sm sm:text-lg">OR</span>
                    <div className="flex-grow border-t-2 border-black"></div>
                </div>
                <div className='flex justify-center items-center mb-3'>
                    <button onClick={handleLoginWithGoogle} className='p-1 sm:p-2 flex items-center gap-1 rounded-xl border text-base sm:text-lg hover:border-teal-600'><FcGoogle className='text-base sm:text-lg'></FcGoogle> Login with Google</button>
                </div>
                <h2 className='text-sm sm:text-base text-center mb-3'>New to this website? <Link to='/register' className='text-blue-500'>Create an account</Link></h2>
            </div>
        </div>

    );
};

export default Login;