const userForm = document.getElementById('user-details');

var usersList = [];

userForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPass = document.getElementById('confirm-pass').value;

    if(!firstName || !lastName || !email || !password || !confirmPass){
        const message = document.getElementById('message');
        message.style.color = 'red';
        message.innerText = 'All Fields are Mandatory'
        return;
    }

    if(password !== confirmPass){
        message.style.color = 'red';
        message.innerText = 'Password and Confirm Pssword must be same'
        return;
    }

    var user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    }

    if(localStorage.getItem('usersList')){
        usersList = JSON.parse(localStorage.getItem('usersList'));
        usersList.forEach((user) => {
            if(user.email == email){
                flag = true;
                message.style.color = 'red';
                message.innerText = 'User Already Exists';
                return
            }
        })
    }

    usersList.push(user);
    // console.log(usersList);

    localStorage.setItem('usersList',JSON.stringify(usersList));

    message.style.color = 'green';
    message.innerText = 'Signed in Succesfully';

    userForm.reset();

    setTimeout(() =>{
        location.href='../login/index.html';
    },2000)
})