window.addEventListener("DOMContentLoaded", () => {
    //setInterval(rotateC, 2000);
    scrollH(smoothScroll);
    /*
    window.addEventListener("resize", function () {
        window.location.href = window.location.href;
    }, true);
    */
    const local = document.querySelectorAll('.pixi')
    Array.from(local).forEach((element, i) => new glitch(element, imagesArr[i]));

    const box = document.querySelectorAll('.pixi');
    if (window.outerWidth > 1280) {
        document.addEventListener('wheel', function () {
            Array.from(box).forEach(element => isInViewport(element) ? element.style.filter = "grayscale(0)" : element.style.filter = "grayscale(1)")
        }, {
            passive: true
        });
    }
})

//const

const date = new Date();
const copyright = document.getElementById("copyright_text")
copyright.innerHTML += ` ${date.getFullYear()}`

const imagesArr = ['images/image_services_branding.png', 'images/image_services_website.png', 'images/image_services_social-media.png', 'images/image_services_gaming.png', 'images/image_services_illustration.png']


const item = document.getElementsByTagName("html")[0]



/* SCROLL HORIZONTAL



window.addEventListener('wheel', function (e) {
    //console.log(item.scrollLeft)

    if (e.deltaY > 0) item.scrollLeft += 400;
    else item.scrollLeft -= 400;
});

*/
/////////// LOCOMOTIVE  ////////////
const smoothScroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    direction: "horizontal",
    //inertia: 0.5
});

const scrollH = (scroller) => {

    if (window.innerWidth < 1024) {
        scroller.destroy()
    }
    else {
        scroller.start()
        /*
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
        */
        scroller.update();
    }
}

/*in view*/
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= (window.innerWidth - (window.innerWidth / 1.05) || document.documentElement.clientWidth - (document.documentElement.clientWidth / 1.05)) &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth / 1.0 || document.documentElement.clientWidth / 1.0)

    );
}

/* Glitch*/

class glitch {

    constructor(props, imageSrc) {
        //console.log(props)
        const canvas = props

        // create stage
        //const imgLink = 'https://images.unsplash.com/photo-1546465282-0b4b7b64edf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        //const canvas = document.querySelector('.pixi')


        var myImage = new Image();
        myImage.src = imageSrc;


        const app = new PIXI.Application({
            view: canvas,

            transparent: true
        })

        // image
        const texture = PIXI.Texture.from(myImage.src)
        this.img = new PIXI.Sprite(texture)

        // center image
        this.img.width = app.screen.width
        this.img.height = app.screen.height
        this.img.x = (app.screen.width / 2)
        this.img.y = app.screen.height / 2
        this.img.anchor.x = 0.5
        this.img.anchor.y = 0.5

        // add image to stage
        app.stage.addChild(this.img)

        // create all filters, rgb split and glitch slices
        this.img.filters = [new PIXI.filters.RGBSplitFilter(), new PIXI.filters.GlitchFilter()]

        // reset rgb split
        this.img.filters[0].red.x = 0
        this.img.filters[0].red.y = 0
        this.img.filters[0].green.x = 0
        this.img.filters[0].green.y = 0
        this.img.filters[0].blue.x = 0
        this.img.filters[0].blue.y = 0

        // reset glitch
        this.img.filters[1].slices = 0
        this.img.filters[1].offset = 20

        // begin animation
        this.anim = this.anim.bind(this)
        this.anim()

    }

    randomIntFromInterval(min, max) {
        return Math.random() * (max - min + 1) + min
    }

    anim() {

        const THAT = this

        const tl = gsap.timeline({
            delay: this.randomIntFromInterval(0, 3),  /*Timers*/
            onComplete: this.anim
        })

        tl.to(this.img.filters[0].red, {
            duration: 0.2,
            x: this.randomIntFromInterval(-15, 15),
            y: this.randomIntFromInterval(-15, 15)
        })

        tl.to(this.img.filters[0].red, {
            duration: 0.01,
            x: 0,
            y: 0
        })

        tl.to(this.img.filters[0].blue, {
            duration: 0.2,
            x: this.randomIntFromInterval(-15, 15),
            y: 0,
            onComplete() {

                THAT.img.filters[1].slices = 20
                THAT.img.filters[1].direction = THAT.randomIntFromInterval(-75, 75)

                // console.log(THAT.img.filters[1].slices)

            }
        }, '-=0.2')

        tl.to(this.img.filters[0].blue, {
            duration: 0.1,
            x: this.randomIntFromInterval(-15, 15),
            y: this.randomIntFromInterval(-5, 5),
            onComplete() {

                THAT.img.filters[1].slices = 12
                THAT.img.filters[1].direction = THAT.randomIntFromInterval(-75, 75)

            }
        })

        tl.to(this.img.filters[0].blue, {
            duration: 0.01,
            x: 0,
            y: 0,
            onComplete() {

                THAT.img.filters[1].slices = 0
                THAT.img.filters[1].direction = 0

            }
        })

        tl.to(this.img.filters[0].green, {
            duration: 0.2,
            x: this.randomIntFromInterval(-15, 15),
            y: 0
        }, '-=0.2')

        tl.to(this.img.filters[0].green, {
            duration: 0.1,
            x: this.randomIntFromInterval(-20, 20),
            y: this.randomIntFromInterval(-15, 15)
        })

        tl.to(this.img.filters[0].green, {
            duration: 0.01,
            x: 0,
            y: 0
        })

        tl.timeScale(1.2)

    }

}
