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
let playHandBtn=document.querySelector(".playHandBtn")
let playersHandDiv=document.querySelector(".playersHandDiv")
let cardsEl=""
let playersHand=document.querySelector(".playersHandRow")



playBtn.onclick=startGame;

foldBtn.onclick=foldGame;
playHandBtn.onclick=()=>{
    console.log("playHandBtn fired")
    checkGame();
}


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
     
        if(cardsEl === ""){
            console.log("cardEl got populated....we assume player playedHand without trading")
        cardsEl=document.querySelectorAll(".card")
        }
        console.log(cardsEl)
        var families=[];
        var values=[];
        
        //hard to compare with families, so we'll grab data-tracker attribute
        var straightArray=[];
        Array.from(cardsEl).forEach(c=>{
            // console.log(c.innerText.split(""))
            values.push(c.innerText.split("")[2])
            families.push(c.innerText.split("")[0])
            straightArray.push(c.getAttribute('data-tracker'))
        })
        console.log(values)
        console.log(families)

        //run these in order with a way to break out upon finding, test two pairs before threeFour(fourOfKind/2 pair will look the same with my logic)
        
    
            var {hand} = threeFourAKind(values,straightArray);
            var {flush} = checkFlush(families)
            var {straight}=checkStraight(straightArray)
        
        
        // flush(families);
      
        setTimeout(()=>{
       
        gameOver({straight,flush,hand})
        },2000);
    
    }


    function gameOver(straight,flush,hand){
        console.log(straight)
        console.log(straight.flush)
        console.log(straight.hand)

        if (straight.straight.hand != ""){
            messagesDOM.innerHTML=`<div class='gameOverDiv'>
                                    <h5>Players hand was a ${straight.straight.hand}</h5>
                                     <button class="playagainbtn" onclick=playAgain()>Play Again</button>
                                     </div>`
            }
        else if (straight.flush.hand != ""){
        messagesDOM.innerHTML=`<div class='gameOverDiv'>
                                <h5>Players hand was a ${straight.flush.hand}</h5>
                                 <button class="playagainbtn" onclick=playAgain()>Play Again</button>
                                 </div>`
        }
        else{
            messagesDOM.innerHTML=`<div class='gameOverDiv'>
            <h5>Players hand was a ${straight.hand.hand}</h5>
             <button class="playagainbtn" onclick=playAgain()>Play Again</button>
             </div>`
        }
    }


    function playAgain(){
        // messagesDOM.innerHTML=""
        // shuffled=cards.sort(()=>Math.random()-.5);
        // console.log(shuffled)
        // dealCards()
        window.location.reload()
    }


    function threeFourAKind(values,straightArray){
        let hand={}
        console.log(values)
        hand.hand=`a high card of ${Math.max(...straightArray)}`
        let cardVal=""
        values.forEach((num,idx)=>{
            let counter=0;
            values.forEach(check=>{
                if(num === check){
                    counter++
                    cardVal=num
                }
            })
            console.log("Counter: " + counter)
            if(counter == 2){
                console.log("A PAIR")
                hand.hand=`a pair of ${cardVal}s`
            }
            else if(counter == 4){
                console.log("FOUR OF A KIND")
                hand.hand="Four of a kind"
            }
            else if(counter == 3){
                console.log ("THREE OF A KIND")
                hand.hand="Three of a kind"
            }

         
        })
         return {hand}

     
    }


    function checkFlush(values){
        console.log("checkFlush() fired")
        console.log(values)
        let count=0;
        let flush={};
        flush.hand=""
        let compare=values[0]
        values.forEach(v=>{
                if(v === compare){
                    count++
                }
            })
            console.log("Count: " + count)
            if(count === 5){
                console.log ("FLUSH!")
                flush.hand="A flush"
            
                
            }
            
        return {flush}
    }


    function checkStraight(values){
        values=values.sort((a,b)=>a-b);
        let straight={};
        console.log(values);
        straight.hand=""
       

        var winningCombos=[
            [2,3,4,5,6],
            [3,4,5,6,7],
            [4,5,6,7,8],
            [5,6,7,8,9],
            [6,7,8,9,10],
            [7,8,9,10,11],
            [8,9,10,11,12],
            [9,10,11,12,13],
            [10,11,12,13,14],
        ]

        winningCombos.forEach(combo=>{
            let counter=0;
            combo.forEach((num,idx)=>{
                if(num === values[idx]){
                    counter++
                }
            })
            if(counter === 5){
                console.log("We got a straight!!")
                straight.hand="A straight"
            }
        })
        console.log("you aint got shit")

        return {straight}
    }

     checkStraight([4,2,3,5,6])



    

    // checkFlush(['♥' ,'♥' ,'♥' ,'♥' ,'♥' ])
