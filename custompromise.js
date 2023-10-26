const https = require('https')
const axios = require("axios");

const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

function customPromise(executor){
	let state = PENDING;
	let value = null;
	let handlers = [];
	let catches = [];

	function resolve(result){
		if(state !== PENDING) return;
		
		state = FULFILLED;
		value = result;
		handlers.forEach((h) => h(value));
	}

	function reject(err){
		if(state !== PENDING) return;

		state = REJECTED;
		value = err;
		catches.forEach((c) => c(err));
	}

	this.then = function (callback){
		if(state === FULFILLED){
			callback(value);
		} else {
			handlers.push(callback);
		}
	}

	executor(resolve, reject);
}

const doWork = (res, rej) => {
	// https.get("https://api.kanye.rest", (d) => {d.on('data', (body) => {res(JSON.parse(body).quote)})})
	axios.get("https://api.kanye.rest").then(d => res(d.data.quote));
    //setTimeout(() => {res("hello")}, 2000);
}

let someText = new customPromise(doWork);
someText.then((d) => console.log("1st log: ", d));
someText.then((d) => console.log("2nd log: ", d));

setTimeout(() => {
	someText.then((d) => console.log("3rd log: ", d));
}, 6000);

const kanyepromise = axios.get("https://api.kanye.rest")
kanyepromise.then(res => console.log(res.data.quote));