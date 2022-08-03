
let sketchBoardDim = 500;//getting the sketch board dimentions 
let sketchBoard = document.getElementById("sketch");
let mousesdown = false;
let clearBtn = document.getElementById("clear");
let sizeSlider = document.getElementById("sizeSlider");
let paintBtn = document.getElementById("paint");
let eraseBtn = document.getElementById("erase");
let rainbowBtn = document.getElementById("rainbow");
let colotPickerBtn = document.querySelector(".color-picker-span");
let borderCheckbox = document.getElementById("border-hide");
let eraseBool = false;
let hideBordersBool = -1;
let colorModeBool = true;
let rainbowBool = false;
let dim=  document.getElementById("sizeSlider").value;
//painting function
function colorMode(e){
    //checking if the mouse is down to pperform paint
    
    let color = document.getElementById("color-picker").value;
    e.target.style.cssText = `background-color:${color} !important;`;

}
function rainbowMode(e){
    let color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    e.target.style.cssText = `background-color:${color} !important;`;

}
//erase or paint depending on users choice.

function erase(e){
    
    e.target.style.backgroundColor = "white";
}
function makeActionOnBoard(e){
    //if eraseBool is true means that user wants to erase.
    if(eraseBool && mousesdown){
        //erasing function
        erase(e);
    }
    //if user wants  to paint with color mode
    else if(colorModeBool && mousesdown){
        colorMode(e);
    }
    else if(rainbowBool && mousesdown){
        rainbowMode(e);
    }
}
//clear the board
function clear(){
    let boardElements = document.querySelectorAll(".grid-element");
    boardElements.forEach( element =>{
        element.style.cssText = 'background-color:white;';
    });
}

//initialize the sketchboard.
function createSketchBoard(dim){
    document.querySelector(".size-paragraph").textContent = `${dim}x${dim}`;
    sketchBoard.style.gridTemplateColumns = `repeat(${dim},auto)`;//dividing the space between elements.
    sketchBoard.style.gridAutoRows = `auto`;
    sketchBoard.innerHTML = "";
    for (let i = 0 ; i < dim * dim ; i++){    
        let newElement = document.createElement("div");
        
        newElement.classList.add('grid-element');
        //adding events
        
        //
        newElement.addEventListener('click', (e)=>{
            if(colorModeBool)
                colorMode(e);
            else if(eraseBool)
                erase(e);
            else if(rainbowBool)
                rainbowMode(e);
        });
        //mouse down event
        newElement.addEventListener('mousedown',()=>{
            mousesdown = true;
        });
        newElement.addEventListener('mouseup',()=>{
            mousesdown = false;
        });
        
        //hover event
        newElement.addEventListener('mouseover',makeActionOnBoard);
        sketchBoard.appendChild(newElement);
        
        
        
    }

}
//hiding or showing the borders 
function borders(){
    let boardElements = document.querySelectorAll(".grid-element");
    if (hideBordersBool == 1){
        boardElements.forEach( element =>{
            element.classList.add("grid-hide-borders")
        });
    }
    else{
        boardElements.forEach( element =>{
            element.classList.remove("grid-hide-borders")
        })
    }
}
function activatePaintBtn(){
    colorModeBool = true;
    eraseBool = false;
    rainbowBool = false;
    eraseBtn.classList.remove('active');
    rainbowBtn.classList.remove('active');
    paintBtn.classList.add('active');
}
function activateEraseBtn(){
    eraseBtn.classList.add('active');
    paintBtn.classList.remove('active');
    rainbowBtn.classList.remove('active');
    eraseBool = true;
    colorModeBool = false;
    rainbowBool = false
}
function activateRainbowBtn(){
    rainbowBool= true;
    eraseBool = false;
    colorModeBool = false
    eraseBtn.classList.remove('active');
    paintBtn.classList.remove('active');
    rainbowBtn.classList.add('active');
}

//getting the sizeSlider's value.

sizeSlider.addEventListener('input',(e) =>{
    dim =e.target.valueAsNumber;
    createSketchBoard(dim);
})

//listen  for clear btn.

clearBtn.addEventListener('click',clear);

//listen for paint btn

paintBtn.addEventListener('click',() => {

    activatePaintBtn(); 

});

//listen for erase btn

eraseBtn.addEventListener('click',() =>{

    activateEraseBtn();

});
//listen  for rainbow btn

rainbowBtn.addEventListener('click',() => {

    activateRainbowBtn();

});

//listen  for click on the color picker

colotPickerBtn.addEventListener('click',() =>{

    document.getElementById("color-picker").click();
    
});

//listen for hide border checkbox
borderCheckbox.addEventListener('input',() => {
    hideBordersBool *= -1;
    borders()
    
});

//upadte the style of color picker to the current chosen color because the color picker is a <span>

window.setInterval(function(){
    
    colotPickerBtn.style.backgroundColor = document.getElementById("color-picker").value;
}, 1);

createSketchBoard(dim)
