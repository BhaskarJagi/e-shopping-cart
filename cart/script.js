if (location.href.includes("cart")) {
    let link = document.getElementById("cart-link");
    link.style.color = "white";
    link.style.fontWeight ="bold"
  }

if(!localStorage.getItem('currUser')){
    location.href='../login/index.html';
}

const itemContainer = document.querySelector('.items');
const listContainer = document.querySelector('.list-container');
const totalPrice = document.getElementById('total-price');

var cartItem=[];

if(localStorage.getItem('cartArr')){

    let myArr = JSON.parse(localStorage.getItem('cartArr'));
    cartItem=myArr;
    console.log(cartItem)
    showCartItem(cartItem);
    
}
else{
    totalPrice.innerHTML='0';
}
console.log(cartItem);



function showCartItem(Arr){
    itemContainer.innerHTML='';
    listContainer.innerHTML='';

    if(cartItem.length==0){
        itemContainer.innerHTML=`
        <h3 style='text-align: center;;'>No products found in Cart</h3>
        `;
        console.log(totalPrice);
        totalPrice.innerHTML='0';
    }



    Arr.forEach((ele,index)=>{
        itemContainer.innerHTML+=`
        <div class="item">
        <img src="${ele.image}" alt="Item" />
        <div class="info">
          <div style="margin-bottom: 10px; font-weight:600">${ele.title}</div>
          <div style="font-weight:bold" class="row">
            <div class="price">$${ele.price}</div>
          </div>
          <div style='margin-top:10px;' class="row">Rating: ${Math.floor(ele.rating.rate)}</div>
        </div>
        <button id="addBtn" onClick='removeFromCart(${ele.id})'>Remove From Cart</button>
      </div>
        `;

        listContainer.innerHTML+=`
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px; gap:20px">
         <div><strong>${index+1}.<strong>  ${ele.title}</div>
         <div>$${ele.price}</div>
        </div>
        `


    })

    totalPrice.innerHTML=totalPriceFunc();


}

function removeFromCart(id){
    console.log("remove");
    let itemToRemove;
    let indexToRemove;
    cartItem.forEach((item,index)=>{
        if(item.id==id){
            itemToRemove=item;
            indexToRemove=index;
        }
    })
    console.log(itemToRemove);
    cartItem.splice(indexToRemove,1);

    localStorage.setItem('cartArr',JSON.stringify(cartItem));
    showCartItem(cartItem);
}

if(cartItem.length==0){
    itemContainer.innerHTML=`
    <h3 style='text-align: center;;'>No products found in the Cart</h3>
    `;
}

function totalPriceFunc(){
    return cartItem.reduce((acc,item)=>{
        return acc+item.price;
    },0)
}


document.getElementById("checkOut").onclick = function (e) {
    
    localStorage.removeItem('cartArr');

    cartItem=[];

    showCartItem(cartItem);

  };
  




