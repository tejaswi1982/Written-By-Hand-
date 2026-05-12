// Written By Hand — small UI behaviors for the static prototype.

(function () {
  // Year in footer
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Dropzone (file upload UI only — no upload happens)
  var dropzone = document.querySelector("[data-dropzone]");
  if (dropzone) {
    var input = dropzone.querySelector("input[type=file]");
    var label = dropzone.querySelector("[data-dz-label]");
    dropzone.addEventListener("click", function () { input && input.click(); });
    dropzone.addEventListener("dragover", function (e) {
      e.preventDefault();
      dropzone.classList.add("drag");
    });
    dropzone.addEventListener("dragleave", function () {
      dropzone.classList.remove("drag");
    });
    dropzone.addEventListener("drop", function (e) {
      e.preventDefault();
      dropzone.classList.remove("drag");
      var file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if (file && label) label.textContent = file.name;
    });
    if (input) {
      input.addEventListener("change", function () {
        var f = input.files && input.files[0];
        if (f && label) label.textContent = f.name;
      });
    }
  }

  // Prompt rotator
  var promptEl = document.querySelector("[data-prompt]");
  var promptBtn = document.querySelector("[data-prompt-next]");
  if (promptEl && promptBtn) {
    var prompts = [
      "What do you want to begin again?",
      "What does a quiet morning mean to you?",
      "What is one small thing you noticed yesterday?",
      "What do you want to carry into today?",
      "What would make today feel more intentional?",
      "What is something you miss doing by hand?",
      "Write about a place where you feel calm.",
      "What is one thought you want to leave on the page?",
      "What is one thing you want to make space for today?",
      "What would you like to do a little more slowly?"
    ];
    var i = 0;
    promptBtn.addEventListener("click", function () {
      i = (i + 1) % prompts.length;
      promptEl.style.opacity = "0";
      setTimeout(function () {
        promptEl.textContent = prompts[i];
        promptEl.style.opacity = "1";
      }, 180);
    });
    promptEl.style.transition = "opacity 200ms ease";
  }
})();
