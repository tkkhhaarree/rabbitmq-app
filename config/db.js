var person = {
    name: "tarun"
}

var greet = function(){
    console.log(this.name)
}

greet.bind(person)();