
import {app} from "../components/firebase/firebase.init"
import {  createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
const auth = getAuth(app);

export const AuthProviderContext = createContext(null);


const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

const [user,setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [mail, setMail] = useState("");
const  name = 'hello';
//create new user
const createUser = (email, password ) =>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
}

//signout user
const signOutUser = () => {
    setLoading(true)
    return signOut(auth);
}

//signIn with email,secret key
const loginUser = (email, password ) =>{
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
}
//signIn with Google
const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, provider);
}

//update User Profile info
const updateUserProfile = (updatedData) =>{
    setLoading(true)
    return updateProfile(auth.currentUser, updatedData ) .finally(() => setLoading(false));;
}

//forget ...
const forgetSecretKey = (email) => {
    return sendPasswordResetEmail(auth, email);
}


useEffect(() =>{
    const unSubscribe = onAuthStateChanged(auth, (currentUser) =>{
        setUser(currentUser)
        setLoading(false)
        })
        return () => {
            unSubscribe();
        }

} ,[]);

const authInfo = {
    name,
    user,
    setMail,
    mail,
    loading,
    setUser,
    createUser,
    loginUser,
    signInWithGoogle,
    forgetSecretKey,
    signOutUser,
    updateUserProfile,
}
    return (
        <AuthProviderContext.Provider value={authInfo}>
            {children}
        </AuthProviderContext.Provider>
    );
};

export default AuthProvider;