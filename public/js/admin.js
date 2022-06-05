const sideMenu=document.querySelector("aside");
const menuBtn=document.querySelector("#menu-btn");
const closeBtn=document.querySelector("#close-btn");

const chart = document.querySelector("#chart").getContext('2d');


menuBtn.addEventListener('click',()=>{
    sideMenu.style.display='block';
})


closeBtn.addEventListener('click',()=>{
    sideMenu.style.display='none';
})

let consumptionUsersData= [{
    label: 'User1',
    data: [120, 160, 180, 102, 110, 39],
    borderColor: 'red',
    borderWidth: 2
},
{
    label: 'User2',
    data: [190, 170, 120, 160, 180, 30],
    borderColor: 'blue',
    borderWidth: 2
},
{
    label: 'User3',
    data: [150, 110, 130, 120, 160, 37],
    borderColor: 'black',
    borderWidth: 2
}]

new Chart(chart, {
    type: 'line',
    data: {
        labels: ['Ιανουάριος', 'Φεβρουάριος','Μάρτιος',  'Απρίλιος', 'Μάιος', 'Ιούνιος',
        'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος' ],

        datasets: consumptionUsersData

    },

    options: {
        responsive: true
    }
})

