document.addEventListener("DOMContentLoaded",begin);

function begin() {
    // document.querySelector("#showDiv").addEventListener("click",showDiv);
    getLocation();
    document.querySelector("#signUp").addEventListener("click",showSignUpBox);
    document.querySelector("#login").addEventListener("click",showLogInBox);
    document.querySelector("#signUpSubmit").addEventListener("click",fetchUserData);
    document.querySelector("#logInSubmit").addEventListener("click",loginRegisteredUser);
    
}

function showSignUpBox() {
    var back = document.querySelector("#signUp");
    back.style.backgroundColor = "rgb(40, 175, 89)";
    var n = document.querySelector("#signUpHead");
    n.style.color = "#fff";

    var back1 = document.querySelector("#login");
    back1.style.backgroundColor = "#fff";
    var n1 = document.querySelector("#logInHead");
    n1.style.color = "#000";
    
    back.style.color = "#fff";
    var signup = document.querySelector("#signUpBox");
    if(signup.style.display == "none") {
        signup.style.display = "block";
    }
    else signup.style.display = "none";

    var login = document.querySelector("#loginBox");
    if(login.style.display == "block") {
        login.style.display = "none";
    }
    else login.style.display = "none";
}

function showLogInBox() {
    var back = document.querySelector("#login");
    back.style.backgroundColor = "rgb(40, 175, 89)";
    var n = document.querySelector("#logInHead");
    n.style.color = "#fff";

    var back1 = document.querySelector("#signUp");
    back1.style.backgroundColor = "#fff";
    var n1 = document.querySelector("#signUpHead");
    n1.style.color = "#000";

    var login = document.querySelector("#loginBox");
    if(login.style.display == "none") {
        login.style.display = "block";
    }
    else login.style.display = "none";

    var signup = document.querySelector("#signUpBox");
    if(signup.style.display == "block") {
        signup.style.display = "none";
    }
    else signup.style.display = "none";
}

function loginRegisteredUser() {
    var loginMob = document.querySelector("#loginMob").value;
    var loginPass = document.querySelector("#loginPass").value;
    var userCredentials = new loginUser(loginMob, loginPass);
    userControl.checkUser(userCredentials);
}

function showDiv() {
    var logBox = document.querySelector("#login");
    if(logBox.style.display == "block") {
        logBox.style.display = "none";
    }
    else {
        logBox.style.display = "block";
    }
}

function fetchUserData() {
    // var name = document.querySelector('#name').value;
    // console.log(name);
    var fNameReg = document.querySelector("#fnameReg").value;
    var lNameReg = document.querySelector("#lnameReg").value;
    var emailReg = document.querySelector("#emailReg").value;
    var passReg = document.querySelector("#passReg").value;
    var mobReg = document.querySelector("#phoneReg").value;
    console.log(fNameReg,lNameReg,emailReg,passReg,mobReg,);
    // console.log(longReg,latReg);
    // var long = position.coords.longitude
    // var lat = position.coords.latitude;
    var newUserData = new newUser(fNameReg,lNameReg,emailReg,passReg,mobReg);
    // console.log(long,lat);
    control.addDetails(newUserData);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation not supported.";
    }
}

function showPosition(position) {
    // var x = document.getElementById("demo");
    // x.innerHTML = "Latitude: " + position.coords.latitude + 
    // "<br>Longitude: " + position.coords.longitude;
    longReg =  position.coords.longitude;
    latReg =  position.coords.latitude;
}

function liveLocation(objRef) {
    // var userRef = firebase.database().ref('registeredUsers/'+objRef.mobRef+'/');
    // userRef.on('value',(snapshot) => {
    //     console.log("snapshot is",snapshot);
    //     var object = snapshot.val();
    //     console.log("Object is ",object);  
    // })
    firebase.database().ref('registeredUsers/'+objRef.mobReg+'/currentLongitude').set("1000");
    firebase.database().ref('registeredUsers/'+objRef.mobReg+'/currentLatitude').set("10000");
    setTimeout(getLocation,2000);
    console.log("called again");
 }