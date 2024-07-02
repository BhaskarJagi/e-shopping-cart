const loginBtn = document.getElementById('login-btn');
const signBtn = document.getElementById('signup-btn');

loginBtn.addEventListener('click',()=>{
    location.href='/login/index.html';
})

signBtn.addEventListener('click',()=>{
    location.href='/signup/index.html'
})
