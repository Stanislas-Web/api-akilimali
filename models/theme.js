'use strict';
module.exports = (sequelize, DataTypes) => {
  const theme = sequelize.define('theme', {
    categorie_ouvrage: DataTypes.STRING
  },{
    
  });
  theme.associate = function(models) {
    // associations can be defined here
    models.theme.belongsToMany(models.ouvrage, {
      through: 'ouvrageTheme'
    });
  };
  return theme;
};