# 说明
dva的loading方法很好用, mobx版本的呢?

本插件就是解决这个问题

让你在mobx版本使用loading的解决方案

# 安装

## mobx版本: 
```
npm install loading-watch-mobx --save
```
## react-easy-state体系
使用 @nx-js/observer-util 体系的
```
npm install loading-watch-observer-util --save
```

# 使用
### model
```
import {loadingWatch} from 'loading-watch-observer-util';
import {observable} from 'mobx';
const data = observable(new class {
    @loadingWatch
    async getList() {
        return await request(...);
    }
});
```


### component
```
import {loading} from 'loading-watch-observer-util';
import dataModel from './model';
@observer
class Com extends React.Component {
    componentDidMount() {
        dataModel.getList();
    }
    render() {
        return <div>
            {loading[dataModel.getList] ? 'loading...' : 'already loading'}
        </div>
    }
}
```