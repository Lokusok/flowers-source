document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('no-js');
  document.body.classList.add('yes-js');

  // window.addEventListener('resize', () => {
  //   location.reload();
  // });
  
  setCorrectAccordeon();
  setCorrectDateInputs();
  setCorrectPopups();
  setCorrectCatalogFilters();
  setCorrectLoadMoreCatalog();
  setCorrectCounterProducts();
  setCorrectTabs();
  setCorrectInputMasks();
  setCorrectChoices();
  setCorrectMenuAccordeon();
  setCorrectBurger();
  setCorrectMobileMenus();
  setCorrectSliders();
  setCorrectFavourites();
  setCorrectMap();
  
});


// Выпадающие списки
function setCorrectChoices() {
  // Библиотечные выпадашки для <select>
  const doChoicesLib = () => {
    const selectsDefault = document.querySelectorAll('.default-select');
    const selectsCatalog = document.querySelectorAll('.catalog-cards__top-line select');
    const selectsDatas = document.querySelectorAll('.data-field__select-block select');

    selectsDefault.forEach((select) => {
      const choices = new Choices(select, {
        searchEnabled: false,
        shouldSort: false,
        itemSelectText: '',
        classNames: {
          item: 'options-link__elem',
          itemSelectable: 'options-link__elem_active',
        }
      });

      // Постановка выбранного города в нужное место
      if (select.id === 'select-city-mobile') {
        select.addEventListener('change', () => {
          const activeLabel = choices.getValue().label;
          const titleCity = select.closest('.menu-field')?.querySelector('.menu-field__title');

          titleCity.innerText = activeLabel;
        });
      }
    });

    new Choices(document.querySelector('.menu-mobile select'), {
      searchEnabled: false,
      shouldSort: false,
      itemSelectText: '',
      classNames: {
        item: 'options-link__elem',
        itemSelectable: 'options-link__elem_active',
      }
    });

    selectsCatalog.forEach((select) => {
      new Choices(select, {
        searchEnabled: false,
        shouldSort: false,
        itemSelectText: '',
        classNames: {
          item: 'catalog-cards__elem',
          itemChoice: 'catalog-cards__elem_choice',
          itemSelectable: 'catalog-cards__elem_active'
        }
      })
    });

    selectsDatas.forEach((select) => {
      new Choices(select, {
        searchEnabled: false,
        shouldSort: false,
        itemSelectText: '',
      });
    });
  };

  // Кастомные многоуровневые выпадашки
  const doMy = () => {
    const dropdownsSelects = document.querySelectorAll('.dropdown');
    
    // Меню с выбором
    dropdownsSelects.forEach((dropdownSelect) => {
      const documentClickHandler = (event) => {
        const isChildOfDropdown = Boolean(event.target.closest('.dropdown-list'));
        
        if (!isChildOfDropdown) {
          dropdownSelect.classList.remove('active');
          document.removeEventListener('click', documentClickHandler);
        }
      };

      dropdownSelect.addEventListener('click', (event) => {
        event.stopPropagation();

        // Перед открытием нового меню - закрываем все другие
        dropdownsSelects.forEach((el) => {
          if (el === dropdownSelect) return;
          el.classList.remove('active');
        });

        const dropdownTitle = dropdownSelect.querySelector('.dropdown__title');
        const dropdownItems = dropdownSelect.nextElementSibling.querySelectorAll('.dropdown-item');
        
        dropdownSelect.classList
          [window.matchMedia('(pointer: fine)').matches ? 'toggle' : 'add']('active');

        // Если необходимо закрепление выбранного в заголовке
        if (dropdownSelect.classList.contains('dropdown-select')) {
          dropdownItems.forEach((dropdownItem) => {
            dropdownItem.addEventListener('click', () => {
              dropdownTitle.textContent = dropdownItem.textContent;
              dropdownTitle.classList.add('selected');
              dropdownSelect.classList.remove('active');
            });
          });
        }
        document.addEventListener('click', documentClickHandler);
      });
    });
  };

  doChoicesLib();
  doMy();
}

// Аккордеон в меню
function setCorrectMenuAccordeon() {
  const accordeons = document.querySelectorAll('.menu-drop');

  accordeons.forEach((accordeon) => {
    const accordeonItems = accordeon.querySelectorAll('.inner-list-item');

    accordeon.addEventListener('click', () => {
      // Перед открытием нового - закрываем остальные
      // if (accordeon.closest('.accordeon')) {
        accordeons.forEach((el) => {
          if (el === accordeon) return;
          el.classList.remove('active');        
        });
      // }

      accordeon.classList.toggle('active');
    });

    accordeonItems.forEach((accordeonItem) => {
      accordeonItem.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });
  });
}

// Бургер-меню
function setCorrectBurger() {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu-mobile');

  burger.addEventListener('click', () => {
    menu.classList.add('active');
    document.body.classList.add('unscroll');
  });
}

// Логика всех мобильных меню
function setCorrectMobileMenus() {
  const mobileMenus = document.querySelectorAll('.menu-mobile');

  mobileMenus.forEach((mobileMenu) => {
    const closeBtn = mobileMenu.querySelector('.menu__close');

    mobileMenu.addEventListener('swiped-left', () => {
      mobileMenu.classList.remove('active');
      document.body.classList.remove('unscroll');
    });
    
    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      document.body.classList.remove('unscroll');
    });
  });
}

// Слайдеры
function setCorrectSliders() {
  const doWelcomeSwiper = () => {
    const welcomeSlider = document.querySelector('.welcome-slider');
    const welcomeSwiper = new Swiper(welcomeSlider, {
      pagination: {
        el: '.welcome-slider-pagination',
        clickable: true,
      }
    });
  };
  const doProductsSliders = () => {
    const productsSliders = document.querySelectorAll('.products-slider');
    const productsSlidersLength = productsSliders.length;

    for (let i = 0; i < productsSlidersLength; i++) {
      const productsSlider = productsSliders[i]
      const productsSwiper = new Swiper(productsSlider, {
        allowTouchMove: true,
        grabCursor: true,
        simulateTouch: false,
        preventClicks: false,
        preventClicksPropagation: false,
        pagination: {
          el: `.products-${i+1}__pagination`,
          clickable: true,
        },
        navigation: {
          prevEl: `.products-${i+1}-arrow-prev`,
          nextEl: `.products-${i+1}-arrow-next`,
          disabledClass: 'disable',
        }
      });
   
      if (window.matchMedia('(max-width: 910px)').matches) {
        const slidesWrapper = productsSlider.querySelector('.products-slider__wrapper');
        const allSlides = Array.from(productsSlider.querySelectorAll('.products-slider__slide'));
        const allProducts = productsSlider.querySelectorAll('.product-card');
        let onOneSlide = 4;
        const dataMax = productsSlider.closest('section').dataset.maxSlidesOnSlide
        if (dataMax) {
          onOneSlide = Number(dataMax);
        }
        const countOfSlides = allProducts.length / onOneSlide;
        
        // Чтобы сделать нужное количество слайдов (4 по макету)
        if (allSlides.at(-1).children.length !== 0) {
          for (let index = 0; index < countOfSlides; index++) {
            const slide = allSlides[index];

            if (slide === undefined) {
              const slideSwiper = document.createElement('div');
              slideSwiper.classList.add('swiper-slide', 'products-cards', 'products-slider__slide');
              allSlides.push(slideSwiper);
              slidesWrapper.append(slideSwiper);
            }
          }
        }
        productsSwiper.update();

        // Удалить лишние продукты и добавить на новые слайды
        for (let index = 0; index < countOfSlides; index++) {
          const slide = allSlides[index];

          if (slide.children.length > onOneSlide) {
            Array.from(slide.children)
              .slice(onOneSlide,)
              .forEach((product) => {
                allSlides
                .find((anotherSlide) => Array.from(anotherSlide.children).length < onOneSlide)
                ?.append(product);
            });
          }
        }
      }
    }
  };
  const doForumSlider = () => {
    const forumSlider = document.querySelector('.forum-slider');
    const forumSwiper = new Swiper(forumSlider, {
      slidesPerView: 1,
      spaceBetween: 21,
      simulateTouch: false,
      pagination: {
        el: '.forum-slider-pagination',
        clickable: true,
      },
      breakpoints: {
        1400: {
          slidesPerView: 3,
        },

        1150: {
          slidesPerView: 2,
        },
      }
    });
  };
  const doFavouriteSlider = () => {
    const favouriteSlider = document.querySelector('.favourite-slider');
    const favouriteSwiper = new Swiper(favouriteSlider, {
      slidesPerView: 1,
      spaceBetween: 20,
      simulateTouch: false,
      navigation: {
        prevEl: '.favourite-arrow-prev',
        nextEl: '.favourite-arrow-next',
        disabledClass: 'disable',
      },
      pagination: {
        el: '.favourite-slider-pagination',
        clickable: true,
      },
      breakpoints: {
        1280: {
          slidesPerView: 3,
        },

        510: {
          slidesPerView: 2,
        }
      }
    });
  };
  const doProductPageSliders = () => {
    const productsMainSlider = document.querySelector('.product-main-slider');
    const productsThumbsSlider = document.querySelector('.product-thumbs-slider');
    const productsThumbsSwiper = new Swiper(productsThumbsSlider, {
      slidesPerView: 3,
      spaceBetween: 9,
      slideToClickedSlide: true,
    });
    const productsMainSwiper = new Swiper(productsMainSlider, {
      grabCursor: true,
      thumbs: {
        swiper: productsThumbsSwiper,
        slideThumbActiveClass: 'active-thumb',
      }
    });
  };
  const doReviewsSlider = () => {
    const reviewsSlider = document.querySelector('.reviews-slider');
    const reviewsSwiper = new Swiper(reviewsSlider, {
      allowTouchMove: true,
      grabCursor: true,
      simulateTouch: false,
      preventClicks: false,
      preventClicksPropagation: false,
      speed: 500,
      navigation: {
        prevEl: '.reviews-area__arrow_prev',
        nextEl: '.reviews-area__arrow_next',
        disabledClass: 'disable',
      }
    });

    if (window.matchMedia('(max-width: 1000px)').matches) {
      const mainSlide = reviewsSwiper.slides[0];
      console.log(mainSlide);

      Array.from(reviewsSwiper.slides)
        .slice(1,)
        .forEach((slide) => {
          const slideElems = Array.from(slide.children);

          slideElems.forEach((slideElem) => {
            const copiedElem = slideElem.cloneNode(true);
            copiedElem.classList.add('hide');
            mainSlide.append(copiedElem);
            slideElem.remove();
          });

          slide.remove();
      });

      reviewsSwiper.update();
    }
  };

  doProductsSliders();
  doWelcomeSwiper();
  doForumSlider();
  doFavouriteSlider();
  doProductPageSliders();
  doReviewsSlider();

  window.matchMedia('(min-width: 911px)')
    .addEventListener('change', () => {
      location.reload();
    });
}

// Добавление в избранное
function setCorrectFavourites() {
  const favouriteBtns = document.querySelectorAll('.product-to-favourite');

  favouriteBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      btn.classList.toggle('active');
    });
  });
}

// Карта
function setCorrectMap() {
  ymaps.ready(init);

  function init(){
    const myMap = new ymaps.Map("map-view", {
      center: [49.836330, 24.027426],      
      zoom: 19
    });
    const placemark = new ymaps.Placemark([49.836290, 24.026669], {
      balloonContent: 'Мы находимся здесь :)'
    }, {
      iconLayout: 'default#image',
      iconImageHref: '../images/src/map-hint-icon.svg',
      iconImageSize: [30, 42],
      iconImageOffset: [-5, -38]
    });

    myMap.geoObjects.add(placemark);
    myMap.controls.remove('geolocationControl');
    myMap.controls.remove('searchControl');
    myMap.controls.remove('trafficControl');
    myMap.controls.remove('typeSelector');
    myMap.controls.remove('fullscreenControl');
    myMap.controls.remove('zoomControl');
    myMap.controls.remove('rulerControl');

    if (window.matchMedia('(max-width: 800px)').matches) {
      myMap.setCenter([49.836290, 24.026669]);
    }

    if (window.matchMedia('(max-width: 670px)').matches) {
      myMap.setCenter([49.836146, 24.026682]);
    }
  }
}

// Попапы
function setCorrectPopups() {
  const triggers = document.querySelectorAll('.trigger');
  const needToFreeze = ['.options', '.header', '.main', '.footer'];
  const setUnscroll = () => {
    document.body.classList.add('unscroll');
    freezeFocus();
  };
  const delUnscroll = () => {
    document.body.classList.remove('unscroll');
    unfreezeFocus();
  };
  const freezeFocus = () => needToFreeze.forEach((selector) => {
    document.querySelector(selector).inert = true;
  });
  const unfreezeFocus = () => needToFreeze.forEach((selector) => {
    document.querySelector(selector).inert = false;
  });

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      const popupSelector = trigger.dataset.popupSelector;
      const popup = document.querySelector(popupSelector);
      const hideButtons = popup.querySelectorAll('.click-and-hide');
      const requiredInputs = Array.from(popup.querySelectorAll('input[required]'));
      const closePopup = (event) => {
        if (event.target.closest('.popup__content')) return;

        event.target.closest('.popup').classList.remove('active');

        // Если ещё остаются открытые попапы - оставляем сайт без скролла
        if (document.querySelector('.popup.active')) {
          return;
        }
        delUnscroll();
      };

      if (!popup) return;
      if (hideButtons) {
        hideButtons.forEach((hideButton) => {
          hideButton.addEventListener('click', () => {
            if (requiredInputs.every((input) => input.checkValidity())) {
              requiredInputs.forEach((input) => input.value = '');
              popup.classList.remove('active');
              delUnscroll();
            } else {
              alert('Введите номер телефона!');
            }
          });
        });     
      }

      popup.classList.add('active');
      setUnscroll();
      document.addEventListener('mousedown', closePopup);
    });
  });
}

// Маски на инпуты
function setCorrectInputMasks() {
  const telMask = new Inputmask('+380-(99)-99-99-999', { clearMaskOnLostFocus: true });
  const inputsTel = document.querySelectorAll('input[type="tel"]');

  inputsTel.forEach((inputTel) => {
    telMask.mask(inputTel);
  });
}

// Фильтры в каталоге
function setCorrectCatalogFilters() {
  const doClickableAside = () => {
    const sideFilters = document.querySelectorAll('.catalog-opts__inner-item');
    if (!sideFilters) return;

    sideFilters.forEach((sideFilter) => {
      sideFilter.addEventListener('click', () => {
        sideFilter.classList.toggle('active');
      });
    });
  };
  const doMobileFilters = () => {
    const filterMenuBtn = document.querySelector('.filter-button');
    if (!filterMenuBtn) return;
    const filterMenuBlock = document.querySelector('.menu-filter');
    const filterButtons = filterMenuBlock.querySelectorAll('.menu-filter__button');
    const resetButton = filterMenuBlock.querySelector('.menu-filter__reset');

    filterMenuBtn.addEventListener('click', () => {
      filterMenuBlock.classList.toggle('active');
    });

    filterButtons.forEach((filterButton) => {
      const popupOptsSelector = filterButton.dataset.optionsPopup;
      const popupOpts = document.querySelector(popupOptsSelector);
      const valueTitle = filterButton.querySelector('.menu-field__value-label');
      const oldValueOfTitle = valueTitle.innerText;

      filterButton.addEventListener('click', () => {
        popupOpts.classList.toggle('active');
      });

      popupOpts.addEventListener('click', (event) => {
        event.stopPropagation();

        if (event.target.closest('.filter-options__close') ||
            event.target.classList.contains('filter-options__row') ) {
          popupOpts.classList.remove('active');
          return;
        }

        const clickedElem = event.target.closest('.filter-options-list__item');
        if (!clickedElem) return;

        const clickedValue = clickedElem.innerText;
        valueTitle.innerText = clickedValue;
        popupOpts.classList.remove('active');
      });

      resetButton.addEventListener('click', () => {
        valueTitle.innerText = oldValueOfTitle;
      });
    });
  };

  doClickableAside();
  doMobileFilters();
}

// Подгрузка товаров в каталоге
function setCorrectLoadMoreCatalog() {
  const loadMoreBtn = document.querySelector('.load-more');
  if (!loadMoreBtn) return;
  const hidesCount = loadMoreBtn.querySelector('.load-more__count');
  const hidesProducts = document.getElementsByClassName('hide');
  const getNoun = (number, one, two, five) => {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }
    return five;
  };
  const updateCountState = (count) => {
    if (count === 0) hideLoadBtn();
    hidesCount.innerText = count + ' ' + getNoun(count, 'товар', 'товара', 'товаров');
  };
  const hideLoadBtn = () => {
    loadMoreBtn.style.display = 'none';
  };
  let onOneRow = 3;
  if (window.matchMedia('(max-width: 910px)').matches) onOneRow = 2;
  let lastAmount = 0;

  setTimeout(() => {
    updateCountState(hidesProducts.length);
  }, 0);
  
  loadMoreBtn.addEventListener('click', () => {
    const needRemoveHide = Array.from(hidesProducts).slice(lastAmount, onOneRow);

    needRemoveHide.forEach((productCard) => {
      productCard.classList.remove('hide');
    });

    updateCountState(hidesProducts.length);
  });
}

// Счётчики товаров
function setCorrectCounterProducts() {
  const counters = document.querySelectorAll('.product-counter');
  if (!counters.length) return;
  counters.forEach((counter) => {
    const counterValue = counter.querySelector('.product-counter__value');
    const counterPlus = counter.querySelector('.product-counter__plus')
    const counterMinus = counter.querySelector('.product-counter__minus')
    const setCounterValue = (value) => {
      counterValue.innerText = value;
    };
    const buttonsObserve = (value) => {
      if (value >= maxCount) counterPlus.classList.add('disabled');
      else counterPlus.classList.remove('disabled');

      if (value <= minCount) counterMinus.classList.add('disabled');
      else counterMinus.classList.remove('disabled');
    };
    const minCount = 1;
    const maxCount = 10;
    let nowCount = 1;

    setCounterValue(nowCount);
    buttonsObserve(nowCount);

    counterPlus.addEventListener('click', () => {
      if (nowCount + 1 > maxCount) return;
      
      setCounterValue(++nowCount);
      buttonsObserve(nowCount);
    });
    
    counterMinus.addEventListener('click', () => {
      if (nowCount - 1 < minCount) return;

      setCounterValue(--nowCount);
      buttonsObserve(nowCount);
    });
  });
}

// Табы
function setCorrectTabs() {
  const tabs = document.querySelector('.tabs');
  if (!tabs) return;
  const tabsBtns = tabs.querySelectorAll('.tabs__tab');
  const tabsInners = tabs.querySelectorAll('.tabs-content__inner');
  const closeAllSaveOne = (toSave) => {
    tabsBtns.forEach((tabBtn, index) => {
      if (tabBtn === toSave) return;

      tabBtn.classList.remove('active');
      tabsInners[index].classList.remove('active');
    });
  };

  tabsBtns.forEach((tabBtn, index) => {
    tabBtn.addEventListener('click', () => {
      closeAllSaveOne(tabBtn);

      tabBtn.classList.toggle('active');
      tabsInners[index].classList.toggle('active');
    });
  });
}

// Инпуты для выбора даты
function setCorrectDateInputs() {
  const dateInputs = document.querySelectorAll('.date-input');
  if (!dateInputs.length) return;
  
  dateInputs.forEach((dateInput) => {
    const datepicker = new AirDatepicker(dateInput, {
      minDate: new Date(),
      buttons: ['today']
    });

    if (window.matchMedia('(max-width: 550px)').matches) {
      datepicker.update({
        isMobile: true,
      });
    }
  });
}

// Аккордеон (страница форума)
function setCorrectAccordeon() {
  const accordeons = document.querySelectorAll('.questions-accordion');

  accordeons.forEach((accordeon) => {
    const accordeonItems = accordeon.querySelectorAll('.questions-accordion__item');
    const closeOne = (item) => {
      const control = item.querySelector('.questions-accordion__control');
      const content = item.querySelector('.questions-accordion__content');

      control.setAttribute('aria-expanded', false);
      content.setAttribute('aria-hidden', true);
      item.classList.remove('active');
      content.style.maxHeight = null;
    };
    const closeAllSaveOne = (save) => {
      accordeonItems.forEach((item) => {
        if (item === save) return;
        closeOne(item);
      });
    };


    accordeonItems.forEach((item) => {
      item.addEventListener('click', (event) => {
        if (event.target.closest('.questions-accordion__content')) return;

        const control = item.querySelector('.questions-accordion__control');
        const content = item.querySelector('.questions-accordion__content');

        closeAllSaveOne(item);
        item.classList.toggle('active');

        if (item.classList.contains('active')) {
          control.setAttribute('aria-expanded', true);
          content.setAttribute('aria-hidden', false);

          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          closeOne(item);
        }
      })
    });
  });
}
