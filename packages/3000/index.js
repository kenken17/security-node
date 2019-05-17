const Koa = require('koa');
const Router = require('koa-router');
const bodyParser  = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(router.routes());

router.get('/', ctx => {
    ctx.body = `
        <form action="entry" method="POST">
            <label for="message">Enter a message</label>
            <input id="message" name="message" type="text" />
            <input type="submit" value="Submit" />
        </form>`
});

router.post('/entry', async ctx => {
    ctx.status = 200;
    ctx.body = ctx.request.body.message;
});

app.listen(3000, () => {
    console.log('Listening on 3000...');
});
