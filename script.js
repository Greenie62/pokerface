//make cards

let families=['♥ ','♠','♣','♦'];
let familyStrings=["hearts","spades","clubs","diamonds"]
let values=[2,3,4,5,6,7,8,9,10,"J","Q","K","A"];

//invoked because comparison between ints n String was causing a bug
// this is easiest way to fix

let intTracker=[2,3,4,5,6,7,8,9,10,11,12,13,14]


//gameplay arrays
let cards=[];
let playersHandRef=[];

// this stores idx values from playersHandRef
let cardsToTrade=[]
//holds the actual divCards...then rewrites n replaces(we hope!)
let tradedCards=[]

//player gets 2 trades (3 cards first, 2 cards second)
let tradeCounter=0;


//create cards 

families.forEach((family,index)=>{
    values.forEach((value,idx)=>{
        let card={value,
                  family,
                  familyString:familyStrings[index],
                  tracker:intTracker[idx],
                  spliceIdx:cards.length-1}
        cards.push(card)
    })
})

let shuffled=cards.sort(()=>Math.random()-.5);

// console.log(shuffled)


//DOM elements
let messagesDOM=document.querySelector(".messageToPlayer")
let playBtn=document.querySelector(".playBtn");
let playBtnDiv=document.querySelector(".playDiv")
let foldBtn=document.querySelector(".foldBtn");
let tradeBtn=document.querySelector(".tradeBtn")
let playersHandDiv=document.querySelector(".playersHandDiv")
let cardsEl=""
let playersHand=document.querySelector(".playersHandRow")



playBtn.onclick=startGame;

foldBtn.onclick=foldGame;


function foldGame(){
    console.log("Player folds!")
}


function startGame(){
    playBtnDiv.style.display='none';
    playersHandDiv.classList.add('show-playersHand')

           dealCards()
}



function dealCards(){
    var initialHand=shuffled.splice(0,5);
     playersHandRef=initialHand
    playersHandRef.forEach((c,idx)=>{
        c.cardIdx=idx
    })

   console.log(playersHandRef);

    // console.log(shuffled);

    initialHand.forEach(card=>{
        createCard(card)
    })
   
}



function createCard(card){
    let cardDiv=document.createElement("div");
    cardDiv.className="card"
    //set to compare against playersHandRef array
    cardDiv.setAttribute("data-tracker",card.tracker)
    cardDiv.setAttribute("splice-trackerIdx",card.spliceIdx)
    let h4Family=document.createElement("h4")
    let h4Value=document.createElement("h4")
    h4Family.style.pointerEvents="none"
    h4Value.style.pointerEvents="none"
    h4Family.innerHTML=card.family;
    if(card.familyString === "hearts"  || card.familyString === "diamonds" ){
        h4Family.style.color="red"
        h4Value.style.color="red"
    }
    h4Value.innerHTML=card.value

    cardDiv.appendChild(h4Family);
    cardDiv.appendChild(h4Value);

    cardDiv.onclick=pickCard;

    playersHand.appendChild(cardDiv)
}




function pickCard(e){

    if(tradeCounter === 2){
        console.log("No more trades!")
        return;
    }
    console.log('pick card fired!')

    tradeBtn.classList.remove("hide-tradeBtn")


    //declare functions variables
    let dTracker=e.target.getAttribute("data-tracker")
    let spliceIdx=e.target.getAttribute("splice-trackerIdx")
    let activeIdx=0;
        //  console.log("Dtracker: " + dTracker)
        //  console.log("spliceIdx: " + spliceIdx)
         
         //find idxValue of clicked card
         playersHandRef.forEach((card,idx)=>{
            if(JSON.stringify(card.tracker) === dTracker){
               // console.log(`Idx: ${idx}`);
                activeIdx=idx;
            }
        })

// un-select card(splice out of tradeArray), 
    if(e.target.classList.contains('selected_card')){
        e.target.classList.remove('selected_card')
                let removeIdx=cardsToTrade.findIndex(c=>c.refValue === dTracker)
                console.log("removeIdx: " + removeIdx)
                cardsToTrade.splice(removeIdx,1);

                if(cardsToTrade.length === 0){
                    tradeBtn.classList.add('hide-tradeBtn')
                }
                return;
    }

//check to see if eligible for activeCard
    if(!isEligible(cardsToTrade)){
    
    // otherwise add to tradeArray
    e.target.classList.toggle("selected_card")
    cardsToTrade.push({idx:activeIdx,refValue:dTracker,spliceIdx});
    tradedCards.push(e.target)
 
           console.log(cardsToTrade)
    }
 
}


var icons=['♥' , '♠', '♦' ,'♠', "" ]
function isEligible(selectedCards){
   
    if(selectedCards.length >= 2 && tradeCounter === 1){
        messagesDOM.innerHTML=`<h4 class='message'>Sorry, only 2 cards this time!\n Either unselect, or trade! <span style="left:20px">${icons[Math.random() * icons.length | 0]}</span></h4>` 
        setTimeout(()=>{
        messagesDOM.innerHTML=""
                         },2000)
return true;
    }
       if(selectedCards.length >= 3){
            messagesDOM.innerHTML=`<h4 class='message'>You've selected your max amount.\n Either unselect, or trade. <span style="left:20px">${icons[Math.random() * icons.length | 0]}</span></h4>` 
                setTimeout(()=>{
                messagesDOM.innerHTML=""
                                 },2000)
        return true;
    }
    return false;
}


tradeBtn.onclick=tradeCards;


function tradeCards(){
    tradeCounter++
    cardsEl=document.querySelectorAll(".card")
    let splice_array=[];

    // console.log(cardsToTrade)
    // console.log(cardsEl)

    cardsToTrade.forEach(tradeCard=>{
        cardsEl.forEach((cardEl,idx)=>{
            // console.log(cardEl)
            // console.log(tradeCard)
            if(JSON.stringify(cardEl.getAttribute("splice-trackeridx")) === JSON.stringify(tradeCard.spliceIdx)){
                splice_array.push(idx)
            }
        })
    })

    console.log(splice_array)
        
    playersHandRef.forEach(card=>{
        splice_array.forEach(idx=>{
                     cardsEl[idx].classList.add("remove_card")
                    //  playersHandRef.splice(idx,1)
                    // console.log("splice " + idx)
                  
                
            })
    })

    setTimeout(()=>{
    newCards()
    },2000)

}


    function newCards(){
        console.log("newCards() fired!")
     
        
        //draw new cards from shuffled
        var newCards=shuffled.splice(0,tradedCards.length);
        console.log(newCards)
        console.log(shuffled.length)

        for(let i=0;i<tradedCards.length;i++){
            //rewrite the values, remove class n restore to playersHand
            tradedCards[i].children[1].innerHTML=newCards[i].value
            tradedCards[i].children[0].innerHTML=newCards[i].family
            if(newCards[i].familyString === "hearts"  || newCards[i].familyString === "diamonds" ){
                tradedCards[i].children[0].style.color="red"
                tradedCards[i].children[1].style.color="red"
            }
            else{
                tradedCards[i].children[0].style.color="black"
                tradedCards[i].children[1].style.color="black"
            }
            tradedCards[i].classList.remove("remove_card")
            tradedCards[i].classList.remove("selected_card")
        }
        cardsToTrade=[];
        tradedCards=[];

        if(tradeCounter === 2){
            console.log("Time to see what you got!")

            checkGame()
        }
    }



    function checkGame(){
     
     
        console.log(cardsEl)
        var families=[];
        var values=[];
        Array.from(cardsEl).forEach(c=>{
            // console.log(c.innerText.split(""))
            values.push(c.innerText.split("")[2])
            families.push(c.innerText.split("")[0])
        })
        console.log(values)
        console.log(families)

        //run these in order with a way to break out upon finding, test two pairs before threeFour(fourOfKind/2 pair will look the same with my logic)
        
        var {hand} = oneTwoPairFH(values);
        if(!hand){
            console.log("Bumped down to threeFourAKind()")
            var {hand} = threeFourAKind(values);
        }
        
        // flush(families);
      
        setTimeout(()=>{
       
        gameOver(hand)
        },2000);
    
    }


    function gameOver(hand){
        messagesDOM.innerHTML=`<div style="display:flex;align-items:center;justify-content:space-evenly:flex-direction:column">
                                <h5>Players hand was a ${hand}</h5>
                                 <button class="playagainbtn" onclick=playAgain()>Play Again</button>
                                 </div>`
    }


    function playAgain(){
        messagesDOM.innerHTML=""
        shuffled=cards.sort(()=>Math.random()-.5);
        console.log(shuffled)
        dealCards()
    }


    function threeFourAKind(values){
        let reduce=[...new Set([...values])]

        console.log(reduce)
        console.log(values)
        if(reduce.length === 3){
            console.log("Player has three of kind!")
            return {hand:"Three of a kind"}
        }

        if(reduce.length === 2){
            console.log("Player has four of kind!")
            return {hand:"Four of a kind"}
        }
        if(reduce.length === 5){
            console.log("nada!")
            return {hand:"a big nothing!"}
        }
    }



    //threeFourAKind([1,1,1,1,5])


    function oneTwoPairFH(values){
        let reduce=[...new Set([...values])];

        if(reduce.length === 2){
            let numOne=reduce[0];
            let numTwo=reduce[1];
            console.log("NumOne: " + numOne)
            console.log("NumTwo: " + numTwo)
            let numOneCounter=0;
            let numTwoCounter=0;

            //test to see if a counter hits 3, if it does, then full house
            for(let i=0;i<values.length;i++){
              
                if(values[i] === +numOne){
                    numOneCounter++
                }

                if(values[i] === numTwo){
                    numTwoCounter++
                }
            }
            console.log("NumOneCounter: " + numOneCounter)
            console.log("NumTwoCounter: " + numTwoCounter)
            if(numOneCounter ===  3 || numTwoCounter === 3){

            
            //protect against 4 of a kind
            if(numOne != numTwo){
                console.log("Full house!!")
                return{hand:"Full house"}
                
            }
        }
        }

        if(reduce.length === 3){
            //parse n compare numbers still...
            console.log("Player has two pair!")
            console.log(reduce)
            console.log(values)
            return {hand:"Two pair"}

        }

        if(reduce.length === 4){
            console.log("One pair!")
            return {hand:"One pair"}
        }

        console.log("nada")
        return {hand:"a big nothing!"}

    }

    //oneTwoPairFH([9,5,7,7,8])
