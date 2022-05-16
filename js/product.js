/* Faire le lien entre un produit de la page
d’accueil et la page Produit */

var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");
console.log(idProduct);
let product = "";

const colorPicked = document.querySelector('#color');
const selectedQuantity = document.getElementById("quantity");

getProduct();

/* Récupèrer les produits de l'API */

function getProduct() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
        return res.json();
    })

    .then(async function (productData) {
        article = await productData;
        console.table(article);
        if (article){
            getPost(article);
        }
    })
    .catch((error) => {
        console.log("Erreur");
    })
}
    
function getPost(article){
    /* Inserer l'image */
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    /* Modifier le titre "h1" */
    let productName = document.getElementById('title');
    productName.innerHTML = article.name;

    /* Modifier prix */
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    /* Modifier de la description */
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;

    /* Inserer des options de couleurs */
    for (let colors of article.colors){
        console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
    addToCart(article);
}

/* Gerer le panier */
function addToCart(article) {
    const btn_envoyerPanier = document.querySelector('#addToCart');

    /* Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100 */

    btn_envoyerPanier.addEventListener("click", (event)=>{
        if (selectedQuantity.value > 0 && selectedQuantity.value <=100 && selectedQuantity.value != 0){

    /* Recupèrer le choix de la couleur */
    let choixCouleur = colorPicked.value;
                
    /* Recupèrer le choix de la quantité */
    let choixQuantite = selectedQuantity.value;

    /* Recupèrer les options du produit à ajouter au panier */
    let optionsProduit = {
        idProduit: idProduct,
        couleurProduit: choixCouleur,
        quantiteProduit: Number(choixQuantite),
        nomProduit: article.name,
        prixProduit: article.price,
        descriptionProduit: article.description,
        imgProduit: article.imageUrl,
        altImgProduit: article.altTxt
    };

    /* Initialer le local storage */
    // Déclarer la variable "produit"
    let produitRegisteredLocalStorage = JSON.parse(localStorage.getItem("produit"));

    /* Fenêtre apparaitre */
    const showupConfirmation =() =>{
        if(window.confirm( `${choixQuantite} ${article.name} ${choixCouleur} est ajoutée au panier
Pour consulter votre panier, cliquez sur OK`)){
            window.location.href ="cart.html";
        }
    }

    /* Importation dans le local storage */
    /* Si le panier comporte déjà au moins 1 article */
    
    if (produitRegisteredLocalStorage) {
    const findResult = produitRegisteredLocalStorage.find(
        (el) => el.idProduit === idProduct && el.couleurProduit === choixCouleur);

        /* Si le produit commandé est déjà dans le panier */
        if (findResult) {
            let newQuantite =
            parseInt(optionsProduit.quantiteProduit) + parseInt(findResult.quantiteProduit);
            findResult.quantiteProduit = newQuantite;
            localStorage.setItem("produit", JSON.stringify(produitRegisteredLocalStorage));
            console.table(produitRegisteredLocalStorage);
            showupConfirmation();

        /* Si le produit commandé n'est pas dans le panier */
        } else {
            produitRegisteredLocalStorage.push(optionsProduit);
            localStorage.setItem("produit", JSON.stringify(produitRegisteredLocalStorage));
            console.table(produitRegisteredLocalStorage);
            showupConfirmation();
        }
        
    /* Si le panier est vide */
    } else {
        produitRegisteredLocalStorage =[];
        produitRegisteredLocalStorage.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(produitRegisteredLocalStorage));
        console.table(produitRegisteredLocalStorage);
        showupConfirmation();
    }}
    });
}
		
