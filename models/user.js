'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    nom_user: DataTypes.STRING,
    prenom_user: DataTypes.STRING,
    pays_user: DataTypes.STRING,
    age_user: DataTypes.STRING,
    phone_number_user: DataTypes.STRING,
    password_user: DataTypes.STRING,
    role_user: DataTypes.STRING,
    mail_user:DataTypes.STRING
  },{
    hooks: {
      afterValidate:(user)=>{
        user.password_user=bcrypt.hashSync(user.password_user,8);
      }
    }
  });
  user.associate = function(models) {
    // associations can be defined here
    
    models.user.hasMany(models.panier, { foreignKey: 'userId' });
  };
  return user;
};