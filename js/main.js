if (Fancybox) {
    Fancybox.bind('[data-fancybox]');
}

document.querySelectorAll('.gallery').forEach((gallery) => {
    let slideWrapper = gallery.querySelector('.gallery__slides');
    let slides = slideWrapper.querySelectorAll('.gallery__item');

    let prevButton = gallery.querySelector('.gallery__arrow_prev');
    let nextButton = gallery.querySelector('.gallery__arrow_next');

    let minSlideWidth = parseFloat(gallery.dataset.minWidth);
    let slideWidth;
    let currentSlide;
    let visibleSlides;
    let totalSlides = slides.length;
    let points;

    function updateSlider() {
        visibleSlides = Math.floor(slideWrapper.offsetWidth / minSlideWidth);
        visibleSlides = Math.max(1, Math.min(visibleSlides, totalSlides));
        gallery.style.setProperty('--slides', visibleSlides);

        points = totalSlides - visibleSlides + 1;
        currentSlide = 0;
        slideWrapper.scrollLeft = 0;

        slideWidth = slides[0].offsetWidth;
    }

    function scrollSlider() {
        currentSlide = (currentSlide + points) % points;
        slides[currentSlide].scrollIntoView({ block: 'nearest' });
    }

    window.addEventListener('resize', updateSlider);

    slideWrapper.addEventListener('scrollend', () => {
        currentSlide = Math.floor(slideWrapper.scrollLeft / slideWidth);
    })

    prevButton.addEventListener('click', () => {
        currentSlide -= 1;
        scrollSlider();
    });

    nextButton.addEventListener('click', () => {
        currentSlide += 1;
        scrollSlider();
    });

    updateSlider();
});
