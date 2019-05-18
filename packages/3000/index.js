const Koa = require('koa');
const Router = require('koa-router');
const bodyParser  = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(router.routes());

router.get('/', ctx => {
    ctx.cookies.set('secret-cookie', 'some secret', {
        httpOnly: false
    });

    ctx.body = `
        <form action="make-payment" method="POST">
            <label for="to">Enter beneficial</label>
            <input id="to" name="to" type="text" />
            <input type="submit" value="Make Payment" />
        </form>`
});

router.post('/make-payment', async ctx => {
    ctx.status = 200;
    ctx.body = `beneficiary: ${ctx.request.body.to} cookie: ${ctx.request.header.cookie}`;
});

app.listen(3000, () => {
    console.log('Listening...');
});
