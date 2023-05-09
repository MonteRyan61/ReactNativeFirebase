import {auth} from '../firebase_setup/firebase.js'
import {signInWithEmailAndPassword} from '@firebase/auth'

//TO-DO not yet working need to figure out how this can return a value
async function handleLogin(email, password){
    
    //https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjF_5KHgOH8AhUlIH0KHbZ9Aw8Qz40FegQIDRAs&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DqWy9ylc3f9U&usg=AOvVaw0a5HA6CKMaKVaip4xjpdF4
    //create a new user
    //with checks to see if the user exists already or not.
    console.log("IN HANDLE LOGIN EMAIL: " + email)
    console.log("IN HANDLE LOGIN PASSWORD: " + password)
    var promise = new Promise(function(resolve, reject) {
        signInWithEmailAndPassword(auth, email, password)
            .then(cred => {
                console.log(cred.user)
                console.log(cred.user.uid)
                console.log("Logged in")
                resolve(cred.user.uid);
            })
            .catch(error => {
                switch (error.code) {
                    //for now just console logging but will change this later to return something to the loginPage and change the state there to notify the user.
                    case 'auth/user-not-found':
                        alert(`Email address ${email} does not have an account.`);
                        console.log(`Email address ${email} does not have an account.`);
                        break;
                    case 'auth/wrong-password':
                        alert(`Incorrect Password`);
                        console.log(`Incorrect Password`);
                        break;
                    default:
                        alert(error.message);
                        console.log(error.message);
                        break;
                }
                reject(error.code);
            });
    });
    return promise;
}

export default handleLogin