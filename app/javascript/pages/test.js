import "parsleyjs";
import "parsleyjs/dist/i18n/pt-br";
import "jquery-mask-plugin";

class Test {
  constructor() {
    this.form();
  }

  form() {
    const recaptchaToken = "6LeVqeMUAAAAACb81ZbXrs9Y1IjCS8NiBIA6d-Ey";

    // REMOVE LATER
    // const $form = $("#test-form");
    // const testForm = $form.parsley();
    // const $comingFrom = $('input[name="coming_from"]');

    // $form.on("submit", (e) => {
    //   e.preventDefault();

    //   if (testForm.isValid()) {
    //     const $formButton = $form.find("button");
    //     const $recaptchaField = $('[name="recaptcha_token"]');
    //     grecaptcha.ready(() => {
    //       $formButton.attr("disabled", true);
    //       grecaptcha
    //         .execute(recaptchaToken, { action: $recaptchaField.data("action") })
    //         .then((token) => {
    //           $recaptchaField.val(token);
    //           $formButton.attr("disabled", false);
    //           $form.off("submit").submit();
    //         });
    //     });
    //   } else {
    //     return false;
    //   }
    // });

    // if ($comingFrom.length) {
    //   const $partnerCode = $(".partner_code");
    //   const $reason = $(".reason");
    //   $comingFrom.on("change", function () {
    //     const coming = $(this).val();
    //     $reason.find("label").text("Por favor, escreva como nos conheceu");

    //     switch (coming) {
    //       case "hospedin_partner":
    //         $partnerCode.removeClass("d-none").addClass("d-block");
    //         $reason.removeClass("d-block").addClass("d-none");
    //         break;
    //       case "recommendation":
    //         $reason.removeClass("d-none").addClass("d-block");
    //         $partnerCode.removeClass("d-block").addClass("d-none");
    //         $reason.find("label").text("Por favor, escreva quem indicou você");
    //         break;
    //       case "other_coming":
    //         $reason.removeClass("d-none").addClass("d-block");
    //         $partnerCode.removeClass("d-block").addClass("d-none");
    //         break;
    //       default:
    //         $reason.removeClass("d-block").addClass("d-none");
    //         $partnerCode.removeClass("d-block").addClass("d-none");
    //     }

    //     $partnerCode.find("input").val("");
    //     $reason.find("input").val("");
    //   });
    // }

    let newsletterForm = $("#newsletter-form").parsley();

    $("#newsletter-form").on("submit", function (e) {
      e.preventDefault();
      const self = this;

      if (newsletterForm.isValid()) {
        const $recaptchaField = $('[name="recaptcha_token"]');

        grecaptcha.ready(() => {
          grecaptcha
            .execute(recaptchaToken, { action: $recaptchaField.data("action") })
            .then((token) => {
              const url = $(self).attr("action");
              const method = $(self).attr("method");
              const fields = {
                name: $(self).find('[name="name"]').val(),
                company: $(self).find('[name="company"]').val(),
                email: $(self).find('[name="email"]').val(),
                recaptcha_token: token,
              };

              const $formButton = $(self).find("button");
              $formButton.attr("disabled", true);

              $.ajax({
                url,
                method: method.toUpperCase(),
                headers: {
                  ["X-CSRF-Token"]: document.querySelector(
                    '[name="csrf-token"]'
                  ).content,
                },
                data: {
                  name: fields.name,
                  company: fields.company,
                  email: fields.email,
                  recaptcha_token: fields.recaptcha_token,
                },
              })
                .done((res) => {
                  $(self).find('[name="name"]').val(null);
                  $(self).find('[name="company"]').val(null);
                  $(self).find('[name="email"]').val(null);
                  $(self).hide();
                  $("#newsletter-message").append(
                    '<div class="col-12 col-lg-6 rounded-pill bg-green white mb-4 py-2 text-center">E-mail registrado com sucesso.</div>'
                  );
                })
                .fail(() => {
                  $("#newsletter-message").append(
                    '<div class="col-12 col-lg-6 rounded-pill bg-red white mb-4 py-2 text-center">Falha ao registrar e-mail.</div>'
                  );
                })
                .always(() => {
                  $formButton.attr("disabled", false);
                });
            });
        });
      } else {
        return false;
      }
    });
  }
}

$(document).ready(() => {
  new Test();
});
