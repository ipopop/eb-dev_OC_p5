// Datas Request Variables
const API_Category = 'cameras'           // 'teddies' / 'cameras' / 'furniture'
const datasURL = `http://localhost:3000/api/${API_Category}`

// Products Datas
class ProductsDatas {
    async getProducts() {
        const datas = fetch(datasURL)    // fetch to API
            .then((resp) => resp.json()) // 'json' format to async fetch response
        try {
            return datas                 // 'Promise' response
        } catch (err) {
            console.error("fetch datas request error :", err)
        }
    }
}

// DOM Variable
const productsDOM = document.getElementById("products-list") // list target

// Products UI
class ProductsUI {
    displayProducts(datas) {
        let productsListHtml = ''                            // list of all articles
        datas.map(dataItem => {                              // map to all articles datas
            const { name, price, _id, description, imageUrl } = dataItem
            productsListHtml +=                              // add single article to list
                `<div class="data-card">
                    <a id="data" onclick="window.location.href = './produit.html?id=${_id}'">
                        <img src="${imageUrl} " alt="${name}" width="200" height="auto">
                        <div class="card-content">
                            <div class="card-title"><h3>${name}</h3><span>${price*.01}€</span></div>
                            <p>${description}</p>
                        </div>
                    </a>
                </div>`
        })
        productsDOM.innerHTML = productsListHtml             // insert list to target
    }
}

// On Page Loading
document.addEventListener("DOMContentLoaded", () => {
    const productsDatas = new ProductsDatas()       // instance of datas access
    const productsUI = new ProductsUI()             // instance of UI elements

    // Get All Products
    productsDatas
        .getProducts()
        .then(productsDatas => {                      // async fetch response
            productsUI.displayProducts(productsDatas) // UI and datas connexion
        })
})