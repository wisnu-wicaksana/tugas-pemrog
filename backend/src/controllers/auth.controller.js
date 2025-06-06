const generateToken = require('../utils/generateToken');

const googleLogin = (req, res) => {
  const user = req.user;
  const token = generateToken(user);

  res.send(`
    <h2>Login Berhasil</h2>
    <p><strong>Token:</strong></p>
    <textarea rows="10" cols="80">${token}</textarea>
    <p><strong>User:</strong></p>
    <pre>${JSON.stringify(user, null, 2)}</pre>
    <p>Copy token ini dan gunakan sebagai header:</p>
    <code>Authorization: Bearer &lt;token&gt;</code>
  `);
};

module.exports = { googleLogin };
