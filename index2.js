'use strict';

var events = require('events');
var lib = require('./lib/lib.js');

class RandStringSource extends events.EventEmitter {

	constructor (randStream) {
    	super ({
    	});

	    let string = '';
	    this.randStream = randStream;

	    this.randStream.on('data', function(data) {

	     	var splitData = data.split('');
	        
	        splitData.forEach(function(item) {
	            if(item == '.') {
	                //self.emit('data', string);
	                console.log(string);
	                string = '';

	            } else {
	            	string += item;
	            }
	                
	        });
	 
	    });
	}
}

let source = new RandStringSource(new lib.RandStream());



