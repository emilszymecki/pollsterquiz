var constructor = function(options){
  var self = {},
  signature,
  questions,
  select,
  good,
  active;

  self.Set_signature = function (signatureToSet) {
    signature = signatureToSet;
  };

  self.Set_questions = function (questionsToSet) {
    questions = questionsToSet;
  };

  self.Set_select = function (selectToSet) {
    select = selectToSet;
  };

  self.Set_good = function (goodToSet) {
    good = goodToSet;
  };

  self.Set_active = function (activeToSet) {
    active = activeToSet;
  };

  self.get = function (activeToSet) {
     return {
     	signature:signature,
  		questions:questions,
  		select:select,
  		good:good,
  		active:active
     };
  };

  var init =function(){
  	self.Set_signature(options.signature);
  	self.Set_questions(options.questions);
  	self.Set_select(options.select);
  	self.Set_good(options.good);
  	self.Set_active(options.active);
  };

  init();

  return self;
};


var agregator = function(){
	var self = {},
	arr = [];

	self.setConstructors = function(constructor){
		arr.push(constructor);
	};

	self.getConstructors = function(){
		return arr;
	};

	return self;
};

var writer = function(){
	var self = {},
	object,
	str = "";

	self.setObject = function(setObject){
			object = setObject;
	};

	self.signature = function(el){
		return "<h1>"+el+"</h1> \n";
	};

	self.questions = function(el){
		var string = "<ul>";
		el.map(function(a,b){
			string += "<li>"+a+"</li> \n";
		});
		string += "</ul> \n";
		return string;
	};

	self.select = function(el){
		return "<p> wskazałes:"+el+"</p> \n";
	};

	self.good = function(el){
		return "<p> poprawna odp:"+el+"</p> \n";
	};

	self.active = function(el){
		return "dostał: " + el;
	};


	self.moveObject = function(object){
		object.map(function(a,b){
			for(i in a){
				var el_obj = a[i];
					//console.log(self[i](el_obj));
					str += self[i](el_obj); // odpalać funkcje po i !!!
			}
		});
	};

	self.getString = function(setObject){
			//console.log(str);
			return str;
	};


	return self;
}

var opt1 = {
  signature:'P1',
  questions:[1,2,3,4],
  select:[1],
  good:[2],
  active:true
};
var opt2 = {
  signature:'P12',
  questions:[1,2,3,4],
  select:[3],
  good:[1],
  active:true
};
var opt3 = {
  signature:'P3',
  questions:[1,2,3,4],
  select:[4],
  good:[2],
  active:false
};

var generalAgregator = new agregator();

var n1 = new constructor(opt1).get();
var n2 = new constructor(opt2).get();
var n3 = new constructor(opt3).get();

generalAgregator.setConstructors(n1);
generalAgregator.setConstructors(n2);
generalAgregator.setConstructors(n3);

//console.log(generalAgregator.getConstructors());

var scoreAgregator = generalAgregator.getConstructors();

var moveObj = writer();

moveObj.moveObject(scoreAgregator);
moveObj.getString();


var ashtml = moveObj.getString();

console.log(ashtml);