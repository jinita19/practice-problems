//call
Function.prototype.myCall = function (context, ...args) {
    context = context || globalThis;
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn;
    return result;
}

function greet(greeting, abc='') {
    console.log(greeting + abc + ' ' + this.name);
  }

greet.myCall({ name: 'Alice' }, 'Hello');

//apply
Function.prototype.myApply = function (context, args = []) {
    context = context || globalThis;
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn;
    return result;
}
greet.myApply({ name: 'Alice' }, ['Hello', ' jini']);

//bind
Function.prototype.mybind = function (context, ...args) {
    context = context || globalThis;
    context.fn = this;
    return function(args1) {
        context.fn(...args, ...args1);
    }
}

//promise.all
Promise.myAll = function(promises) {
    return new Promise((resolve, reject) => {
      const results = [];
      let completed = 0;
      promises.forEach((p, index) => {
        Promise.resolve(p).then(val => {
          results[index] = val;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        }).catch(reject);
      });
    });
  };

//promise.any
Promise.myAny = function(promises) {
    return new Promise((resolve, reject) => {
      const errors = [];
      let rejected = 0;
      promises.forEach((p, index) => {
        Promise.resolve(p).then(resolve).catch(err => {
            errors[index] = err;
            rejected++;
            if(rejected === promises.length) {
                reject(new AggregateError(errors, "All promises were rejected"))
            }
        });
      });
    });
  };
  
//promise race
Promise.myRace = function(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(p => {
      Promise.resolve(p).then(resolve).catch(reject);
    });
  });
};

//deep clone-refresh
function deepClone(obj, visited = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (visited.has(obj)) return visited.get(obj);
  
    let clone = Array.isArray(obj) ? [] : {};
    visited.set(obj, clone);
  
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        clone[key] = deepClone(obj[key], visited);
      }
    }
  
    return clone;
  } 

// debounce
function debounce(cb, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => cb.apply(this, args), delay);
    }
}

//throttle
function throttle(cb, interval) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if(now-lastCall > interval) {
            lastCall = now;
            cb.apply(this,args);
        }
    }
}
