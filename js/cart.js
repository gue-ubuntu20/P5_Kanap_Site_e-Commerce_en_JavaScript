/* Initialiser le local storage */
let productLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(productLocalStorage);
const positionEmptyCart = document.querySelector("#cart__items");

/* Si le panier est vide */
function getCart() {
    if (productLocalStorage === null || productLocalStorage == 0) {
        const emptyCart = `<p>Le panier est vide</p>`;
        positionEmptyCart.innerHTML = emptyCart;
    } else {
        for (let produit in productLocalStorage) {
            /* Insérer  l'élément "article" */
            let productArticle = document.createElement("article");
            document.querySelector("#cart__items").appendChild(productArticle);
            productArticle.className = "cart__item";
            productArticle.setAttribute('data-id', productLocalStorage[produit].idProduit);

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
            productItemContentTitlePrice.className = "cart__item__content__titlePrice";

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
            productItemContentTitlePrice.appendChild(productPrice);
            productPrice.innerHTML = productLocalStorage[produit].prixProduit + " €";

            /* Insérer  l'élément "div" */
            let productItemContentSettings = document.createElement("div");
            productItemContent.appendChild(productItemContentSettings);
            productItemContentSettings.className = "cart__item__content__settings";

            /* Insérer  l'élément "div" */
            let productItemContentSettingsQuantity = document.createElement("div");
            productItemContentSettings.appendChild(productItemContentSettingsQuantity);
            productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

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
            productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

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
    var elemsQtt = document.getElementsByClassName('itemQuantity');
    var myLength = elemsQtt.length,
        totalQtt = 0;

    for (var i = 0; i < myLength; ++i) {
        totalQtt += elemsQtt[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;
    console.log(totalQtt);

    /* Récupérer le prix total */
    totalPrice = 0;

    for (var i = 0; i < myLength; ++i) {
        totalPrice += (elemsQtt[i].valueAsNumber * productLocalStorage[i].prixProduit);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);
}
getTotals();

/*  Modifier la quantité de produit */
function modifyQtt() {
    let qttModif = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < qttModif.length; k++) {
        qttModif[k].addEventListener("change", (event) => {
            event.preventDefault();

            /* Selectionner l'element à modifier en fonction de son id ET sa couleur */
            let quantityModif = productLocalStorage[k].quantiteProduit;
            let qttModifValue = qttModif[k].valueAsNumber;

            const resultFind = productLocalStorage.find((el) => el.qttModifValue !== quantityModif);

            resultFind.quantiteProduit = qttModifValue;
            productLocalStorage[k].quantiteProduit = resultFind.quantiteProduit;

            localStorage.setItem("produit", JSON.stringify(productLocalStorage));

            /*  refresh rapide */
            location.reload();
        })
    }
}
modifyQtt();

/* Supprimer un produit */
function deleteProduct() {
    let btn_supprimer = document.querySelectorAll(".deleteItem");

    for (let j = 0; j < btn_supprimer.length; j++) {
        btn_supprimer[j].addEventListener("click", (event) => {
            event.preventDefault();

            /* Selectionner l'element à supprimer en fonction de son id ET sa couleur */
            let idDelete = productLocalStorage[j].idProduit;
            let colorDelete = productLocalStorage[j].couleurProduit;

            productLocalStorage = productLocalStorage.filter(el => el.idProduit !== idDelete || el.couleurProduit !== colorDelete);

            localStorage.setItem("produit", JSON.stringify(productLocalStorage));

            /* Alerter produit supprimé et refresh */
            alert("Le produit a bien été supprimé du panier");
            location.reload();
        })
    }
}
deleteProduct();

/* Instauration formulaire avec regex */
function getForm() {
    /*  Ajouter les Regex */
    let form = document.querySelector(".cart__order__form");

    /* Créer les expressions régulières */
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    /*  Ecoute de la modification du prénom */
    form.firstName.addEventListener('change', function () {
        validFirstName(this);
    });

    /*  Ecoute de la modification du prénom */
    form.lastName.addEventListener('change', function () {
        validLastName(this);
    });

    /*  Ecoute de la modification du prénom */
    form.address.addEventListener('change', function () {
        validAddress(this);
    });

    /*  Ecoute de la modification du prénom */
    form.city.addEventListener('change', function () {
        validCity(this);
    });

    /* coute de la modification du prénom */
    form.email.addEventListener('change', function () {
        validEmail(this);
    });

    /* Valider le prénom */
    const validFirstName = function (inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    /* Valider le nom */
    const validLastName = function (inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    /* Valider l'adresse */
    const validAddress = function (inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    /* Valider la ville */
    const validCity = function (inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    /* Valider l'email */
    const validEmail = function (inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
}
getForm();

/* Envoyer les informations client au local storage */
function postForm() {
    const btn_commander = document.getElementById("order");

    /* Ecouter le panier */
    btn_commander.addEventListener("click", (event) => {

        /* Récupérer des coordonnées du formulaire client */
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');

        /* Construire un array depuis le local storage */
        let idProducts = [];
        for (let i = 0; i < productLocalStorage.length; i++) {
            idProducts.push(productLocalStorage[i].idProduit);
        }
        console.log(idProducts);

        const order = {
            contact: {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: idProducts,
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
        };

        fetch("http://localhost:3000/api/products/order", options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                localStorage.clear();
                localStorage.setItem("orderId", data.orderId);

                document.location.href = "confirmation.html";
            })
            .catch((err) => {
                alert("Problème avec fetch : " + err.message);
            });
    })
}
postForm();