function getCatData() {
  //const URL = "https://aws.random.cat/meow";
  const URL = "http://localhost:3000/meow";
  fetch(URL)
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(data) {
      var result = data.file;
      var image = document.createElement("img");
      var imageParent = document.getElementById("result");
      image.id = "id";
      image.className = "img-thumbnail";
      image.src = result;
      imageParent.appendChild(image);
    });
}
