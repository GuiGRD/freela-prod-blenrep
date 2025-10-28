function scrollFunction(sName) {
  let section = $("#" + sName).offset().top;
  let headerHeight = $('header').height();

  $("html, body").on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function () {
    $("html, body").stop();
  });

  $("html, body").animate(
    {
      scrollTop: section - headerHeight,
    },
    750,
    "swing",
    function () {
      $("html, body").off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
    }
  );
}

function initScrollAnimations() {
  gsap.utils.toArray('.an-left').forEach(element => {
    gsap.fromTo(element, {
      opacity: 0,
      x: -60,
      y: 20
    }, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: element,
        start: 'center 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    });
  });

  gsap.utils.toArray('.an-right').forEach(element => {
    gsap.fromTo(element, {
      opacity: 0,
      x: 60,
      y: 20
    }, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: element,
        start: 'center 85%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    });
  });

  gsap.utils.toArray('.an-fade').forEach(element => {
    gsap.fromTo(element, {
      opacity: 0
    }, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: element,
        start: 'center 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    });
  });

  gsap.utils.toArray('.an-fade-up').forEach(element => {
    gsap.fromTo(element, {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: element,
        start: '25% 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    });
  });

  gsap.utils.toArray('.an-stagger-container').forEach(container => {
    const children = container.querySelectorAll('.an-stagger-item');
    gsap.fromTo(children, {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    });
  });

  gsap.utils.toArray('.an-stagger-container-2').forEach(container => {
    const children = container.querySelectorAll('.an-stagger-item-2');
    gsap.fromTo(children, {
      rotate: 25
    }, {
      rotate: 1,
      duration: 1,
      stagger: 0.1,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: container,
        start: 'top 50%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    });
  });

  gsap.utils.toArray('.an-stagger-container-3').forEach(container => {
    const children = container.querySelectorAll('.an-stagger-item-3');
    gsap.fromTo(children, {
      rotate: -25
    }, {
      rotate: 1,
      duration: 1,
      stagger: 0.1,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: container,
        start: 'top 50%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    });
  });
}

window.addEventListener('DOMContentLoaded', function() {
  initScrollAnimations();
});

$(document).ready(function() {
  let hash = window.location.hash.replace('#', '');
  if(hash) {
    scrollFunction(hash)
  }

  $("a[href='#']").on('click', function(e) {
    e.preventDefault();
  })

  $(".jsBtnMenu").on("click", function() {
    $(this).toggleClass("active");
    $(".menu").toggleClass("active");
  });

  $(".menu__close").on("click", function() {
    $(".menu").removeClass("active");
  });

  let click = true;

  $('.jsSubList').on('click', function() {
    
    if(click) {
      click = false;
      $(this).parent().toggleClass('active');
      $(this).parent().find('ul').slideToggle('medium', function() {
        click = true;
      });
    }
  })
  
  $('.jsRefs').on('click', function() {
    $('.jsRefsBody').slideToggle('medium');
    $(this).parent().toggleClass('active');
  });

  $('.jsScroll').on('click', function() {
    let sName = $(this).data('scroll');
    scrollFunction(sName);

    $(".jsBtnMenu").removeClass('active');
    $('.menu').removeClass('active');
  });

  $('.jsScrollTop').on('click', function() {
    $("html, body").animate(
    {
      scrollTop: 0,
    },
    750,
    "swing",
    function () {
      $("html, body").off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
    }
  );
  })
});

(function() {
  const menuItems = document.querySelectorAll('.menu__list-item[data-scroll]');
  const sections = Array.from(menuItems).map(item => {
    const sectionId = item.getAttribute('data-scroll');
    return document.getElementById(sectionId);
  }).filter(Boolean);

  function setActiveMenuItem(activeSection) {
    menuItems.forEach(item => item.classList.remove('active'));

    const activeSectionId = activeSection.getAttribute('id');
    const activeMenuItem = document.querySelector(`.menu__list-item[data-scroll="${activeSectionId}"]`);
    if (activeMenuItem) {
      activeMenuItem.classList.add('active');
    }
  }

  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveMenuItem(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  function setInitialActiveSection() {
    const middleOfScreen = window.scrollY + window.innerHeight * 0.5;
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section.offsetTop <= middleOfScreen) {
        setActiveMenuItem(section);
        break;
      }
    }
  }

  window.addEventListener('load', setInitialActiveSection);
  
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(setInitialActiveSection, 100);
  });
})();


if($('body').hasClass('png-mieloma')) {
  var swiperPatologia = new Swiper(".swiper-patologia", {
    spaceBetween: 30,
    effect: "fade",
    loop: true,
    autoplay: {
      delay: 5000,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: ".swiper-pagination-patologia",
    },
  });

  gsap.registerPlugin(ScrollTrigger);

  const linha = document.querySelector("#linha");
  const comprimento = linha.getTotalLength();

  linha.style.strokeDasharray = comprimento;
  linha.style.strokeDashoffset = comprimento;

  gsap.to(linha, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
      trigger: "#timeline",
      start: "top center",
      end: "bottom 75%",
      scrub: true
    }
  });

  const marcadores = [
    { id: "#diagnostico-inicial", pos: "top 55%" },
    { id: "#number-1", pos: "top 63%" },
    { id: "#primeira-recaida", pos: "top 47%" },
    { id: "#number-2", pos: "top 50%" },
    { id: "#segunda-recaida", pos: "top 56%" },
    { id: "#number-3", pos: "top 54%" },
    { id: "#seta", pos: "top 68%" },
    { id: "#txt-bottom", pos: "top 75%" },
  ];

  marcadores.forEach(item => {
    gsap.to(item.id, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: item.id,
        start: item.pos,
        toggleActions: "play none none reverse"
      }
    });
  });

  const linhaMb = document.querySelector("#linha-mb");
  const comprimentoMb = linhaMb.getTotalLength();


  linhaMb.style.strokeDasharray = comprimentoMb;
  linhaMb.style.strokeDashoffset = comprimentoMb;

  gsap.to(linhaMb, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
      trigger: "#timeline-mb",
      start: "top center",
      end: "bottom 75%",
      scrub: true
    }
  });

  const marcadoresMb = [
    { id: "#diagnostico-inicial-mb", pos: "top 50%" },
    { id: "#number-1-mb", pos: "top 50%" },
    { id: "#primeira-recaida-mb", pos: "top 57%" },
    { id: "#number-2-mb", pos: "top 57%" },
    { id: "#segunda-recaida-mb", pos: "top 65%" },
    { id: "#number-3-mb", pos: "top 70%" },
    { id: "#seta-mb", pos: "top 75%" },
  ];

  marcadoresMb.forEach(item => {
    gsap.to(item.id, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: item.id,
        start: item.pos,
        toggleActions: "play none none reverse"
      }
    });
  });

  const numeros = document.querySelectorAll('.an-numero');

  numeros.forEach((el) => {
    const valorFinal = parseFloat(el.dataset.numero);
    const isPercent = el.textContent.includes('%');

    gsap.fromTo(el, 
      { textContent: 0 }, 
      { 
        textContent: valorFinal,
        duration: 1.5,
        ease: "power1.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        snap: { textContent: 1 },
        onUpdate: function() {
          el.textContent = Math.floor(el.textContent) + (isPercent ? "%" : "");
        }
      }
    );
  });
}
else if ($('body').hasClass('png-mecanismo')) {
  function onYouTubeIframeAPIReady() {
    currentPlayer = new YT.Player('yt-video', {
      width: '100%',
      height: '100%',
      videoId: 'zqwxYjuEtaY',
      playerVars: {
        autoplay: 0,
        rel: 0,
        modestbranding: 1,
        controls: 0,
        showinfo: 0,
        fs: 1
      },
      events: {
        'onStateChange': onPlayerStateChange
      }
    });
  }

  function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
      $('.jsVideo').removeClass('active');
    }
  }

  function playVideo(player) {
    if (player) player.playVideo();
  }

  function pauseVideo(player) {
    if (player) player.pauseVideo();
  }

  ScrollTrigger.matchMedia({
    "(min-width: 768px)": function () {
      const cardsSection = document.querySelector(".jsCards");
      const cards = gsap.utils.toArray(".cards__box-card");
      const paginationItems = gsap.utils.toArray(".cards__pagination .item");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsSection,
          start: "top 15%",
          end: "+=1200",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        }
      });

      cards.forEach((card, i) => {
        tl.to(cardsSection, {
          onStart: () => {
            paginationItems.forEach((el) => el.classList.remove("item--active"));
            paginationItems[i].classList.add("item--active");
          },
          onReverseComplete: () => {
            paginationItems.forEach((el) => el.classList.remove("item--active"));
            paginationItems[i - 1] && paginationItems[i - 1].classList.add("item--active");
          }
        });

        if (i < cards.length - 1) {
          tl.to(cards[i], {
            yPercent: -100,
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut"
          })
          .fromTo(cards[i + 1], 
            { yPercent: 100, opacity: 0 },
            { yPercent: -100, opacity: 1, duration: 0.5, ease: "power2.inOut" },
            "<"
          );
        }
      });
    },
    "(max-width: 767px)": function () {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  });
  
  $(document).ready(function() {
    $('.jsPlayVideo').on('click', function() {
      $('.jsVideo').addClass('active');
      playVideo(currentPlayer);
    });
  });
}
else if ($('body').hasClass('png-eficacia')) {
  $(document).ready(function() {
      var swiper1 = new Swiper(".swiper-graph", {
      direction: "horizontal",
      slidesPerView: "auto",
      freeMode: true,
      scrollbar: {
        el: ".swiper-scrollbar-graph",
      }
    });

    var swiper2 = new Swiper(".swiper-graph-2", {
      direction: "horizontal",
      slidesPerView: "auto",
      freeMode: true,
      scrollbar: {
        el: ".swiper-scrollbar-graph-2",
      }
    });

    var swiper3 = new Swiper(".swiper-graph-3", {
      direction: "horizontal",
      slidesPerView: "auto",
      freeMode: true,
      scrollbar: {
        el: ".swiper-scrollbar-graph-3",
      }
    });

    var swiper3 = new Swiper(".swiper-graph-4", {
      direction: "horizontal",
      slidesPerView: "auto",
      freeMode: true,
      scrollbar: {
        el: ".swiper-scrollbar-graph-4",
      }
    });

    var swiper4 = new Swiper(".swiper-popup-1", {
      effect: "fade",
      autoHeight: true,
      fadeEffect: {
        crossFade: true
      },
      navigation: {
        nextEl: ".swiper-button-next-popup-1",
        prevEl: ".swiper-button-prev-popup-1",
      },
      pagination: {
        el: ".swiper-pagination-popup-1",
        clickable: true,
      },
    });

    var swiper5 = new Swiper(".swiper-popup-2", {
      effect: "fade",
      autoHeight: true,
      fadeEffect: {
        crossFade: true
      },
      navigation: {
        nextEl: ".swiper-button-next-popup-2",
        prevEl: ".swiper-button-prev-popup-2",
      },
      pagination: {
        el: ".swiper-pagination-popup-2",
        clickable: true,
      },
    });

    $('.jsOpenPopup').on('click', function() {
      let popup = $(this).data('popup')

      $(`.popup[data-popup="${popup}"]`).fadeIn('medium');
    })

    $('.jsClosePopup').on('click', function() {
      $(`.popup`).fadeOut('fast');
    })
  });
  
}


