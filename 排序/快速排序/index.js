function quertSort(arr){
	if(arr.length<=1){
		return arr;
	}
	var harf=Math.floor(arr.length/2);
	var left=[];
	var right=[];
	var temp=arr.splice(harf,1)[0];
	for(var i=0;i<arr.length;i++){
		if(arr[i]<temp){
			left.push(arr[i])
		}else{
			right.push(arr[i]);
		}
	}
	return quertSort(left).concat([temp],quertSort(right));
}

console.log(quertSort([222,333111,22,3,1,22222,2,3333]))