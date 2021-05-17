// LocalStorage Request Variable
const basket = JSON.parse(localStorage.getItem("basket"))

// class
class Cart {
  localStorageCheck() {             // localstorage update
    localStorage.setItem("basket", JSON.stringify(basket))
  }

  cartIsEmpty() {
    let currentPage = window.location.pathname
    if (currentPage === '/panier.html') {
      document.getElementById("empty_basket").innerHTML +=
        `<div class="container center col txt-center">
          <h3>Votre panier est vide</h3>
          <a href="index.html">
            <button type="button" class="btn btn-sm">
              Retourner à la liste de produits
            </button>
          </a>
        </div>`

      document.getElementById("basket-array").style.display = "none"
      document.getElementById("clean-basket").style.display = "none"
      document.getElementById("cde_form").style.display = "none"
      document.getElementById("valid_command").style.display = "none"
    }
  }

  populateCart(result, index) {
    document.getElementById("add-to-basket").innerHTML +=
      `<tbody id="products-tablebody">
        <tr id="array_line col">
          <td><img src="${result.image}"  alt="Camera ${result.name}">
            <br/> ${result.name} <br/> Objectif : ${result.lenses}</td>
          <td class="qty">
            <button onclick="decreaseQuantity(${index})" id="subst-btn-${index}" class="btn btn-sm">
              -
            </button>
            <span id="quantity_number-${index}" class="quantity_product">${result.quantite}</span>
            <button onclick="addQuantity(${index})" id="plus-btn-${index}" class="btn btn-sm">
              +
            </button>
          </td>
          <td id="unit_price${index}" class="unit-price">${result.price} €</td>
          <td id="sub_total-${index}" class="subtotal">${result.subtotal * result.quantite + " €"}</td>
          <td>
            <span id="delete_product" onclick="deleteArticle(${index})" type="button" class="btn btn-sm" title="Retirer cet article de votre panier">
              x
            </span>
          </td>
        </tr>
      </tbody>`
  }

  totalBasket() {
    let total = 0;
    basket.forEach(function (result, index) {
      total = total + basket[index].price * basket[index].quantite;
    });
    document.getElementById("total_price").textContent = total + " €";
    localStorage.setItem("totalBasket", total);
  }

  incQty(index) {
    let quantite = document.getElementById(`quantity_number-${index}`)
    let quantityIncrement = ++basket[index].quantite // localstorage increment
    quantite.textContent = quantityIncrement         // array update
    let sousTotal = document.getElementById(`sub_total-${index}`)
    let addTotal = basket[index].price * basket[index].quantite
    sousTotal.textContent = `${addTotal} €`
    if (quantityIncrement > 1) {
      document.getElementById(`subst-btn-${index}`).removeAttribute("disabled")
    }
  }

  decQty(index) {
    let quantite = document.getElementById(`quantity_number-${index}`)
    let reduceQuantity = --basket[index].quantite // quantity decrease in localstorage
    quantite.textContent = reduceQuantity         // quantity update in array
    let sousTotal = document.getElementById(`sub_total-${index}`)
    let addTotal = basket[index].price * basket[index].quantite
    sousTotal.textContent = `${addTotal} €`
    if (reduceQuantity <= 0) {
      document.getElementById(`subst-btn-${index}`).setAttribute("disabled", "disabled")
    }
  }

  delArticle(index) {
    basket.splice(index, 1) // delete basket item
    location.reload()       // page update
  }

  // empty basket & localStorage
  cleanBasket() {
    localStorage.clear()
    location.reload()
  }
}

// Check Page
let currentCartPage = window.location.pathname;
if (currentCartPage === '/panier.html') {

  const myCart = new Cart()                            // Instance of Class

  // Auto Launch On Page Loading
  document.addEventListener("DOMContentLoaded", () => {
    if (basket != null && basket.length > 0 ) {                           // Check Empty Cart
      basket.forEach(function (result, index) {
        myCart.totalBasket()
        myCart.populateCart(result, index)
      })
    } else { myCart.cartIsEmpty() }
    if (basket != null && basket.quantite === 0)  { myCart.cleanBasket() }
  })
  
  // On User Click  
  function addQuantity(index){                   // On User Click : '+'
    myCart.incQty(index)
    myCart.localStorageCheck()
    myCart.totalBasket()
    numberOfArticlesInBasket()
  }
  
  function decreaseQuantity(index){              // On User Click : '-'
    myCart.decQty(index)
    myCart.localStorageCheck()
    myCart.totalBasket()
    numberOfArticlesInBasket()
  }
  
  function deleteArticle(index){                 // On User Click : 'x'
    if (basket.length > 0 || basket) {
      myCart.delArticle(index)
    } else { myCart.cleanBasket() }
    if (basket.length < 1) { myCart.cartIsEmpty() }
    myCart.localStorageCheck()
  }

  function emptyBasket(){                        // On User Click...
    myCart.cleanBasket()
    myCart.cartIsEmpty()
  }
}