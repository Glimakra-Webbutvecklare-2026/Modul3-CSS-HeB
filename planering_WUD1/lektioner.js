document.documentElement.classList.add("js");

const slides = [...document.querySelectorAll(".slide")];
const progress = document.querySelector(".bar, .progress");
const currentNumber = document.getElementById("cur");
const totalNumber = document.getElementById("total");
const combinedCount = document.getElementById("count");
let current = 0;

function show(index) {
  current = Math.max(0, Math.min(slides.length - 1, index));

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === current);
  });

  slides[current].scrollTop = 0;

  if (currentNumber) currentNumber.textContent = current + 1;
  if (totalNumber) totalNumber.textContent = slides.length;
  if (combinedCount) combinedCount.textContent = `${current + 1} / ${slides.length}`;
  if (progress) progress.style.width = `${((current + 1) / slides.length) * 100}%`;
}

function answerFor(button) {
  if (button.dataset.target) {
    return document.getElementById(button.dataset.target);
  }

  if (button.nextElementSibling?.classList.contains("answer")) {
    return button.nextElementSibling;
  }

  return button.closest(".slide")?.querySelector(".answer");
}

document.addEventListener("keydown", event => {
  if (event.key === " " && event.target.closest("button")) return;

  if (event.key === "ArrowRight" || event.key === " ") {
    event.preventDefault();
    show(current + 1);
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    show(current - 1);
  }
});

document.addEventListener("click", event => {
  const button = event.target.closest("button.reveal, button.reveal-btn, button[data-target]");
  if (!button) return;

  const answer = answerFor(button);
  if (!answer) return;

  const visible = answer.classList.toggle("show");
  button.textContent = visible ? "Dölj svar" : "Visa svar";
});

const requestedSlide = Number(new URLSearchParams(location.search).get("slide"));
show(Number.isInteger(requestedSlide) && requestedSlide > 0 ? requestedSlide - 1 : 0);
