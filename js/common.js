// LocalStorage Request Variable
const basket = JSON.parse(localStorage.getItem("basket"))

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
    const basket = JSON.parse(localStorage.getItem("basket"))
    let articleNumber = 0
    
    if (!basket || basket.length === 0) {
        document.getElementById("basketArticlesNumber").style.opacity = "0"
        
    } else {
        basket.forEach((item) => {
            let inbasket = item.quantite
            articleNumber = articleNumber + inbasket
        })
        localStorage.setItem("articleNumber", articleNumber)
        document.getElementById("basketArticlesNumber").textContent = articleNumber
        document.getElementById("basketArticlesNumber").style.opacity = "1"
    }
    return articleNumber
}
numberOfArticlesInBasket()