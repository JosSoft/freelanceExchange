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

    const renderOrders = () => {
        orders.forEach((order, i) => {
            console.log(order);
            ordersTable.innerHTML += `
                <tr class="order">
                    <td>${i + 1}</td>
                    <td>${order.description}</td>
                    <td class="${order.currency}"></td>
                    <td>${order.deadline}</td>
                </tr>`
        })
    }
    //https://www.youtube.com/watch?v=I_UudO-LGKs

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
        console.log(orders)

        formCustomer.reset(); // сбрасываем форму
    })



})