# 安装
npm install loading-watch-observer-util --save

# 使用
### model
```
import {loadingWatch} from 'loading-watch-observer-util';
import {store} from 'react-module-state';
const data = store(new class {
    @loadingWatch
    async getList() {
        return await request(...);
    }
});
```
### component
```
import {loading} from 'loading-watch-observer-util';
import {view} from 'react-module-state';
import dataModel from './model';
@view
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