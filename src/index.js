let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  getToys()
  createNewToy()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function getToys (){
fetch('http://localhost:3000/toys')
.then((resp)=> resp.json())
.then((json)=> json.forEach((toy) => buildToyCards(toy)))
}







function buildToyCards (toy){
  let like = toy.likes
  const topDiv = document.getElementById('toy-collection')
  const newDiv = document.createElement('div')
  newDiv.setAttribute('class', 'card')
  const h2 = document.createElement('h2')
  h2.innerText= `${toy.name}`
  const img = document.createElement('img')
  img.setAttribute('src', `${toy.image}`)
  img.setAttribute('class', 'toy-avatar')
  const p = document.createElement('p')
  p.innerText= `${like} Likes`
  const button = document.createElement('button')
  button.setAttribute('class', 'like-btn')
  button.setAttribute('id', `${toy.id}`)
  button.innerText= 'Like ❤️'
  button.addEventListener('click', function(){
    let updatedLikes = `${++like} Likes`
    p.innerText= updatedLikes
    updateLikes(toy, updatedLikes)
  })
  newDiv.appendChild(h2)
  newDiv.appendChild(img)
  newDiv.appendChild(p)
  newDiv.appendChild(button)
  topDiv.appendChild(newDiv)

  //console.log(newDiv)

}



function postNewToy (e, name, img){
  e.preventDefault()
  console.log('name :', name.value, 'img :',img.value)
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers:{
      "Content-Type": "application/json",
      Accept: 'application/json'
    },
    body: JSON.stringify({
      "name": `${name.value}`,
      "image": `${img.value}`,
      "likes": 0
    })

  })
.then((resp)=> resp.json())
.then((toy)=> buildToyCards(toy))
}

function createNewToy(){
  const form = document.querySelector('.add-toy-form')
  const newToyName = document.querySelector('input[name="name"]')
  const newToyImg = document.querySelector('input[name="image"]')
  form.addEventListener('submit', (e) => postNewToy(e, newToyName, newToyImg))
}

function updateLikes(toy, likes){
  fetch(`http://localhost:3000/toys/${toy.id}`,{
    method:"PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "likes":`${likes}`
    })
  })
  .then((res) => res.json())
  .then((toy)=> console.log(toy))
}