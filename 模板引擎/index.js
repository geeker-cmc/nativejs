var xhr=new XMLHttpRequest();
xhr.open('get','./data.json',true);
xhr.onreadystatechange=function(){
   if(xhr.readyState===4&&xhr.status===200){
   		var data=JSON.parse(xhr.responseText);
   		var str=document.querySelector('script[type="text/template"]').innerHTML;
   		var html='';
   		data.forEach(function(item,i){
   			var temp=str.replace(/{(\w+)}/g,function(parent,child,index){
   				return item[child];
   			})
   			html+=temp;
   		})
   		document.querySelector('body').innerHTML=html;
   }
}
xhr.send();