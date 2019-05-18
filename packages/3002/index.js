const Koa = require('koa');
const Router = require('koa-router');
const bodyParser  = require('koa-bodyparser');
const session = require('koa-session');
const CSRF = require('koa-csrf');

const app = new Koa();
const router = new Router();

app.use(bodyParser());

const CONFIG = {
    key: 'koa:sess',
    maxAge: 86400000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
};
app.keys = ['session secret']

app.use(session(CONFIG, app));

// add the CSRF middleware
app.use(new CSRF());

app.use(router.routes());

router.get('/', ctx => {
    ctx.cookies.set('secret-cookie', 'some secret')
    ctx.body = `
        <form action="make-payment" method="POST">
            <input type="hidden" name="_csrf" value="${ctx.csrf}" />
            <label for="to">Enter beneficial</label>
            <input id="to" name="to" type="text" />
            <input type="submit" value="Make Payment" />
        </form>`
});

router.post('/make-payment', async ctx => {
    ctx.status = 200;
    ctx.body = `beneficiary: ${ctx.request.body.to} cookie: ${ctx.request.header.cookie}`;
});

app.listen(3002, () => {
    console.log('Listening...');
});
