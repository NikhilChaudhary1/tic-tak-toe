let boxes = document.querySelectorAll(".box");
let reset_btn = document.querySelector(".reset-btn");
let new_game = document.querySelector("#new-game");
let msg_container = document.querySelector(".msg-container");
let para = document.querySelector("#msg");

let turnO = true;
let count = 0;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const showDraw = () =>{
    para.innerText = "The Game was drawed";
    msg_container.classList.remove("hide");
}

const checkWinner = () =>{
    for(let pattern of winPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1 === pos2 && pos2 === pos3){
                console.log("Winner ",pos1);
                showWinner(pos1);
                return true;
            }
        }
    }
    return false;
};

const showWinner = (winner) =>{
    para.innerText =  `Winner: ${winner}`;
    msg_container.classList.remove("hide"); 
    disableBoxes();
}

boxes.forEach( (box) =>{
    box.addEventListener("click",() => {
        count++;
        if(turnO){
            box.innerHTML="O";
            turnO = false;
        }
        else{
            box.innerHTML="X";
            box.classList.add("colorX");
            turnO = true;
        }
        box.disabled = true;
        let check = checkWinner();
        if(check === false && count === 9){
            showDraw();
        }
    });
});

reset_btn.addEventListener("click",reset);

function reset(){
    turnO = true;
    boxes.forEach( (box) =>{
        box.innerHTML="";
        box.disabled = false;
        box.classList.remove("colorX");
    });
        msg_container.classList.add("hide");
        count = 0;
}

new_game.addEventListener("click",reset);

