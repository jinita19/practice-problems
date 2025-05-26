(function(global) {
    function MyPromise(executor) {
      var self = this;
      self.status = 'pending';
      self.value = undefined;
      self.reason = undefined;
      self.onResolvedCallbacks = [];
      self.onRejectedCallbacks = [];
  
      function resolve(value) {
        if (self.status === 'pending') {
          self.status = 'fulfilled';
          self.value = value;
          self.onResolvedCallbacks.forEach(function(fn) {
            fn(self.value);
          });
        }
      }
  
      function reject(reason) {
        if (self.status === 'pending') {
          self.status = 'rejected';
          self.reason = reason;
          self.onRejectedCallbacks.forEach(function(fn) {
            fn(self.reason);
          });
        }
      }
  
      try {
        executor(resolve, reject);
      } catch (err) {
        reject(err);
      }
    }
  
    MyPromise.prototype.then = function(onFulfilled, onRejected) {
      var self = this;
  
      return new MyPromise(function(resolve, reject) {
        function handleFulfilled(value) {
          try {
            var result = onFulfilled ? onFulfilled(value) : value;
            resolve(result);
          } catch (err) {
            reject(err);
          }
        }
  
        function handleRejected(reason) {
          try {
            var result = onRejected ? onRejected(reason) : reason;
            reject(result);
          } catch (err) {
            reject(err);
          }
        }
  
        if (self.status === 'fulfilled') {
          setTimeout(function() {
            handleFulfilled(self.value);
          });
        } else if (self.status === 'rejected') {
          setTimeout(function() {
            handleRejected(self.reason);
          });
        } else {
          self.onResolvedCallbacks.push(function(value) {
            setTimeout(function() {
              handleFulfilled(value);
            });
          });
          self.onRejectedCallbacks.push(function(reason) {
            setTimeout(function() {
              handleRejected(reason);
            });
          });
        }
      });
    };
  
    MyPromise.prototype.catch = function(onRejected) {
      return this.then(null, onRejected);
    };
  
    global.MyPromise = MyPromise;
  })(this);
  