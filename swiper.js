var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    /* slidesPerGroup: 3, */
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      620: {
          slidesPerView: 1,
          spaceBetween: 20,
          slidesPerGroup: 1,
      },
      680: {
          slidesPerView: 2,
          spaceBetween: 40,
          slidesPerGroup: 2,
      },
      920: {
          slidesPerView: 3,
          spaceBetween: 40,
          slidesPerGroup: 3,
      },
      1292: {
          slidesPerView: 4,
          spaceBetween: 40,
          slidesPerGroup: 4,
      },
    },
});
