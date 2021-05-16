function numberOfArticlesInBasket() {
    const cart = JSON.parse(localStorage.getItem("basket"))
    let articleNumber = 0
    
    if (!cart || cart.length === 0) {
        document.getElementById("cartArticlesNumber").style.display = "none"
        
    } else {
        cart.forEach((item) => {
            let inCart = item.quantite
            articleNumber = articleNumber + inCart
        });
        localStorage.setItem("articleNumber", articleNumber)
        document.getElementById("cartArticlesNumber").textContent = articleNumber
    }
    cart = JSON.parse(localStorage.getItem("basket"))
    return articleNumber
}
numberOfArticlesInBasket()