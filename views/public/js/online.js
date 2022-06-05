const sideMenu=document.querySelector("aside");
const menuBtn=document.querySelector("#menu-btn");
const closeBtn=document.querySelector("#close-btn");

const chart2 = document.querySelector("#chart2").getContext('2d');

menuBtn.addEventListener('click',()=>{
    sideMenu.style.display='block';
})


closeBtn.addEventListener('click',()=>{
    sideMenu.style.display='none';
})


let onlineUsersData= [
    {
        label: 'Max Users',
        data: [35, 28, 41, 30, 71,69],
        borderColor: 'green',
        borderWidth: 2
    },
    {
        label: 'Min Users',
        data: [19, 17, 16, 18, 20, 21],
        borderColor: 'black',
        borderWidth: 2
    }
]

new Chart(chart2, {
    type: 'line',
    data: {
        labels: ['Ιανουάριος', 'Φεβρουάριος','Μάρτιος',  'Απρίλιος', 'Μάιος', 'Ιούνιος',
            'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος' ],

        datasets: onlineUsersData
        
    },

    options: {
        responsive: true
    }
})


