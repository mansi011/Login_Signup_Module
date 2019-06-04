'use strict';

const {Model }= require('objection');
const validator = require('validator');
const ValidationError = require('objection').ValidationError;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const CONFIG = {};

CONFIG.jwt_encryption = 'xIMEE1vdvlvTjac1tGyiJHZusIFBtl';

class Users extends Model {

  // Table name is the only required property.
  static get tableName() {
    return 'users';
  }

  // Each model must have a column (or a set of columns) that uniquely
  // identifies the rows. The column(s) can be specified using the `idColumn`
  // property. `idColumn` returns `id` by default and doesn't need to be
  // specified unless the model's primary key is something else.
  static get idColumn() {
    return 'id';
  }

  // Methods can be defined for model classes just as you would for
  // any JavaScript class. If you want to include the result of these
  // method in the output json, see `virtualAttributes`.


  // Optional JSON schema. This is not the database schema!
  // No tables or columns are generated based on this. This is only
  // used for input validation. Whenever a model instance is created
  // either explicitly or implicitly it is checked against this schema.
  // See http://json-schema.org/ for more info.
  static get jsonSchema () {
    return {
      type: 'object',
      
      properties: {
        id: {type: 'integer'},
        fname: {type: 'string'},
        lname: {type: 'string'},
        age: {type: 'integer'},
        email: {type: 'string', minLength: 1, maxLength: 255},
        password: {type: 'string',minlenght: 6,maxLength: 15}

        
      }
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
   
  }

  $formatJson(json, opt) {
    json = super.$formatJson(json, opt);
    delete json.password;
    return json
  }
  async getJWT() {
    return await jwt.sign({
      user_id: this.id,
    }, CONFIG.jwt_encryption);
  }

  async $beforeInsert() {
    await super.$beforeInsert();

    console.log('in before insert');
    console.log(this.email);
    console.log(this.userTypeId);
    if ( !this.email) {
      if (!validator.isEmail(this.email || '')) {
        //console.log('in before insert');
        throw badRequestError('Please enter email address!');
      }
    }
    // if (this.email) {
    //     if (!validator.isEmail(this.email || '')) {
    //       //console.log('in before insert');
    //       throw badRequestError("Not a valid email address!");
    //     }
    // }
    if (!this.password) {
        throw badRequestError('Please enter password!');
      }
      let checkSpecialCharacters = this.fname.replace(" ", "");
    if (!validator.isAlphanumeric(checkSpecialCharacters)) {
      throw badRequestError("Please enter valid fname!");
    }
    checkSpecialCharacters = this.lname.replace(" ", "");
    if (!validator.isAlphanumeric(checkSpecialCharacters)) {
      throw badRequestError("Please enter valid lname!");
    }
    if (validator.isNumeric(this.fname)) {
        throw badRequestError("Please enter valid fname!");
      }
      if (validator.isNumeric(this.lname)) {
        throw badRequestError("Please enter valid lname!");
      }

}


}




module.exports = Users;