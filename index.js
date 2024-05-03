let text = 'moto'
const key = 'H9jaPIauDqvRxl3D7pldZiRNdmTOBAHslGbPHxha3I8'
let url = `https://api.unsplash.com/photos/random?query=${text}&client_id=${key}&count=30`
let state = []
const row = document.querySelector('.row')
const userFetch = document.getElementById('send')
const form = document.getElementById('formSearch')
const divImg = document.querySelectorAll('.img')
const loop = document.getElementById('loop')
const cross =document.getElementById('cross')
// получение картинки
async function getData(){
    try{
    const res = await fetch(url)
    const data = await res.json()
    if (res.ok){
    state = data
    appendHtml()
    }
}
catch(err){
    console.log(err)
}
}

getData()

// забираем картинку и рисуем див
const setPhotos = () =>{
   return state
    .map(({urls: {regular} }) => {
        return `<div class='img' style='background-image: url(${regular})'></div>`
    })
    .join('');
}
// вставляем в ряд
const appendHtml = () => {
    row.innerHTML = setPhotos()
}
form.addEventListener('submit', (event) => {
    event.preventDefault();
    text = userFetch.value
    url = `https://api.unsplash.com/photos/random?query=${text}&client_id=${key}&count=30`;
    getData()
})
loop.addEventListener('click', () => {
    text = userFetch.value
    url = `https://api.unsplash.com/photos/random?query=${text}&client_id=${key}&count=30`;
    getData()
})
// открываем в новой странице картинки
const transitionLinks = (event) => {
    if (event.target.classList.contains('img')) {
        const backgroundImage = event.target.style.backgroundImage.slice(5, -2);
        window.open(backgroundImage, '_blank');
}
}
document.addEventListener('click', transitionLinks)

// делаем крестик в поле ввода
userFetch.addEventListener('click', function(){
    cross.style.opacity = 1
})
cross.addEventListener('click', function(){
    userFetch.value = ''
})