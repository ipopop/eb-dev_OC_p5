class Basket {

  localStorageUpdate() {
    localStorage.setItem("basket", JSON.stringify(basket))
  }

  basketIsEmpty() { // message if empty
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
    document.getElementById("valid_order").style.display = "none"
  }

  populateBasket(result, index) {
    document.getElementById("add-to-basket").innerHTML +=
      `<tbody id="products-tablebody">
      <tr id="array_line col">
        <td><img src="${result.image}"  alt="Camera ${result.name}">
          <br/> ${result.name} <br/> Objectif : ${result.lenses}</td>
        <td class="qty">
          <button id="inc_btn${index}" onclick="btnIncQty(${index})" class="btn btn-sm">
            +
          </button>
          <span id="quantity_number-${index}" class="quantity_product">${result.quantite}</span>
          <button id="dec_btn${index}" onclick="btnDecQty(${index})" class="btn btn-sm">
            -
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
    localStorage.removeItem("totalBasket")
    let total = 0
    basket.forEach(function (result, index) {
      total = total + basket[index].price * basket[index].quantite
    })
    document.getElementById("total_price").textContent = total + " €"
    localStorage.setItem("totalBasket", total)
    return total
  }

  incQty(index) {
    let quantite = document.getElementById(`quantity_number-${index}`)
    let quantityIncrement = ++basket[index].quantite // localstorage increment
    quantite.textContent = quantityIncrement // array update
    let sousTotal = document.getElementById(`sub_total-${index}`)
    let addTotal = basket[index].price * basket[index].quantite
    sousTotal.textContent = `${addTotal} €`
    if (quantityIncrement > 1) {
      document.getElementById(`inc_btn${index}`).removeAttribute("disabled")
    }
  }

  decQty(index) {
    let quantite = document.getElementById(`quantity_number-${index}`)
    let reduceQuantity = --basket[index].quantite // quantity decrease in localstorage
    quantite.textContent = reduceQuantity // quantity update in array
    let sousTotal = document.getElementById(`sub_total-${index}`)
    let addTotal = basket[index].price * basket[index].quantite
    sousTotal.textContent = `${addTotal} €`
    if (reduceQuantity <= 0) {
      document.getElementById(`dec_btn${index}`).setAttribute("disabled", "disabled")
    }
  }

  delArticle(index) {
    basket.splice(index, 1) // delete basket item
    location.reload() // page update
  }

  cleanBasket() { // Clear Basket in localStorage
    localStorage.clear("basket")
    location.reload()
  }
}

// FORM Check
class Form {

  validMail() {
    document.querySelector("#email_error").textContent = ""
    const email = document.querySelector("#email").value
    // Mail Validation (Source Regex Tool : "regexr dot com/3bcrb")
    const regMail = /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,8}$/gm
    if (!regMail.test(email)) {
      document.querySelector("#email_error").textContent =
        "Merci de vérifier votre adresse email"
      return "errorMail"
    }
      return regMail.test(String(email).toLowerCase())
  }

  validZipCode() {
    document.querySelector("#code_error").textContent = ""
    const zipCode = document.querySelector("#postal_code").value;
    const regZipCode = /^(?:0[1-9]|[1-9]\d)\d{3}$/gm // French ZipCode (5 numbers)
    if (!regZipCode.test(zipCode)) {
      document.querySelector("#code_error").textContent =
        "Merci d'indiquer un code postal à 5 chiffres"
      return "errorZip"
    }
    return regZipCode.test(String(zipCode).toLowerCase())
  }

  sanitizeString(str) {
    str = str.replace(/[^A_Za-z0-9äâàáèéêëíïîñóôöúüû \@\.,_-]/gim, "");
    return String(str).toLowerCase().trim();
  }

  cleanForm() {
    document.querySelector("#email_error").textContent = ""
    document.querySelector("#code_error").textContent = ""
  }

  validForm(event) {
    event.preventDefault()
    let input = document.getElementsByTagName("input")

    for (let i = 0; i < input.length; i++) { // check form
      if (input[i].value == "" || this.validMail(i) === "errorMail" || this.validZipCode(i) === "errorZip") {
        return "errorForm"                         // error if empty
      }
    }
  }
}

// POST with order number & contact infos
class Post {
  requestPost() { 
    const product_id = basket.map(product => product.id)
    
    let contact = {
      contact: {
        firstName: document.querySelector("#firstname").value.trim(),
        lastName: document.querySelector("#name").value.trim(),
        address: document.querySelector("#adress").value.trim(),
        city: document.querySelector("#city").value.trim(),
        email: document.querySelector("#email").value.trim(),
      },
      products: product_id,
    }

    const request = new Request(                                   // POST to API
      "http://localhost:3000/api/cameras/order", {
        method: "POST",
        body: JSON.stringify(contact),
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      }
    )

    fetch(request)
      .then((response) => response.json())
      .then((response) => {                                        // API response for order number
        let numOrder = response.orderId
        localStorage.setItem("order_id", JSON.stringify(numOrder)) // update localstorage with order number
        localStorage.setItem("contact", JSON.stringify(contact))   // update localstorage with user infos
    })
  }

  confirmCde() { // Confirm & Go to order page
    alert("Votre commande a bien été validée, vous allez être redirigé")
    setTimeout(function () {
      window.location = 'commande.html'
    }, 1500)
  }
}

// Check Page
let currentBasketPage = window.location.pathname
if (currentBasketPage === '/panier.html') {

  // Basket
  const myBasket = new Basket() // Instance of Class

  // Auto Launch On Page Loading
  document.addEventListener("DOMContentLoaded", () => {
    if (basket != null && basket.length > 0) { // Check Empty basket
      basket.forEach(function (result, index) {
        myBasket.totalBasket()
        myBasket.populateBasket(result, index)
      })
    } else {
      myBasket.basketIsEmpty()
    }
    if (basket != null && basket.quantite === 0) {
      myBasket.cleanBasket()
    }
  })

  // On User Click
  function btnIncQty(index) { // On User Click : '+'
    myBasket.incQty(index)
    myBasket.localStorageUpdate()
    myBasket.totalBasket()
    numberOfArticlesInBasket()
  }

  function btnDecQty(index) { // On User Click : '-'
    myBasket.decQty(index)
    myBasket.localStorageUpdate()
    myBasket.totalBasket()
    numberOfArticlesInBasket()
  }

  function deleteArticle(index) { // On User Click : 'x'
    if (basket.length > 0 || basket) {
      myBasket.delArticle(index)
    } else {
      myBasket.cleanBasket()
    }
    if (basket.length < 1) {
      myBasket.basketIsEmpty()
    }
    myBasket.localStorageUpdate()
  }

  function emptyBasket() { // On User Click...
    myBasket.cleanBasket()
    myBasket.basketIsEmpty()
  }

  // Order Form
  const checkForm = new Form()

  // Order Post
  const postOrder = new Post()

  // Envent to Control Mail when Out of Focus
  document.querySelector("#email").addEventListener("blur", function () {
    checkForm.validMail()
  })

  // Event to Control ZipCode when Out of Focus
  document.querySelector("#postal_code").addEventListener("blur", function () {
    checkForm.validZipCode()
  })

  // Clean Form on Click
  document.querySelector("#refresh").addEventListener("click", function () {
    checkForm.cleanForm()
  })

  // Form Check & Post on Click
  document.querySelector("#cde_form").addEventListener("submit", function (event) {
    if (checkForm.validForm(event) === "errorForm") {
      alert("Oups! Formulaire non valide ! Merci de renseigner correctement le formulaire")
    } else {
      postOrder.requestPost()
      postOrder.confirmCde()
      localStorage.removeItem("basket")
      myBasket.totalBasket()
    }
  })
}
