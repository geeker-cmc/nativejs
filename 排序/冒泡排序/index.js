function popSort(arr){
	for(var i=0,len=arr.length;i<len;i++){
		for(var j=0,len2=arr.length-i;j<len2;j++){
			if(arr[j]>arr[j+1]){
				var temp=arr[j];
				arr[j]=arr[j+1];
				arr[j+1]=temp;
			}
		}
	}
	return arr;
}
console.log(popSort([222,333111,22,3,1,22222,2,3333]))