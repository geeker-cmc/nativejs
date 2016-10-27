;(function(root){
	var events={};
	var ps=root.ps={
		on:function(etype,fn){
			events[etype]||(events[etype]=[]);
			events[etype].push({
				etype:etype,
				callback:fn
			})
		},
		trigger:function(etype,data){
			events[etype]||(events[etype]=[]);
			events[etype].forEach(function(item){
				events[etype]&&item.callback(data);
			})
		},
		off:function(etype){
			events[etype]=[]
		}
	}
})(this)