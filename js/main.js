/*-------------------------------------------------------------
    * Theme Name: NCode
    * Updated: Sep 23 2023 with Bootstrap 5.3.2
    * Author: Naim Zaaraoui
--------------------------------------------------------------*/

(function () {
  ("use strict");
  // Select Elements Helper Function
  const select = (el, all = false) => {
    el = el.trim();
    return all
      ? [...document.querySelectorAll(el)]
      : document.querySelector(el);
  };

  // Event Listener Helper Function
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      all
        ? selectEl.forEach((e) => e.addEventListener(type, listener))
        : selectEl.addEventListener(type, listener);
    }
  };

  // Scroll Event Listener Helper Function
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  // Update Navbar Links Active State On Scroll
  let navLinks = select(".navbar .scrollto", true);
  const updateActiveLink = () => {
    let pos = window.scrollY + 200;
    navLinks.forEach((navLink) => {
      if (!navLink.hash) return;
      let section = select(navLink.hash);
      if (!section) return;
      if (
        pos >= section.offsetTop &&
        pos <= section.offsetTop + section.offsetHeight
      ) {
        navLink.classList.add("active");
      } else {
        navLink.classList.remove("active");
      }
    });
  };

  window.addEventListener("load", updateActiveLink);
  onscroll(document, updateActiveLink);

  // Scrolls to a Section with Header Offset
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  // Scroll to Section With Offset when Click on Header Links
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();
        scrollto(this.hash);
      }
    },
    true
  );

  // Scroll to Section on Page Load
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });
  // Toggle dropdown-active Class
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      this.nextElementSibling.classList.toggle("dropdown-active");
    },
    true
  );

  // Toggle header-scrolled Class to header When Page is Scrolled
  let header = select("#header");
  if (header) {
    const headerScrolled = () => {
      window.scrollY > 100
        ? header.classList.add("header-scrolled")
        : header.classList.remove("header-scrolled");
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  // Skills Animation
  let skills = select("#skills"),
    animated = false;
  let progress = select(".progress .progress-bar", true);
  if (skills) {
    const animateSkills = () => {
      if (scrollY >= skills.offsetTop - skills.offsetHeight / 2 && !animated) {
        progress.forEach((el) => (el.style.width = el.dataset.progress));
        animated = true;
      }
    };
    onscroll(document, animateSkills);
  }

  // Portfolio Isotope and Filter
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
      });
      let portfolioFilters = select("#portfolio-filters li", true);
      on(
        "click",
        "#portfolio-filters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("active");
          });
          this.classList.add("active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          portfolioIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  // Preloader
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => preloader.remove());
  }

  // Back to Top Button
  let backTopBtn = select(".back-to-top");
  if (backTopBtn) {
    const backToTop = (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    const toggleBackToTop = () => {
      if (scrollY > 100) {
        backTopBtn.classList.add("active");
      } else {
        backTopBtn.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBackToTop);
    onscroll(document, toggleBackToTop);
    on("click", ".back-to-top", backToTop);
  }

  // Initialize Hero Glightbox
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  // Initialize Portfolio Glightbox
  const portfolioGlightbox = GLightbox({
    selector: ".portfolio-glightbox",
  });

  // Initialize Portfolio Details Swiper
  const swiper = new Swiper("#portfolio-details .portfolio-swiper", {
    speed: 400,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });

  // Initialize AOS
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });
})();
