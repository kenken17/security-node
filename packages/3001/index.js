const Koa = require('koa');
const Router = require('koa-router');
const bodyParser  = require('koa-bodyparser');
const axios = require('axios')

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(router.routes());

router.get('/evil', async ctx => {
    const res = await axios({
        method: 'post',
        url: 'http://localhost:3002/make-payment',
        data: {
            to: 'Satan'
        }
    })

    ctx.status = 200
    ctx.body = res.data
});

app.listen(3001, () => {
    console.log('Listening...');
});
