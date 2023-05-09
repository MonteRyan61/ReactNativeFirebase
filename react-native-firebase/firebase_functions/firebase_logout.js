import {auth} from '../firebase_setup/firebase.js'

async function handleLogout(){
    var promise = new Promise(function(resolve, reject) {
       auth.signOut()
        .then(() => {
        resolve("Signed Out");
        })
        .catch(e=>{
            console.log("ERRER" + e);
        console.error('Sign Out Error', e);
        reject("Sign Out Error");
        });
    });
    return promise;
}
export default handleLogout