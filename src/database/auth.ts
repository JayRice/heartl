import app from "../config/firebase.ts"


import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    deleteUser,
    reauthenticateWithPopup,
    signInWithRedirect,


} from 'firebase/auth'


// initializeAppCheck(app, {
//     provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_SITE_KEY),
//     isTokenAutoRefreshEnabled: true,
// });

const auth = getAuth(app);



async function loginWithGoogle() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const provider = new GoogleAuthProvider();

    if (isMobile) {
        await signInWithRedirect(auth, provider);
    } else {
        await signInWithPopup(auth, provider);
    }
}

export async function login(authProvider: "google" | "facebook" ) {
    if (authProvider == "google") {
        await loginWithGoogle();
    }

    await auth.currentUser?.getIdToken(true);

}



export function logOut() {
    return firebaseSignOut(auth)
}