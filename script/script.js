document.addEventListener('DOMContentLoaded', () => {
    'use strict'

    /*
        <a href="#" id="customer" class="btn btn-primary my-3 px-4 py-2">Заказчик</a>
	    <a href="#" id="freelancer" class="btn btn-secondary my-3 px-4 py-2">Фрилансер</a>
    */
    const customer = document.getElementById('customer')
    const freelancer = document.getElementById('freelancer')

    customer.addEventListener('contextmenu', () => {
        console.log('contextmenu');
    })



    //console.log(customer)


    //console.log(freelancer)
})