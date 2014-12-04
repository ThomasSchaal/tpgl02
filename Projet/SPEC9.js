var util = require("util");
var fs = require("fs");
var delimiteur = ";";
var EOL = "\n";
menu();
function menu() {
    console.log("1: Importer la liste des contacts au format vCard");
    console.log("2: Creer, modifier ou supprimer un ficher de contact");
    console.log("3: Exporter les contacts dans un format adéquat aux logiciels de bureautiques");
    console.log("4: Gestion des doublons"); // Cette fonction devrait Ãªtre automatique non ? 
    console.log("5: Archivager une fiche contact");
    console.log("6: Transferer une fiche archivée");
    console.log("7:  Rechercher et afficher un contact");
    console.log("8: Tracer les modifications effectuées sur un contact");
    console.log("9: Afficher de statistiques générales\n");
    ask("choisissez votre fonction", /^[0-9]+$/, function(line) {
        switch (line.trim()) {
            case '1' : // Importer la liste des contacts au format vCard
                console.log('Vous voulez importer les contacts.');
                importVcard();
                break;
                break;
            case '2' :
                ask("Creer (1), modifier (2) ou supprimer (3) ?", /^[0-9]+$/, function(choix) {
                    switch (choix) {
                        case '1':
                            creerContact();
                            break;
                        case '2':
                            ask("choisissez le nom", /[A-Za-z]/, function(nom) {
                                ask("choisissez le prenom", /[A-Za-z]/, function(prenom) {
                                    modifierContact(nom, prenom);
                                });
                            });
                            break;
                        case '3':
                            ask("choisissez le nom", /[A-Za-z]/, function(nom) {
                                ask("choisissez le prenom", /[A-Za-z]/, function(prenom) {
                                    supprimerContact(nom, prenom);
                                });
                            });
                            break;
                    }
                });
                break;

            case '3' :
                ask("Choisisser le chemin du fichier csv :", /.*/, function(chemin) {
                    fs.readFile('test.csv', function(err, data) {
                        fs.writeFile(chemin, data);
                        menu();
                    });
                });
                break;
            case '4' :

                break;
            case '5' :
                ask("choisissez le nom", /[A-Za-z]/, function(nom) {
                    ask("choisissez le prenom", /[A-Za-z]/, function(prenom) {
                        archiverContact(nom, prenom);
                        menu();
                    });
                });
                break;
            case '6' :
                break;
            case '7':
                ask("choisissez le nom", /[A-Za-z]/, function(nom) {
                    ask("choisissez le prenom", /[A-Za-z]/, function(prenom) {
                        csvGetLine(nom, prenom);
                        menu();
                    });
                });
                break;
            case '8' :

                break;
            case 9:
                break;
        }
    });
}

function csvGetLine(nom, prenom) {
    console.log('Vous avez selectionne : ' + nom + ' ' + prenom);
    var compteur = 0;
    var numPersonne = 0;
    fs.readFile('test.csv', function(err, data) {
        if (err)
            throw err;
        var tab1 = data.toString().split("\n");
        for (i in tab1) {
            console.log(tab1[i]);
        }
        console.log('longueur array=' + tab1.length);
        var tabUtilisateur = new Array();
        ;
        var tabstock = new Array();
        for (j = 0; j < tab1.length - 1; j++) {
            tabUtilisateur[j] = new Array();
            tabstock = tab1[j].split(";");
            for (k = 0; k < 8; k++) {
                tabUtilisateur[j][k] = tabstock[k];
            }
        }
        for (j = 0; j < tab1.length - 1; j++) {
            if (tabUtilisateur[j][0] === nom && tabUtilisateur[j][1] === prenom) {
                compteur = compteur + 1;
                numPersonne = j;
            }
        }
        if (compteur === 1) {
            console.log('Le client existe');
        } else {
            console.log("Le client n'existe pas");
        }
        for (k = 0; k < 8; k++) {
            console.log(tabUtilisateur[0][k] + " : " + tabUtilisateur[numPersonne][k] + ' ');
        }

    });

}

function ask(question, format, callback) {
    var stdin = process.stdin, stdout = process.stdout;
    stdin.resume();
    stdout.write(question + ": ");
    stdin.once('data', function(data) {
        data = data.toString().trim();
        if (format.test(data)) {
            callback(data);
        } else {
            stdout.write("Format incorrect, celui ci doit être sous la forme: " + format + "\n");
            ask(question, format, callback);
        }
    });
}
//Classe Contact
function Contact() {
    var personne;
    var organisation; //ex : UTT
    var fonction; //ex : technicien supérieur en aéronautique 
    var adresse; //ex : 6 rue des Lilas
    var coordonnees;
    //Constructeur de contact
    function Contact(personne, organisation, fonction, adresse, coordonnees) {
        this.personne = personne;
        this.organisation = organisation;
        this.fonction = fonction;
        this.adresse = adresse;
        this.coordonnees = coordonnees;
    }
    function getPersonne() {
        return personne;
    }
    function getOrganisation() {
        return organisation;
    }
    function getFonction() {
        return fonction;
    }
    function getAdresse() {
        return adresse;
    }
    function getCoordonnees() {
        return coordonnees;
    }
}

//Classe Personne
function Personne() {
    var nomPersonne; //ex : Reut
    var prenomPersonne; //ex : Maxime
    //Constructeur de Personne
    function Personne(nomPersonne, prenomPersonne) {
        this.nomPersonne = nomPersonne;
        this.prenomPersonne = prenomPersonne;
    }
    function getNomPersonne() {
        return nomPersonne;
    }
    function getPrenomPersonne() {
        return prenomPersonne;
    }
}

//Classe Coordonnées
function Coordonnees() {
    var mobile; //ex : 06 01 02 03 04
    var fixe; //ex : 02 01 02 03 04
    var email; //ex : maxime.reut@utt.fr
//Constructeur de coordonnées
    function Coordonnees(mobile, fixe, email) {
        this.mobile = mobile;
        this.fixe = fixe;
        this.email = email;
    }
    function getMobile() {
        return mobile;
    }
    function getFixe() {
        return fixe;
    }
    function getEmail() {
        return email;
    }
}

function importVcard() {
    ask('chemin du fichier .vcf', /.*/, function(chemin) {
        fs.readFile(chemin, function(err, data) {
            if (err)
                throw err;
            var tab1 = data.toString().split("\n");
            var tabUtilisateur = new Array();
            ;
            var tabstock = new Array();
            for (j = 0; j < tab1.length - 1; j++) {
                tabUtilisateur[j] = new Array();

                tabstock = tab1[j].split(":");
                for (k = 0; k < 2; k++) {
                    tabUtilisateur[j][k] = tabstock[k];
                }
            }
            var nomPrenom = Array();
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
            var coordonnee = nomPrenom[1] + ';' + nomPrenom[0] + ';' + tabUtilisateur[8][1] + ';' + tabUtilisateur[9][1] + ';' + adresse + ';' + mobile + ';' + fix + ';' + tabUtilisateur[4][1];
            var compteur = 0;
            //Correction des doublons.
            fs.readFile('test.csv', function(err, data) {
                if (err)
                    throw err;
                var tab1 = data.toString().split("\n");
                for (i in tab1) {
                    console.log(tab1[i]);
                }
                console.log('longueur array=' + tab1.length);
                var tabUtilisateur = new Array();
                ;
                var tabstock = new Array();
                for (j = 0; j < tab1.length - 1; j++) {
                    tabUtilisateur[j] = new Array();
                    tabstock = tab1[j].split(";");
                    for (k = 0; k < 8; k++) {
                        tabUtilisateur[j][k] = tabstock[k];
                    }
                }
                for (j = 0; j < tab1.length - 1; j++) {
                    if (tabUtilisateur[j][0] === nomPrenom[1] && tabUtilisateur[j][1] === nomPrenom[0]) {
                        compteur = compteur + 1;
                    }
                }
                if (compteur === 1) {
                    console.log('Ajout impossible');
                    menu();
                } else {
                    console.log("Ajout en cours");
                    fs.readFile('test.csv', function(err, data) {
                        var donnee = data + coordonnee + "\n";
                        fs.writeFile('test.csv', donnee);
                        fs.exists("modification.txt", function(exists) {
                            var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                            var modif = "import de : " + nomPrenom[1] + ' ' + nomPrenom[0] + " le " + date + "\n";
                            if (exists) {
                                fs.readFile("modification.txt", function(err, data) {
                                    if (err)
                                        throw err;
                                    fs.writeFile("modification.txt", data + coordonnee);
                                    menu();
                                });
                            }
                            else {
                                var lignedebut = "Historique des modifications\n";
                                fs.writeFile("modification.txt", lignedebut + modif);
                            }
                            menu();
                        });
                    });
                }
            });
        });
    });
}

function modifierContact(nom, prenom) {
    console.log('Vous avez selectionne : ' + nom + ' ' + prenom);
    var compteur = 0;
    var numPersonne = 0;
    fs.readFile('test.csv', function(err, data) {
        if (err)
            throw err;
        var tab1 = data.toString().split("\n");
        for (i in tab1) {
            console.log(tab1[i]);
        }
        console.log('longueur array=' + tab1.length);
        var tabUtilisateur = new Array();
        ;
        var tabstock = new Array();
        for (j = 0; j < tab1.length - 1; j++) {
            tabUtilisateur[j] = new Array();
            tabstock = tab1[j].split(";");
            for (k = 0; k < 8; k++) {
                tabUtilisateur[j][k] = tabstock[k];
            }
        }
        var begin = null;
        var end = null;
        for (j = 0; j < tab1.length - 1; j++) {
            if (tabUtilisateur[j][0] === nom && tabUtilisateur[j][1] === prenom) {
                compteur = compteur + 1;
                numPersonne = j;
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
        } else {
            console.log("Le client n'existe pas");
        }
        for (k = 0; k < 8; k++) {
            console.log(tabUtilisateur[0][k] + " : " + tabUtilisateur[numPersonne][k] + ' ');
        }
        var personne = null;
        ask("choisissez le nom", /[A-Z]+/, function(nomModif) {
            ask("choisissez votre prenom", /\b[A-Z][a-z]+/, function(prenomModif) {
                ask("choisissez votre organisation", /^[a-zA-Z0-9]+$/, function(orgModif) {
                    ask("choisissez votre fonction", /^[a-zA-Z]+$/, function(fonctionModif) {
                        ask("choisissez votre adresse", /^[a-zA-Z0-9\ ]+$/, function(adresseModif) {
                            ask("choisissez votre mobile", /^[0-9\ ]+$/, function(mobileModif) {
                                ask("choisissez votre fixe", /^[0-9\ ]+$/, function(fixeModif) {
                                    ask("choisissez votre email", /^(.+)@/, function(emailModif) {
                                        personne = (nomModif + ";" + prenomModif + ";" + orgModif + ";" + fonctionModif + ";" + adresseModif + ";" + mobileModif + ";" + fixeModif + ";" + emailModif + "\n");
                                        fs.writeFile("test.csv", begin + personne + end);
                                        console.log(personne + " a ete modifiee");
                                        fs.exists("modification.txt", function(exists) {
                                            var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                                            var modif = "modification de : " + tabUtilisateur[numPersonne][0] + ' ' + tabUtilisateur[numPersonne][1] + " le " + date + "\n";
                                            if (exists) {
                                                fs.readFile("modification.txt", function(err, data) {
                                                    if (err)
                                                        throw err;
                                                    fs.writeFile("modification.txt", data + personne);
                                                    menu();
                                                });
                                            }
                                            else {
                                                var lignedebut = "Historique des modifications\n";
                                                fs.writeFile("modification.txt", lignedebut + modif);
                                            }
                                            menu();
                                        });
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

function supprimerContact(nom, prenom) {
    console.log('Vous avez selectionne : ' + nom + ' ' + prenom);
    var compteur = 0;
    var numPersonne = 0;
    fs.readFile('test.csv', function(err, data) {
        if (err)
            throw err;
        var tab1 = data.toString().split("\n");
        for (i in tab1) {
            console.log(tab1[i]);
        }
        console.log('longueur array=' + tab1.length);
        var tabUtilisateur = new Array();
        ;
        var tabstock = new Array();
        for (j = 0; j < tab1.length - 1; j++) {
            tabUtilisateur[j] = new Array();
            tabstock = tab1[j].split(";");
            for (k = 0; k < 8; k++) {
                tabUtilisateur[j][k] = tabstock[k];
            }
        }
        var begin = null;
        var end = null;
        for (j = 0; j < tab1.length - 1; j++) {
            if (tabUtilisateur[j][0] === nom && tabUtilisateur[j][1] === prenom) {
                compteur = compteur + 1;
                numPersonne = j;
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
        } else {
            console.log("Le client n'existe pas");
        }
        for (k = 0; k < 8; k++) {
            console.log(tabUtilisateur[0][k] + " : " + tabUtilisateur[numPersonne][k] + ' ');
        }

        fs.writeFile("test.csv", begin + end);
        console.log("suppression réussie");
        fs.exists("modification.txt", function(exists) {
            var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            var modif = "suppression de : " + nom + ' ' + prenom + " le " + date + "\n";
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
            }
            menu();
        });
    });
}


// Fonction de création d'un contact 
function creerContact() {
    // demander informations, creer personne, coordonee puis contact, ouvrir csv et écrire csv+nouveauContact

    var personne = null;
    ask("choisissez le nom", /[A-Z]+/, function(nom) {
        ask("choisissez votre prenom", /\b[A-Z][a-z]+/, function(prenom) {
            ask("choisissez votre organisation", /^[a-zA-Z0-9]+$/, function(org) {
                ask("choisissez votre fonction", /^[a-zA-Z]+$/, function(fonction) {
                    ask("choisissez votre adresse", /^[a-zA-Z0-9\ ]+$/, function(adresse) {
                        ask("choisissez votre mobile", /^[0-9\ ]+$/, function(mobile) {
                            ask("choisissez votre fixe", /^[0-9\ ]+$/, function(fixe) {
                                ask("choisissez votre email", /^(.+)@/, function(email) {
                                    personne = (nom + ";" + prenom + ";" + org + ";" + fonction + ";" + adresse + ";" + mobile + ";" + fixe + ";" + email + "\n");
                                    var compteur = 0;
                                    //Correction des doublons.
                                    fs.readFile('test.csv', function(err, data) {
                                        if (err)
                                            throw err;
                                        var tab1 = data.toString().split("\n");
                                        for (i in tab1) {
                                            console.log(tab1[i]);
                                        }
                                        console.log('longueur array=' + tab1.length);
                                        var tabUtilisateur = new Array();
                                        ;
                                        var tabstock = new Array();
                                        for (j = 0; j < tab1.length - 1; j++) {
                                            tabUtilisateur[j] = new Array();
                                            tabstock = tab1[j].split(";");
                                            for (k = 0; k < 8; k++) {
                                                tabUtilisateur[j][k] = tabstock[k];
                                            }
                                        }
                                        for (j = 0; j < tab1.length - 1; j++) {
                                            if (tabUtilisateur[j][0] === nom && tabUtilisateur[j][1] === prenom) {
                                                compteur = compteur + 1;
                                            }
                                        }
                                        if (compteur === 1) {
                                            console.log('Ajout impossible car le contact existe deja');
                                            menu();
                                        } else {
                                            console.log("Ajout en cours");
                                            fs.readFile('test.csv', function(err, data) {
                                                var donnee = data + personne + "\n";
                                                fs.writeFile('test.csv', donnee);
                                                console.log(personne + " a ete ajoute");
                                                fs.exists("modification.txt", function(exists) {
                                                    var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                                                    var modif = "création de : " + nom + ' ' + prenom + " le " + date + "\n";
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
                                                    }
                                                    menu();
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
    console.log('Vous avez selectionne : ' + nom + ' ' + prenom);
    var compteur = 0;
    var numPersonne = 0;
    fs.readFile('test.csv', function(err, data) {
        if (err)
            throw err;
        var tab1 = data.toString().split("\n");
        for (i in tab1) {
            console.log(tab1[i]);
        }
        console.log('longueur array=' + tab1.length);
        var tabUtilisateur = new Array();
        var tabstock = new Array();
        for (j = 0; j < tab1.length - 1; j++) {
            tabUtilisateur[j] = new Array();
            tabstock = tab1[j].split(";");
            for (k = 0; k < 8; k++) {
                tabUtilisateur[j][k] = tabstock[k];
            }
        }
        var personne = null;
        var begin = null;
        var end = null;
        for (j = 0; j < tab1.length - 1; j++) {
            if (tabUtilisateur[j][0] === nom && tabUtilisateur[j][1] === prenom) {
                compteur = compteur + 1;
                numPersonne = j;
                for (countPersonne = 0; countPersonne < 8; countPersonne++) {
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
        } else {
            console.log("Le client n'existe pas");
            menu();
        }
        for (k = 0; k < 8; k++) {
            console.log(tabUtilisateur[0][k] + " : " + tabUtilisateur[numPersonne][k] + ' ');
        }
        if (personne !== null) {
            personne = personne.trim();
            personne = personne + "\n";
            console.log('personne: ' + personne);
            fs.writeFile("test.csv", begin + end);
            console.log("suppression reussie");
            fs.exists("archive.csv", function(exists) {
                if (exists) {
                    fs.readFile("archive.csv", function(err, data) {
                        if (err)
                            throw err;
                        fs.writeFile("archive.csv", data + personne);
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
                            }
                            menu();
                        });
                    });
                }
                else {
                    var lignedebut = 'nom;prenom;organisation;fonction;adresse;mobile;fix;email\n';
                    fs.writeFile("archive.csv", lignedebut + personne);
                    console.log(personne + " ajoute à l'archive");
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
                        }
                        menu();
                    });

                }


            });
        }
        menu();
    });

}







