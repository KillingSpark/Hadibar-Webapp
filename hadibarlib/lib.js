var displayError = function (message) {
    console.log(message)
}

var sessionID = ""
var loginHooks = []
var logoutHooks = []

function callApi(a_url, a_type, a_data, a_success, a_failure) {
    $.ajax({
        url: a_url,
        type: a_type,
        data: a_data,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("sessionID", sessionID)
        },
        success: function (data) {
            res = {}
            try {
                res = JSON.parse(data)
            } catch (e) {
                displayError(e)
                a_success(data)
            }
            if (res.status == 'OK') {
                a_success(res.response)
            }else{
                if (res.status == 'ERROR') {
                    a_failure(res.response)
                }
                if (res.status == 'NOSES') {
                    a_failure(res.response)
                }
                if (res.status == 'NOAUTH') {
                    a_failure(res.response)
                }
            }
        },
        error: function (xhr) {
            a_failure(xhr.status)
        }
    })
}

function isSessionIDSet() {
    if (sessionID == "") {
        alert("No SessionID available. This should not be happening. Please reload the page.")
        return false
    }
    return true
}

function getSessionIDAndThen(success){  
    if (sessionID != ""){
        success()
    }else{
        getSession(success, displayError)
    }
}