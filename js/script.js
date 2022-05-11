let productData =[];

/* Recupération des données de l'API */

 fetch("http://localhost:3000/api/products")
   
    .then((res) => res.json())
    .then((promise) => {
      productData = promise;
      console.log(productData);
   
      for (let article in productData) {
          /* Insertion de l'élément "ancre" */
          let productLink = document.createElement("a");
          document.querySelector(".items").appendChild(productLink);
          productLink.href = `product.html?id=${productData[article]._id}`;

          /* Insertion de l'élément "article" */
          let productArticle = document.createElement("article");
          productLink.appendChild(productArticle);

          /* Insertion de l'image */
          let productImg = document.createElement("img");
          productArticle.appendChild(productImg);
          productImg.src = productData[article].imageUrl;
          productImg.alt = productData[article].altTxt;

          /* Insertion du titre "h3" */
          let productName = document.createElement("h3");
          productArticle.appendChild(productName);
          productName.classList.add("productName");
          productName.innerHTML = productData[article].name;

          /* Insertion de la description "p" */
          let productDescription = document.createElement("p");
          productArticle.appendChild(productDescription);
          productDescription.classList.add("productName");
          productDescription.innerHTML = productData[article].description;
      }
  })
  .catch (function(error){
      return error;
  });

