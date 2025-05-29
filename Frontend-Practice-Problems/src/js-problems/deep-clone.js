export default function deepClone(value, seen = new Map()) {
    //primitive check
    if(value === null || typeof value !== 'object') {
        return value;
    }

    //if alreday traversed
    if(seen.has(value)) {
        return seen.get(value);
    }

    //Handle Date
    if (value instanceof Date) {
        return new Date(value.getTime());
    }

    // Handle RegExp
    if (value instanceof RegExp) {
        return new RegExp(value.source, value.flags);
    }

    //array handling
    if(Array.isArray(value)) {
        const arr = [];
        seen.set(value, arr);

        value.forEach((item,index) => {
            arr[index] = deepClone(item,seen);
        })

        return arr;
    }

    //plain object handling
    const objCopy = {};
    seen.set(value, objCopy);

    Object.keys(value).forEach((key) => {
        objCopy[key] = deepClone(value[key], seen)
    })

    return objCopy;
  }

//no circular ref 
function deepClone1(value) {
    if (typeof value !== 'object' || value === null) {
      return value;
    }
  
    if (Array.isArray(value)) {
      return value.map((item) => deepClone1(item));
    }
  
    return Object.fromEntries(
      Object.entries(value).map(([key, value]) => [key, deepClone1(value)]),
    );
}
  