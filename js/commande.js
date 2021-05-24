class Order {
  showOrder() {
    let currentOrder = localStorage.getItem("order_id")

    if (currentOrder) {
      document.getElementById("order_number").style.display = "none"
      document.getElementById("order").innerHTML += `
        <div class="order">
          <h3>🙏 Merci pour votre achat 🎁</h3>
          <div>Votre commande a été enregistrée sous le numéro :</div>
          <div><strong>${localStorage.order_id}</strong></div>
          </br>
          <div>Pour un montant total de : <strong>${localStorage.totalBasket} €</strong></div>
          <h3>Nous vous avons envoyé une confirmation de commande dans votre boite mail 📨</h3>
          <div>A très bientôt sur notre boutique 🤩</div>
        </div>
        <img rel="preload" as=image src="./img/thankYou.jpg" alt="thank you" width="600" height="auto">
      `
    } else {
      document.getElementById("order").style.display = "none"
      document.getElementById("order_number").innerHTML += `
        <div class="container center col">
          <h3>Vous n'avez aucune commande en cours pour l'instant</h3>
          <button type="button" class="btn btn-sm"><a href="index.html">Retourner à la liste de produits</a></button>
        </div>
      `
    }
  }
}

const order = new Order()

// On Page Loading
document.addEventListener("DOMContentLoaded", () => {
  order.showOrder()
})
