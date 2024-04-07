import { getAverageColor } from 'fast-average-color-node';
import Fastify from 'fastify'
import fs from 'fs';
const fastify = Fastify({
  logger: true
})

fastify.get('/', async function handler (request, reply) {
    console.log(request.query.url)
    fetch(request.query.url)
    .then(res => res.blob())
    .then(async blob => {
        var buffer = await blob.arrayBuffer();
        fs.writeFileSync('./media_player.jpeg', Buffer.from(buffer));
        getAverageColor('./media_player.jpeg').then(color => {
            console.log(color);
        });
    });
})

try {
    await fastify.listen({ port: 3000 })
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}