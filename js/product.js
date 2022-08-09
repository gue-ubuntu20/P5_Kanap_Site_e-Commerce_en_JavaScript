var string = window.location.href;
var url = new URL(string);
var idProduct = url.searchParams.get("id");
console.log(idProduct);
let article = "";

const colorPicked = document. querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

getArticle();

/* Récupérer les articles de l'API */
function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
        return res.json();
    })

    /* Répartir les données de l'API dans le DOM */
    .then(async function (productData) {
        article = await productData;
        console.table(article);
        if (article){
            getPost(article);
        }
    })
    .catch((error) => {
        console.log("Erreur de la requête API");
    })
}
    
function getPost(article){
   /* Insérer l'image */
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    /* Modifier le titre "h1" */
    let productName = document.getElementById('title');
    productName.innerHTML = article.name;

    /* Modifier le prix */
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    /* Modifier la description */
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;

    /* Insérer les options de couleurs */
    for (let colors of article.colors){
        console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
    addToCart(article);
}

/* Gestion du panier */
function addToCart(article) {
    const btn_envoyerPanier = document.querySelector("#addToCart");

    /* Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100 */
    btn_envoyerPanier.addEventListener("click", (event)=>{
        if (quantityPicked.value > 0 && quantityPicked.value <=100 && quantityPicked.value != 0){

    /* Récupérer le choix de la couleur */
    let choixCouleur = colorPicked.value;
                
    /* Récupérer le choix de la quantité */
    let choixQuantite = quantityPicked.value;

    /* Récupérer les options de l'article à ajouter au panier */
    let optionsProduit = {
        idProduit: idProduct,
        couleurProduit: choixCouleur,
        quantiteProduit: Number(choixQuantite),
        nomProduit: article.name,
        prixProduit: "",
        descriptionProduit: article.description,
        imgProduit: article.imageUrl,
        altImgProduit: article.altTxt
    };

    /* Initialisation du local storage */ 
    let productLocalStorage = JSON.parse(localStorage.getItem("produit"));
    // JSON.parse permet de convertir les données au format JSON qui sont dans le local storage en objet Javascript

    /* Fenêtre pop-up */
    const popupConfirmation =() =>{
        if(window.confirm(`Votre commande de ${choixQuantite} ${article.name} ${choixCouleur} est ajoutée au panier
Pour consulter votre panier, cliquez sur OK`)){
            window.location.href ="cart.html";
}else{
    window.location.href ="index.html";
        }
    }

    /* Importation dans le local storage */
    /* Si le panier comporte déjà au moins 1 article */
    if (productLocalStorage) {
    const resultFind = productLocalStorage.find(
        (el) => el.idProduit === idProduct && el.couleurProduit === choixCouleur);
        /* Si le produit commandé est déjà dans le panier */
        if (resultFind) {
            let newQuantite =
            parseInt(optionsProduit.quantiteProduit) + parseInt(resultFind.quantiteProduit);
            resultFind.quantiteProduit = newQuantite;
            localStorage.setItem("produit", JSON.stringify(productLocalStorage));
            console.table(productLocalStorage);
            popupConfirmation();
        /* Si le produit commandé n'est pas dans le panier */
        } else {
            productLocalStorage.push(optionsProduit);
            localStorage.setItem("produit", JSON.stringify(productLocalStorage));
            console.table(productLocalStorage);
            popupConfirmation();
        }
    /* Si le panier est vide */
    } else {
        productLocalStorage =[];
        productLocalStorage.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(productLocalStorage));
        console.table(productLocalStorage);
        popupConfirmation();
    }}
    });
}
