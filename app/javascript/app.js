import "parsleyjs";
import "parsleyjs/dist/i18n/pt-br";
import lozad from "lozad";

feather.replace();

const setMenuColor = function () {
  if ($(window).scrollTop() > 60) {
    $(".navbar-hospedin").addClass($(".navbar-hospedin").attr("color"));
  } else {
    $(".navbar-hospedin").removeClass($(".navbar-hospedin").attr("color"));
  }
};

const setCookies = function () {
  const storageKey = "cookieseu";
  const cookiesEuStorage = localStorage.getItem(storageKey);
  const $container = $(".hs-cookie-policy");

  if (!cookiesEuStorage) {
    $container.removeClass("d-none");

    $container.find("button").on("click", function () {
      $container.addClass("d-none");
      localStorage.setItem(storageKey, true);
    });
  }
};

$(document).ready(() => {
  setMenuColor();
  setCookies();

  const observer = lozad();
  observer.observe();

  $(window).on("scroll", setMenuColor);

  $("a[data-move]").click(function () {
    $("html, body").animate(
      {
        scrollTop: $($(this).data("move")).offset().top,
      },
      500
    );

    return false;
  });

  $(".navbar-toggler").on("click", function (e) {
    e.stopPropagation();
    $("body").toggleClass("nav-mobile-open");
    $(".nav-menu-mobile").scrollTop(0);
  });

  window.Parsley.addValidator("checkHttp", {
    requirementType: "string",
    validateString: function (value) {
      const re = new RegExp("^https?://", "i");
      return re.test(value);
    },
    messages: {
      "pt-br": "URL deve começar com http:// ou https://",
      en: "URL must contain http:// or https://",
    },
  });
});

$(document).ready(function () {
  var navbarContainer = $(".navbar-nav_container");
  var navbarClientContainer = $(".client-options");
  var consultorButton = $(".consultor-button");

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 400) {
      consultorButton.removeClass("hide-consultor-button").fadeIn();
      navbarContainer.addClass("fadeRight").fadeIn();
      navbarClientContainer.addClass("fadeRight").fadeIn();
    } else {
      navbarContainer.removeClass("fadeRight").fadeIn();
      navbarClientContainer.removeClass("fadeRight").fadeIn();
      consultorButton.addClass("hide-consultor-button").fadeOut();
    }
  });
});
