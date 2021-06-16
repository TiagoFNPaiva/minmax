window.addEventListener("DOMContentLoaded", () => {
    setInterval(rotateC, 2000);
    scrollH(smoothScroll);

    window.addEventListener("resize", function () {
        window.location.href = window.location.href;
    }, true);
})


const item = document.getElementsByTagName("html")[0]


const rotate = document.getElementsByClassName("drt")[0]

const color = ['red', 'blue', 'green', 'yellow', 'grey', 'brown']

const rotateC = () => {
    let a = Math.floor(Math.random() * color.length)
    //console.log(a)
    rotate.style.backgroundColor = color[a]
}


/////////// LOCOMOTIVE  ////////////
const smoothScroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    direction: "horizontal",
    //inertia: 0.5
});

const scrollH = (scroller) => {

    if (window.innerWidth < 1200) {
        scroller.destroy()
    }
    else {
        scroller.start()

        const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;
        const clamp = (num, min, max) => num <= min ? min : num >= max ? max : num;
        let scroll = { cache: 0, current: 0 };
        const allImgs = [...document.querySelectorAll('.slider_img')];
        scroller.on('scroll', (obj) => {
            scroll.current = obj.scroll.x;
            const distance = scroll.current - scroll.cache;
            scroll.cache = scroll.current;
            const skewVal = map(distance, -50, 50, -15, 15);
            allImgs.forEach(el => el.style.transform = 'skewX(' + clamp(skewVal, -15, 15) + 'deg)');
        });
        scroller.update();
    }
}

