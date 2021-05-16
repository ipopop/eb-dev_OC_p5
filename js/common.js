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