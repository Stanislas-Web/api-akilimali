'use strict';
module.exports = (sequelize, DataTypes) => {
  const ouvrage = sequelize.define('ouvrage', {
    titre_ouvrage: DataTypes.STRING,
    description_ouvrage: DataTypes.STRING,
    image_ouvrage: DataTypes.STRING,
    lien_ouvrage: DataTypes.STRING,
    pays_ouvrage: DataTypes.STRING,
    prix_ouvrage: DataTypes.STRING,
    genre_ouvrage: DataTypes.STRING
  },{
    
  });
  ouvrage.associate = function(models) {
    // associations can be defined here
    models.ouvrage.hasMany(models.ligneDeCommande, { foreignKey: 'ouvrageId' });
    models.ouvrage.belongsToMany(models.auteur, {
        through: 'ouvrageAuteur'
      });
    models.ouvrage.belongsToMany(models.theme, {
        through: 'ouvrageTheme'
      });
    
  };
  return ouvrage;
};