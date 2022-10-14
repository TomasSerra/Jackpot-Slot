    document.getElementById('dashboard').style.display="none"
    document.getElementById('login').addEventListener('click', GoogleLogin)
    document.getElementById('logout').addEventListener('click', LogoutUser)

    let provider = new firebase.auth.GoogleAuthProvider()

    function GoogleLogin(){
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          var provider = new firebase.auth.GoogleAuthProvider();
          // In memory persistence will be applied to the signed in Google user
          // even though the persistence was set to 'none' and a page redirect
          // occurred.
          if(document.getElementById("textologin"))
          {
            $(textologin).remove();
          }
          return firebase.auth().signInWithPopup(provider);
        })
        .catch((error) => {
          window.alert(error.message);
        });
    }

    function showUserDetails(user){
        document.getElementById('userName').innerHTML = `${user.displayName}`

    }

    function checkAuthState(){
    firebase.auth().onAuthStateChanged(user=>{
        if(user){
        document.getElementById('loginButton').style.display="none";
        document.getElementById('dashboard').style.display="block";
        document.getElementById("usuarioBox").style.borderStyle="solid";
        showUserDetails(user)
        }else{
            document.getElementById("usuarioBox").style.borderStyle="none";
            document.getElementById('userName').innerHTML = "Login to have stats";
        }
    })
    }

    function LogoutUser(){

    firebase.auth().signOut().then(()=>{
        document.getElementById('loginButton').style.display="block";
        document.getElementById('dashboard').style.display="none";
        document.getElementById("usuarioBox").style.borderStyle="none";
        document.getElementById('userName').innerHTML = "";
    }).catch(e=>{
        window.alert(e);
    })
    }
    checkAuthState()