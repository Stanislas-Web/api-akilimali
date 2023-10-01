const express = require("express");
const router = express.Router();
const db = require("../../models");
const soapRequest = require('easy-soap-request');





router.post("/commandes/:idCommande/paiements/orangemoney/s2m", (req, res) => {

  const PartnId=process.env.PARTN_ID;
  const callbackurl='http://'+process.env.MY_SERVER+'/commandes/'+req.params.idCommande+'/paiements/orangemoney/s2m/status';

  

  //const url='https://41.77.223.184:8088/apigatewayom/apigwomService?wsdl';

  //const transid=req.params.commmandeId;
  //devise = CDF OU USD


  const { subsmsisdn, amount, devise } = req.body;
  const mermsisdn=process.env.ORANGE_MONEY_AKILIMALI;
  const message_s2m="Vous avez sollicité un paiement pour un montant de "+amount+" "+ devise+" chez Akilimali. Confirmez en tapant votre code PIN :";
  



  /*
    L’opération doS2M permet d’effectuer un paiement entre un client et un numéro marchand orange.

    subsmsisdn: msisdn du client qui effectue le paiement 
    PartnId: ID du partenaire
    mermsisdn: msisdn du marchant bénéficiaire de la transaction
    transid: ID de la transaction
    currency: la devise de la monnaie
    amount: le montant de la transaction
    callbackurl:
    message_s2m: les message à envoyer au client (Optionnel)

  */


    db.paiement
    .create({
      date_paiement:new Date(),
      subsmsisdn:subsmsisdn,
      PartnId:PartnId,
      mermsisdn:mermsisdn,
      currency:devise,
      amount:amount,
      status:'en attente',
      commandeId:Number(req.params.idCommande)



    })
    .then((unPaiement) => {


      //xml 
      const xml =`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.ws1.com/">
  <soapenv:Header/>
  <soapenv:Body>
  <ser:doS2M>
  <subsmsisdn>${subsmsisdn}</subsmsisdn>
  <PartnId>${PartnId}</PartnId>
  <mermsisdn>${mermsisdn}</mermsisdn>
  <transid>${unPaiement.id}</transid>
  <currency>${devise}</currency>
  <amount>${amount}</amount>
  <callbackurl>${callbackurl}</callbackurl>
  <message_s2m>${message_s2m}</message_s2m>
  </ser:doS2M>
  </soapenv:Body>
  </soapenv:Envelope>`;


      // example data
const url = 'https://41.77.223.184:8088/apigatewayom/apigwomService?wsdl';
const sampleHeaders = {
  'user-agent': 'AkilimaliTest',
  'Authorization':'',
  'Content-Type': 'text/xml;charset=UTF-8',
  'soapAction': 'https://41.77.223.184:8088/apigatewayom/apigwomService?wsdl',
};


// usage of module
(async () => {
  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
  const { headers, body, statusCode } = response;
  //console.log(headers);
  console.log("Body de ma requete");
  console.log(body);

  console.log("Status code de ma requete");
  console.log(statusCode);
})();


//return

        

    })
    .catch((err) => res.status(400).json(err));
});

router.post("/commandes/:idCommande/paiements/orangemoney/s2m/status",(req,res)=>{

  console.log(req.body);
  /*
if( verification  si le paiement a marché ){
  db.paiement.update({ status: 'paye'}, { where: { commandeId: Number(req.params.idCommande) } });

}
*/

});

router.get("/paiements", (req, res) => {
  db.paiement
    .findAll()
    .then((allPay) => {
      return res.send(allPay);
    })
    .catch((err) => res.status(404).json(err));
});



module.exports = router;