'use strict';

var events = require('events');
var lib = require('./lib/lib.js');

class ResourceManager {

	constructor (count) {
		if(isNaN(count)){
			throw ('not a valid number');
		}

		this.count = count;
		this.resources = [];

	}
	
	borrow(callback){
		var resource;
		var self = this;

		//check if pool has zero resources
		if(this.resources.length == 0){
			resource = new Resource();
			this.resources.push(resource);
			resource.borrowed = true;
			callback(resource);
		} else if(this.resources.length < this.count) {

			for(var i=0; i<this.resources.length;i++){
				//check if pool has a resource and is not borrowed
				if(this.resources[i].borrowed == false){
					
					resource = this.resources[i];
					break;
				}
			}
			
			//if all resources from pool are borrowed but pool can still create a new resource
			if(resource == null){
				resource = new Resource();
				this.resources.push(resource);
				
			}

			resource.borrowed = true;
			callback(resource);

		} else {
			//check if there available resources from pool to borrow when pool has reach max count
			for(var i=0; i<this.resources.length;i++){
				if(this.resources[i].borrowed == false){
					
					resource = this.resources[i];
					resource.borrowed = true;
					callback(resource);
					break;
				}
			}
			
			if(resource == null){
				setTimeout( function() {
      				self.borrow(callback);
    			}, 100 );
			}		
		}
	}
}


class Resource {
	constructor() {
		this.borrowed = false;
	}

	release(){
		
		if(this.borrowed == true){
			this.borrowed = false;
		} else {
			console.log("resource is not borrowed at the moment");
		}
	}
}

let pool = new ResourceManager(2);
console.log('START');

let timestamp = Date.now();

pool.borrow((res) => {
  console.log('RES: 1');

  setTimeout(() => {
    res.release();
  }, 500);
});

pool.borrow((res) => {
  console.log('RES: 2');
});

pool.borrow((res) => {
  console.log('RES: 3');
  console.log('DURATION: ' + (Date.now() - timestamp));
});