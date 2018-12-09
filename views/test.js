var board =
[[0, 1, 2]
,[3, 4, 5]
,[6, 7, 8]];
//
// [0][0], [0][1], [0][2], [i][0] [i][1] [i][2]
// [1][0], [1][1], [1][2],
// [2][0], [2][1], [2][2]

function build(list) {
  let listFill = Array(9 - list.length).fill(null);
  list = [...list, ...listFill];   //array of index locations
  let newArr = [];
  let i1, i2, val;   //[i1, i2]  are for building 2d array, val is for mapping out the value
  for (let i = 0; i < list.length; i ++) { //iist [i] gives the proper index location of a value, and the value is dependent on which turn it was played
    val = (list[i] == null ? 'z' : list[i] % 2 == 0 ? 'o' : 'x')
    i2 = i % 3;
    if (i2 == 0) {
      let row = [];
      newArr.push(row);
    }
    i1 = (i - i2) / 3;
    newArr[i1][i2] = val
  }
  return newArr;
}
let testState = [4, 7, 3, 2, 5, 8, 6]
let built = build(testState)
console.log(built);


//console.log(built[0][2]);

check(built)



function check(r) {
  for (let i = 0; i < 3; i ++) {
    if (i == 0) {
      if (r[i][i] == r[i+1][i+1] && r[i+1][i+1] == r[i+2][i+2]) {
        console.log('win');
      }
      if (r[i][i+2] == r[i][i] && r[i][i] == r[i+2][i]) {
        console.log('win');
      }
    }
    if (r[i][0] == r[i][1] && r[i][1] && r[i][2]) {
      console.log('win');
    }
    if (r[0][i] == r[1][i] && r[1][i] == r[2][i]) {
      console.log('win');
    }
  }
}


// function winCheck(idx, arr) {
//   let won;
//   switch(idx)
//   case 0 || 2 || 6 || 8:
//
//   won = (
//     win(arr[0], arr[1], arr[2]) ? true :
//     win(arr[2], arr[5], arr[8]) ? true :
//     win(arr[8], arr[7], arr[6]) ? true :
//     win(arr[6], arr[3], arr[0]) ? true : false
//   )
//   r
//
//   function win(a, b, c) {
//     console.log(a, b, c);
//     return (a == b && b == c ? true : false)
//   }
// }
//
// console.log(board[2][2]);
