//write three binary functions 'add', 'sub', 'mul', that take two numbers and return their sum, difference, and product.
var add =function(x,y){
	return x + y;
};

var sub = function(x,y){
	return x-y;
};

var mul = function(x,y){
	return x*y;
};

console.log(add(1,2));
console.log(sub(2,1));
console.log(mul(2,3));

//Write a function 'identityf' that takes an argument and returns a function that returns that argument.

var identityf = function(x){
	return function(){
		return x;
	};
};

var three = identityf(3);
console.log(three());

//write a function 'addf' that adds from two invocations.

var addf = function(x){
	return function(y){
		return x + y;
	};
};

console.log(addf(3)(4));

//Write a function 'liftf' that takes a binary function, and makes it callabe with two invocations.

var liftf = function(func){
	return function(x){
		return function(y){
			return func(x,y);
		};
	};
};

var addf = liftf(add);
console.log(addf(5)(8));

//Write a function 'curry' that takes a binary function and an argument, and returns a function that can take a second argument.

var curry = function(func, x){
	return function(y){
		return func(x,y);
	};
};

var add3 = curry(add,3);
console.log(add3(4));

var mult5 = curry(mul,5);
console.log(mult5(4));

//Without writing any new functions, show 3 ways to create the 'inc' function. 
// var inc = _ _ _ ; 
// inc(5) 		//6
// inc(inc(5))  // 7
var inc = curry(add,1);
var inc1= addf(1);
var inc2 =liftf(add)(1);


console.log(inc(5));		//6
console.log(inc(inc(5)));	//7
console.log(inc1(5));		//6
console.log(inc1(inc1(5)));	//7
console.log(inc2(5));		//6
console.log(inc2(inc2(5))); //7

//Write a function 'twice' that takes a binary function and returns a unary function that passes its argmuent to the binary function twice.
//add(11,11)		//22
//var doubl = twice(add);
//doubl(11) 		//22
//var square = twice(mul);
//square(11)		//121;

var twice = function(binFunc){
	return function(x){
		return binFunc(x,x);
	}
};

var doubl = twice(add);
var sqr = twice(mul);

console.log(doubl(11));
console.log(sqr(11));

//Write a function "reverse" that reverses the arguments of a binary function.

var reverse = function(func){
	return function(x,y){
		return func(y,x);
	}
};

var reverseES6 = function(func){
	return function(...args){
			return func(...args.reverse());
	}
}

var bus = reverse(sub);
console.log(bus);
console.log(bus(3,2));

var bus1 = reverseES6(sub);
console.log(bus(3,2));

//Write a function 'composeu' that takes two unary functions and returns a unary function that calls them both.

var composeU = function(func1,func2){
	return function(x){
		var y = func1(x);
		return func2(y);
	};
};

var composeU1 = function(func1,func2){
		return function(x){
				return func2(func1(x));
		}
}
var doubleAndSquare = composeU(doubl,sqr);
console.log(doubleAndSquare);
console.log(doubleAndSquare(5));

var doubleAndSquare1 = composeU1(doubl,sqr);
console.log(doubleAndSquare1(5));

//Write a function "composeb" that takes two binary functions and returns a function that calls them both.
var composeB = function(func1,func2){
	return function(x,y,z){
		return func2(func1(x,y),z);
	};
};

var addAndMultiply = composeB(add,mul);
console.log(addAndMultiply(2,3,7));

//Write a function "limit" that allows a binary function to be called a limited number of times
var limit = function(func,callLimit){
	counter = 0;
	return function(x,y){ 

		if(counter < callLimit){
			counter += 1;
			return func(x,y);
		}
		else{
			return undefined;
		} 
		
	}
}

var add_ltd = limit(add,1);
console.log(add_ltd);
console.log(add_ltd(3,4));
console.log(add_ltd(3,5));
console.log(add_ltd(4,5));

//Write a function "from" that produces a generator that will produce a series of values.
/*Example 
	var index = from(0);
	index()		// 0
	index()		// 1
	index()		// 2
			.
			.	
			.
*/

var fromFunction = function(x){
	var counter = -1;
	return function(){
		counter += 1;
		return x + counter;
	};
};

var index = fromFunction(0);
console.log(index());
console.log(index());
console.log(index());

var fromFunction1 = function(x){
	return function(){
		var next = x;
		x +=1;
		return next;
	}
}

var index1 = fromFunction1(0);
console.log(index1());
console.log(index1());
console.log(index1());