gsap.registerPlugin(ScrollTrigger);

let speed = 100;

let dayScene = gsap.timeline();
ScrollTrigger.create({
  animation: dayScene,
  trigger: ".scroll-element",
  start: "top top",
  end: "40% 100%",
  scrub: 3,
});

// Animate hills with parallax effect (different speeds create depth)
dayScene.to(
  "#hill1",
  { y: 3 * speed, x: speed, scale: 0.9, ease: "power1.in" },
  0
);
dayScene.to("#hill2", { y: 2 * speed, x: -speed, ease: "power1.in" }, 0);

let clouds = gsap.timeline();
ScrollTrigger.create({
  animation: clouds,
  trigger: ".scroll-element",
  start: "top top",
  end: "70% 100%",
  scrub: 1,
});

clouds.to("#cloud1", { x: 400 }, 0);
clouds.to("#cloud2", { x: -600 }, 0);

let sunMovement = gsap.timeline();
ScrollTrigger.create({
  animation: sunMovement,
  trigger: ".scroll-element",
  start: "top top",
  end: "60% 100%",
  scrub: 1,
});

// Move sun position and change sky colors
sunMovement.to("#sky-gradient", { attr: { cy: "300" } }, 0);
sunMovement.to("#sun", { attr: { offset: "0.15" } }, 0);
sunMovement.to(
  "#sky-gradient stop:nth-child(2)",
  { attr: { offset: "0.15" } },
  0
);
sunMovement.to(
  "#sky-gradient stop:nth-child(3)",
  { attr: { "stop-color": "#FF9171" } },
  0
);

// Show bats when scrolling further
gsap.fromTo(
  "#bats",
  { opacity: 0, y: 300, scale: 0 },
  {
    y: 100,
    scale: 0.8,
    opacity: 1,
    transformOrigin: "50% 50%",
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".scroll-element",
      start: "40% top",
      end: "60% 100%",
      scrub: 3,
      onEnter: function () {
        // Make bats flutter their wings
        gsap.utils.toArray("#bats path").forEach((bat) => {
          gsap.to(bat, {
            scaleX: 0.5,
            yoyo: true,
            repeat: 5,
            duration: 0.2,
            transformOrigin: "50% 50%",
          });
        });
      },
    },
  }
);

// --------- NIGHT TRANSITION ---------

// Day to night transition
gsap.set("#night-sky", { visibility: "visible", opacity: 0 });
let nightTransition = gsap.timeline();
ScrollTrigger.create({
  animation: nightTransition,
  trigger: ".scroll-element",
  start: "60% top",
  end: "90% 100%",
  scrub: 3,
});

// Fade in night sky and stars
nightTransition.to("#sky", { opacity: 0 }, 0);
nightTransition.to("#night-sky", { opacity: 1 }, 0);
nightTransition.to("#stars", { opacity: 0.7 }, 0.3);

let fullscreen = false;
const fullscreenBtn = document.getElementById("fullscreen-btn");

fullscreenBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (!fullscreen) {
    fullscreen = true;
    document.documentElement.requestFullscreen();
    fullscreenBtn.textContent = "Exit Fullscreen";
  } else {
    fullscreen = false;
    document.exitFullscreen();
    fullscreenBtn.textContent = "Go Fullscreen";
  }
});

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
