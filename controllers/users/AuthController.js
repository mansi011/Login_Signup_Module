'use strict';

const User = require('./../../models/users');
const Token = require('./../../models/Token');

const Login = async (req, res) => {
  let data = req.body;
  let err, user, userLogin;

  userLogin = await User.query().skipUndefined()
    .where('email', data.email)
    .where('password',data.password)
    .select('users')
  
  if (!userLogin) {
    throw badRequestError('email is not registered.');
  }
  return res.send(userLogin);
//   return okResponse(res, {
//     ...userLogin.toJSON(),
//   }, "Login successful.");

}

const createUser= async (req, res) => {
  let data = req.body;
  let err, inserted_user;
  inserted_user= await User.query().insert(data).returning('*');

  let auth_token = await inserted_user.getJWT();
  let token = await Token.query().insert({
    user_id: inserted_user.id,
    token: auth_token
  }).returning('*');
  if (!err) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('AuthToken', auth_token)
  }
  
  return res.send(inserted_user);
//   createdResponse(res, {
//     ...inserted_user //.toJSON(),
//   }, "Your account has been created successfully");
}


const Logout = async (req, res) => {
  await Token.query().delete().where('token', req.token).where('userId', req.user.id);
  return noContentResponse(res);
}



module.exports = {
  createUser,
  Login,
  Logout
}
