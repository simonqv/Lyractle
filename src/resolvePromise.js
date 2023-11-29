
export default function resolvePromise(prms, promiseState) {
    if (prms) {
        promiseState.promise = prms;
        promiseState.data = null;
        promiseState.error = null;
        prms.then(promiseDataACB).catch(errorACB)
    };
    
    function promiseDataACB(data) {
        if (promiseState.promise === prms) {
            promiseState.data = data
        }
    }

    function errorACB(err) {
        if (promiseState.promise === prms) {
            promiseState.error = err
        }
    }

    return promiseState
}