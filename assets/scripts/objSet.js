class newUser {
    constructor(fNameReg,lNameReg,emailReg,passReg,mobReg,latReg,longReg) {
        this.firstName = fNameReg;
        this.lastName = lNameReg;
        this.emailReg = emailReg;
        this.passReg = passReg;
        this.mobReg = mobReg;
        // this.currentLatitude = latReg;
        // this.currentLongitude = longReg;
        // this.long = long;
        // this.lat = lat;
        console.log("constructor done");
    }
}

class loginUser {
    constructor(loginMob, loginPass) {
        this.loginMob = loginMob;
        this.loginPass = loginPass;
    }
}
