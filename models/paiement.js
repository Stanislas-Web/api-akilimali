'use strict';
module.exports = (sequelize, DataTypes) => {
  const paiement = sequelize.define('paiement', {
    date_paiement: DataTypes.DATE,
    subsmsisdn:DataTypes.STRING,
    PartnId:DataTypes.STRING,
    mermsisdn:DataTypes.STRING,
    currency:DataTypes.STRING,
    amount:DataTypes.STRING,
    devise:DataTypes.STRING,
    message_s2m:DataTypes.STRING,
    status:DataTypes.STRING,

  }, {});
  paiement.associate = function(models) {
    // associations can be defined here
    models.paiement.belongsTo(models.commande, { foreignKey: 'commandeId' });
    //models.commande.hasMany(models.ChildCategory, { foreignKey: 'commandeId' });


  };
  return paiement;
};