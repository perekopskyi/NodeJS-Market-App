module.exports = {
  PORT: process.env.PORT || 3003,
  MONGODB_URI: process.env.MONGODB_URI,
  SESSION_SECRET: process.env.SESSION_SECRET,
  ETHEREAL_MAIL: {
    username: process.env.ETHEREAL_MAIL_USERNAME, // https://ethereal.email/create
    password: process.env.ETHEREAL_MAIL_PASSWORD,
  },
  EMAIL_FROM: process.env.EMAIL_FROM,
  BASE_URL: process.env.BASE_URL,
}
