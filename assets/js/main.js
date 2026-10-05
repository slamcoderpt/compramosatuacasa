(function () {
  "use strict";

  /* ---------- Menu móvel ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    nav.classList.toggle("is-open", open);
  }

  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });

  /* ---------- CTAs levam ao formulário e focam o primeiro campo ---------- */
  var form = document.getElementById("lead-form");
  var firstField = form.querySelector("input, select");

  document.querySelectorAll("[data-scroll-form]").forEach(function (link) {
    link.addEventListener("click", function () {
      window.setTimeout(function () {
        firstField.focus({ preventScroll: true });
      }, 450);
    });
  });

  /* ---------- Formulário de proposta ---------- */
  var errorBox = form.querySelector(".lead-form__error");
  var success = document.querySelector(".lead-success");
  var submitBtn = form.querySelector("button[type=submit]");

  var messages = {
    localizacao: "Indica a localização do imóvel.",
    tipo: "Escolhe o tipo de imóvel.",
    nome: "Indica o teu nome.",
    telefone: "Indica um número de telefone válido."
  };

  function validate() {
    var firstInvalid = null;
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name) return;
      if (el.type !== "select-one") el.value = el.value.trim();
      var valid = el.checkValidity();
      el.closest(".field").classList.toggle("is-invalid", !valid);
      el.setAttribute("aria-invalid", String(!valid));
      if (!valid && !firstInvalid) firstInvalid = el;
    });
    return firstInvalid;
  }

  form.addEventListener("input", function (e) {
    var field = e.target.closest(".field");
    if (field && field.classList.contains("is-invalid") && e.target.checkValidity()) {
      field.classList.remove("is-invalid");
      e.target.setAttribute("aria-invalid", "false");
      if (!form.querySelector(".is-invalid")) errorBox.hidden = true;
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var invalid = validate();
    if (invalid) {
      errorBox.textContent = messages[invalid.name];
      errorBox.hidden = false;
      invalid.focus();
      return;
    }
    errorBox.hidden = true;

    var data = {};
    new FormData(form).forEach(function (value, key) { data[key] = value; });

    // Definir data-endpoint no <form> para enviar os pedidos para um backend.
    var endpoint = form.getAttribute("data-endpoint");
    submitBtn.disabled = true;

    var request = endpoint
      ? fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data)
        }).then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
        })
      : Promise.resolve();

    request
      .then(function () {
        form.hidden = true;
        success.hidden = false;
        success.focus();
      })
      .catch(function () {
        errorBox.textContent = "Não foi possível enviar o pedido. Tenta novamente dentro de instantes.";
        errorBox.hidden = false;
      })
      .finally(function () {
        submitBtn.disabled = false;
      });
  });
})();
