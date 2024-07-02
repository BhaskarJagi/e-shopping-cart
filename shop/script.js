if (location.href.includes("shop")) {
  let link = document.getElementById("shop-link");
  link.style.color = "white";
  link.style.fontWeight ="bold"
}

if (!localStorage.getItem("currUser")) {
    location.href = "../login/index.html";
  }
  
  const itemsContainer = document.querySelector("#items-container");
  const search = document.getElementById("search-bar");
  const allBtn = document.getElementById("all");
  const mensBtn = document.getElementById("mens");
  const womensBtn = document.getElementById("womens");
  const jewelleryBtn = document.getElementById("jewellery");
  const electronicsBtn = document.getElementById("electronics");
  const rating = document.getElementById("rating");
  
  var itemArr = [];
  
  if (localStorage.getItem("cartArr")) {
    var cartArr = JSON.parse(localStorage.getItem("cartArr"));
  } else {
    var cartArr = [];
  }
  
  fetch("https://fakestoreapi.com/products")
    .then((resp) => resp.json())
    .then((data) => {
      itemArr = data;
      localStorage.setItem("itemArr", JSON.stringify(itemArr));
      showItems(itemArr);
    });
    console.log(itemArr);3
  function showItems(Arr) {
    itemsContainer.innerHTML = "";
    Arr.forEach((Obj) => {
      itemsContainer.innerHTML += `
      <div id="item-card">
      <img src="${Obj.image}" alt="Item" />
      <div class="info">
        <div class="title">${Obj.title}</div>
        <div class="price">
          <div>Price: $${Obj.price}</div>
        </div>
        <div class="rating">Rating: ${Math.floor(Obj.rating.rate)}</div>
      </div>
      <button id="addBtn" onClick='addToCart(${Obj.id})'>Add to Cart</button>
     </div>`;
    });
  }
  
  function addToCart(id) {
    let item;
    itemArr.forEach((ele) => {
      if (ele.id == id) {
        item = ele;
      }
    });
    cartArr.push(item);
    localStorage.setItem("cartArr", JSON.stringify(cartArr));
    console.log(JSON.parse(localStorage.getItem("cartArr")));
  }
  
  search.addEventListener("input", () => {
    let myArr = itemArr.filter((ele) => {
      if (ele.title.toLowerCase().includes(search.value.trim().toLowerCase())) {
        return ele;
      }
    });
    if (myArr.length == 0) {
      itemsContainer.innerHTML = `
        <p>Oops,No products found, try different combinations!</P>
        `;
      return;
    }
    showItems(myArr);
  });
  
  allBtn.addEventListener("click", () => {
    myArr = JSON.parse(localStorage.getItem("itemArr"));
    allBtn.style.backgroundColor = "black";
    allBtn.style.color = "white";
    mensBtn.style.color = "black";
    mensBtn.style.backgroundColor = "white";
    womensBtn.style.color = "black";
    womensBtn.style.backgroundColor = "white";
    jewelleryBtn.style.color = "black";
    jewelleryBtn.style.backgroundColor = "white";
    electronicsBtn.style.color = "black";
    electronicsBtn.style.backgroundColor = "white";
    showItems(myArr);
  });
  
  mensBtn.addEventListener("click", () => {
    myArr = itemArr.filter((ele) => {
      if (ele.category == "men's clothing") {
        return ele;
      }
    });
    allBtn.style.backgroundColor = "white";
    allBtn.style.color = "black";
    mensBtn.style.color = "white";
    mensBtn.style.backgroundColor = "black";
    womensBtn.style.color = "black";
    womensBtn.style.backgroundColor = "white";
    jewelleryBtn.style.color = "black";
    jewelleryBtn.style.backgroundColor = "white";
    electronicsBtn.style.color = "black";
    electronicsBtn.style.backgroundColor = "white";
  
    showItems(myArr);
  });
  
  womensBtn.addEventListener("click", () => {
    myArr = itemArr.filter((ele) => {
      if (ele.category == "women's clothing") {
        return ele;
      }
    });
    allBtn.style.backgroundColor = "white";
    allBtn.style.color = "black";
    mensBtn.style.color = "black";
    mensBtn.style.backgroundColor = "white";
    womensBtn.style.color = "white";
    womensBtn.style.backgroundColor = "black";
    jewelleryBtn.style.color = "black";
    jewelleryBtn.style.backgroundColor = "white";
    electronicsBtn.style.color = "black";
    electronicsBtn.style.backgroundColor = "white";
  
    showItems(myArr);
  });
  
  jewelleryBtn.addEventListener("click", () => {
    myArr = itemArr.filter((ele) => {
      if (ele.category == "jewelery") {
        return ele;
      }
    });
    allBtn.style.backgroundColor = "white";
    allBtn.style.color = "black";
    mensBtn.style.color = "black";
    mensBtn.style.backgroundColor = "white";
    womensBtn.style.color = "black";
    womensBtn.style.backgroundColor = "white";
    jewelleryBtn.style.color = "white";
    jewelleryBtn.style.backgroundColor = "black";
    electronicsBtn.style.color = "black";
    electronicsBtn.style.backgroundColor = "white";
  
    showItems(myArr);
  });
  
  electronicsBtn.addEventListener("click", () => {
    myArr = itemArr.filter((ele) => {
      if (ele.category == "electronics") {
        return ele;
      }
    });
    allBtn.style.backgroundColor = "white";
    allBtn.style.color = "black";
    mensBtn.style.color = "black";
    mensBtn.style.backgroundColor = "white";
    womensBtn.style.color = "black";
    womensBtn.style.backgroundColor = "white";
    jewelleryBtn.style.color = "black";
    jewelleryBtn.style.backgroundColor = "white";
    electronicsBtn.style.color = "white";
    electronicsBtn.style.backgroundColor = "black";
  
    showItems(myArr);
  });
  
  rating.addEventListener("input", () => {
    console.log(rating.value);
    if (rating.value == 0) {
      showItems(itemArr);
      return;
    }
    myArr = itemArr.filter((ele) => {
      if (Math.floor(ele.rating.rate) == rating.value) {
        return ele;
      }
    });
    if (myArr.length == 0) {
      itemsContainer.innerHTML = `
        <p>Oops,No products found for this filtering, try different combinations!</P>
        `;
      return;
    }
    showItems(myArr);
  });
  
  document.querySelectorAll('input[type="checkbox"]').forEach((c) => {
    c.addEventListener("change", filterProducts);
  });
  
  function filterProducts() {
    const checkboxes = Array.from(
      document.querySelectorAll('input[name="priceRange"]')
    );
    const checkedRanges = checkboxes.filter((c) => c.checked).map((c) => c.value);
  
    if (checkedRanges.length === 0) {
      showItems(itemArr);
      return;
    }
  
    const filteredProducts = itemArr.filter((p) => {
      const price = p.price;
      for (const range of checkedRanges) {
        if (range === "100+" && price >= 100) {
          return true;
        }
        const [min, max] = range.split("-").map(parseFloat);
        if (price >= min && price <= max) {
          return true;
        }
      }
      return false;
    });
  
    myArr = itemArr.filter((p) => {
      if (filteredProducts.includes(p)) {
        return p;
      }
    });
    showItems(myArr);
  }
  