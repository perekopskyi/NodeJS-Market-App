module.exports = {
  PORT: process.env.PORT || 3003,
  MONGODB_URI:
    'mongodb://root:rootpassword@localhost:27017?retryWrites=true&w=majority' ||
    'mongodb://localhost:27017',
  SESSION_SECRET: 'some secret value',
  ETHEREAL_MAIL: {
    name: 'Serenity King',
    username: 'serenity.king63@ethereal.email', // https://ethereal.email/create
    password: '7vxAjkGJTybsTxz61S',
  },
  EMAIL_FROM: 'test-from-app@email.ru',
  BASE_URL: 'http://localhost:3003',
}
