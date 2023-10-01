'use strict';
module.exports = (sequelize, DataTypes) => {
  const ligneDeCommande = sequelize.define('ligneDeCommande', {
    commandeId: DataTypes.INTEGER,
    ouvrageId: DataTypes.INTEGER
  }, {});
  ligneDeCommande.associate = function(models) {
    // associations can be defined here
    models.ligneDeCommande.belongsTo(models.commande, { foreignKey: 'commandeId' });
    models.ligneDeCommande.belongsTo(models.ouvrage, { foreignKey: 'ouvrageId' });
    models.ligneDeCommande.hasMany(models.panier, { foreignKey: 'ligneDeCommandeId' });

  };
  return ligneDeCommande;
};