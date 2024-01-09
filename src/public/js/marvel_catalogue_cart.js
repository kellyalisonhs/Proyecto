/* cart open/close */
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
let showContent = document.querySelector('#show-boxes');

/* Open cart */
cartIcon.onclick = () => {
    cart.classList.add("active");
}

/* Close cart */
closeCart.onclick = () => {
    cart.classList.remove("active");
}

/* API MArvel */
const ts = '1702060313149';
const apikey = "dc7596ce5d404405dc4c7aa350042e01";
const hash = "1b89946d6f2dc57e5d1e7187ff680845";
const limit = 96;

/* show product boxes (se muestran 96 personajes que se consumen desde la api de marvel)*/
const marvel = {
    render: async () => {
        const urlAPI = `https://gateway.marvel.com:443/v1/public/characters?ts=${ ts }&apikey=${ apikey }&hash=${ hash }&limit=${ limit }`;
        let contentHTML = '';

        try {
            const response = await fetch(urlAPI);
            const json = await response.json();

            json.data.results.forEach((element, index) => {
                contentHTML += `
                    <div class="product-box">
                        <img src="${ element.thumbnail.path + "." + element.thumbnail.extension }" class="product img">
                        <h2 class="product-title">${ element.name }</h2>
                        <i class="bx bx-heart add-cart" data-index="${ index }"></i>
                    </div>
                `;
            });

            showContent.innerHTML = contentHTML;

            // Agregar eventos a los botones de "Agregar al carrito"
            const addToCartButtons = document.querySelectorAll('.add-cart');
            addToCartButtons.forEach((button) => {
                button.addEventListener('click', addToCartClicked);
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
};

marvel.render();

/* 'agregar al carrito' */
if(document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    /* remove item from the cart */
    var removeCartButton = document.getElementsByClassName('cart-remove');
    for(var i = 0 ; i < removeCartButton.length ; i++) {
        var button = removeCartButton[i];
        button.addEventListener("click", removeCartItem);
    }
    /* quantity change */
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0 ; i < quantityInputs.length ; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    /* add to cart */
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0 ; i < addCart.length ; i++) {
        var button = addCart[i];
        button.addEventListener("click", addToCartClicked);
    }
}

/* remove cart item */
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();

    // Después de eliminar un elemento, actualiza la cantidad y el ícono del carrito
    updateCartIcon();
    saveCartItems();
}

/* quantity change */
var quantityInputs = document.getElementsByClassName("cart-quantity");
for (var i = 0 ; i < quantityInputs.length ; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartIcon();
}

/* add cart function */
function addToCartClicked(event) {
    const button = event.target;
    const productBox = button.parentElement;
    const title = productBox.getElementsByClassName("product-title")[0].innerText;
    const productImg = productBox.getElementsByClassName("product")[0].src;

    addProductToCart(title, productImg);
    updateCartIcon();
}

function addProductToCart(title, productImg) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames =  cartItems.getElementsByClassName('cart-product-title');

    // Verificar límite de productos en el carrito, 96 es el limite de personajes consumidos de la api de marvel
    if (cartItemsNames.length >= 96) {
        alert('No puedes agregar más productos al carrito. Límite alcanzado (96 elementos).');
        return;
    }

    // Verificar si el producto ya está en el carrito
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert('Ya has agregado este personaje a tu lista de favoritos');
            return;
        }
    }

    var cartBoxContent = `
    <img src="${ productImg }" alt="" class="cart-img"/>
    <div class="detail-box">
        <div class="cart-product-title">${ title }</div>
    </div>
    <!-- remove item -->
    <i class='bx bx-trash-alt cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    // Configurar eventos para el nuevo elemento del carrito
    cartShopBox.getElementsByClassName('cart-remove')[0]
        .addEventListener('click', removeCartItem);
    saveCartItems();
    updateCartIcon();
}

/* guarda los elementos seleccionados aún después de recargar la página */
function saveCartItems() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var cartItems = [];

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var titleElement = cartBox.getElementsByClassName('cart-product-title')[0];
        var productImg = cartBox.getElementsByClassName('cart-img')[0];

        var item = {
            title: titleElement.innerText,
            productImg: productImg.src,
        };

        cartItems.push(item);
    }

    // Guardar en localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

/* quantity in cart icon */
function updateCartIcon() {
    var cartBoxes = document.getElementsByClassName('cart-box');
    var quantity = cartBoxes.length;

    var cartIcon = document.querySelector('#cart-icon');
    cartIcon.setAttribute('data-quantity', quantity);
}

// Cargar elementos del carrito al iniciar la página
document.addEventListener("DOMContentLoaded", loadCartItems);

/* Configurar eventos para los nuevos elementos del carrito */
function configureCartEvents() {
    var removeCartButtons = document.querySelectorAll('.cart-remove');
    removeCartButtons.forEach((button) => {
        button.addEventListener('click', removeCartItem);
    });

    var quantityInputs = document.querySelectorAll('.cart-quantity');
    quantityInputs.forEach((input) => {
        input.addEventListener('change', quantityChanged);
    });
}

function loadCartItems() {
    var cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
        cartItems = JSON.parse(cartItems);

        for (var i = 0; i < cartItems.length; i++) {
            var item = cartItems[i];
            addProductToCart(item.title, item.productImg);
        }
    }

    // Configurar eventos para los nuevos elementos del carrito
    configureCartEvents();
    // Actualizar el ícono del carrito después de cargar los elementos
    updateCartIcon();
}