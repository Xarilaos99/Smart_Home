
// on off state
const toggle =document.querySelectorAll('.toggle input')


for(let i = 0; i < toggle.length; i++){
    if(toggle[i].parentNode.querySelector('.onoff').textContent === "ON" ){
        toggle[i].checked=1
    }

    toggle[i].addEventListener('click',()=>{
        const onOff=toggle[i].parentNode.querySelector('.onoff')
        
        onOff.textContent=toggle[i].checked ? 'ΟΝ':'OFF'
        
    })
}


// select box show choices 
const selected =document.querySelector('.selected-box .selected')
const optionsContainer =document.querySelector(' .selected-box .options-container')
const optionsList =document.querySelectorAll('.selected-box .option')

selected.addEventListener("click",()=>{
    optionsContainer.classList.toggle("active-option");
})

optionsList.forEach(choice=>{
    choice.addEventListener("click",()=>{
        selected.innerHTML=choice.querySelector("label").innerHTML;
        optionsContainer.classList.remove("active-option");
    })
})



// show selected box
const addDiv=document.querySelectorAll('[data-add-target]')
const closeDiv=document.querySelectorAll('[data-close-button]')
const overlay=document.querySelector("#overlay")



addDiv.forEach(button=>{
    button.addEventListener('click',()=>{
        const selBox=document.querySelector(button.dataset.addTarget)
        openBox(selBox)
    })
})

closeDiv.forEach(button=>{
    button.addEventListener('click',()=>{
        const selBox=button.closest(".selected-box")
        closeBox(selBox)
    })
})


function openBox(selBox){
    if(selBox==null) return
    selBox.classList.add("active")
    overlay.classList.add("active")
}

function closeBox(selBox){
    if(selBox==null) return
    selBox.classList.remove("active")
    overlay.classList.remove("active")
}

// create div


// const enterBut=document.querySelector('.submit')
// const idDev=document.querySelector('.id-entry input[type="text"]');
// enterBut.addEventListener('click',createDiv);

// function createDiv(){

//         // const enterBut=document.querySelector('.id-entry input[ type="submit"]')
//         const idDev=document.querySelector('.id-entry input[type="text"]');
//         alert(enterBut.value);
//         // console.log(idDev)
//         alert(idDev.value)
// }

const form=document.querySelector('[ name="myForm"]')
const enterBut=document.querySelector('.id-entry input[ type="submit"]')
const idDev=document.querySelector('.id-entry input[type="text"]');

const middle=document.querySelector('.middle');


const lamp= (id)=> `<div class="${id}">
        <div class="middle_top">
        <span class="material-icons-sharp">light</span>
        <h3>Lamp_ ${id}</h3>
        <div class="top_right">
            <label class="toggle">
                <span class="onoff">OFF</span>
                <input type="checkbox"/>
                <span class="slider1 round"></span>
            </label>
        </div>
    </div>
    <div class="slider">
        <span class="material-icons-sharp">wb_sunny</span>
        <input type="range" name="" id="range" value="">
        <span class="material-icons-sharp">wb_sunny</span>
    </div>

    <div class="bottom">
        <h3>Color selection</h3>
        <div class="colors_grid">
            <div class="color">
                <input type="radio" name="color"  id="white">
                <label for="white">
                    <svg>
                        <circle cx='25' cy='25' r='20' class="white_circle"></circle>
                    </svg>
                </label>
            </div>
            <div class="color">
                <input type="radio" name="color" id="orange">
                <label for="orange">
                    <svg>
                        <circle cx='25' cy='25' r='20'class="orange_circle" ></circle>
                    </svg>
                </label>
            </div>
            <div class="color">
                <input type="radio" name="color" id="black">
                <label for="black" >
                    <svg>
                        <circle cx='25' cy='25' r='20'class="black_circle" ></circle>
                    </svg>
                </label>
            </div>
            <div class="color">
                <input type="radio" name="color"  id="blue" >
                <label for="blue" >
                    <svg>
                        <circle cx='25' cy='25' r='20'class="blue_circle" ></circle>
                    </svg>
                </label>
            </div>
            <div class="color">
                <input type="radio" name="color"  id="purple">
                <label for="purple" >
                    <svg>
                        <circle cx='25' cy='25' r='20'class="purple_circle" ></circle>
                    </svg>
                </label>
            </div>
            <div class="color">
                <input type="radio" name="color"  id="red">
                <label for="red" >
                    <svg>
                        <circle cx='25' cy='25' r='20'class="red_circle" ></circle>
                    </svg>
                </label>
            </div>
        </div>
    </div>
    </div>`;


const socket=(id)=>`
        <div class="${id}">
                <div class="middle_top">
                    <span class="material-icons-sharp">outlet</span>
                    <h3>Socket_${id}</h3>
                    <div class="top_right">
                        <label class="toggle">
                            <span class="onoff">OFF</span>
                            <input type="checkbox"/>
                            <span class="slider1 round"></span>
                        </label>
                    </div>
                </div>
            
            </div>

`;
// const idDev=document.querySelector('#temp');

// enterBut.addEventListener('click',createDiv());
form.addEventListener('submit',createDiv)
function createDiv(){

    if(idDev.value==='' || selected.innerHTML=="Επιλέξτε Συσκευή"){
        return
    }
    else if(selected.innerHTML=="Socket"){
        let htmlCon=socket(idDev.value)
        middle.insertAdjacentHTML("afterbegin",htmlCon);

    }
    else{
        let htmlCon=lamp(idDev.value)
        middle.insertAdjacentHTML("afterbegin",htmlCon);
    }

    alert(enterBut.value);
    alert(selected.innerHTML);
    alert(idDev.value)
}

// tick handler



const clr_gr=document.querySelectorAll('.colors_grid');

const clr_gr_ids=[]
clr_gr.forEach(gr=>{
    console.log(`.colors_grid #`+`${gr.id}`)
    clr_gr_ids.push(document.querySelector(`.colors_grid#`+`${gr.id.toString()}`))


})


console.log(clr_gr_ids)
console.log(clr_gr_ids.length)
for(let i=0;i<clr_gr_ids.length;i++){
    colors=clr_gr_ids[i].querySelectorAll('div .color');
    console.log(colors)
    colors.forEach(clr=>{
                clr.addEventListener("mousedown",()=>{
                    let selec=clr_gr_ids[i].querySelector('.color.active');
                    console.log(selec)
                    selec.setAttribute("class","color");
                    clr.setAttribute("class","color active");
            })
        })
}

const sldr=document.querySelectorAll('#range');


sldr.forEach(sld=>{
    sld.addEventListener("click",()=>{
        console.log(sld.value)
    })
})









