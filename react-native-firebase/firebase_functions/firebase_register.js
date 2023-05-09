import { doc, setDoc } from "firebase/firestore"; 
import { firestore } from "../firebase_setup/firebase.js"

import {auth} from '../firebase_setup/firebase.js'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from '@firebase/auth'


const handleRegister = (email, password, username) => {
    //https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjF_5KHgOH8AhUlIH0KHbZ9Aw8Qz40FegQIDRAs&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DqWy9ylc3f9U&usg=AOvVaw0a5HA6CKMaKVaip4xjpdF4
    //create a new user
    console.log("IN REGISTER " + email + password);
    var promise = new Promise(function(resolve, reject) {
        createUserWithEmailAndPassword(auth, email, password)
        //account does not yet exist... initialize it.
        .then(cred => { 
            //Try to create a new collection for this user in the database
            signInWithEmailAndPassword(auth, email, password)
            try {
                setDoc(doc(firestore, cred.user.uid, "UserDetails"), {
                    email: email,
                    name: username,
                });
            } catch(err) {
                console.log(err)
            }
            resolve(cred.user.uid);
        })
        .catch(error => {
            switch (error.code) {
                //alert the user of an error
                case 'auth/email-already-in-use':
                    alert(`Email address ${email} already in use.`);
                    console.log(`Email address ${email} already in use.`);
                    break;
                case 'auth/invalid-email':
                    alert(`Email address ${email} is invalid.`);
                    console.log(`Email address ${email} is invalid.`);
                    break;
                case 'auth/operation-not-allowed':
                    alert(`Error during sign up.`);
                    console.log(`Error during sign up.`);
                    break;
                case 'auth/weak-password':
                    alert('Password is not strong enough. Add additional characters including special characters and numbers.');
                    console.log('Password is not strong enough. Add additional characters including special characters and numbers.');
                    break;
                default:
                    alert(error.message);
                    console.log(error.message);
                    break;
            }
            reject(error.message);
        });
    });
    return promise;
}

export default handleRegister