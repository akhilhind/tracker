const control = {
    addDetails(newUser) {
        var date = new Date();
        var time = date.getTime();
        // var time2 = time;
        // console.log('time:',time);
        // console.log(newUser.pendingRequests);
        var pro = new Promise((resolve,reject)=> {
            firebase.database().ref('registeredUsers/'+newUser.mobReg).set(newUser,done);
            resolve(console.log("job done"));            
        })

        function done() {
            // setCookie(newAdmin.name);
            var user = firebase.database().ref('registeredUsers/'+newUser.mobReg);
            console.log(user);
            user.on('value',(snapshot)=> {
                console.log("snapshot is",snapshot);
                var object = snapshot.val();
                console.log("Object is ",object);
                for(let key in object) {
                    console.log(object[key]);
                    var obj = object[key];
                    console.log("Login Successful! as user");
                    localStorage.username = obj.firstName;
                    localStorage.mobReg = obj.mobReg;
                    liveLocation(obj);
                    window.location = "userMenu.html";
                }
            })
        }
    }

}