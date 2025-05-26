let nums=[1,2,3,4,5,6];
//map
Array.prototype.myMap = function (cb, thisArg) {
    let result = [];

    for(let i=0; i<this.length; i++) {
        const value = this[i] && cb.call(thisArg, this[i], i, this);
        result.push(value);
    }
   
    return result;
}
// console.log(nums.map(v=>v*2));
// console.log(nums.myMap(v=>v*2));

//filter
Array.prototype.myfilter = function(cb, thisArg) {
    let result = [];
    for(let i=0; i<this.length; i++) {
        const value = this[i] && cb.call(thisArg, this[i], i, this);
        if(value) {
            result.push(value);
        }
    }
}
// console.log(nums.filter(v=>v<4));
// console.log(nums.filter(v=>v<4));

//reduce
Array.prototype.myReduce = function(cb, init) {
    if (init === undefined && this.length === 0) {
        throw new TypeError('Reduce of empty array with no initial value');
    }

    let value = init ?? this[0];
    let startIndex = init !== undefined ? 0 : 1;
    
    for(let i=startIndex; i<this.length; i++) {
        value = this[i] ? cb(value, this[i], i, this) : value;
    }

    return value;
}
// console.log(nums.reduce((a,b) => a+b));
// console.log(nums.myReduce((a,b) => a+b));

//find
Array.prototype.myFind = function(cb, thisArg) {
    //not a function error
    for(let i=0; i<this.length; i++) {
        if(cb.call(thisArg, this[i], i, this)) {
            return this[i];
        }
    }
    return;

}
// console.log(nums.find((v => v>8)));
// console.log(nums.myFind((v => v>8)));

//fill
Array.prototype.myFill = function(value, start, end) {
    let startIndex = start ?? 0;
    let endIndex = end < this.length ? end : this.length;
    let result = new Array(this.length);
    for(let i=startIndex; i<endIndex; i++) {
        result[i] = value;
    }
    return result;

}
// console.log(new Array(4).fill(0,1,9))
// console.log(new Array(4).myFill(0,1,9))


//flat-***IMP**
Array.prototype.myFlat = function(depth=1) {
    function resolver(arr, depth) {
        if(depth<1) return arr;
        return arr.myReduce((prev,curr) => {
            if(Array.isArray(curr)) {
                prev.push(...resolver(curr,depth-1));
            } else {
                prev.push(curr);
            }
            return prev;
        }, []);
    }

    return resolver(this,depth);

}

// console.log([[1,2],[3, 4,[5,6,[7]]]].flat(4));
// console.log([[1,2],[3, 4,[5,6,[7]]]].myFlat(4));

//bubble sort
Array.prototype.mySort = function () {
    let arr = this;
    let n = arr.length;
    let swapped;

    for (let i = 0; i < n - 1; i++) {
        swapped = false;

        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // swap
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }

        // Optimization: break if no swaps in the inner loop
        if (!swapped) break;
    }

    return arr;
}

console.log(([4,3,8,9,6,2,1]).sort());
console.log(([4,3,8,9,6,2,1]).mySort());
