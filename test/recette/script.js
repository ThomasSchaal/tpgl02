var util = require("util");
var fs = require("fs");
var qunit=require("qunit");

var entrerInformation=;
var fichierLecture;
// Creation d?un fichier contact.csv si il n?existe pas deja
fs.exists("contacts.csv", function(exists) {
                           
                           if (exists) {
                               menu();
                           }
                           else {
                               var lignedebut = 'nom;prenom;organisation;fonction;adresse;mobile;fix;email\n';
                               fs.writeFile("contacts.csv", lignedebut);
                               menu();
                           }
                       });

//Fonction principale de notre application, elle permet d'appeller chaque fonction.
function menu() {
    console.log("1: Importer la liste des contacts au format vCard");
    console.log("2: Creer, modifier ou supprimer un ficher de contact");
    console.log("3: Exporter les contacts dans un format adequat aux logiciels de bureautiques");
    console.log("4: Archiver une fiche contact");
    console.log("5: Transferer une fiche archivee");
    console.log("6: Rechercher et afficher un contact");
    console.log("7: Afficher de statistiques generales\n");
    ask("choisissez votre fonction", /^[0-9]+$/, function(line) {
        switch (line.trim()) { //Switch permettant de choisir la fonction voulue.
            case '1' : // Importer la liste des contacts au format vCard
                console.log('Vous voulez importer les contacts.');
                importVcard();
                break;
            case '2' : //Creer, modifier ou supprimer un fichier de contact.
                ask("Creer (1), modifier (2) ou supprimer (3) ?", /^[0-9]+$/, function(choix) {
                    switch (choix) { //Switch permettant de choisir la creation, modification ou suppression du contact.
                        case '1': //Creer.
                            creerContact();
                            break;
                        case '2': //Modifier.
                            ask("choisissez le nom", /[A-Za-z]/, function(nom) {
                                ask("choisissez le prenom", /[A-Za-z]/, function(prenom) {
                                    modifierContact(nom, prenom);
                                });
                            });
                            break;
                        case '3': //Supprimer.
                            ask("choisissez le nom", /[A-Za-z]/, function(nom) {
                                ask("choisissez le prenom", /[A-Za-z]/, function(prenom) {
                                    supprimerContact(nom, prenom);
                                });
                            });
                            break;
                    }
                });
                break;
            case '3' : //Exporter les contacts dans un format adequat aux logiciels de bureautiques
                ask("Choisisser le chemin du fichier csv ", /.*/, function(chemin) {
                    fs.readFile('contacts.csv', function(err, data) {
                        exporterContact(chemin,data);
                    });
                });
                break;
            case '4' : //Archiver une fiche contact
                ask("choisissez le nom", /[A-Za-z]/, function(nom) {
                    ask("choisissez le prenom", /[A-Za-z]/, function(prenom) {
                        archiverContact(nom, prenom);
                    });
                });
                break;
            case '5' : //Transferer une fiche archivee
                choixFicheArchivee();
                break;
            case '6': //Rechercher et afficher un contact
                ask("choisissez le nom", /[A-Za-z]/, function(nom) {
                    ask("choisissez le prenom", /[A-Za-z]/, function(prenom) {
                        csvGetLine(nom, prenom);
                    });
                });
                break;
            case '7': //Afficher de statistiques generales
                compterNombreLigne();
                break;
        }
    });
}

//Ask permet de recuperer les entrees du clavier afin que l'utilisateur puisse definir ce qu'il veut.
function ask(question, format, callback) {
    var stdin = process.stdin; //Permet l'entree du clavier.
    var stdout = process.stdout; //Permet l'affichage de la sortie.
    stdin.resume(); //Permet de reprendre la main sur la console.
    stdout.write(question + ": "); //Affiche la question dans la console.
    stdin.once('data', function(data) { //Recupere l'entree clavier sous forme de "data".
        data = data.toString().trim();
        if (format.test(data)) { //Si l'entree du clavier correspond au format...
            callback(data); //...On retourne l'entree.
        } else { //Sinon...
            stdout.write("Format incorrect, celui ci doit etre sous la forme: " + format + "\n"); //...affichage d'un message d'erreur.
            ask(question, format, callback); //La question est reposee.
        }
    });
}

function importVcard() { // Fonction qui gere la SPEC_1
   ask('chemin du fichier .vcf', /.*/, function(chemin) { // Demande du chemin du fichier a l'utilisteur
       fs.readFile(chemin, function(err, data) { //On ouvre le fichier vCard en lecture
           if (err)
               throw err;
           var tab1 = data.toString().split("\n");
           var tabUtilisateur = new Array(); // Tableau qui sera a deux dimensions afin de mettre tous les contacts ainsi que les descriptions de chaque contacts
           var tabstock = new Array(); // Tableau qui va stocker les valeurs du contact vCard
           for (j = 0; j < tab1.length - 1; j++) {
               tabUtilisateur[j] = new Array(); // Tableau de deux dimensions
               tabstock = tab1[j].split(":"); 
               for (k = 0; k < 2; k++) {// On met chaque valeur du tableau tabstock dans le tableau taUtilisateur
                   tabUtilisateur[j][k] = tabstock[k];
                  }
           }
           var nomPrenom = Array(); // Recuperation de chaque caracteristiques du contact vCard afin de faciliter l'affichage
           nomPrenom = tabUtilisateur[2][1].split(" ");
           nomPrenom[1] = nomPrenom[1].toUpperCase();
           nomPrenom[1] = nomPrenom[1].replace(/[\r]/g, "");
           nomPrenom[0] = nomPrenom[0].charAt(0).toUpperCase() + nomPrenom[0].substring(1).toLowerCase();
           mobile = tabUtilisateur[5][1].trim();
           fix = tabUtilisateur[6][1].trim();
           adresse = tabUtilisateur[7][1].replace(/;/g, ' ');
           adresse = adresse.trim();
           tabUtilisateur[8][1] = tabUtilisateur[8][1].replace(/[\r]/g, "");
           tabUtilisateur[9][1] = tabUtilisateur[9][1].replace(/[\r]/g, "");
          
           var adres = new Array(); // Bon format rue, ville et code postale
               adres = adresse.toString().split(" ");
               var rue="";
               var ville;
               var cp;
               for (h = 0; h < adres.length; h++) {
                   if (h < adres.length - 3) {

                       rue += adres[h]+" ";
                   }
                   else if (h === adres.length - 3) {
                       ville = adres[h];
                   }
                   else if (h === adres.length - 1) {
                       cp = adres[h];
                   }
               }
              rue=rue.trim();// On met toutes les caracteristiques du contact vCard dans une variable coordonnee qui sera utiliser pour ecrire les donnees dans le CSV
           var coordonnee = nomPrenom[1] + ';' + nomPrenom[0] + ';' + tabUtilisateur[8][1] + ';' + tabUtilisateur[9][1] + ';' + rue + ' '+cp+ ' '+ville+ ';' + mobile + ';' + fix + ';' + tabUtilisateur[4][1];
           var compteur = 0;
           //Correction des doublons.
           fs.readFile('contacts.csv', function(err, data) { // Lecture du fichier CSV avec tous les contacts
               if (err)
                   throw err;
               var tab1 = data.toString().split("\n");
               var tabUtilisateur = new Array();
               var tabstock = new Array();
               for (j = 0; j < tab1.length - 1; j++) {
                   tabUtilisateur[j] = new Array();
                   tabstock = tab1[j].split(";");
                   for (k = 0; k < 8; k++) {
                       tabUtilisateur[j][k] = tabstock[k]; // On stocke toutes les informations dans le double tableau tabUtilisateur
                   }
               }
               for (j = 0; j < tab1.length - 1; j++) { // Boucle qui permet de voir si le contact vCard est deja present dans le CSV ceci permet la gestion les doublons SPEC_4
                   if (tabUtilisateur[j][0] === nomPrenom[1] && tabUtilisateur[j][1] === nomPrenom[0]) { 
                       compteur = compteur + 1;
                   }
               }
               if (compteur === 1) {
                   console.log('Ajout impossible car le contact est deja enregistre');
                   menu();
               } else { // Si le contact n'existe pas on l'ecrit dans le fichier
                   console.log("Le contact est ajoute");
                   fs.readFile('contacts.csv', function(err, data) {
                       var donnee = data + coordonnee + "\n";
                       fs.writeFile('contacts.csv', donnee);
                       fs.exists("modification.txt", function(exists) {
                           var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                           var modif = "import de : " + nomPrenom[1] + ' ' + nomPrenom[0] + " le " + date + "\n";
                           if (exists) { // On ecrit les modifications dans un fichier .txt afin de repondre a l'exigence de la SPEC_9
                               fs.readFile("modification.txt", function(err, data) {
                                   if (err)
                                       throw err;
                                   fs.writeFile("modification.txt", data + modif);
                                   menu();
                               });
                           }
                           else {
                               var lignedebut = "Historique des modifications\n";
                               //REFACTORING
								MESSAGE_LOG(lignedebut+modif);
								//FIN REFACTORING
                               menu();
                           }
                       });
                   });
               }
           });
       });
   });
}

function csvGetLine(nom, prenom) { // Fonction qui permet de rechercher un contact et d'afficher la fiche de ce contact SPEC_7 et SPEC_8
	  nom = REFACTORING_NOM_INSENSIBLE_A_LA_CASSE(nom);
    prenom = REFACTORING_PRENOM_INSENSIBLE_A_LA_CASSE(prenom);
    console.log('\nVous avez selectionne : ' + nom + ' ' + prenom);
    var compteur = 0;
    var numPersonne = 0;
    fs.readFile('contacts.csv', function(err, data) { // On lit le CSV pour ensuite mettre toutes les valeurs du fichier dans un tableau a deux dimensions
        if (err)
            throw err;
        var tab1 = data.toString().split("\n");
        var tabUtilisateur = new Array();
        ;
        var tabstock = new Array();
        for (j = 0; j < tab1.length - 1; j++) {
            tabUtilisateur[j] = new Array();
            tabstock = tab1[j].split(";");
            for (k = 0; k < 8; k++) {
                tabUtilisateur[j][k] = tabstock[k]; // On met les valeurs dans le tableau a deux dimensions
            }
        }
        for (j = 0; j < tab1.length - 1; j++) { // Test qui permet de voir si le client demande dans la recherche existe bien dans le CSV
            if (tabUtilisateur[j][0] === nom && tabUtilisateur[j][1] === prenom) {
                compteur = compteur + 1;
                numPersonne = j;
            }
        }
        if (compteur === 1) { //Affichage si le client existe
            console.log('\nLe client existe. Voici les coordonnees du client: ');
            for (k = 0; k < 8; k++) {
                console.log(tabUtilisateur[0][k] + " : " + tabUtilisateur[numPersonne][k] + ' ');
            }
			//REFACTORING
			MESSAGE_LOG("Une recherche de contact sur la personne de "+nom+" "+prenom+" a ete effectue");
			//FIN REFACTORING
            menu();
        } else { // Affichage s'il n'existe pas
            console.log("\nLe client n'existe pas");
			//REFACTORING
			MESSAGE_LOG("Une recherche de contact sur la personne de "+nom+" "+prenom+" mais il n'existait pas dans la base");
			//FIN REFACTORING
            menu();
        }


    });

}

function modifierContact(nom, prenom) {
  nom = REFACTORING_NOM_INSENSIBLE_A_LA_CASSE(nom);
  prenom = REFACTORING_PRENOM_INSENSIBLE_A_LA_CASSE(prenom);
    var compteur = 0; //booleen qui permet de savoir si le contact existe ou non, 0 : non, 1 : oui
    var numPersonne = 0; //id de la personne recherchee.
    fs.readFile('contacts.csv', function(err, data) { //Ouverture du fichier contact et recuperation des donnees.
        if (err) //Erreur de fichier.
            throw err;
        var tab1 = data.toString().split("\n"); //Mise des donnees dans un tableau en fonction des sauts de ligne.
        var tabUtilisateur = new Array(); //Tableau qui contiendra tous les contacts avec les champs separes.
        var tabstock = new Array(); //Tableau qui contiendra chacun des champs d'un utilisateur.
        for (j = 0; j < tab1.length - 1; j++) { //Boucle pour parcourir tab1 et ajouter dans tabUtilisateur les donnees de chaque utilisateur.
            tabUtilisateur[j] = new Array(); 
            tabstock = tab1[j].split(";"); 
            for (k = 0; k < 8; k++) {
                tabUtilisateur[j][k] = tabstock[k];
            }
        }
        var begin = null; //Contiendra le debut de contacts.csv
        var end = null; ////Contiendra la fin de contacts.csv
        for (j = 0; j < tab1.length - 1; j++) { //Boucle pour tester l'existence de l'utilisateur.
            if (tabUtilisateur[j][0] === nom && tabUtilisateur[j][1] === prenom) {
                compteur = compteur + 1;
                numPersonne = j; //On stocke l'id de la personne trouvee.
            }
            else if (compteur === 0) {
                for (countBegin = 0; countBegin < 7; countBegin++) {
                    if (begin === null) {
                        begin = (tabUtilisateur[j][countBegin] + ";");
                    }
                    else {
                        begin += (tabUtilisateur[j][countBegin] + ";");
                    }

                }
                begin += (tabUtilisateur[j][7] + "\n");
            }
            else {
                for (countEnd = 0; countEnd < 7; countEnd++) {
                    if (end === null) {
                        end = (tabUtilisateur[j][countEnd] + ";");
                    }
                    else {
                        end += (tabUtilisateur[j][countEnd] + ";");
                    }

                }
                end += (tabUtilisateur[j][7] + "\n");
            }
        }
        if (compteur === 1) {
            console.log('Le client existe');
            for (k = 0; k < 8; k++) { //Affichage du contact trouve.
                console.log(tabUtilisateur[0][k] + " : " + tabUtilisateur[numPersonne][k] + ' ');
            }
            var personne = null; //Contiendra le contact modifie.
            //Suite de ask pour modifier les champs du contact.
            ask("choisissez le nom", /[A-Z]+/, function(nomModif) {
                ask("choisissez votre prenom", /\b[A-Z][a-z]+/, function(prenomModif) {
                    ask("choisissez votre organisation", /^[a-zA-Z0-9]+$/, function(orgModif) {
                        ask("choisissez votre fonction", /^[a-zA-Z]+$/, function(fonctionModif) {
                            ask("choisissez votre adresse", /^[a-zA-Z0-9\ ]+$/, function(adresseModif) {
                                ask("choisissez votre mobile", /^[0-9\ ]+$/, function(mobileModif) {
                                    ask("choisissez votre fixe", /^[0-9\ ]+$/, function(fixeModif) {
                                        ask("choisissez votre email", /^(.+)@/, function(emailModif) {
                                            personne = (nomModif + ";" + prenomModif + ";" + orgModif + ";" + fonctionModif + ";" + adresseModif + ";" + mobileModif + ";" + fixeModif + ";" + emailModif + "\n"); //On stocke une ligne au format "csv" dans personne.
                                            if (end===null){
                                                fs.writeFile("contacts.csv", begin+personne);}
                                             else{
                                                   fs.writeFile("contacts.csv", begin + personne + end); //On ecrit dans contacts.csv, la personne creee au bon endroit.
                                                  }
                                            console.log(" Le client a ete modifiee");
                                            fs.exists("modification.txt", function(exists) { //Test de l'existence du fichier modification.tx
                                                var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''); //Formatage de la date.
                                                var modif = "modification de : " + tabUtilisateur[numPersonne][0] + ' ' + tabUtilisateur[numPersonne][1] + " le " + date + "\n";
                                                if (exists) { 
                                                    fs.readFile("modification.txt", function(err, data) { //Ouverture du fichier et recuperation des donnees.
                                                        if (err)
                                                            throw err;
                                                        fs.writeFile("modification.txt", data + modif); //Ajout de la modification a la suite.
                                                        menu();
                                                    });
                                                }
                                                else {
                                                    var lignedebut = "Historique des modifications\n";
                                                    fs.writeFile("modification.txt", lignedebut + modif); //Creation du fichier.
                                                    menu();
                                                }
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        } else { //Le contact n'existe pas, fin de la fonction.
            console.log("Le client n'existe pas");
			//REFACTORING
			MESSAGE_LOG("Tentative de modification d'un contact inexistant");
			//FIN REFACTORING
            menu();
        }
    });
}

function supprimerContact(nom, prenom) { // Fonction qui permet de supprimer un contact dans le CSV general. Une partie de la SPEC_2
	nom = REFACTORING_NOM_INSENSIBLE_A_LA_CASSE(nom);
  prenom = REFACTORING_PRENOM_INSENSIBLE_A_LA_CASSE(prenom);
   console.log('Vous avez selectionne : ' + nom + ' ' + prenom);
    var compteur = 0;
    var numPersonne = 0;
    fs.readFile('contacts.csv', function(err, data) { // On lit le CSV pour ensuite mettre toutes les valeurs du fichier dans un tableau a deux dimensions
        if (err)
            throw err;
        var tab1 = data.toString().split("\n");
        var tabUtilisateur = new Array();
        ;
        var tabstock = new Array();
        for (j = 0; j < tab1.length - 1; j++) {
            tabUtilisateur[j] = new Array();
            tabstock = tab1[j].split(";");
            for (k = 0; k < 8; k++) {
                tabUtilisateur[j][k] = tabstock[k]; // On met les valeurs dans le tableau a deux dimensions
            }
        }
        var begin = null;
        var end = null;
        for (j = 0; j < tab1.length - 1; j++) {
            if (tabUtilisateur[j][0] === nom && tabUtilisateur[j][1] === prenom) { // Test qui permet de voir si le client demande dans la recherche existe bien dans le CSV
                compteur = compteur + 1;
                numPersonne = j;
            }
            // les deux boucles suivantes permettent de stocker les valeurs du CSV en deux tableaux separes. 
            // Un tableau où on enregistre chaque client qui sont ecrit avant le client supprime, et un autre tableau où on enregistre la fin du CSV
            else if (compteur === 0) { 
                for (countBegin = 0; countBegin < 7; countBegin++) {
                    if (begin === null) {
                        begin = (tabUtilisateur[j][countBegin] + ";");
                    }
                    else {
                        begin += (tabUtilisateur[j][countBegin] + ";");
                    }

                }
                begin += (tabUtilisateur[j][7] + "\n");
            }
            else {
                for (countEnd = 0; countEnd < 7; countEnd++) {
                    if (end === null) {
                        end = (tabUtilisateur[j][countEnd] + ";");
                    }
                    else {
                        end += (tabUtilisateur[j][countEnd] + ";");
                    }

                }
                end += (tabUtilisateur[j][7] + "\n");
            }
        }
        if (compteur === 1) { // Si le client existe on affiche a l'utilisateur et ensuite on fait la suppression
            console.log('Le client existe.\n');
            for (k = 0; k < 8; k++) { // On affiche les coordonnees du client que l'on va supprimer
                console.log(tabUtilisateur[0][k] + " : " + tabUtilisateur[numPersonne][k] + ' '); 
            }
            if (end===null){
           fs.writeFile("contacts.csv", begin);
        }else{
             fs.writeFile("contacts.csv", begin + end); // On ecrit dans le CSV les clients sauf celui qui vient d'etre supprime
        }
            console.log("La suppression a reussie.\n");
            fs.exists("modification.txt", function(exists) { // On rajoute une ligne pour repondre a la SPEC_9 dans le fichier modification.txt
                var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                var modif = "suppression de : " + nom + ' ' + prenom + " le " + date + "\n";
                if (exists) {
                    MESSAGE_LOG(modif);
                }
                else {
                    var lignedebut = "Historique des modifications\n";
                    fs.writeFile("modification.txt", lignedebut + modif);
                    menu();
                }
            });
        } else { // Si le client n'existe pas on ne supprime rien
            console.log("Le client n'existe pas. Suppression impossible.\n");
			//REFACTORING
			MESSAGE_LOG("Un contact a tente d'etre supprime mais il n'existait pas");
			//FIN REFACTORING
            menu();
        }

    });
}

function creerContact() {// Fonction qui permet de creer un contact. Une partie de la SPEC_2
    // demander informations, creer personne, coordonee puis contact, ouvrir csv et ecrire csv+nouveauContact

    var personne = null; // On demande a l'utilisateur chaque caracteristiques du contact qu'il veut enregistrer
    ask("\nchoisissez le nom", /[A-Z]+/, function(nom) {
        ask("choisissez votre prenom", /[A-Za-z]+/, function(prenom) {
            ask("choisissez votre organisation", /^[a-zA-Z0-9]+$/, function(org) {
                ask("choisissez votre fonction", /^[a-zA-Z]+$/, function(fonction) {
                    ask("choisissez votre adresse", /^[0-9]{1,3}( rue )[a-zA-Z\ ]+$/, function(adresse) {
                        ask("choisissez votre mobile", /^0[6-7][0-9]{8}$/, function(mobile) {
                            ask("choisissez votre fixe", /^0[1-9][0-9]{8}$/, function(fixe) {
                                ask("choisissez votre email", /^(.+)@(.+)\.[a-z]{2}$/, function(email) { // on met toutes les caracteristiques dans une variable personne
                                    personne = (nom + ";" + prenom + ";" + org + ";" + fonction + ";" + adresse + ";" + mobile + ";" + fixe + ";" + email);
                                    var compteur = 0;
                                    entrerInformation="ok";//TEST QUNIT
                                    fs.readFile('contacts.csv', function(err, data) { // On lit le CSV pour ensuite mettre toutes les valeurs du fichier dans un tableau a deux dimensions
                                        if (err)
                                            throw err;
                                        var tab1 = data.toString().split("\n");
                                        var tabUtilisateur = new Array();
                                        var tabstock = new Array();
                                        for (j = 0; j < tab1.length - 1; j++) {
                                            tabUtilisateur[j] = new Array();
                                            tabstock = tab1[j].split(";");
                                            for (k = 0; k < 8; k++) {
                                                tabUtilisateur[j][k] = tabstock[k]; // On met les valeurs dans le tableau a deux dimensions
                                            }
                                        }
                                        fichierLecture="ok";// TEST QUNIT
                                        for (j = 0; j < tab1.length - 1; j++) {
                                            if (tabUtilisateur[j][0] === nom && tabUtilisateur[j][1] === prenom) { // Test qui permet de voir si le client demande dans la recherche existe bien dans le CSV
                                                compteur = compteur + 1;
                                            }
                                        }
                                        if (compteur === 1) { // Le contact existe deja. On ecrit pas le contact dans le CSV (eviter les doublons SPEC_4)
                                            console.log('Ajout impossible car le contact existe deja dans le fichier.');
											//REFACTORING
											MESSAGE_LOG("Un contact a tente d'être insere mais il existait deja");
											//FIN REFACTORING
                                            menu();
                                        } else { // on ecrit les caracteristiques du contact dans le CSV
                                            fs.readFile('contacts.csv', function(err, data) {
                                                var donnee = data + personne + "\n";
                                                fs.writeFile('contacts.csv', donnee);
                                                console.log("La personne a bien ete ajoute.");
                                                fs.exists("modification.txt", function(exists) {
                                                    var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                                                    var modif = "creation de : " + nom + ' ' + prenom + " le " + date + "\n";
                                                    if (exists) { // On rajoute une ligne pour repondre a la SPEC_9 dans le fichier modification.txt
                                                        //REFACTORING
                          														MESSAGE_LOG(modif);
                          														//FIN REFACTORING
                          													}
                                                    else {
                                                        var lignedebut = "Historique des modifications\n";
                                                        fs.writeFile("modification.txt", lignedebut + modif);
                                                        menu();
                                                    }

                                                });
                                            });
                                        }

                                    });
                                });
                            });
                        });
                    });
                });
            });
        });


    });

}

function archiverContact(nom, prenom) {
  nom = REFACTORING_NOM_INSENSIBLE_A_LA_CASSE(nom);
  prenom = REFACTORING_PRENOM_INSENSIBLE_A_LA_CASSE(prenom);
	var compteur = 0; //booleen qui permet de savoir si le contact existe ou non, 0 : non, 1 : oui
    var numPersonne = 0; //id de la personne recherchee.
    fs.readFile('contacts.csv', function(err, data) { //Ouverture du fichier contact et recuperation des donnees.
        if (err) //Erreur de fichier.
            throw err;
        var tab1 = data.toString().split("\n"); //Mise des donnees dans un tableau en fonction des sauts de ligne.
        var tabUtilisateur = new Array(); //Tableau qui contiendra tous les contacts avec les champs separes.
        var tabstock = new Array(); //Tableau qui contiendra chacun des champs d'un utilisateur.
        for (j = 0; j < tab1.length - 1; j++) { //Boucle pour parcourir tab1 et ajouter dans tabUtilisateur les donnees de chaque utilisateur.
            tabUtilisateur[j] = new Array(); 
            tabstock = tab1[j].split(";"); 
            for (k = 0; k < 8; k++) {
                tabUtilisateur[j][k] = tabstock[k];
            }
        }
        var personne = null; //Contiendra la personne a archiver.
        var begin = null; //Contiendra le debut de contacts.csv
        var end = null; ////Contiendra la fin de contacts.csv
        for (j = 0; j < tab1.length - 1; j++) { //Boucle pour tester l'existence de l'utilisateur.
            if (tabUtilisateur[j][0] === nom && tabUtilisateur[j][1] === prenom) {
                compteur = compteur + 1;
                numPersonne = j;
                for (countPersonne = 0; countPersonne < 8; countPersonne++) { //Boucle pour ajouter les donnees a personne.
                    if (personne === null) {
                        personne = (tabUtilisateur[j][countPersonne] + ";");
                    }
                    else if (countPersonne === 7) {
                        personne += (tabUtilisateur[j][countPersonne]);
                    }
                    else {
                        personne += (tabUtilisateur[j][countPersonne] + ";");
                    }
                }
            }
            else if (compteur === 0) {
                for (countBegin = 0; countBegin < 7; countBegin++) {
                    if (begin === null) {
                        begin = (tabUtilisateur[j][countBegin] + ";");
                    }
                    else {
                        begin += (tabUtilisateur[j][countBegin] + ";");
                    }
                }
                begin += (tabUtilisateur[j][7] + "\n");
            }
            else {
                for (countEnd = 0; countEnd < 7; countEnd++) {
                    if (end === null) {
                        end = (tabUtilisateur[j][countEnd] + ";");
                    }
                    else {
                        end += (tabUtilisateur[j][countEnd] + ";");
                    }
                }
                end += (tabUtilisateur[j][7] + "\n");
            }
        }
        if (compteur === 1) {
            console.log('Le client existe');
            for (k = 0; k < 8; k++) { //Affichage du contact trouve.
                console.log(tabUtilisateur[0][k] + " : " + tabUtilisateur[numPersonne][k] + ' ');
            }
            if (personne !== null) {
                personne = personne.trim(); //Suppression des espaces.
                personne = personne + "\n"; //Saut de ligne.
               if (end===null){
           fs.writeFile("contacts.csv", begin);
        }else{
             fs.writeFile("contacts.csv", begin + end); // On ecrit dans le CSV les clients 
        }
                console.log("suppression reussie");
                fs.exists("archive.csv", function(exists) { //Test de l'existence du fichier archive.csv
                    if (exists) {
                        fs.readFile("archive.csv", function(err, data) { //Lecture du fichier archive.csv
                            if (err)
                                throw err;
                            
                            fs.writeFile("archive.csv", data + personne); //Ecriture de la personne dans le fichier archive.csv
                            console.log(personne + " ajoute a l'archive");
                            fs.exists("modification.txt", function(exists) { //Enregistrement des modifications.
                                var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                                var modif = "archivage de : " + nom + ' ' + prenom + " le " + date + "\n";
                                if (exists) {
                                    fs.readFile("modification.txt", function(err, data) {
                                        if (err)
                                            throw err;
                                        fs.writeFile("modification.txt", data + modif);
                                        menu();
                                    });
                                }
                                else {
                                    var lignedebut = "Historique des modifications\n";
                                    fs.writeFile("modification.txt", lignedebut + modif);
                                    menu();
                                }

                            });
                        });
                    }
                    else { //Meme que precedent mais avec la creation du fichier archive.csv.
                        var lignedebut = 'nom;prenom;organisation;fonction;adresse;mobile;fix;email\n';
                        fs.writeFile("archive.csv", lignedebut + personne);
                        console.log(personne + " ajoute a l'archive");
                        fs.exists("modification.txt", function(exists) {
                            var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                            var modif = "archivage de : " + nom + ' ' + prenom + " le " + date + "\n";
                            if (exists) {
                                fs.readFile("modification.txt", function(err, data) {
                                    if (err)
                                        throw err;
                                    fs.writeFile("modification.txt", data + modif);
                                    menu();
                                });
                            }
                            else {
                                var lignedebut = "Historique des modifications\n";
                                fs.writeFile("modification.txt", lignedebut + modif);
                                menu();
                            }

                        });

                    }


                });
            }
        } else { //Le contact n'existe pas, fin de la fonction.
            console.log("Le client n'existe pas"); 
            menu();
        }
    });

}

function choixFicheArchivee() { // Fonction qui permet d'afficher le CSV et de selectionner quel client on veut transferer
    fs.readFile('archive.csv', function(err, data) {
        if (err)
            throw err;
        var tab1 = data.toString().split("\n");
        ask("choisissez le nom", /[A-Za-z]/, function(nom) {
            ask("choisissez le prenom", /[A-Za-z]/, function(prenom) {
                transfertFicheArchivee(nom, prenom); // Appelle de la fonction transfertFicheArchivee
               
            });
        });
    });


}

function transfertFicheArchivee(nom, prenom) {
  nom = REFACTORING_NOM_INSENSIBLE_A_LA_CASSE(nom);
  prenom = REFACTORING_PRENOM_INSENSIBLE_A_LA_CASSE(prenom);
	var compteur = 0; //booleen qui permet de savoir si le contact existe ou non, 0 : non, 1 : oui
    var numPersonne = 0; //id de la personne recherchee.
    fs.readFile('archive.csv', function(err, data) { //Ouverture du fichier contact et recuperation des donnees.
        if (err) //Erreur de fichier.
            throw err;
        var tab1 = data.toString().split("\n"); //Mise des donnees dans un tableau en fonction des sauts de ligne.
        var tabUtilisateur = new Array(); //Tableau qui contiendra tous les contacts avec les champs separes.
        var tabstock = new Array(); //Tableau qui contiendra chacun des champs d'un utilisateur.
        for (j = 0; j < tab1.length - 1; j++) { //Boucle pour parcourir tab1 et ajouter dans tabUtilisateur les donnees de chaque utilisateur.
            tabUtilisateur[j] = new Array(); 
            tabstock = tab1[j].split(";"); 
            for (k = 0; k < 8; k++) {
                tabUtilisateur[j][k] = tabstock[k];
            }
        }
        var personne = null; //Contiendra la personne a archiver.
        var begin = null; //Contiendra le debut de contacts.csv
        var end = null; ////Contiendra la fin de contacts.csv
        for (j = 0; j < tab1.length - 1; j++) { //Boucle pour tester l'existence de l'utilisateur.
            if (tabUtilisateur[j][0] === nom && tabUtilisateur[j][1] === prenom) {
                compteur = compteur + 1;
                numPersonne = j;
                for (countPersonne = 0; countPersonne < 8; countPersonne++) { //Boucle pour ajouter les donnees a personne.
                    if (personne === null) {
                        personne = (tabUtilisateur[j][countPersonne] + ";");
                    }
                    else if (countPersonne === 7) {
                        personne += (tabUtilisateur[j][countPersonne]);
                    }
                    else {
                        personne += (tabUtilisateur[j][countPersonne] + ";");
                    }
                }
                var adresse = new Array();
                adresse = tabUtilisateur[j][4].toString().split(" ");
                var rue="";
                var ville;
                var cp;

                for (h = 0; h < adresse.length; h++) { //Recuperation des differents champs de l'adresse.
                    if (h < adresse.length - 2) {

                        rue += adresse[h]+" ";
                    }
                    else if (h === adresse.length - 2) {
                        cp = adresse[h];
                    }
                    else if (h === adresse.length - 1) {
                        ville = adresse[h];
                    }
                }
               rue=rue.trim();
               //Creation de la VCARD
                var Vcard = 'BEGIN:VCARD\nVERSION:3.0\nFN:' + tabUtilisateur[j][1] + ' ' + tabUtilisateur[j][0] + '\nN:' + tabUtilisateur[j][0] + ';' + tabUtilisateur[j][1] + ';;;\nEMAIL;TYPE=INTERNET;TYPE=HOME:' + tabUtilisateur[j][7] + '\nTEL;TYPE=WORK: ' + tabUtilisateur[j][5] + '\nTEL;TYPE=HOME: ' + tabUtilisateur[j][6] + '\nADR;TYPE=HOME:;;' + rue + ';' + ville + ';;' + cp + ';' + '\nORG:UTT\nTITLE:' + tabUtilisateur[j][3] + '\nEND:VCARD\n\n';
                
                var chemin = tabUtilisateur[j][1] + "_" + tabUtilisateur[j][0] + ".vcf"; //Creation du chemin du fichier.
                fs.writeFile(chemin, Vcard); //Creation du fichier.
            }
            else if (compteur === 0) {
                for (countBegin = 0; countBegin < 7; countBegin++) {
                    if (begin === null) {
                        begin = (tabUtilisateur[j][countBegin] + ";");
                    }
                    else {
                        begin += (tabUtilisateur[j][countBegin] + ";");
                    }
                }
                begin += (tabUtilisateur[j][7] + "\n");
            }
            else {
                for (countEnd = 0; countEnd < 7; countEnd++) {
                    if (end === null) {
                        end = (tabUtilisateur[j][countEnd] + ";");
                    }
                    else {
                        end += (tabUtilisateur[j][countEnd] + ";");
                    }
                }
                end += (tabUtilisateur[j][7] + "\n");
            }
        }
        if (compteur === 1) { //Le client existe.
            console.log('Le client existe');
            console.log(Vcard);
            if (personne !== null) {
                personne = personne.trim();
                personne = personne + "\n";
               if (end===null){
           fs.writeFile("archive.csv", begin);
        }else{
             fs.writeFile("archive.csv", begin + end); // On ecrit dans le CSV les clients 
        }
                console.log("suppression reussie");

                fs.readFile("contacts.csv", function(err, data) {
                    if (err)
                        throw err;
                    fs.writeFile("contacts.csv", data + personne);
                    console.log(personne + " import dans la base");
                    fs.exists("modification.txt", function(exists) { //Enregisteement des modifications.
                        var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                        var modif = "reactive de : " + nom + ' ' + prenom + " le " + date + "\n";
                        if (exists) {
                            fs.readFile("modification.txt", function(err, data) {
                                if (err)
                                    throw err;
                                fs.writeFile("modification.txt", data + modif);
                                menu();
                            });
                        }
                        else {
                            var lignedebut = "Historique des modifications\n";
                            fs.writeFile("modification.txt", lignedebut + modif);
                            menu();
                        }

                    });
                });
            }
        } else { //Le client n'existe pas, fin de la fonction.
            console.log("Le client n'existe pas");
			//REFACTORING
			MESSAGE_LOG("Archivage erreur");
			//FIN REFACTORING
            menu();
        }
    });
}

function compterNombreLigne() { //Affichage des statistiques de l'application SPEC_10
    var compteur = 0;
    fs.readFile('contacts.csv', function(err, data) { // Lecture du CSV
        if (err)
            throw err;
        var tab1 = data.toString().split("\n");
        for (i in tab1) {

            compteur++;
        }
        console.log("Le fichier CSV contient " + compteur + " contact(s).\n"); // Affichage du nombre de lignes
        menu();
    });
}

//DEBUT FONCTION REFACTORING
function REFACTORING_NOM_INSENSIBLE_A_LA_CASSE(nom){
  nom = nom.toUpperCase();
  return nom;  
}

function REFACTORING_PRENOM_INSENSIBLE_A_LA_CASSE(prenom){

  prenom = prenom.toLowerCase();
  prenom = prenom.charAt(0).toUpperCase() + prenom.slice(1);
  return prenom;
}

function exporterContact(chemin,data){
  fs.writeFile(chemin, data);
  console.log("Export des contacts effectue !");
  fs.exists("modification.txt", function(exists) { //Enregisteement des modifications.
    var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var modif = "export des contacts le : " + date + "\n";
    if (exists) {
        fs.readFile("modification.txt", function(err, data) {
            if (err)
                throw err;
            fs.writeFile("modification.txt", data + modif);
            menu();
        });
    }
    else {
        var lignedebut = "Historique des modifications\n";
        fs.writeFile("modification.txt", lignedebut + modif);
        menu();
    }

  });
}

function MESSAGE_LOG(message){
 fs.readFile("modification.txt", function(err, data) {
                        if (err)
                            throw err;
                        fs.writeFile("modification.txt", getDate()+" : "+message+"\n");
                        menu();
                    });
}

function getDate(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  var h=today.getHours();
  var m=today.getMinutes();
  var s=today.getSeconds();

  if(dd<10) {
      dd='0'+dd
  } 

  if(mm<10) {
      mm='0'+mm
  } 

  today = mm+'/'+dd+'/'+yyyy+'-'+h+':'+m+':'+s;
  return today;
}
// FIN REFACTORING