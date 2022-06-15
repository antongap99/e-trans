'use stirct';


const createElem = (tag, attr) => {
    const elem = document.createElement(tag);

    return Object.assign(elem, { ...attr });
};


const disablescroll = () => {
    document.body.scrollPosition = window.scrollY;
    document.body.style.cssText =  `
    overflow: hidden;
    position: fixed;
    top: -${document.body.scrollPosition}px;
    left: 0;
    height: 100wh;
    width: 100vw;
    padding-right: ${window.innerWidth - document.body.offsetWidth}px; `
     
} /* padding-right для того, чтобы избавиться от скочка в момент открытия модалки
так как толщина скрола браузера влияет на ширину body (так как он исчезает при открытии модалки
    ширина body меняется*/

const enableScroll = () => {
    document.body.style.cssText = '';
    window.scroll({top: document.body.scrollPosition})

}
const creatModal = (title, discription) => {
    const overLayElem = createElem('div', { className: 'modal' });
    const modalElem = createElem('div', { className: 'modal__block' });
    const modalContainerElem = createElem('div', { className: 'modal__container' });

    const titleElem = createElem('h2', {
        className: 'modal__title',
        textContent: `Заказать ${title}`
    })

    const discriptionElem = createElem('p', {
        className: 'modal__discription',
        textContent: discription,
    })

    const formElem = createElem('form', {
        className: 'modal__form',
        method: 'post',
        action: 'https://jsonplaceholder.typicode.com/posts',
        id: 'order',
    })

    const nameLabelElem = createElem('label', { className: 'modal__labal', })

    const nameSpanElem = createElem('span', {
        className: 'modal__text',
        textContent: 'Имя'
    });

    const nameInputElem = createElem('input', {
        className: 'form__input',
        placeholder: ' Введите ваше имя',
        name: 'name',
        required: true,
    });

    const phoneLabelElem = createElem('label', { className: 'modal__labal', })

    const phoneSpanElem = createElem('span', {
        className: 'modal__text',
        textContent: 'Телефон'
    });

    const phoneInputElem = createElem('input', {
        className: 'form__input',
        placeholder: ' Введите ваше телефон',
        name: 'phone',
        required: true,
    });


    const hideInput = createElem('input', {
        type: 'hidden',
        name: 'product',
        value: title,
    });


    const btnSubmit = createElem('button', {
        className: 'modal__submit',
        type: 'submit',
        textContent: 'Заказать',
    });

    btnSubmit.setAttribute('form', 'order');

    const closeModalBtn = createElem('button', {
        className: 'modal__close',
        innerHTML: 
        `<svg 
            width="30" height="30" viewbox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.75 8.0125L21.9875 6.25L15 13.2375L8.0125 6.25L6.25 8.0125L13.2375 15L6.25 21.9875L8.0125 23.75L15 16.7625L21.9875 23.75L23.75 21.9875L16.7625 15L23.75 8.0125Z" fill="#18171A"/>
        </svg> `,
    });


    overLayElem.addEventListener('click', (event) => {
        const  target =  event.target
        if(target === overLayElem || target.closest('.modal__close') ) {
            overLayElem.remove();
            enableScroll();
        }; 
    })

    nameLabelElem.append(nameSpanElem, nameInputElem);
    phoneLabelElem.append(phoneSpanElem, phoneInputElem);
    formElem.append(
        nameLabelElem, 
        phoneLabelElem, 
        hideInput
    );
    modalContainerElem.append(
        titleElem, 
        discriptionElem, 
        formElem, 
        btnSubmit, 
        closeModalBtn
    );

    modalElem.append(modalContainerElem);
    overLayElem.append(modalElem);
    disablescroll();
    document.body.append(overLayElem);
}




const productBtn = document.querySelectorAll('.product__btn');

const product__title = document.querySelectorAll('.product__title');

const product__discription = document.querySelectorAll('.product__discription');
console.log(product__title);
console.log(product__discription);
console.log(productBtn);


for (let i = 0; i < productBtn.length; i++) {
    productBtn[i].addEventListener('click', () => {
        const title = product__title[i].textContent;
        const discription = product__discription[i].textContent;
        creatModal(title, discription);
    })
}

// console.log('article: ', article);