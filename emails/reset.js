const keys = require('../keys')

module.exports = function (email, token) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: `Reset password from ${keys.BASE_URL}`,
    html: `
      <h1>Forgot password?</h1>
      <p>Please click to reset: </p>
      <a href="${keys.BASE_URL}/auth/password/${token}" >Reset password</a>
      <hr />
      <a href="${keys.BASE_URL}" >Our site</a>
    `,
  }
}
