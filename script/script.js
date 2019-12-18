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
    const orders = []
    const ordersTable = document.getElementById('orders')
    // Модальнве окна
    const modalOrder = document.getElementById('order_read')
    const modalOrderActive = document.getElementById('order_active')

    // Создание заказов
    const renderOrders = () => {
        ordersTable.textContent = ''
        orders.forEach((order, i) => {
            ordersTable.innerHTML += `
                <tr class="order" data-number-order="${i}">
                    <td>${i + 1}</td>
                    <td>${order.description}</td>
                    <td class="${order.currency}"></td>
                    <td>${order.deadline}</td>
                </tr>`
        })
    }

    const openModal = numberOrder => {
        const order = orders[numberOrder]
        // деструктивное присвоение
        const {
            title,
            firstName,
            email = '#',
            phone = '#',
            description,
            amount,
            currency,
            deadline,
            active = true
        } = order

        const modal = active ? modalOrderActive : modalOrder

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
        currencyBlock.classList.add(currency)
        phoneBlock ? phoneBlock.href = 'tel:' + phone : ''

        modal.style.display = 'flex'
        // позаботимся о выходе
        modal.querySelector('.close').addEventListener('click', () => {
            modal.style.display = ''
        })
    }

    //https://www.youtube.com/watch?v=IjDeuGLC0jo

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
        console.log(obj)
        formCustomer.reset(); // сбрасываем форму
    })



})