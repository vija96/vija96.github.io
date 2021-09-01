//Play an animation back on second click

let mailAnimation = document.querySelector('.mail-animation');

let animationMenu = bodymovin.loadAnimation({
        container: mailAnimation,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: "https://raw.githubusercontent.com/vija96/vija96.github.io/main/res/animations/mail.json"
});

mailAnimation.addEventListener('mouseenter', (e) => {
    animationMenu.setDirection(1);
    animationMenu.play();
});

mailAnimation.addEventListener('mouseleave', (e) => {
    animationMenu.setDirection(-1);
    animationMenu.play();
});