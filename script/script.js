document.addEventListener('DOMContentLoaded', () => {
    'use strict'
    //
    const customer = document.getElementById('customer')
    const freelancer = document.getElementById('freelancer')
    // Blocks
    const blockChoice = document.getElementById('block-choice')
    const blockCustomer = document.getElementById('block-customer')
    const blockFreelancer = document.getElementById('block-freelancer')
    const btnExit = document.getElementById('btn-exit')
    // Froms
    const formCustomer = document.getElementById('form-customer')
    // Заказы
    const orders = JSON.parse(localStorage.getItem('freeOrder')) || []
    console.log(orders)
    const ordersTable = document.getElementById('orders')
    // Модальнве окна
    const modalOrder = document.getElementById('order_read')
    const modalOrderActive = document.getElementById('order_active')

    const toStorage = () => localStorage.setItem('freeOrder', JSON.stringify(orders))
    
    // Создание заказов
    const renderOrders = () => {
        ordersTable.textContent = ''
        orders.forEach((order, i) => {
            ordersTable.innerHTML += `
                <tr class="order ${order.active ? 'taken' : ''}" 
                    data-number-order="${i}">
                    <td>${i + 1}</td>
                    <td>${order.description}</td>
                    <td class="${order.currency}"></td>
                    <td>${order.deadline}</td>
                </tr>`
        })
    }

    const handlerMode = event => {
        const target = event.target
        const modal = target.closest('.order-modal') 
        const order = orders[modal.id] // заказ

        const baseAction = () =>{

            
        }
        // закрытие модальной формы
        if (target.closest('.close') || target === modal) {
            modal.style.display = 'none'
        }
        // взять заказ
        if (target.classList.contains('get-order')) {
            order.active = true
            modal.style.display = 'none'
            toStorage()
            renderOrders()
        }
        // отказаться
        if (target.id === 'capitulation') {
            order.active = false
            modal.style.display = 'none'
            toStorage()
            renderOrders()
        }
        // выполнить
        if (target.id === 'ready') {
            orders.splice(orders.indexOf(order), 1) // ищем индекс взятого заказа и удаляем
            modal.style.display = 'none'
            toStorage()
            renderOrders()
        }
    }

    const openModal = numberOrder => {
        const order = orders[numberOrder]
        // деструктивное присвоение
        const {
            title,
            firstName,
            email,
            phone,
            description,
            amount,
            currency,
            deadline,
            active
        } = order

        const modal = active ? modalOrderActive : modalOrder
        modal.id = numberOrder

        const titleBlock = modal.querySelector('.modal-title'),
            firstNameBlock = modal.querySelector('.firstName'),
            emailBlock = modal.querySelector('.email'),
            descriptionBlock = modal.querySelector('.description'),
            deadlineBlock = modal.querySelector('.deadline'),
            currencyBlock = modal.querySelector('.currency_img'),
            countBlock = modal.querySelector('.count'),
            phoneBlock = modal.querySelector('.phone');

        titleBlock.textContent = title
        firstNameBlock.textContent = firstName
        descriptionBlock.textContent = description
        deadlineBlock.textContent = deadline
        countBlock.textContent = amount
        emailBlock.textContent = email
        emailBlock.href = 'mailto:' + email
        currencyBlock.className = 'currency_img'
        currencyBlock.classList.add(currency)
        
        //if (phoneBlock) phoneBlock.href = 'tel:' + phone
        phoneBlock ? phoneBlock.href = 'tel:' + phone : ''
        //phoneBlock && (phoneBlock.href = 'tel:' + phone) 
        
        modal.style.display = 'flex'

        // выход
        modal.addEventListener('click', handlerMode)
    }

    ordersTable.addEventListener('click', event => {
        const target = event.target
        const targetOrder = target.closest('.order')
        //console.log(orders[targetOrder.dataset.numberOrder])
        // открываем модальное окно
        if (targetOrder) {
            openModal(targetOrder.dataset.numberOrder)
        }
    })
    customer.addEventListener('click', () => {
        blockChoice.style.display = 'none'
        blockCustomer.style.display = 'block'
        btnExit.style.display = 'block'
    })
    freelancer.addEventListener('click', () => {
        blockChoice.style.display = 'none'
        renderOrders();
        blockFreelancer.style.display = 'block'
        btnExit.style.display = 'block'
    })
    btnExit.addEventListener('click', () => {
        btnExit.style.display = 'none'
        blockCustomer.style.display = 'none'
        blockFreelancer.style.display = 'none'
        blockChoice.style.display = 'block'
    })
    formCustomer.addEventListener('submit', event => {
        event.preventDefault()
        //debugger
        const obj = {}

        //for (const elem of formCustomer.elements) {
        //[...formCustomer.elements].forEach(elem => {
        Array.from(formCustomer.elements).forEach(elem => {

            if ((elem.tagName === 'INPUT' && elem.type !== 'radio') ||
                (elem.type === 'radio' && elem.checked) ||
                elem.tagName === 'TEXTAREA') {

                obj[elem.name] = elem.value
            }
        })

        orders.push(obj)
        toStorage()
        //console.log(obj)
        formCustomer.reset(); // сбрасываем форму
    })



})