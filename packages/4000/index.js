const Koa = require('koa');
const Router = require('koa-router');
const bodyParser  = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(router.routes());

router.get('/', ctx => {
    ctx.body = `
        <form action="query" method="GET">
            <label for="search">Search</label>
            <input id="search" name="search" type="text" />
            <input type="submit" value="Submit" />
        </form>`
});

router.get('/query', ctx => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', '*');
    ctx.set('Access-Control-Allow-Methods', '*');
    ctx.set('X-XSS-Protection', '0');
    ctx.body = `
        <div>
            You are searching: ${ctx.request.query.search}
        </div>`
})

app.listen(4000, () => {
    console.log('Listening...');
});
