var BaseClass=function(){

}
BaseClass.prototype.init=function(){
    console.log(this.userName)
}
BaseClass.extends=function(config){
	var self=this;
	var temp=function(){
		self.apply(this,arguments);
	}
	temp.prototype=Object.create(BaseClass.prototype);
	var Child=function(){
		this.init(arguments[0]);
	}
	Child.prototype=new temp();
	for(var k in config){
		Child.prototype[k]=config[k];
	}
	Child.prototype.constructor=Child;
	Child.extends=arguments.caller;
	return Child;
}

var Model=BaseClass.extends({
	init:function(data){
		this._entry=data
	},
	savedata:function(k,v){
		this._entry[k]=v;
	},
	_entry:{},
	getdata:function(){
		return this._entry
	}
})
var View=BaseClass.extends({
	template:"<input type='text' name='key' value='用户:{userName}  年龄:{age}' />",
	renderTo:"body",
	render:function(data){
		var compliedHTML=this.template.replace(/{(\w+)}/g,function(){
			return data[arguments[1]]
		});
		document.querySelector(this.renderTo).innerHTML=compliedHTML;
	}
})
var Controller=BaseClass.extends({
	View:View,
	Model:Model,
	init:function(){
		var modal=this.modal=new this.Model({
		userName:"lili",
		age:36
		})
		var view=this.view=new this.View();
		view.render(modal.getdata());
		this.bindEvent();
	},
	bindEvent:function(){
		var self=this;
		document.addEventListener("keyup",function(e){
			var target=e.target;
			if(target.nodeName.toLowerCase()==="input"){
			self.modal.savedata(target.getAttribute("name"),target.value);
		}
		})
	}
})
var controller=new Controller();
