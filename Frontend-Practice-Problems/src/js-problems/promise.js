const STATES = {
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
  PENDING: "pending",
};

class MyPromise {
  #state = STATES.PENDING;
  #value = undefined;
  #handlers = []; //for chaining of then and catch callbacks

  constructor(executor) {
    try {
      executor(this.#resolve.bind(this), this.#reject.bind(this));
    } catch (e) {
      this.#reject(e);
    }
  }

  #resolve(result) {
    if (this.#state !== STATES.PENDING) return;
    this.#state = STATES.FULFILLED;
    this.#value = result;
    this.#processHandlers();
  }

  #reject(error) {
    if (this.#state !== STATES.PENDING) return;
    this.#state = STATES.REJECTED;
    this.#value = error;
    this.#processHandlers();
  }

  #processHandlers() {
    const run = () => {
      this.#handlers.forEach((handler) => {
        if (this.#state === STATES.FULFILLED) {
          if (typeof handler.onFulfilled === "function") {
            try {
              const nextValue = handler.onFulfilled(this.#value);
              handler.resolve(nextValue);
            } catch (e) {
              handler.reject(e);
            }
          } else {
            handler.resolve(this.#value);
          }
        } else if (this.#state === STATES.REJECTED) {
          if (typeof handler.onRejected === "function") {
            try {
              const newValue = handler.onRejected(this.#value);
              handler.resolve(newValue);
            } catch (e) {
              handler.reject(e);
            }
          } else {
            handler.reject(this.#value);
          }
        }
      });
    };

    //to call it async way
    if (typeof queueMicrotask === "function") {
      queueMicrotask(run);
    } else {
      setTimeout(run, 0);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({ onFulfilled, onRejected, resolve, reject });

      if (this.#state !== STATES.PENDING) {
        this.#processHandlers(); //immediately process if already in fulfilled or rejected state
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(onFinally) {
    return this.then(
      (result) => MyPromise.resolve(onFinally()).then(() => result),
      (error) =>
        MyPromise.resolve(onFinally()).then(() => {
          throw error;
        })
    );
  }

  static resolve(value) {
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }

  static all(promises) {
    const results = [];
    let completed = promises.length;
    return new MyPromise((resolve, reject) => {
      if (completed === 0) return resolve([]);

      promises.forEach((p, index) => {
        p.then((val) => {
          results[index] = val;
          completed--;
          if (completed === 0) {
            resolve(results);
          }
        }).catch(reject);
      });
    });
  }

  static any(promises) {
    const results = [];
    let rejected = 0;
    return new MyPromise((resolve, reject) => {
      promises.forEach((p, index) => {
        p.then(resolve).catch((e) => {
            results[index] = e;
            rejected++;
            if (rejected === promises.length) {
              reject(results);
            }
        });
      });
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(p => {
        p.then(resolve).catch(reject);
      });
    });
  }

  static allSettled(promises) {
    const results = [];
    let completed = 0;
    let total = promises.length;
    return new MyPromise((resolve, reject) => {
      if(total === 0) resolve([]);
      promises.forEach((p,i) => {
        p.then(value => {
          results[i] = {status: STATES.FULFILLED, value}
        }).catch(reason => {
          results[i] = {status: STATES.REJECTED, reason}
        }).finally(() => {
          completed++;
          if(completed === total) {
            resolve(results);
          }
        })
      })
    })
  }
}

export default MyPromise;
