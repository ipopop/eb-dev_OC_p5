// Datas Request Variables
const API_Category = "cameras" // 'teddies' / 'cameras' / 'furniture'

// get the 'id' value in the page url
// ex. : http://127.0.0.1:5500/produit.html?id=5be1ed3f1c9d44000030b061
const productID = new URL(window.location).searchParams.get('id')
const datasURL = `http://localhost:3000/api/${API_Category}/${productID}`

// Selected Product Datas
class ProductDatas {
    async getProduct() {
        const datas = fetch(datasURL)    // fetch to API
            .then((resp) => resp.json()) // 'json' format to async fetch response
        try {
            return datas                 // 'Promise' response
        } catch (err) {
            console.error("fetch datas request error :", err)
        }
    }
}

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
            subTotal: productData.price * .01 * 1
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

// New Instance of Class for Datas Request
const productDatas = new ProductDatas() // new instance of fetch request to API

// On Page Loading
document.addEventListener("DOMContentLoaded", () => {
    const productUI = new ProductUI()        // new instance of HTML bloc
    const productOptions = new ProductOptions()

    // Get Selected Product & Display It
    productDatas
        .getProduct()                        // launch method to request API
        .then(productDatas => {              // async response result for UI
            productUI.displayProduct(productDatas)
            productOptions.addOptions(productDatas)
        })
})

// DOM Variables
const selecOptionDOM = document.querySelector("select") // select.option target

// On User Click : 'Add To Cart'
function addToCartOnClick() {
    const infoToUser = new InfoToUser()
    const optionSelect = selecOptionDOM.value // retrieves value of select. option
        if (optionSelect === "") {            // check if option is selected
            infoToUser.alertInfoCheck()      // alert user to select option
        } else {
            
            // Add Selected Product to Cart
            const addToBasket = new AddToBasket()
            productDatas
                .getProduct()
                .then(productDatas => {
                    addToBasket.addToCart(productDatas)
                    infoToUser.alertInfoAdd()  // confirm "add to cart" to user
                    infoToUser.insertInfoAdd() // add "go to cart" button
                    numberOfArticlesInBasket() // update article number info
                })
    }
}
