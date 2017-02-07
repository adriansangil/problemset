// solutions here


'use strict';

var lib = require('./lib/lib.js');

//problem number 1
var i = 0;
var doAsync = function(input){
	if(i< input.length){

		//check if current element is an array, if it is, do parallel execution
		if(Object.prototype.toString.call( input[i] ) === '[object Array]'){
			for(var x=0;x<input[i].length;x++){

				//check last element of the array, in order to move to next item
				if(x== input[i].length - 1){
					lib.asyncOp(input[i][x], function(){
						i += 1;
						doAsync(input);
					});
				} else {
					lib.asyncOp(input[i][x]);
				}		
			}
		//series execution
		} else{
			lib.asyncOp(input[i], function(){
				i += 1;
				doAsync(input);
			});
		}
	}
};


let a = [
  'A',
  [ 'B', 'C', 'D', 'E' ],
  [ 'H', 'I' ]
]


doAsync(a);


