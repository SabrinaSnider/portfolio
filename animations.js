// Color constants.
const OFF_WHITE = '#ede7f6';
const PORTFOLIO_HOVER_BLUE = '#00bcd4';

// Animation constants.
const EASE_IN_RIGHT = {x: '100vw', ease: "Power2.easeOut"};
const EASE_IN_LEFT = {x: '-100vw', ease: "Power2.easeOut"};

// Allow scrolling to trigger section animations.
const scrollController = new ScrollMagic.Controller();

// Animate each section
animateLandingPage();
animateAboutMe();
animateWork();

/**
 * Animate the collapsed menu in and out on click.
 */
function toggleCollapsedMenu() {
  let navbar = document.getElementById("collapsed-navbar");
  if (navbar.dataset.shown === "true") {
    navbar.dataset.shown = "false";
    navbar.style.display = "none";
  } else {
    navbar.dataset.shown = "true";
    navbar.style.display = "flex";
  }
}

/**
 * Animates the landing page of the website.
 */
function animateLandingPage () {
  // Particle.js animated background.
  particlesJS.load('particles-js', 'static-files/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });

  // Typewriter effect for title.
  var options = {
    strings: ["Hi,^200 I'm <span style='color:#7d54c4'>Sabrina.</span> ^700I like to code."],
    typeSpeed: 28,
    startDelay: 800,
    showCursor: false
  };
  
  new Typed('#landing-header', options);

  // Fade in portfolio button.
  gsap.fromTo('#portfolio-button', 2,
      {opacity: 0}, 
      {x: '0', opacity: 1, ease:'back.out(1.7)', delay: 5});
}

/**
 * Animates the About Me section of the website
 */
function animateAboutMe() {
  const aboutmeAnimation = new TimelineMax();

  aboutmeAnimation.from("#selfie-container", 1, EASE_IN_LEFT)
  aboutmeAnimation.from("#bio-text", 1, EASE_IN_RIGHT, "=-1")

  aboutmeAnimation.from("#skills", 1, EASE_IN_RIGHT, "=-.8")

  const aboutmeTrigger = new ScrollMagic.Scene({
    triggerElement: "#about-me-section",
    triggerHook: .8,
  })

  aboutmeTrigger.setTween(aboutmeAnimation).addTo(scrollController)
}

/**
 * Animates the Work section of the website.
 */
function animateWork() {
  animateWorkplaceImage(".google", "#google-work", true);
  animateWorkplaceImage(".uf", "#uf-work", false);
  animateWorkplaceImage(".infotech", "#infotech-work", true);
  animateWorkplaceImage(".medtronic", "#medtronic-work", false);
}

// Event handlers.

/**
 * When hovering onto the "View My Portfolio" button, animate the 
 * button to blue and rotate the button's arrow.
 */
function portfolioButtonHoverOn() {
  gsap.to('#portfolio-button', {
    backgroundColor: PORTFOLIO_HOVER_BLUE, 
    borderColor: PORTFOLIO_HOVER_BLUE, 
    color: OFF_WHITE, 
  })
  gsap.to("#portfolio-arrow", .2, {rotation: "90", ease: Linear.easeNone});
}

/**
 * When hovering off of the "View My Portfolio" button, animate
 * the button to white and transparent and rotate the button's arrow
 * back.
 */
function portfolioButtonHoverOff() {
  gsap.to('#portfolio-button', {
    backgroundColor: 'transparent', 
    borderColor: OFF_WHITE, 
    color: OFF_WHITE, 
  })
  gsap.to("#portfolio-arrow", .2, {rotation: "0", ease: Linear.easeNone});
}

// Helper functions.

/**
 * Function that slides in workplace images as you scroll down.
 * @param {string} imageElementSelector css selector for the image to be animated
 * @param {string} triggerElementSelector css selector for the element that starts the animation
 * @param {boolean} fromLeft whether the image should slide in from the left
 */
function animateWorkplaceImage(imageElementSelector, triggerElementSelector, fromLeft) {
  const animation = gsap.from(imageElementSelector, .75, fromLeft ? EASE_IN_LEFT : EASE_IN_RIGHT)
  const trigger = new ScrollMagic.Scene({triggerElement: triggerElementSelector, triggerHook: .7})
  trigger.setTween(animation).addTo(scrollController)
}
