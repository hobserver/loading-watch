import { observable } from '@nx-js/observer-util';
const tempArr = [];
const tempObj = observable({});
const loading = {
    set: function(method, thisArg, value) {
        var keyIndex = tempArr.findIndex((item => {
            return item.method === method && item.thisArg === thisArg;
        }));
        if (keyIndex === -1) {
            tempArr.push({
                thisArg,
                method 
            });
            keyIndex = tempArr.length - 1;
        }
        return tempObj[keyIndex] = value;
    },
    get: function (thisArg, method) {
        if (!(thisArg && method)) {
            throw new Error('需要提供对象, 以及对象名称')
            return;
        }
        var keyIndex = tempArr.findIndex((item => {
            return item.method === thisArg[method] && item.thisArg === thisArg;
        }));
        if (keyIndex === -1) {
            tempArr.push({
                thisArg,
                method: thisArg[method]
            });
            keyIndex = tempArr.length - 1;
        }
        return tempObj[keyIndex];
    }
};
function loadingWatch(target, name, descriptor) {
    const handle = function (target, thisArg, argumentsList) {
        loading.set(proxyFunc, thisArg, true);
        const result = target.apply(thisArg, argumentsList);
        if (result && result.then) {
            return result.then((data) => {
                loading.set(proxyFunc, thisArg, false);
                return data;
            }).catch(e => {
                loading.set(proxyFunc, thisArg, false);
            });
        } else {
            loading.set(proxyFunc, thisArg, false);
            return result;
        }
    };
    const proxyFunc = new Proxy(descriptor.value, {
        apply: handle
    });
    descriptor.value = proxyFunc;
    return descriptor;
}

exports.loading = loading;
exports.loadingWatch = loadingWatch;
