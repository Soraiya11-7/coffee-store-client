
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from 'react-icons/fc';
import { AuthProviderContext } from './AuthProvider';
import Swal from 'sweetalert2';


const Registration = () => {
    const navigate = useNavigate();
    const { createUser, user, setUser, updateUserProfile, signInWithGoogle } = useContext(AuthProviderContext);
    const location = useLocation();
    const [error, setError] = useState("");
    const [showSecretKey, setShowSecretKey] = useState(false);

    const handleRegistration = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const image = e.target.image.value;
        setError("");
        if (password.length < 6) {
            setError("password must contain at least 6 character")
            return;
        }
        if (!/[a-z]/.test(password)) {
            setError("password must contain at least one  Lowercase letter");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setError("password must contain at least one  Uppercase letter");
            return;
        }

        // console.log({name, email, password, image});

        createUser(email, password)
            .then((res) => {
                // console.log(res.user);
                setUser(res.user);
                const createdAt = res?.user?.metadata?.creationTime;

                //save new user to the DB
                const newUser = {name, email, image, createdAt};
                // console.log(newUser);
               // data send to server
        
               fetch("https://coffee-store-server-alpha-gules.vercel.app/users", {
                method:"POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newUser)
               })
               .then(res => res.json())
               .then(data => {
                // console.log(data);
                if(data.insertedId){
                    Swal.fire({
                        title: 'Success!',
                        text: 'User added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                      })
                }
               })
               navigate('/addCoffee');

                // updateUserProfile({ displayName: name, photoURL: image })
                //     .then(() => {
                //         setUser({
                //             ...res.user,
                //             displayName: name,
                //             photoURL: image,
                //         });
                //         navigate('/addCoffee');
                //     })
                //     .catch((err) => {

                //         const errorMessage = err.message;
                //         const errorCode = errorMessage.match(/\(([^)]+)\)/)?.[1];
                //         setError(errorCode || 'Unknown error');
                //     })
                // e.target.reset();

            })
            .catch((err) => {
                const errorMessage = err.message;
                const errorCode = errorMessage.match(/\(([^)]+)\)/)?.[1];
                setError(errorCode || 'Unknown error');
            });
    }

    //Login with Google
    const handleLoginWithGoogle = () => {
        signInWithGoogle()
            .then(() => {
                navigate(location?.state ? location.state : '/addCoffee');
            })
            .catch((err) => {
                const errorMessage = err.message;
                const errorCode = errorMessage.match(/\(([^)]+)\)/)?.[1];
                setError(errorCode || 'Unknown error');
            });
    }

    return (
        <div className=" py-10 flex justify-center items-center">

            <div className="card bg-base-100 w-[90%] sm:w-[60%] md:w-[50%] lg:w-[35%] mx-auto shadow-2xl p-1 sm:p-2 ">
                <h1 className="text-xl sm:text-3xl font-bold mt-3 text-center">Register now!</h1>
                <form onSubmit={handleRegistration} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="name" name='name' className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo-URL</span>
                        </label>
                        <input type="text" placeholder="Photo url" name='image' className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>

                        <input
                            type={showSecretKey ? 'text' : 'password'}
                            placeholder="password"
                            name="password"
                            className="input input-bordered" required />

                        <button type="button" onClick={() => setShowSecretKey(!showSecretKey)} className="absolute btn btn-xs top-12 right-2">
                            {
                                showSecretKey ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                            }
                        </button>



                    </div>
                    {
                        error && <label className="label text-xs text-red-600">
                            {error}
                        </label>
                    }
                    <div className="form-control mt-6">
                        <button className="p-2 rounded-xl  bg-teal-600 text-white text-base sm:text-lg font-bold">Register</button>
                    </div>
                </form>
                <div className="flex items-center mb-4 w-[80%] mx-auto">
                    <div className="flex-grow border-t-2 border-black"></div>
                    <span className="mx-4 text-gray-500 font-medium text-sm sm:text-lg">OR</span>
                    <div className="flex-grow border-t-2 border-black"></div>
                </div>

                <div className='flex justify-center items-center mb-3'>
                    <button onClick={handleLoginWithGoogle} className='p-1 sm:p-2 flex items-center gap-1 rounded-xl border hover:border-teal-600'><FcGoogle className='text-base sm:text-lg'></FcGoogle> Login with Google</button>
                </div>

                <h2 className='mb-3 text-center'>You have an account? <Link className='text-blue-400' to='/login'>Login Now</Link></h2>
            </div>
        </div>

    );
};

export default Registration;