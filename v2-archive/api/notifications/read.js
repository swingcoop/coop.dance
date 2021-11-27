const kafka = require('./kafka.js');

const consumer = kafka.consumer({ groupId: 'swingcoop2' });

async function ok() {
  await consumer.connect()
 
  await consumer.subscribe({ 
    topic: 'test' , 
    fromBeginning: true
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        key: message.key && message.key.toString(),
        value: message.value.toString(),
        headers: message.headers,
      })
    },
  });
 
  // await consumer.disconnect();
};

ok().then(() => {
  console.log('done');
})