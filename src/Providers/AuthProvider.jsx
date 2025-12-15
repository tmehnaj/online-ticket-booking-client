import React, { useEffect, useState } from 'react';
// import { AuthContext } from './Context';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../Firebase/firebase.init'
import { AuthContext } from './AuthContext';

const googleSignInProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logOutUser = () => {
        // setLoading(true);
        return signOut(auth);
    }
    //update profile
    const updateUserProfile = (userData) => {
        setLoading(true);
        return updateProfile(auth.currentUser, userData);
    }



    // sign in or signup with google
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleSignInProvider);
    }

    // password reset
    const passwordReset = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    }

    //to observe user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                // console.log('CurrentUser-->', currentUser?.email)
                // console.log('currentUser', currentUser);
                setLoading(false);
            } else {
                setUser(null);
                setLoading(false);
            }
            //    setLoader(false);
        })
        return () => {
            unsubscribe();
        }
    }, [])

    const userData = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        signInUser,
        logOutUser,
        updateUserProfile,
        googleSignIn,
        passwordReset,
       
    }

    return (
      <AuthContext value={userData}>
        {children}
      </AuthContext>
    );
};

export default AuthProvider;