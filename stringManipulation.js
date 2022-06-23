// How to manipulate a String to create:
// 1. a Component with the same name;
// 2. a Route path (in React.Router) with the same name;
// 3. a React element (<element/>) with the same name.


import React from "react";
import { Route } from "react-router";

// this are the strings:
const myArray = ["element 1", "element 2", "element 3"];

// a Component is actually an Object of a Function.
// so we need a Key to use as the Component's name,
// and a Value to use as the Component's action.

// window[element] defines a global Value for each String:
const componentValue =
myArray.forEach(element =>
    window[element] =()=>{return (<h1>Title: {element} </h1>)});

// the next Function creates an Object of the Strings.
// each String becomes a Key that gets a global Value:  
function ComponentBuilder(x){
    return (x.reduce((array, element) => ({...array, [element]: window[element]}), {}))
}
const componentKey =
ComponentBuilder(myArray);

// at this point there is a space inside the Component name (!!)
// because until now we used only Strings
// and we never defined a Component officially.
// the problem is that we can't use words with space as paths in React.Router. 
// in other cases there might be other problematic signs such as
// periods, quotation marks, letters of foreign languages and so on.
// the solution is to convert the String to Unicode
// and replace the space that we get (_) with it's proper Unicode (%20):
const encoded = [];
myArray.forEach(element =>
    encoded.push(encodeURIComponent(element)));
const encodedSpaced =
encoded.map(element => element.replace(/_/g, '%20'));

// now we can make a Route path using the encoded path,
// and also a React element using the Component and it's Value as an Object: 
const pushedRoutes = [];
for (let i=0; i<myArray.length; i++) {
    pushedRoutes.push(<Route key={myArray[i]} path={encodedSpaced[i]} element={React.createElement(componentKey[myArray[i]])} />)    
}

// notice that 'componentValue' is assigned a value but never used officially.
// although, if you use more than one file
// you need to import 'componentValue' to the same file of 'componentKey'.
