import { observable } from '@nx-js/observer-util';
const loading = observable({});
function loadingWatch(target, name, descriptor) {
    const handle = function (target, thisArg, argumentsList) {
        loading[proxyFunc] = true;
        const result = target.apply(thisArg, argumentsList);
        if (result.then) {
            return result.then((data) => {
                loading[proxyFunc] = false;
                return data;
            });
        } else {
            return result;
        }
    };
    const proxyFunc = new Proxy(descriptor.value, {
        apply: handle
    });
    descriptor.value = proxyFunc;
    return descriptor;
}
export {
    loading,
    loadingWatch
} 