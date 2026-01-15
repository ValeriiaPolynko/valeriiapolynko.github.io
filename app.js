const header = document.querySelector(".header");
const block = document.querySelector(".back");

function setBlockHeight() {
  block.style.height = header.offsetHeight + "px";
}

window.addEventListener("resize", setBlockHeight);
setBlockHeight();

document.body.style.overflow = "hidden";

document.body.style.overflow = "";

document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    item.classList.toggle("active");
    const icon = btn.querySelector(".faq-icon");
    icon.textContent = item.classList.contains("active") ? "−" : "+";
  });
});

(() => {
  const total = 5;
  const base = "images/certificates";

  const root = document.querySelector(".certs-carousel");
  const track = root.querySelector(".certs-track");
  const dotsWrap = root.querySelector(".certs-dots");
  const prevBtn = root.querySelector(".prev");
  const nextBtn = root.querySelector(".next");
  const viewport = root.querySelector(".certs-viewport");

  let index = 0;
  const slides = [];

  // === Створюємо слайди + крапки ===
  for (let i = 1; i <= total; i++) {
    const li = document.createElement("li");
    li.className = "certs-slide";
    li.setAttribute("role", "group");
    li.setAttribute("aria-label", `Слайд ${i} з ${total}`);

    const img = document.createElement("img");
    img.src = `${base}/${i}.png`;
    img.alt = `Сертифікат ${i}`;
    li.appendChild(img);

    track.appendChild(li);
    slides.push(li);

    if (dotsWrap) {
      const dot = document.createElement("button");
      dot.className = "certs-dot";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Перейти до слайду ${i}`);
      dot.addEventListener("click", () => goTo(i - 1));
      dotsWrap.appendChild(dot);
    }
  }

  const render = () => {
    const n = slides.length;
    const vw = window.innerWidth;

    const stepX = vw < 768 ? 0 : 300; // відступ для десктопу
    slides.forEach((el, i) => {
      const d = i - index;
      let tx = d * stepX;
      let tz = -Math.abs(d) * 100;
      let sc = 1 - Math.min(Math.abs(d) * 0.1, 0.5);
      let op = Math.max(0, 1 - Math.abs(d) * 0.2);

      if (vw < 768) {
        tz = 0;
        sc = 1;
        op = 1;
        tx = 0;
      }

      el.style.transform = `translate3d(calc(-50% + ${tx}px),0,${tz}px) scale(${sc})`;
      el.style.zIndex = String(100 - Math.abs(d));
      el.style.opacity = op;
      el.classList.toggle("is-active", d === 0);
    });

    if (dotsWrap) {
      [...dotsWrap.children].forEach((d, i) =>
        d.setAttribute("aria-selected", String(i === index))
      );
    }
  };

  const goTo = (i) => {
    index = (i + slides.length) % slides.length;
    render();
  };
  const goNext = () => goTo(index + 1);
  const goPrev = () => goTo(index - 1);

  nextBtn.addEventListener("click", goNext);
  prevBtn.addEventListener("click", goPrev);

  window.addEventListener("resize", render);
  render();

  // === Модалка ===
  const modal = document.getElementById("certModal");
  const modalImg = document.getElementById("certModalImg");
  const modalClose = document.querySelector(".cert-modal-close");

  slides.forEach((slide) => {
    slide.addEventListener("click", () => {
      modalImg.src = slide.querySelector("img").src;
      modalImg.alt = slide.querySelector("img").alt;
      modal.classList.add("open");
    });
  });

  modalClose.addEventListener("click", () => modal.classList.remove("open"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
  });
})();

window.addEventListener("load", () => {
  const carousel = document.querySelector(".phone-carousel");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const scrollStep = 250;

  prevBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: -scrollStep, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: scrollStep, behavior: "smooth" });
  });

  let autoScroll = setInterval(() => {
    carousel.scrollBy({ left: scrollStep, behavior: "smooth" });
    if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
      carousel.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, 4000);

  carousel.addEventListener("mouseenter", () => clearInterval(autoScroll));
  carousel.addEventListener("mouseleave", () => {
    autoScroll = setInterval(() => {
      carousel.scrollBy({ left: scrollStep, behavior: "smooth" });
      if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
        carousel.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 4000);
  });
});

const popup = document.getElementById("expPopup");
const popupContent = popup.querySelector(".popup-content");
const popupClose = popup.querySelector(".popup-close");
const popupOverlay = popup.querySelector(".popup-overlay");

document.querySelectorAll(".more").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const card = btn.closest(".exp-card");
    const content = card.querySelector(".exp-more").innerHTML;

    popupContent.innerHTML = content;
    popup.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

function closePopup() {
  popup.classList.remove("active");
  popupContent.innerHTML = "";
  document.body.style.overflow = "";
}

popupClose.addEventListener("click", closePopup);
popupOverlay.addEventListener("click", closePopup);

popupContent.addEventListener("click", (e) => {
  if (e.target.closest(".exp-close")) {
    closePopup();
  }
});

const contractBtn = document.querySelector(".contract-open");
const contractContent = document.querySelector(".contract-content");

if (contractBtn && contractContent) {
  contractBtn.addEventListener("click", (e) => {
    e.preventDefault();

    popupContent.innerHTML = contractContent.innerHTML;
    popup.classList.add("active");
    document.body.style.overflow = "hidden";
  });
}
