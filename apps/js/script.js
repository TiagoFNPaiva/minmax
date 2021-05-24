window.addEventListener("DOMContentLoaded", () => {
    setInterval(rotateC, 2000);
    scrollInit();
    window.addEventListener("resize", function () {
        scrollInit();
    }, true);
})

const item = document.getElementsByTagName("html")[0]

/* SCROLL HORIZONTAL*/

const scrollH = (event) => {
    if (event.deltaY > 0) item.scrollLeft += 400;
    else item.scrollLeft -= 400;
}

const scrollInit = () => {
    if (window.innerWidth >= 1200) {
        window.removeEventListener('wheel', scrollH, true);
        window.addEventListener('wheel', scrollH, true);
    }
    else {
        window.removeEventListener('wheel', scrollH, true);
    }
}


/* Imagens a rodar home*/

const rotate = document.getElementsByClassName("drt")[0]

const color = ['red', 'blue', 'green', 'yellow', 'grey', 'brown']

const rotateC = () => {
    let a = Math.floor(Math.random() * color.length)
    //console.log(a)
    rotate.style.backgroundColor = color[a]
}
