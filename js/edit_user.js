'use strict'

let fields = document.getElementById('fields')
let edit_link = document.getElementById('edit')
let pass_link = document.getElementById('pass')
let username = document.querySelector('#fields :nth-child(1)')
let user

function encode_for_ajax(data) {
    return Object.keys(data).map(function(k){
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&');
}

function null_or_empty(value) {
    return value === null || value === ''
}

function swap_to_edit() {
    fields.outerHTML = '<form id=fields action="../actions/edit_profile_action.php">' +
        '<input type="hidden" name="userID" value="' + user['userID'] + '">' +
        '<input type="text" name="username" value="' + user['username'] + '">' +
        '<input type="email" name="email" value="' + user['email'] + '">' +
        '<input type="text" name="name" ' + (null_or_empty(user['name'])  ? 'placeholder="NAME"' : ('value="' + user['name'] + '"')) + '">' +
        '<input type="text" name="nationality" ' + (null_or_empty(user['nationality'])  ? 'placeholder="NATIONALITY"' : ('value="' + user['nationality'] + '"')) + '">' +
        '<input type="text" name="age" ' + (null_or_empty(user['age'])  ? 'placeholder="AGE"' : ('value="' + user['age'] + '"')) + '">' +
        '<input type="submit" value="Confirm">' + '</form>'

    fields = document.getElementById('fields')
}


function swap_to_pass() {
    fields.outerHTML = '<form id=fields action="../actions/change_password_action.php" method="post">' +
        '<input type="hidden" name="username" value="' + user['username'] + '">' +
        '<input type="password" name="current" placeholder="CURRENT PASSWORD">' +
        '<input type="password" name="new" placeholder="NEW PASSWORD">' +
        '<input type="password" name="confirm" placeholder="CONFIRM PASSWORD">' +
        '<input type="submit" value="Confirm">' + '</form>'

    fields = document.getElementById('fields')
}

function user_received() {
    user = JSON.parse(this.responseText)
    pass_link.addEventListener('click', swap_to_pass)
    edit_link.addEventListener('click', swap_to_edit)
}

function get_user_request() {
    let request = new XMLHttpRequest()
    request.onload = user_received
    request.open('get', '../ajax/get_user.php?username=' + username.innerHTML, true)
    request.send()
}

get_user_request()