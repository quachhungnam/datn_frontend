// import React from 'react'


let user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";

let authHeader = {}
if (user !== "" && user.access) {
    authHeader.Authorization = 'Bearer ' + user.access
}
else {
    authHeader.Authorization = ""
}

export { authHeader }