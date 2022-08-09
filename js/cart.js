/* Initialiser le local storage */

// C'est pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript
let productLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(productLocalStorage);

/* Sélection de la classe (div) afin d'injecter le code HTML */
const positionEmptyCart = document.querySelector("#cart__items");

/* Si le panier est vide */
function getCart() {
  if (productLocalStorage === null || productLocalStorage == 0) {
    const emptyCart = `<p>Le panier est vide</p>`;
    positionEmptyCart.innerHTML = emptyCart;
  } else {
    // Si le panier n'est pas vide
    for (let produit in productLocalStorage) {
      /* Insérer  l'élément "article" */
      let productArticle = document.createElement("article");
      document.querySelector("#cart__items").appendChild(productArticle);
      productArticle.className = "cart__item";
      productArticle.setAttribute(
        "data-id",
        productLocalStorage[produit].idProduit
      );

      /* Insérer  l'élément "div" */
      let productDivImg = document.createElement("div");
      productArticle.appendChild(productDivImg);
      productDivImg.className = "cart__item__img";

      /* Insérer  l'image */
      let productImg = document.createElement("img");
      productDivImg.appendChild(productImg);
      productImg.src = productLocalStorage[produit].imgProduit;
      productImg.alt = productLocalStorage[produit].altImgProduit;

      /* Insérer  l'élément "div" */
      let productItemContent = document.createElement("div");
      productArticle.appendChild(productItemContent);
      productItemContent.className = "cart__item__content";

      /* Insérer  l'élément "div" */
      let productItemContentTitlePrice = document.createElement("div");
      productItemContent.appendChild(productItemContentTitlePrice);
      productItemContentTitlePrice.className =
        "cart__item__content__titlePrice";

      // Insertion du titre h3 */
      let productTitle = document.createElement("h2");
      productItemContentTitlePrice.appendChild(productTitle);
      productTitle.innerHTML = productLocalStorage[produit].nomProduit;

      /* Insérer  la couleur */
      let productColor = document.createElement("p");
      productTitle.appendChild(productColor);
      productColor.innerHTML = productLocalStorage[produit].couleurProduit;
      productColor.style.fontSize = "20px";

      // Insertion du prix */
      let productPrice = document.createElement("p");
      
      productPrice.innerHTML = productLocalStorage[produit].prixProduit + " €";

      /* Insérer  l'élément "div" */
      let productItemContentSettings = document.createElement("div");
      productItemContent.appendChild(productItemContentSettings);
      productItemContentSettings.className = "cart__item__content__settings";

      /* Insérer  l'élément "div" */
      let productItemContentSettingsQuantity = document.createElement("div");
      productItemContentSettings.appendChild(
        productItemContentSettingsQuantity
      );
      productItemContentSettingsQuantity.className =
        "cart__item__content__settings__quantity";

      /* Insérer la "Qté : " */
      let productQte = document.createElement("p");
      productItemContentSettingsQuantity.appendChild(productQte);
      productQte.innerHTML = "Qté : ";

      /* Insérer la quantité */
      let productQuantity = document.createElement("input");
      productItemContentSettingsQuantity.appendChild(productQuantity);
      productQuantity.value = productLocalStorage[produit].quantiteProduit;
      productQuantity.className = "itemQuantity";
      productQuantity.setAttribute("type", "number");
      productQuantity.setAttribute("min", "1");
      productQuantity.setAttribute("max", "100");
      productQuantity.setAttribute("name", "itemQuantity");

      /* Insérer l'élément "div" */
      let productItemContentSettingsDelete = document.createElement("div");
      productItemContentSettings.appendChild(productItemContentSettingsDelete);
      productItemContentSettingsDelete.className =
        "cart__item__content__settings__delete";

      /* Insérer de "p" supprimer */
      let productSupprimer = document.createElement("p");
      productItemContentSettingsDelete.appendChild(productSupprimer);
      productSupprimer.className = "deleteItem";
      productSupprimer.innerHTML = "Supprimer";
    }
  }
}
getCart();

function getTotals() {
  /* Récupérer le total des quantités */
  var elemsQtt = document.getElementsByClassName("itemQuantity");
  var myLength = elemsQtt.length,
    totalQtt = 0;

  for (var i = 0; i < myLength; ++i) {
    totalQtt += elemsQtt[i].valueAsNumber;
  }

  let productTotalQuantity = document.getElementById("totalQuantity");
  productTotalQuantity.innerHTML = totalQtt;
  console.log(totalQtt);

  
  // On rajoute une ligne au tableau pour chaque article ajouté au panier, en prenant compte de la quantité

 function displayTotalPrice() {
  const totalPrie = document.querySelector("#totalPrice")
  const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  totalPrie.textContent = total
 }

/*  Modifier la quantité de produit */
function modifyQtt() {
  let qttModif = document.querySelectorAll(".itemQuantity");

  // Aller récupérer la quantité dans le panier
  for (let k = 0; k < qttModif.length; k++) {
    qttModif[k].addEventListener("change", (event) => {
      event.preventDefault();

      /* Selectionner l'element à modifier en fonction de son id ET sa couleur */
      let quantityModif = productLocalStorage[k].quantiteProduit;
      let qttModifValue = qttModif[k].valueAsNumber;

      const resultFind = productLocalStorage.find(
        (el) => el.qttModifValue !== quantityModif
      );

      resultFind.quantiteProduit = qttModifValue;
      productLocalStorage[k].quantiteProduit = resultFind.quantiteProduit;

      localStorage.setItem("produit", JSON.stringify(productLocalStorage));

      /*  refresh rapide */
      location.reload();
    });
  }
}
modifyQtt();

/* Supprimer un produit */
function deleteProduct() {
  let deletedBtn = document.querySelectorAll(".deleteItem");

  for (let j = 0; j < deletedBtn.length; j++) {
    deletedBtn[j].addEventListener("click", (event) => {
      event.preventDefault();

      /* Selectionner l'element à supprimer en fonction de son id ET sa couleur */
      let idDelete = productLocalStorage[j].idProduit;
      let colorDelete = productLocalStorage[j].couleurProduit;

      productLocalStorage = productLocalStorage.filter(
        (el) => el.idProduit !== idDelete || el.couleurProduit !== colorDelete
      );

      /* On envoie la variable dans le local storage */
      localStorage.setItem("produit", JSON.stringify(productLocalStorage));

      /* Alerter produit supprimé et refresh */
      alert("Le produit a bien été supprimé du panier");
      location.reload();
    });
  }
}
deleteProduct();

/* Instaurer le formulaire avec regex */
function getForm() {
  /*  Ajouter les Regex */
  let form = document.querySelector(".cart__order__form");

  /* Créer les expressions régulières */
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressRegExp = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );

  /*  Ecoute de la modification du prénom */
  form.firstName.addEventListener("change", function () {
    validFirstName(this);
  });

  form.lastName.addEventListener("change", function () {
    validLastName(this);
  });

  form.address.addEventListener("change", function () {
    validAddress(this);
  });

  form.city.addEventListener("change", function () {
    validCity(this);
  });

  form.email.addEventListener("change", function () {
    validEmail(this);
  });

  /* Valider le prénom */
  const validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (charRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = "";
    } else {
      firstNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  /* Valider le nom */
  const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (charRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = "";
    } else {
      lastNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  /* Valider l'adresse */
  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = "";
    } else {
      addressErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  /* Valider la ville */
  const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = "";
    } else {
      cityErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  /* Valider l'email */
  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = "";
    } else {
      emailErrorMsg.innerHTML = "Veuillez renseigner votre email.";
    }
  };
}
getForm();

function send_commande() {
  let productLocalStorage = JSON.parse(localStorage.getItem("produit"));

  /* Récupérer les coordonnées du formulaire client */
  let inputName = document.getElementById("firstName");
  let inputLastName = document.getElementById("lastName");
  let inputAdress = document.getElementById("address");
  let inputCity = document.getElementById("city");
  let inputMail = document.getElementById("email");

  /* Construire un array depuis le local storage */
  let idProducts = [];
  for (let i = 0; i < productLocalStorage.length; i++) {
    idProducts.push(productLocalStorage[i].idProduit);
  }

  const order = {
    contact: {
      firstName: inputName.value,
      lastName: inputLastName.value,
      address: inputAdress.value,
      city: inputCity.value,
      email: inputMail.value,
    },
    products: idProducts,
  };
  console.log(order);
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      //localStorage.clear();
      window.location = `confirmation.html?order=${result.orderId}`;
    })
}