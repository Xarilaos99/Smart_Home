
// on off state
const toggle =document.querySelectorAll('.toggle input[type="checkbox"]')

console.log(toggle)
for(let i = 0; i < toggle.length; i++){
    // console.log("============================================================")
    // console.log(toggle[i])
    // console.log(toggle[i].parentNode.querySelector('.onoff').textContent)
    // console.log(toggle[i].checked)
    // console.log(toggle[i].parentNode.querySelector('.onoff').textContent == "OFF" )
    console.log(toggle[i])
    if(toggle[i].parentNode.querySelector('.onoff').textContent == "ON" ){
        // console.log(toggle[i].parentNode.querySelector('.onoff').textContent == "ON" )
        toggle[i].checked=1
        // console.log(toggle[i].checked)
    }

    // toggle[i].addEventListener('click',()=>{
    //     const onOff=toggle[i].parentNode.querySelector('.onoff')
        
    //     onOff.textContent=toggle[i].checked ? 'ΟΝ':'OFF'
    // })
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


for(let i=0;i<clr_gr_ids.length;i++){
    colors=clr_gr_ids[i].querySelectorAll('div .color');
    console.log(colors)
    colors.forEach(clr=>{
                clr.addEventListener("mousedown",()=>{
                    let selec=clr_gr_ids[i].querySelector('.color.active');
                    
                    clr.childNodes[1].setAttribute("name",`${clr.childNodes[1].id}`)

                    selec.setAttribute("class","color");
                    clr.setAttribute("class","color active");


                    let sub_btn=clr_gr_ids[i].querySelector('button');
                    console.log(sub_btn)
                    console.log("tmep")
                    sub_btn.style.display="inline"
                    sub_btn.style.background="#ff7782";
                    sub_btn.style.fontSize= "1.2rem";
;
                    sub_btn.style.width= "6rem"
                    sub_btn.style.height= "2rem"
          
                    sub_btn.style.borderRadius= "10px";
                    sub_btn.style.paddingLeft= "4px";

                    sub_btn.style.cursor= "pointer";
                    sub_btn.style.fontWeight="bold"

            })
        })
}

const sldr=document.querySelectorAll('#range');


sldr.forEach(sld=>{
    sld.addEventListener("click",()=>{
        let btn=sld.nextElementSibling

        btn.style.display="flex"
        btn.style.background="#ff7782";
        btn.style.fontSize= "1.2rem";

        btn.style.width= "6rem"
        btn.style.height= "2rem"

        btn.style.borderRadius= "10px";
        btn.style.paddingLeft= "8px";
        btn.style.paddingTop= "3.5px";

        btn.style.cursor= "pointer";
        btn.style.fontWeight="bold"
    
        console.log(sld.value)
    })
})








