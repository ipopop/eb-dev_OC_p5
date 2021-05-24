// Datas Request Variables
const API_Category = "cameras" // 'teddies' / 'cameras' / 'furniture'

// get the 'id' value in the page url
// ex. : http://127.0.0.1:5500/produit.html?id=5be1ed3f1c9d44000030b061
const productID = new URL(window.location).searchParams.get('id')
datasURL = `http://localhost:3000/api/${API_Category}/${productID}`

// DOM Variables
const productDOM = document.getElementById("select_product") // list target

// Selected Product UI
class ProductUI {
    displayProduct(datas) {
        Array.of(datas).map(dataItem => {                    // map on article fields
            const { name, price, description, imageUrl } = dataItem
            productDOM.innerHTML =                           // insert html to target
            `<div class="data-card">
                <img src="${imageUrl} " alt="${name}" width="200" height="auto">
                <div class="card-content">
                    <div class="card-title">
                        <h3>${name}</h3><span>${price*.01}€</span>
                    </div>
                    <p>${description}</p>
                </div>
            </div>`
        })
    }
}

// Options Variable
const optionType = "lenses"  // 'colors' / 'lenses' / 'varnish'

// DOM Variable
const optionsDOM = document.getElementById("lense_option") // options target

// Selected Product Options
class ProductOptions {
    addOptions(productData) {
        const optionsList = productData[optionType]       // options list by article
        for (let i = 0; i < optionsList.length; i++) {    // article options loop
            const optionItem = optionsList[i]
            optionsDOM.innerHTML +=                       // add every option to target
                `<option value="${optionItem}">${optionItem}</option>`
        } 
    }
}

// Add The Selected Product To Cart
class AddToBasket {
    addToCart(productData) {
                                                    // localStorage Check
        const basket = JSON.parse(localStorage.getItem("basket")) || []

        basket.push({                               // Add in Basket
            image: productData.imageUrl,
            name: productData.name,
            id: productData._id,
            lenses: lense_option.value,
            description: productData.description,
            price: productData.price * .01,
            quantite: 1,
            subtotal: productData.price * .01 * 1
        })
                                                    // adds Basket to localStorage
        window.localStorage.setItem("basket", JSON.stringify(basket))
    }
}

// Infos Variable
const infoDOM = document.getElementById("insert-info")

// Add User Info
class InfoToUser {
    alertInfoCheck() {
        alert("Avant de valider pensez à choisir un objectif")
    }
    alertInfoAdd() {
        alert("L'article a bien été ajouté à votre panier")
    }
    insertInfoAdd() {
        infoDOM.innerHTML =
            `<div class="product-info center col">
                <a href="panier.html">
                    <button id="btn-info-basket" type="button" class="btn">
                        Voir votre Panier
                    </button>
                </a>
            </div>`
    }
}

// On Page Loading
document.addEventListener("DOMContentLoaded", () => {
    const productUI = new ProductUI()         // new instance of HTML bloc
    const productOptions = new ProductOptions()

    // Get Selected Product & Display It
    datasRequest
        .getProducts(datasURL)                // launch method to request API
        .then(datasRequest => {               // async response result from API
            productUI.displayProduct(datasRequest)
            productOptions.addOptions(datasRequest)
        })
})

// DOM Variables
const selecOptionDOM = document.querySelector("select") // select.option target

// On User Click : 'Add To basket'
const btnAdd = document.getElementById('btn_add_to_basket')
btnAdd.addEventListener("click", function btnAddToBasket() {
    const infoToUser = new InfoToUser()
    const optionSelect = selecOptionDOM.value // retrieves value of select. option
    if (optionSelect === "") {                // check if option is selected
        infoToUser.alertInfoCheck()           // alert user to select option
    } else {

        // Add Selected Product to basket
        const addToBasket = new AddToBasket()
        datasRequest
            .getProducts(datasURL)
            .then(datasRequest => {
                addToBasket.addToCart(datasRequest)
                infoToUser.alertInfoAdd()     // confirm "add to basket" to user
                infoToUser.insertInfoAdd()    // add "go to basket" button
                numberOfArticlesInBasket()    // update article number info
            })
    }
})

