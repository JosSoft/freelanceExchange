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
        const modal = order.active ? modalOrderActive : modalOrder
        
        const titleBlock = document.querySelector('.modal-title'),
            firstNameBlock = document.querySelector('.firstName'),
            emailBlock = document.querySelector('.email'),
            descriptionBlock = document.querySelector('.description'),
            deadlineBlock = document.querySelector('.deadline'),
            currencyBlock = document.querySelector('.currency_img'),
            countBlock = document.querySelector('.count'),
            phoneBlock = document.querySelector('.phone');

            debugger
            titleBlock.textContent = order.title
            firstNameBlock.textContent = order.firstName
            descriptionBlock.innerHTML = order.description
            deadlineBlock.textContent = order.deadline
            countBlock.textContent = order.amount

            emailBlock.setAttribute('href', order.email)
            emailBlock.textContent = order.email
            phoneBlock.setAttribute('href', order.phone)

            currencyBlock.classList.add(order.currency)


        modal.style.display = 'block'
        // позаботимся о выходе
        modal.querySelector('.close').addEventListener('click', () => {
            modal.style.display = ''
        })
   
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

            if ((elem.tagName === 'INPUT' && 
                (elem.type !== 'radio' || elem.type !== 'submit')) ||
                (elem.type === 'radio' && elem.checked) ||
                elem.tagName === 'TEXTAREA') {

                obj[elem.name] = elem.value
            }
        })

        orders.push(obj)
        //console.log(obj)
        formCustomer.reset(); // сбрасываем форму
    })



})