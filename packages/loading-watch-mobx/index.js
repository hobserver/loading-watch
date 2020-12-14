import {observable, runInAction} from 'mobx';
const prefix = 'DONNOT_USE_THIS_LOADING_VAR_'
const prefix2 = 'DONNOT_USE_THIS_LOADING_VAR_MAP'
const loading = {
    set: function(methodName, thisArg, value) {
        runInAction(() => {
            thisArg[prefix2][prefix + methodName] = value;
        });
    },
    get: function (thisArg, methodName) {
        if (!(thisArg && methodName)) {
            throw new Error('需要提供对象, 以及对象名称')
        }
        return thisArg[prefix2][prefix + methodName];
    }
};
function loadingWatch(wrapTarget, name, descriptor) {
    if (!wrapTarget[prefix2]) {
        wrapTarget[prefix2] = observable({});
    }
    const handle = function (target, thisArg, argumentsList) {
        loading.set(name, thisArg, true);
        const result = target.apply(thisArg, argumentsList);
        if (result && result.then) {
            return result.then((data) => {
                loading.set(name, thisArg, false);
                return data;
            }).catch(e => {
                loading.set(name, thisArg, false);
            });
        } else {
            loading.set(name, thisArg, false);
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