document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('no-js');
  document.body.classList.add('yes-js');
  
  setCorrectChoices();
  setCorrectMenuAccordeon();
  setCorrectBurger();
});


// Выпадающие списки
function setCorrectChoices() {
  // Библиотечные выпадашки для <select>
  const doChoicesLib = () => {
    const selects = document.querySelectorAll('select');
    selects.forEach((select) => {
      new Choices(select, {
        searchEnabled: false,
        itemSelectText: '',
        classNames: {
          item: 'options-link__elem',
          itemSelectable: 'options-link__elem_active',
        }
      });
    });
  };

  // Кастомные многоуровневые выпадашки
  const doMy = () => {
    const dropdownsSelects = document.querySelectorAll('.dropdown');
    
    // Меню с выбором
    dropdownsSelects.forEach((dropdownSelect) => {
      const documentClickHandler = (event) => {
        const isChildOfDropdown = Boolean(event.target.closest('.dropdown'));
        
        console.log(isChildOfDropdown);

        if (!isChildOfDropdown) {
          dropdownSelect.classList.remove('active');
          document.removeEventListener('click', documentClickHandler);
        }
      };

      dropdownSelect.addEventListener('click', () => {
        const dropdownTitle = dropdownSelect.querySelector('.dropdown__title');
        const dropdownItems = dropdownSelect.querySelectorAll('.dropdown-item');
        
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
  const accordeons = document.querySelectorAll('.accordeon');

  accordeons.forEach((accordeon) => {
    const accordeonItems = accordeon.querySelectorAll('.inner-list-item');

    accordeon.addEventListener('click', () => {
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
  const closeMenu = menu.querySelector('.menu__close');

  document.addEventListener('swiped-left', () => {
    menu.classList.remove('active');  
  });

  burger.addEventListener('click', () => {
    menu.classList.add('active');
  });

  closeMenu.addEventListener('click', () => {
    menu.classList.remove('active');
  });
}