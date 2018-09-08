const userControl = {
    checkUser(userCredentials) {
        console.log("user object is",userCredentials);
        console.log("Login data - mob no - ",userCredentials.loginMob)
        var userRef = firebase.database().ref('registeredUsers/');
        userRef.on('value',(snapshot)=> {
            console.log("snapshot is",snapshot);
            var object = snapshot.val();
            console.log("Object is ",object);
            for(let key in object) {
                console.log(key);
                var obj = object[key];
                console.log(obj.email);

                if(userCredentials.loginMob == obj.mobReg) {
                    if(userCredentials.loginPass == obj.passReg) {
                        console.log("Login Successful! as user");
                        localStorage.username = obj.firstName;
                        localStorage.mobReg = obj.mobReg;
                        window.location = "userMenu.html";
                        break;
                    }
                    else {
                        // var el = document.querySelector("#loginError");
                        // el.innerHTML = "Invalid username or password!";
                    }
                }
                else {
                    localStorage.username = null;
                }
            }
            var el = document.querySelector("#loginError");
            el.innerHTML = "Invalid username or password!";
        })
    }
}