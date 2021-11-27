const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: 'swingcoop',
  brokers: [process.env.CLOUDKARAFKA_BROKERS],
  sasl: {
    mechanism: 'scram-sha-512',
    username: process.env.CLOUDKARAFKA_USERNAME,
    password: process.env.CLOUDKARAFKA_PASSWORD
  },
  ssl: true,
  retry: {
    retries: 1
  }
});

module.exports = kafka;