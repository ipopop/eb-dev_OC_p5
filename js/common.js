// API URL Variable
let datasURL = ''

// Datas Request
class DatasRequest {
    async getProducts(url) {
        const datas = fetch(url)    // fetch to API
            .then((resp) => resp.json()) // 'json' format to async fetch response
        try {
            return datas                 // 'Promise' response
        } catch (err) {
            console.error("fetch datas request error :", err)
        }
    }
}

// New Instance of Class for Datas Request
const datasRequest = new DatasRequest() // new instance of fetch request to API

// Basket Info
function numberOfArticlesInBasket() {
    const cart = JSON.parse(localStorage.getItem("basket"))
    let articleNumber = 0
    
    if (!cart || cart.length === 0) {
        document.getElementById("cartArticlesNumber").style.opacity = "0"
        
    } else {
        cart.forEach((item) => {
            let inCart = item.quantite
            articleNumber = articleNumber + inCart
        });
        localStorage.setItem("articleNumber", articleNumber)
        document.getElementById("cartArticlesNumber").textContent = articleNumber
        document.getElementById("cartArticlesNumber").style.opacity = "1"
    }
    return articleNumber
}
numberOfArticlesInBasket()