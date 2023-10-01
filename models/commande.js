'use strict';
module.exports = (sequelize, DataTypes) => {
  const commande = sequelize.define('commande', {
    date_commande: DataTypes.DATE,
  }, {});
  commande.associate = function(models) {
    // associations can be defined here
    models.commande.hasMany(models.ligneDeCommande, { foreignKey: 'commandeId' });
    models.commande.hasMany(models.paiement, { foreignKey: 'commandeId' });
    //models.commande.hasMany(models.ChildCategory, { foreignKey: 'commandeId' });


  };
  return commande;
};