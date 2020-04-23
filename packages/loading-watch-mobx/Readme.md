# 安装
npm install loading-watch-mobx --save

# 使用
### model
import {loadingWatch} from 'loading-watch-mobx';
import {observable} from 'mobx';
const data = observable(new class {
    @loadingWatch
    async getList() {
        return await request(...);
    }
});


### component
```
import {loading} from 'loading-watch-mobx';
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