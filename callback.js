// Original 1
// function square(num) {
//   return num * num;
// }
//
// var squared = square(5);
// console.log(squared);

// CPS 1
// function square(num, callback){
//     callback(num*num);
// }
//
// square(5, function(num){
//     console.log('The square is',num);
// });


// Original 1.5
// function square(num) {
//   return num * num;
// }
//
// function times2(num) {
//   return num * 2;
// }
//
// var squared = square(5);
// var result = times2(squared);
// console.log('Result is:', result);

// CPS 1.5
// function square(num, callback) {
//     callback(num*num);
// }
//
// function times2(num, callback){
//     callback(num*2);
// }
//
// square(5, function(num){
//     times2(num, function(num) {
//         console.log('The result is:', num);
//     });
// });

// Original 2
// function square(num) {
//   return num * num;
// }
//
// function squareRoot(num) {
//   return Math.sqrt(num);
// }
//
// var x = 4;
// var y = 3;
// var xSquared = square(x);
// var ySquared = square(y);
// var answer = squareRoot(xSquared + ySquared);
// console.log('The answer is: ' + answer);
//
// function square(num, callback) {
//     callback(num*num);
// }
//
// function squareRoot(num, callback){
//     callback(Math.sqrt(num));
// }
//
// square(4, function(x2){
//     square(3, function(y2){
//         squareRoot(x2+y2, function (answer) {
//             console.log('The answer is: ', answer);
//         });
//     });
// });


function square(num, callback) {
    setTimeout(function(){
        callback(num*num);
    },1000);
}

function squareRoot(num, callback){
    setTimeout(function(){
        callback(Math.sqrt(num));
    }, 500);
}

square(4, function(x2){
    square(3, function(y2){
        squareRoot(x2+y2, function (answer) {
            console.log('The answer is: ', answer);
        });
    });
});
