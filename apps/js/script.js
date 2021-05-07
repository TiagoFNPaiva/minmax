/* SCROLL HORIZONTAL*/

const item = document.getElementsByTagName("html")[0]

window.addEventListener('wheel', function (e) {
    console.log(item.scrollLeft)

    if (e.deltaY > 0) item.scrollLeft += 400;
    else item.scrollLeft -= 400;
});

