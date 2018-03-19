import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva({
  onError(e, dispatch) {
    console.log("111111111111");
  },
});
// console.log(app._store);
// 2. Plugins
// app.use({});
app.use(createLoading());

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/users.js').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#divRoot');
