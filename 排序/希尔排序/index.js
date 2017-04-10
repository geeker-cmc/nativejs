function shallSort(array) {
 var increment = array.length;
 var i
 var temp; //暂存
 var count = 0;
 do {
   increment = Math.floor(increment / 3) + 1;
   for (i = increment ; i < array.length; i++) {
    console.log(increment);
     if (array[i] < array[i - increment]) {
       temp = array[i];
       for (var j = i - increment; j >= 0 && temp < array[j]; j -= increment) {
           array[j + increment] = array[j];
       }
       array[j + increment] = temp;
     }
   }
 }
 while (increment > 1)
 return array;
}
console.log(shallSort([222,3,333,19]))