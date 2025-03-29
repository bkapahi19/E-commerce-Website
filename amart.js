let cart = [];

const cartIcon = document.querySelector('.i');
if (cartIcon) cartIcon.addEventListener('click', () => window.location.href = 'cart.html');


let buttons = document.querySelectorAll('.card button');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', (event) => {
        let card = event.target.closest('.card');
    
let item = {
    name: card.querySelector('h5').innerText,
    price: card.querySelector('.totprice').innerText,
    image: card.querySelector('img').src ,
    quantity:1
    };
    
cart.push(item);
localStorage.setItem('cart', JSON.stringify(cart));
    
alert(`${item.name} added to cart!`);
    });
    };


window.onload = () => {
const cartContainer = document.querySelector('.cart-container');
cart = JSON.parse(localStorage.getItem('cart')) || [];
    
if (cart.length == 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
            return;
    }
    
cartContainer.innerHTML = "";
let totalPrice = 0;
    
for (let i = 0; i < cart.length; i++) {
            let item = cart[i];
            let itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;
    
cartContainer.innerHTML += `
<div class="cart-item" style="border: 2px solid #ddd; width: 295px; height: 400px; padding: 10px; 
margin: 20px; text-align: center; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
border-radius: 10px; background-color: #f9f9f9;">
<img src="${item.image}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 5px;">
<h5 style="font-size: 1rem; color: #555; margin: 10px 0;">${item.name}</h5>
<p>Price: ${itemTotal}</p>
<p>Quantity: <span id="quantity-${i}">${item.quantity}</span></p>
<button style="background-color: #712cf9; color: white; padding: 10px; border: none; border-radius: 5px;
cursor: pointer; transition: background-color 0.3s; margin-top:10px;" onclick="increaseItem(${i})">+</button>
<button style="background-color: #712cf9; color: white; padding: 10px; border: none; border-radius: 5px;
cursor: pointer; transition: background-color 0.3s; margin-top:10px;" onclick="removeItemFromCart(${i})">Remove</button>
<button style="background-color: #712cf9; color: white; padding: 10px; border: none; border-radius: 5px;
cursor: pointer; transition: background-color 0.3s; margin-top:10px;" onclick="decreaseItem(${i})">-</button>
</div>
            `;
        }
    
        cartContainer.innerHTML += `<h1 style="text-align: center; margin-top: 20px;">Total Bill: Rs ${totalPrice} </h1>`;
    };
    
function increaseItem(i) {
        cart[i].quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        window.onload();
    }
    
function decreaseItem(i) {
        if (--cart[i].quantity <= 0) cart.splice(i, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        window.onload();
    }
    

function removeItemFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.onload();
}
