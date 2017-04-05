(function(root){
	var _then=root._then=function(obj){

		root.addEventListener('hashchange',function(){
			var hash=location.hash;
			if(hash===obj.route){
				var xhr=new XMLHttpRequest();
				xhr.open("GET", obj.template);
				xhr.onreadystatechange=function(){
					if(xhr.readyState == 4 && xhr.status == 200){
						debugger;
					}
				}
				xhr.send();
			}
		})
	}
})(this)