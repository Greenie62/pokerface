// threeFourAKind(['1','1','2','8','8'])


    // function oneTwoPairFH(values){
    //     let reduce=[...new Set([...values])];

    //     if(reduce.length === 2){
    //         let numOne=reduce[0];
    //         let numTwo=reduce[1];
    //         console.log("NumOne: " + numOne)
    //         console.log("NumTwo: " + numTwo)
    //         let numOneCounter=0;
    //         let numTwoCounter=0;

    //         //test to see if a counter hits 3, if it does, then full house
    //         for(let i=0;i<values.length;i++){
              
    //             if(values[i] === +numOne){
    //                 numOneCounter++
    //             }

    //             if(values[i] === numTwo){
    //                 numTwoCounter++
    //             }
    //         }
    //         console.log("NumOneCounter: " + numOneCounter)
    //         console.log("NumTwoCounter: " + numTwoCounter)
    //         if(numOneCounter ===  3 || numTwoCounter === 3){

            
    //         //protect against 4 of a kind
    //         if(numOne != numTwo){
    //             console.log("Full house!!")
    //             return{hand:"Full house"}
                
    //         }
    //     }
    //     }

    //     if(reduce.length === 3){
    //         //parse n compare numbers still...
    //         console.log("Player has two pair!")
    //         console.log(reduce)
    //         console.log(values)
    //         return {hand:"Two pair"}

    //     }

    //     if(reduce.length === 4){
    //         console.log("One pair!")
    //         return {hand:"One pair"}
    //     }

    //     console.log("nada")
    //     return {hand:"a big nothing!"}

    // }

    //oneTwoPairFH([9,5,7,7,8])

    // var test= [2,3,3,3,5];


    // test.forEach(num=>{
    //     var counter=0;
    //     test.forEach(check=>{
    //         if(num === check){
    //             counter++
    //         }
            
    //     })
    //     if(counter === 3){
    //         console.log("Three of a kind!")
    //     }

    //     else if(counter === 2){
    //         console.log("Pair")
    //     }
      
    // })