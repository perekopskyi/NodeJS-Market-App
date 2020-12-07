const keys = require('../keys')

module.exports = function (email) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: 'Account created',
    html: `
      <h1>Hello into our market</h1>
      <p>Account created! Congradulations!</p>
      <p>${email}</p>
      <hr />
      <a href="${keys.BASE_URL}" >Our site</a>
    `,
  }
}
