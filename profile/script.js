if (location.href.includes("profile")) {
    let link = document.getElementById("profile-link");
    link.style.color = "white";
    link.style.fontWeight ="bold"
  }

const logout = document.getElementById('logout-btn');
const userProfile = document.getElementById('user-profile');
const userPasswords = document.getElementById('user-passwords');


if(!localStorage.getItem('currUser')){
    location.href='../login/index.html';
}
else{
    let user =JSON.parse(localStorage.getItem('currUser'));
    document.getElementById('first-name').value=user.firstName;
    document.getElementById('last-name').value=user.lastName;
}


logout.addEventListener('click',(event)=>{
    event.preventDefault();
    localStorage.removeItem('currUser');
    location.href='../login/index.html';
})

userProfile.addEventListener('submit',(event)=>{
    event.preventDefault();
    const firstName=document.getElementById('first-name').value;
    const lastName=document.getElementById('last-name').value;
    if(!firstName || !lastName){
        let message1 = document.getElementById('message1');
        message1.style.color = 'red';
        message1.innerText='All Fields are Mandatory.'
        return;
    }

    let user =JSON.parse(localStorage.getItem('currUser'));

    user.firstName = firstName;
    user.lastName = lastName;
    let email = user.email;

    localStorage.setItem('currUser',JSON.stringify(user));

    let usersList = JSON.parse(localStorage.getItem('usersList'));

    let key;

    console.log('email',email);
    console.log('total',usersList);

    usersList.forEach((userObj,index)=>{
        if(userObj.email==email){
            console.log(userObj);
            user=userObj;
            key=index;
        }
    })

    
    user.firstName = firstName;
    user.lastName = lastName;

    usersList[key]=user;

    localStorage.setItem('usersList',JSON.stringify(usersList));

    message1.style.color = 'green'
    message1.innerText='Info Saved Successfully';

    setTimeout(()=>{
        message1.style.display='none';
        userProfile.reset();
    },1500)
})

userPasswords.addEventListener('submit',(event)=>{
    event.preventDefault();

    const oldKey = document.getElementById('old-key').value;
    const newKey=document.getElementById('new-key').value;
    const confNewKey=document.getElementById('confirm-newKey').value;
   

    if(!oldKey || !newKey || !confNewKey){
        let message2 = document.getElementById('message2');
        message2.style.color = 'red';
        message2.innerText='All Fields are Mandatory.'
        return;
    }

    if(newKey!=confNewKey){
        message2.style.color = 'red';
        message2.innerText='New Password and Confirm New Password must be same.'
        return;
    }

    let user = JSON.parse(localStorage.getItem('currUser'));

    if(oldKey!=user.password){
        message2.style.color = 'red';
        message2.innerText='Wron Old Password.'
        return;
    }

    user.password=newKey;
    let email=user.email;

    localStorage.setItem('currUser',JSON.stringify(user));

    let usersList = JSON.parse(localStorage.getItem('usersList'));

    let key;

    usersList.forEach((userObj,index)=>{
        if(userObj.email==email){
            console.log(userObj);
            user=userObj;
            key=index;
        }
    })

    
    user.password=newKey;

    usersList[key]=user;

    localStorage.setItem('usersList',JSON.stringify(usersList));

    message2.style.color = 'green';
    message2.innerText='Password Changed Successfully.'
    
    setTimeout(()=>{
        message2.style.display='none';
        userPasswords.reset();
    },1500)

})








  