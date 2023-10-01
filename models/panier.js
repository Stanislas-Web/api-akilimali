'use strict';
module.exports = (sequelize, DataTypes) => {
  const panier = sequelize.define('panier', {
    ligneDeCommandeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  panier.associate = function(models) {
    // associations can be defined here
    models.panier.belongsTo(models.user, { foreignKey: 'userId' });
    models.panier.belongsTo(models.ligneDeCommande, { foreignKey: 'ligneDeCommandeId' });

  };
  return panier;
};