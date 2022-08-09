
// Récupérer l'Id de la commande provenant de l'url
var string = window.location.href;
var url = new URL(string);
var idProduct = url.searchParams.get("order");

document.querySelector("#orderId").innerHTML = `${idProduct}`;



