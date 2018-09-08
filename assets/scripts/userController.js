if(window.localStorage.username == null) {
    window.location = "index.html";
}

document.addEventListener("DOMContentLoaded",userExperience);

function userExperience() {
    document.querySelector("#username").innerHTML = window.localStorage.username;
    getLocation();
    document.querySelector("#showMap").addEventListener("click",showMap);
    document.querySelector("#friend").addEventListener("click",friendMessagePopup);
    document.querySelector("#sendFriendRequest").addEventListener("click",fetchFriendMessage);
    document.querySelector("#pendingRequests").addEventListener("click",fetchPendingRequests);
    document.querySelector("#signOut").addEventListener("click",signOut);
    document.querySelector("#searchFriend").addEventListener("click",searchFriendLocation);
}

function searchFriendLocation() {
    var friendNumber = document.querySelector("#friendNumber").value;
    var userRef = firebase.database().ref('registeredUsers/'+friendNumber);
    userRef.on('value',(snapshot)=> {
        console.log("snapshot is",snapshot);
        var object = snapshot.val();
        console.log("Object is ",object);
        var ar = object.friendContacts;
        console.log(ar);
        if(ar == null) {
            var sp = document.querySelector("#notFriend");
            sp.innerText = "You don't have permission to view details of this user!";
        }
            console.log("Pending req:",);
            for(let key in ar) {
                if(key == window.localStorage.mobReg) {
                    var lat = object.currentLatitude;
                    var long = object.currentLongitude;
                    console.log("Current Latitude:"+object.currentLatitude+" Current Longitude:"+object.currentLongitude);
                    // init(object.currentLatitude,object.currentLongitude);
                    showMap(lat,long);
                }
                else {
                    var sp = document.querySelector("#notFriend");
                    sp.innerText = "You don't have permission to view details of this user!";
                }
                // console.log(ar[key]);
                // showPendingRequests(key,pr[key]);
            }
    })
}

function signOut() {
    window.localStorage.mobReg = null;
    window.localStorage.username = null;
    window.location = "index.html";
}

function fetchPendingRequests() {
    var regMob = window.localStorage.mobReg;
    console.log(regMob);
    var userRef = firebase.database().ref('registeredUsers/'+regMob);
    userRef.on('value',(snapshot)=> {
        console.log("snapshot is",snapshot);
        var object = snapshot.val();
        console.log("Object is ",object);
        var pr = object.pendingRequests;
        console.log(pr);
        if(pr == null) {
            var span = document.querySelector("#noRequest");
            span.innerText = "No pending requests found!";
        }
        else {
            console.log("Pending req:",);
            for(let key in pr) {
                console.log(key);
                console.log(pr[key]);
                showPendingRequests(key,pr[key]);
            }
        }
    })
}

function showPendingRequests(num,msg) {
    console.log(num,msg);
    var div = document.querySelector("#friendRequests");
    var h2 = document.createElement("h2");
    h2.innerText = num;
    div.appendChild(h2);
    var message = document.createElement("p");
    message.innerText = msg;
    div.appendChild(message);
    var ok = document.createElement("button");
    // ok.value = "confirm";
    ok.innerText = "confirm";
    ok.setAttribute("class","confirm");
    div.appendChild(ok);
    pendingEventListener(num);
}

function pendingEventListener(num) {
    window.localStorage.friendNumber = num;
    document.querySelector(".confirm").addEventListener("click",addFriend);
}

function addFriend() {
    var regMob = window.localStorage.mobReg;
    var regMobile = {};
    regMobile[window.localStorage.friendNumber] = "Approved";
    var ref = firebase.database().ref('registeredUsers/'+ regMob);
    ref.child('friendContacts').update(regMobile);
    ref.child('pendingRequests').remove();
}

function showMap(latn,longn) {
    var lat = latn;
    var long = longn;
    var map1=new MapmyIndia.Map("map1",{ center:[lat, long],zoomControl: true,hybrid:true });
    L.marker([lat, long]).addTo(map1); 
}

function fetchFriendMessage() {
    var phone = document.querySelector("#receiverPhone").value;
    var msg = document.querySelector("#friendRequestMessage").value;
    makeFriend(phone,msg);
}

function friendMessagePopup() {
    var msgBox = document.querySelector("#friendMessage");
    if(msgBox.style.display == "block") {
        msgBox.style.display = "none";
    }
    else {
        msgBox.style.display = "block";
    }
}

function makeFriend(phone,msg) { 
    var regMobile = window.localStorage.mobReg;
    var req = {};
    req[regMobile] = msg;
    var ref = firebase.database().ref('registeredUsers/'+ phone);
    ref.child('pendingRequests').update(req);
    console.log("friend request send");
    addFriend(ref);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation not supported.";
    }
}

function showPosition(position) {
    console.log("inside showPosition");
    // var x = document.getElementById("demo");
    // x.innerHTML = "Latitude: " + position.coords.latitude + 
    // "<br>Longitude: " + position.coords.longitude;
    var longReg =  position.coords.longitude;
    var latReg =  position.coords.latitude;
    liveLocation(latReg,longReg);
}

function liveLocation(latReg,longReg) {

    firebase.database().ref('registeredUsers/'+window.localStorage.mobReg+'/currentLatitude').set(latReg);
    firebase.database().ref('registeredUsers/'+window.localStorage.mobReg+'/currentLongitude').set(longReg);
    // var obj = firebase.database().ref('registeredUsers/'+mobReg);
    // console.log(obj);
    console.log("location again");
    // setTimeout(getLocation,2000);
}