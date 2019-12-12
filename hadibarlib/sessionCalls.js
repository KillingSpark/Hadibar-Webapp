//////////////////////////////////
//          Session             //
//////////////////////////////////


function getSession(){
    callApi("/api/session/getid", 'GET', {}, function(id){sessionID = id}, function(){})
}

function getUser(success, failure){
    callApi("/api/f/user/info", 'GET', {}, success, failure)
}

function setEmail(newemail, success, failure){
    callApi("/api/f/user/email", 'POST', {email: newemail}, success, failure)
}

function doLogin(name, pw, success, failure){
    isSessionIDSet()
    sessionStorage.setItem('sessionID', sessionID);
    succ = function(){
        loginHooks.forEach(function(hook){
            hook()
        }, this)
        success();
    }
    callApi("/api/session/login", 'POST',{name: name, password: pw}, succ, failure)
}

function doLogout(success, failure){
    isSessionIDSet()
    sessionStorage.removeItem('sessionID');
    succ = function(){
        logoutHooks.forEach(function(hook){
            hook()
        }, this)
        success();
    }
    callApi("/api/session/logout", 'POST',{}, succ, failure)
}
