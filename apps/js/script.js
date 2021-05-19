window.addEventListener("DOMContentLoaded", () => {
    setInterval(rotateC, 2000);
})


/* SCROLL HORIZONTAL*/

const item = document.getElementsByTagName("html")[0]

window.addEventListener('wheel', function (e) {
    //console.log(item.scrollLeft)

    if (e.deltaY > 0) item.scrollLeft += 400;
    else item.scrollLeft -= 400;
});


/* Imagens a rodar home*/

const rotate = document.getElementsByClassName("drt")[0]

const color = ['red', 'blue', 'green', 'yellow', 'grey', 'brown']

const rotateC = () => {
    let a = Math.floor(Math.random() * color.length)
    console.log(a)
    rotate.style.backgroundColor = color[a]
}
