'use strict';
module.exports = (sequelize, DataTypes) => {
  const auteur = sequelize.define('auteur', {
    nom_auteur: DataTypes.STRING,
    prenom_auteur: DataTypes.STRING,
    pays_auteur: DataTypes.STRING,
    image_auteur: DataTypes.STRING
  }, {});
  auteur.associate = function(models) {
    // associations can be defined here
    //models.auteur.hasMany(models.SubCategory, { foreignKey: 'auteurId' });
    //models.auteur.hasMany(models.ChildCategory, { foreignKey: 'auteurId' });
    models.auteur.belongsToMany(models.ouvrage, {
      through: 'ouvrageAuteur'
    });


  };
  return auteur;
};