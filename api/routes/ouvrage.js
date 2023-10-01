const express = require("express");
const router = express.Router();
const db = require("../../models");
const cors = require("cors");

router.get("/ouvrages", (req, res) => {
  db.ouvrage
    .findAll({include: [db.auteur,db.theme]})
    .then((allOuvrage) => {
      return res.send(allOuvrage);
    })
    .catch((err) => res.status(404).json(err));
});

//sur demande de stanis
router.get("/ouvragesall", (req, res) => {

  const ouvrage_tab=[];
  let oouvrage_simplifie={};



  db.ouvrage
    .findAll({include: [db.auteur,db.theme]})
    .then((allOuvrage) => {


      allOuvrage.forEach(livre=>{
        oouvrage_simplifie['id_ouvrage']=livre.id;
        oouvrage_simplifie['titre_ouvrage']=livre.titre_ouvrage;
        oouvrage_simplifie['description_ouvrage']=livre.description_ouvrage;
        oouvrage_simplifie['image_ouvrage']=livre.image_ouvrage;
        oouvrage_simplifie['lien_ouvrage']=livre.lien_ouvrage;
        oouvrage_simplifie['pays_ouvrage']=livre.pays_ouvrage;
        oouvrage_simplifie['prix_ouvrage']=livre.prix_ouvrage;
        oouvrage_simplifie['genre_ouvrage']=livre.genre_ouvrage;
        //oouvrage_simplifie['id_auteur']=livre.auteurs[0];
        //oouvrage_simplifie['id_theme']=livre.themes[0];
        livre.auteurs.forEach(auteur=>{
            oouvrage_simplifie['id_auteur']=auteur.id;
            oouvrage_simplifie['nom_auteur']=auteur.nom_auteur;
            oouvrage_simplifie['image_auteur']=auteur.image_auteur;
           // console.log(auteur.id);
        })

        livre.themes.forEach(theme=>{
            oouvrage_simplifie['id_theme']=theme.id;
            oouvrage_simplifie['categorie_ouvrage']=theme.categorie_ouvrage;
            //console.log(theme.id);
        })
        ouvrage_tab.push(oouvrage_simplifie);
        oouvrage_simplifie={};

    });




      return res.send(ouvrage_tab);
    })
    .catch((err) => res.status(404).json(err));
});



router.post("/ouvrages",cors(), async (req, res) => {
    const { titre_ouvrage, description_ouvrage, image_ouvrage, pays_ouvrage, prix_ouvrage, genre_ouvrage, lien_ouvrage, nom_auteur, prenom_auteur, pays_auteur, image_auteur, categorie_ouvrage } = req.body;



const auteur= await   db.auteur.findOne({ where: { nom_auteur: nom_auteur } })
            .then(data => {
                if (data) {
                    return db.auteur.update({ prenom_auteur: prenom_auteur,pays_auteur:pays_auteur, image_auteur:image_auteur}, { where: { id: Number(data.id) } })
                }
                return db.auteur.create({ nom_auteur: nom_auteur, prenom_auteur: prenom_auteur,pays_auteur:pays_auteur, image_auteur:image_auteur })
            });
        
const ouvrage = await db.ouvrage.findOne({where:{titre_ouvrage:titre_ouvrage}}).then(data=>{
    if (data) {
        return db.ouvrage.update({ titre_ouvrage: titre_ouvrage,description_ouvrage:description_ouvrage, image_ouvrage:image_ouvrage, }, { where: { id:Number(data.id)  } })
    }
    return db.ouvrage.create({ titre_ouvrage: titre_ouvrage,
        description_ouvrage: description_ouvrage,
        image_ouvrage: image_ouvrage,
        lien_ouvrage: lien_ouvrage,
        pays_ouvrage: pays_ouvrage,
        prix_ouvrage: prix_ouvrage,
        genre_ouvrage: genre_ouvrage });
});
await auteur.addOuvrage(ouvrage, { through: { selfGranted: false } }).then(data=>{
    return res.send(data);
}).catch(err=>res.status(404).json(err));






});




router.get("/ouvrages/:id", (req, res) => {
  db.ouvrage
    .findAll({
      where: {
        id: Number(req.params.id)
      }
    })
    .then((unOuvrage) => {
      return res.send(unOuvrage);
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
});

router.delete("/ouvrages/:id", (req, res) => {
  db.ouvrage
    .destroy({
      where: {
        id: Number(req.params.id)
      },
    })
    .then((delCommande) => {
      return res.status(200).json(delCommande);
    });
});

module.exports = router;