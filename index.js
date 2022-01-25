/**
 * Javascript Objects by Fireship
 *
 * */

// Definition: a collection of properties where each property associates a key with a value.

// Js primitives are string , number , bigint, boolean , null , undefined, symbol
// Primitives they represent a single value
// Conclusion everything in not a primitive its an object

// How objects work  in modern javascript?

// It's conceptually the same a dictionary in python and a map in java

// Example of object literal
const obj = {
  rabbit: "white",
  year: 2020,
  whoami: function () {
    return this.rabbit;
  },
};

// Inside the braces you define properties separated by commas
// A properties its essentially a key value pair,
// NAME: value , VALUE: can be any type of data

// Although is a define as const variable we can change the properties values after its creation

obj["rabbit"] = "black";

// Later we can read or get that property using the same bracket notation

// In javascript theres always a more than one way to do the things

/**
 * First alternate universe
 *
 */

// constructor syntax (new Function()) for creating an object
const obj = new Object();

// set properties using the dot notation
obj.rabbit = "white";

// your properties name must be a continue string that dont start with a number and dont contain any special characters
// you will get a syntax error if you try to set a property with a number or special character

/**
 * Second alternate universe
 *
 */

// static method in the object class called Object.create()

// you wouldn't normally use this in an empty object literal
// it most useful when you have an existence object and you want to heredity from it
// In other words use the existing object as a prototype

const organism = {
  dna: Math.random(),
};

const obj = Object.create(organism);

// you get a blank object with the properties of the organism
console.log(obj); // {}

// if you console log a property of the organism you get the dna property because of the prototype
console.log(obj.dna); // 0.9888888888888889

//because of the exist of the object prototype
// we can see this Propertie lives in the object prototype
console.log(Object.getPrototypeOfOf(obj)); // { dna: 0.9888888888888889 }

/**
 * Third alternate universe
 *
 */

// add Properties to an object by using object.defineProperty()
const obj2 = Object.create({});

Object.defineProperties(obj, "unicorn", {
  value: "rainbow",
  // getter inside the object
  get: () => "rainbow",
  enumerable: true,
});

console.log(obj.unicorn); // rainbow

// In most cases you work with the literal syntax

/**
 * Cool tricks with objects literals
 *
 */

const spider = "🕷️";
const legs = 8;

// modern time we can simple add the variable to the object literal
const obj = {
  legs,
  spider,
};

// Similar thing in reverse with destructuring

// multiple variables with a single line of code
// we do this to avoid a name collision with an existing variable
const { spider: mySpider, legs: myLegs } = obj;

console.log(mySpider, hasLegs); // 🕷️ 8

const obj3 = {
  spider,
  legs,
  legs: 8,
  legs: 23,
};

// this code wont through an error instead it will overwrite the value of the left side with the value of the right side

console.log(obj3.legs); // 23

// you can compute properties names by wrapping them in square brackets
// And place an expression inside, it will compute that value one the object  is created

const random = () => Math.random().toString(36).slice(-5);

const obj4 = {
  spider,
  [random()]: true,
};

console.log(obj4); // { spider: '🕷️', '5bqj': true }
console.log(obj4); // { spider: '🕷️', '6jqar': true }

// object properties can also take functions as values
// a function lives in an object its called a method

// when a function lives in a object it is called a method
// you can define a method inside the object
const obj5 = {
  spider,
  legs,
  web: "",
  // long hand
  makeWeb1: function () {
    this.web = "🕸️";
  },
  // short hand
  makeWeb2() {
    this.web += "🕸️🕸️";
    return this;
  },
  // you can define getters and setters
  get web() {
    return this.web;
  },
  // if we use an arrow function for a method it will refer to the global instead of the internal value of this
  makeWeb3: () => (this.web += "🕸️🕸️🕸️"),
};

// How do we chain together methods but keep in a reference to the same object
// All you have todo is return this from the method
// Now any method you call will return the reference to the current object

// Example
console.log(obj5.makeWeb2().makeWeb2().makeWeb2()); // 🕸️🕸️🕸️🕸️🕸️🕸️🕸️

/**
 * Object references
 *
 */

// Primitive values are short lived in the call stack
// Javascript script objects are kept as references in the heap

let a = "🪐";

let b = a;

// As you expect a and b have the same value
// But there are both pointing to their primitive value
console.log(a, b); // 🪐 🪐

a = "👻";

// A has the new value but b has the original value
console.log(a, b); // 👻 🪐

// Now lets see the difference when using objects
let aInObj = { planet: "🪐" };

let b2 = aInObj;

console.log(aInObj, b2); // { planet: '🪐' } { planet: '🪐' }

aInObj.planet = "🌍";

// It supposed to copy the value as in primitive
// But it is not
// Because they are sharing the same reference between the variables
console.log(aInObj, b2); // { planet: '🌍' } { planet: '🌍' }

let creature = { alien: "👾" };

// One way to copy an object is to use the object.assign() method
let scientist = Object.assign({}, creature);

// It's important to keep in mind that this uses the internal and numerable properties of the object creature
console.log(Object.getOwnPropertyNames(scientist)); // [ 'alien' ]

// Any property inherited higher up in the prototype chain would not be copied over

const scareActions1 = {
  scream: {
    emoji: "🤯",
  },
};

// Better alternative for Object.assign() is to use the spread operator

let halloween = { pumpkin: "🎃" };

let scareActions2 = {
  scream: {
    emoji: "🤯",
  },
};

let halloweenBackup = {
  ...halloween,
  ...scareActions2,
};

/**
 * Loop over an object
 *
 */

const animals = {
  cat: "🐱",
  dog: "🐶",
  cow: "🐮",
};

//A for in loop is dangerous because it iterates over all the enumerable properties as well as its prototypes

// The best alternative is to get keys or values as an array
// and use the forEach() method

for (k of Object.entries(animals)) {
  console.log(k); // [ 'cat', '🐱' ] [ 'dog', '🐶' ] [ 'cow', '🐮' ]
}

// Loop over both the key and values together
// Get an array of tuples with the key and value and destructure the values in the loop
for (const [k, v] of Object.entries(animals)) {
  console.log(k, v); // cat 🐱 dog 🐶 cow 🐮
}

// You can customize the way an object is created using a constructor function
// By convention you should capitalize the name of the function

function Zombie(name) {
  this.name = name;
  this.reanimated = Date.now();

  this.eatBrain = function () {
    return `${this.name} ate a brain 🧠`;
  };
}

const zombie_1 = new Zombie("🧟 Jeff");

console.log(zombie_1.eatBrain()); // 🧟 Jeff ate a brain 🧠
