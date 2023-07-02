const loginBtn = document.getElementById('login-btn');
const signBtn = document.getElementById('signup-btn');

loginBtn.addEventListener('click',()=>{
    location.href='/login';
})

signBtn.addEventListener('click',()=>{
    location.href='/signup'
})