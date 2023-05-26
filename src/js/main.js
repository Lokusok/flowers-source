document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('no-js');
  document.body.classList.add('yes-js');
  
  setCorrectPopups();
  setCorrectCatalogFilters();
  setCorrectChoices();
  setCorrectMenuAccordeon();
  setCorrectBurger();
  setCorrectMobileMenus();
  setCorrectSliders();
  setCorrectFavourites();
  setCorrectMap();
  setCorrectInputMasks();
});


// Выпадающие списки
function setCorrectChoices() {
  // Библиотечные выпадашки для <select>
  const doChoicesLib = () => {
    const selectsDefault = document.querySelectorAll('.default-select');
    const selectsCatalog = document.querySelectorAll('.catalog-cards__top-line select');

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
        itemSelectText: '',
        classNames: {
          item: 'catalog-cards__elem',
          itemChoice: 'catalog-cards__elem_choice',
          itemSelectable: 'catalog-cards__elem_active'
        }
      })
    })
  };

  // Кастомные многоуровневые выпадашки
  const doMy = () => {
    const dropdownsSelects = document.querySelectorAll('.dropdown');
    
    // Меню с выбором
    dropdownsSelects.forEach((dropdownSelect) => {
      const documentClickHandler = (event) => {
        const isChildOfDropdown = Boolean(event.target.closest('.dropdown'));
        
        if (!isChildOfDropdown) {
          dropdownSelect.classList.remove('active');
          document.removeEventListener('click', documentClickHandler);
        }
      };

      dropdownSelect.addEventListener('click', () => {
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
   
      const mediaMaxWidth = window.matchMedia('(max-width: 910px)');
      const mediaMaxHandler = () => {
        const slidesWrapper = productsSlider.querySelector('.products-slider__wrapper');
        const allSlides = Array.from(productsSlider.querySelectorAll('.products-slider__slide'));
        const allProducts = productsSlider.querySelectorAll('.product-card');
        const onOneSlide = 4;
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
                .find((anotherSlide) => Array.from(anotherSlide.children).length < 4)
                ?.append(product);
            });
          }
        }
      };
      if (mediaMaxWidth.matches) {
        mediaMaxHandler();
      }
      mediaMaxWidth.addEventListener('change', mediaMaxHandler);
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

  doProductsSliders();
  doWelcomeSwiper();
  doForumSlider();
  doFavouriteSlider();

  window.matchMedia('(min-width: 911px)')
    .addEventListener('change', () => {
      location.reload();
    });
}

// Добавление в избранное
function setCorrectFavourites() {
  const favouriteBtns = document.querySelectorAll('.product-card__to-favourite');

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
  const setUnscroll = () => document.body.classList.add('unscroll');
  const delUnscroll = () => document.body.classList.remove('unscroll');

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
  const telMask = new Inputmask('8-(999)-999-99-99', { clearMaskOnLostFocus: true });
  const inputsTel = document.querySelectorAll('input[type="tel"]');

  inputsTel.forEach((inputTel) => {
    telMask.mask(inputTel);
  });
}

// Фильтры в каталоге
function setCorrectCatalogFilters() {
  const doClickableAside = () => {
    const sideFilters = document.querySelectorAll('.catalog-opts__inner-item');
  
    sideFilters.forEach((sideFilter) => {
      sideFilter.addEventListener('click', () => {
        sideFilter.classList.toggle('active');
      });
    });
  };
  const doMobileFilters = () => {
    if (!window.matchMedia('(max-width: 550px)').matches) return;

    const filterMenuBtn = document.querySelector('.filter-button ');
    const filterMenuBlock = document.querySelector('.menu-filter');
    const allOptions = filterMenuBlock.querySelectorAll('.filter-select');
    const resetFilters = filterMenuBlock.querySelector('.menu-filter__reset');

    filterMenuBtn.addEventListener('click', () => {
      filterMenuBlock.classList.toggle('active');
    });

    console.log(allOptions);
    allOptions.forEach((option) => {
      const choice = new Choices(option, {
        searchEnabled: false,
        shouldSort: false,
        itemSelectText: '',
        classNames: {
          item: 'options-link__elem',
          itemSelectable: 'options-link__elem_active',
        }
      });

      const activeTitle = option.closest('.menu-filter__option').querySelector('.menu-field__value-label');
      const oldValueOfTitle = activeTitle.innerText === '' ? 'Выберите' : activeTitle.innerText;

      choice.passedElement.element.addEventListener('change', () => {
        const activeLabel = choice.getValue().label;
        activeTitle.innerText = activeLabel;
      });

      resetFilters.addEventListener('click', () => {
        activeTitle.innerText = oldValueOfTitle;
        choice.clearInput();
      });
    });
  };

  doClickableAside();
  doMobileFilters();
}
