const userLogin = document.getElementById('user-details');

var usersList = [];
if(localStorage.getItem('currUser')){
    const message = document.getElementById('message');
        message.style.color = 'green';
        message.innerText = 'Login Succesful';
}

userLogin.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if(!email || !password){
        message.style.color = 'red';
        message.innerText = 'All Fields are Mandatory'
        return;
    }

    let currUser;

    if(localStorage.getItem('usersList')){
        usersList = JSON.parse(localStorage.getItem('usersList'));
        usersList.forEach((user) => {
            if(user.email == email){
                user.token = generateToken();
                currUser = user;
            }
            else{
                message.style.color = 'red';
                message.innerText = 'User Does not Exist. Please Signup';
                return;
            }
        })
    }

    if(password !== currUser.password){
        message.style.color = 'red';
        message.innerText = 'Wrong Password'
        return;
    }

    message.style.color = 'green';
    message.innerText = 'Login Succesfull';
    localStorage.setItem('currUser',JSON.stringify(currUser));

    setTimeout(() => {
        location.href='../shop/index.html';
    },1000)
    
    userLogin.reset();
})

function generateToken(){
    let token = '';
    for(let i=0;i<16;i++){
        token += String.fromCharCode(Math.floor(Math.random()*256));
    }
    return token;
}