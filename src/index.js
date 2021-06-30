const app = require('./app');

async function main() {
    await app.listen(app.get('port'));
    console.log('Server on', app.get('port'));
}

main();