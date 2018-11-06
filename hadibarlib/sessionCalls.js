//////////////////////////////////
//          Session             //
//////////////////////////////////


function getSession(){
    callApi("/api/session/getid", 'GET', {}, function(id){sessionID = id}, function(){alert("AAAA")})
}

function doLogin(name, pw, success, failure){
    isSessionIDSet()
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
    succ = function(){
        logoutHooks.forEach(function(hook){
            hook()
        }, this)
        success();
    }
    callApi("/api/session/logout", 'POST',{}, succ, failure)
}
