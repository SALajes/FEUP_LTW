'use strict'

//uncomment lets if get_reservations.js is not run before this one

//let fields = document.getElementsByClassName('fields')[0]
//let image = document.getElementById('profile_img')
//let username = document.getElementById('username')
let edit_link = document.getElementById('edit')
let pass_link = document.getElementById('pass')
let original_src = image.src
let user

function null_or_empty(value) {
    return value === null || value === ''
}

function swap_to_edit() {
    fields.outerHTML = '<form class="fields" method="POST" action="../actions/edit_profile_action.php" enctype="multipart/form-data">' +
        '<input type="hidden" name="userID" value="' + user['userID'] + '">' +
        '<input type="file" name="img_file" accept="image/.gif,image/.jpg,image/.png,image/.jpeg" id="file">' +
        '<input type="text" name="username" value="' + user['username'] + '">' +
        '<input type="email" name="email" value="' + user['email'] + '">' +
        '<input type="text" name="name" ' + (null_or_empty(user['name'])  ? 'placeholder="NAME"' : ('value="' + user['name'] + '"')) + '">' +
        '<input type="text" name="nationality" ' + (null_or_empty(user['nationality'])  ? 'placeholder="NATIONALITY"' : ('value="' + user['nationality'] + '"')) + '">' +
        '<input type="text" name="age" ' + (null_or_empty(user['age'])  ? 'placeholder="AGE"' : ('value="' + user['age'] + '"')) + '">' +
        '<input type="submit" value="Confirm">' + '</form>'

    image.style.display = "inline"

    //Image uploading related
    let file_input = document.getElementById('file')
    //Triggering the file input by clicking on the profile image
    image.addEventListener('click', function () {
        if(file_input)
            file_input.click()
    })
    image.addEventListener('mouseover', function () {
        image.style.backgroundImage = "url('" + original_src + "')"
        image.style.cursor = "pointer"
        image.src = "../icons/hover_edit.png"
    })
    image.addEventListener('mouseout', function () {
        image.style.backgroundImage = "none"
        image.src = original_src
    })
    //When an image is loaded it will be previewed in the users profile pic
    file_input.addEventListener('change', preview_image);

    fields = document.getElementsByClassName('fields')[0]
}

function preview_image(event) {
    let file = event.target.files[0]
    
    image.file = file

    let reader = new FileReader()
    reader.onload = function(e) { 
            image.src = e.target.result
            original_src = e.target.result
    }
    reader.readAsDataURL(file)
}

function swap_to_pass() {
    fields.outerHTML = '<form class="fields" action="../actions/change_password_action.php" method="post">' +
        '<input type="hidden" name="username" value="' + user['username'] + '">' +
        '<input type="password" name="current" placeholder="CURRENT PASSWORD">' +
        '<input type="password" name="new" placeholder="NEW PASSWORD">' +
        '<input type="password" name="confirm" placeholder="CONFIRM PASSWORD">' +
        '<input type="submit" value="Confirm">' + '</form>'

    image.style.display = "inline"

    fields = document.getElementsByClassName('fields')[0]
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