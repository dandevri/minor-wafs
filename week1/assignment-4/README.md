# Assignment 4 - Refactor GEO

Started working on the assignment but lost some of it. `We got a GitHub noob over here.` 🎉

## IFFE
*Immediately-invoked function expression* unnamed function immediately invoked after it's been defined.

## Module Pattern
Object is described as a set of comma-separated name/value pairs enclosed in curly braces ({}) Both private and public encapsulation for classes.

We're able to include both public/private methods and variables inside a single object.

**Privacy**; Protecting pieces from ending up into the global scope. Difference from IFFE is that it returns an object instead of a function. Function scope to simulate
private and global scope.

Return object inside module so you can interact with the object.

var basketModule = (function () {

  return {  
    addItem: function( values ) {
      basket.push(values);
    },  
  };

  })();

  basketModule.addItem

  ## Namespacing Patterns

  *Namespaces can be considered a logical grouping of units of code under a unique identifier. *
  * Avoid collision between global namespaces.

  ### Namespacing fundamentals
  1. Single Global Variables; Primary object of reference.
  1. Prefix namespacing; define things after a prefix. Results in many global objects.
  1. Object Literal notation; Object containing a collection of key:value pairs with a colon separating each pair of keys and values where keys can also represent new namespaces.
