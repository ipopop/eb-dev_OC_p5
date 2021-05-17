// Datas Request Variables
const API_Category = 'cameras'           // 'teddies' / 'cameras' / 'furniture'
datasURL = `http://localhost:3000/api/${API_Category}`

// DOM Variable
productsDOM = document.getElementById("products-list") // list target

// Products UI
class ProductsUI {
    displayProducts(datas) {
        let productsListHtml = ''                  // list of all articles
        datas.map(datasFields => {       // map to all articles datas
            let { name, price, _id, description, imageUrl } = datasFields
            productsListHtml += `
                <div class="data-card">
                    <a id="data" onclick="window.location.href = './produit.html?id=${_id}'">
                        <img src="${imageUrl} " alt="${name}" width="200" height="auto">
                        <div class="card-content">
                            <div class="card-title"><h3>${name}</h3><span>${price * .01}€</span></div>
                            <p>${description}</p>
                        </div>
                    </a>
                </div>`           // add single el. to list
        })
        productsDOM.innerHTML = productsListHtml      // insert list to target
    }
}

// On Page Loading
document.addEventListener("DOMContentLoaded", () => {
    const productsUI = new ProductsUI()             // Instance of UI Product Class

    // Get All Products
    datasRequest
        .getProducts(datasURL)
        .then(datasRequest => {                      // async fetch response
            productsUI.displayProducts(datasRequest) // UI and datas connexion
        })
})
