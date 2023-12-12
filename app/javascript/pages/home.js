import { setCarousel } from "../utils";

class Home {
  constructor() {
    this.carousels();
    this.testimonialVideos();
    this.eduSuggestionsRedirect();
  }

  carousels() {
    setCarousel(
      ".reviews-carousel",
      {
        margin: 20,
        dots: true,
        responsive: {
          0: { items: 1 },
          992: { items: 2 },
        },
      },
      ".reviews-nav"
    );
  }

  testimonialVideos() {
    const videoButtons = $(".navigation-btn");
    var testimonialVideo = $("#testimonial-video")[0];
    var currentIndex = 0;

    if (!testimonialVideo) {
      return false;
    }

    function playVideo(videoPath) {
      const buttonWithMatchingPath = videoButtons.filter(function () {
        return $(this).data("value") === videoPath;
      });

      if (buttonWithMatchingPath.length > 0) {
        testimonialVideo.src = videoPath;
        testimonialVideo.load();
        testimonialVideo.play();

        videoButtons.removeClass("navigation-active");
        buttonWithMatchingPath.addClass("navigation-active");
      } else {
        console.error("No button found");
      }
    }

    $(".card-review-video-button").on("click", function () {
      const videoPath = $(this).data("value");
      const index = videoButtons.index($(this));
      const authorName = $(this).data("author");
      const hotelName = $(this).data("hotel");

      currentIndex = index;
      playVideo(videoPath);

      $(".testimonial-modal-footer h6").html(authorName);
      $(".testimonial-modal-footer span").html(hotelName);
    });

    $(document).ready(function () {
      // Quando o link for clicado
      $(".sistems-btn").on("click", function () {
        // Animação de rolagem até a seção desejada
        $("html, body").animate(
          {
            scrollTop: $(".home-products").offset().top,
          },
          1000
        ); // Ajuste a velocidade da animação conforme necessário
      });
    });

    videoButtons.on("click", function () {
      const videoPath = $(this).data("value");
      const index = videoButtons.index($(this));
      const authorName = $(this).data("author");
      const hotelName = $(this).data("hotel");

      currentIndex = index;
      playVideo(videoPath);

      $(".testimonial-modal-footer h6").html(authorName);
      $(".testimonial-modal-footer span").html(hotelName);
    });

    testimonialVideo.addEventListener("ended", function () {
      currentIndex++;
      if (currentIndex < videoButtons.length) {
        const videoPath = videoButtons.eq(currentIndex).data("value");
        playVideo(videoPath);
      } else {
        currentIndex = 0;
        const videoPath = videoButtons.eq(currentIndex).data("value");
        playVideo(videoPath);
      }
    });

    $("#testimonialsModal").on("hidden.bs.modal", function () {
      testimonialVideo.pause();
    });
  }

  eduSuggestionsRedirect() {
    const eduSuggestionsCards = document.querySelectorAll(
      ".card-edu-suggestions"
    );

    eduSuggestionsCards.forEach(function (card) {
      card.addEventListener("click", function () {
        const link = card.dataset.link;
        window.open(link, "_blank");
        // window.location.href = link;
      });
    });
  }
}

$(document).ready(() => {
  new Home();
});
