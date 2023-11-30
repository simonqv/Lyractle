
export default function resolvePromise(prms, promiseState) {
    console.log("prms:", prms)
    if (prms) {
        promiseState.promise = prms;
        promiseState.data = null;
        promiseState.error = null;
        prms.then(promiseDataACB).catch(errorACB)
    };
    
    function promiseDataACB(data) {
        console.log("Data: ", data)
        if (promiseState.promise === prms) {
            promiseState.data = data
        }
    }

    function errorACB(err) {
        console.log("err: ", err)
        if (promiseState.promise === prms) {
            promiseState.error = err
        }
    }

    return promiseState
}