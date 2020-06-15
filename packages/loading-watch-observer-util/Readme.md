# 安装
npm install loading-watch-mobx --save

# 使用
### model
import {loadingWatch} from 'loading-watch-observer-util';
import {observable} from '@nx-js/observer-util';
const data = observable(new class {
    @loadingWatch
    async getList() {
        return await request(...);
    }
});


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
            {loading.get(dataModel, 'getList') ? 'loading...' : 'already loading'}
        </div>
    }
}
```