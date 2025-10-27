const crsr = document.querySelector("#cursor");
const blur = document.querySelector("#crsr-b");

let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let blurPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

document.addEventListener("mousemove", (e) => {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
});

gsap.ticker.add(() => {
    // Smooth blur follow
    blurPos.x += (mouse.x - blurPos.x) * 0.12; // slightly slower
    blurPos.y += (mouse.y - blurPos.y) * 0.12;

    // Apply positions
    crsr.style.left = mouse.x - 10 + "px";
    crsr.style.top = mouse.y - 10 + "px";

    blur.style.left = blurPos.x - 60 + "px";
    blur.style.top = blurPos.y - 60 + "px";
});


gsap.registerPlugin(ScrollTrigger);

var h4all = document.querySelectorAll("#nav h4")
h4all.forEach(function(elem) {
    elem.addEventListener("mouseenter", function() {
        crsr.style.scale = 3;
        crsr.style.border = "0.5px solid #fff"
        crsr.style.backgroundColor = "transparent"
    })
    elem.addEventListener("mouseleave", function() {
        crsr.style.scale = 1;
        crsr.style.border = "0px solid #fff"
        crsr.style.backgroundColor = "transparent"
    })
})

gsap.to("#nav", {
    backgroundColor: "rgba(82, 9, 9, 1)",
    height: "100px",
    duration: 0.5,
    scrollTrigger: {
        trigger: "#nav",
        scroller: "body",
        start: "top -10%",
        scrub: 1
    }
})

gsap.to("#main", {
    backgroundColor: "#000",
    scrollTrigger: {
        trigger: "#main",
        scroller: "body",
        start: "top top%",
        end: "top -70%",
        scrub: 1.5
    }
})


gsap.from(", #about-us-in", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.4,
    scrollTrigger: {
        trigger: "#about-us",
        scroller: "body",
        start: "top 60%",
        end: "top 90%",
        scrub: 2
    }
})

gsap.from(".card", {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    scrollTrigger: {
        trigger: ".card",
        scroller: "body",
        start: "top 60%",
        end: "top 90%",
        scrub: 2
    }
})

const gcBtn = document.querySelector(".gc-button");
let heartInterval;

gcBtn.addEventListener("mouseenter", () => {
    heartInterval = setInterval(() => {
        const heart = document.createElement("span");
        heart.classList.add("heart");
        heart.textContent = ["💖", "💕", "💘", "💞"][Math.floor(Math.random() * 4)];

        // Spawn relative to button
        const rect = gcBtn.getBoundingClientRect();
        const parentRect = gcBtn.parentElement.getBoundingClientRect();
        const offsetX = rect.left - parentRect.left;
        const offsetY = rect.top - parentRect.top;

        heart.style.left = offsetX + Math.random() * rect.width + "px";
        heart.style.top = offsetY + rect.height / 2 + "px";

        gcBtn.parentElement.appendChild(heart);

        // Animate using GSAP
        gsap.to(heart, {
            y: -60 - Math.random() * 40, // float up
            x: (Math.random() - 0.5) * 60, // sway left-right
            opacity: 0,
            scale: 1 + Math.random() * 0.5,
            rotation: (Math.random() - 0.5) * 60,
            duration: 1.5 + Math.random() * 0.5,
            ease: "power1.out",
            onComplete: () => heart.remove()
        });
    }, 150);
});

gcBtn.addEventListener("mouseleave", () => {
    clearInterval(heartInterval);
});