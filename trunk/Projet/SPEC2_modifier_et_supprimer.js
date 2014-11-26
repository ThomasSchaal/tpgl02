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
        ask("choisissez le nom",/[A-Z]+/, function(nomModif) {
            ask("choisissez votre prenom", /\b[A-Z][a-z]+/, function(prenomModif) {
                ask("choisissez votre organisation", /^[a-zA-Z0-9]+$/, function(orgModif) {
                    ask("choisissez votre fonction", /\b[A-Z][a-z]+/, function(fonctionModif) {
                        ask("choisissez votre adresse", /^[a-zA-Z0-9]+$/, function(adresseModif) {
                            ask("choisissez votre mobile", /^[0-9]+$/, function(mobileModif) {
                                ask("choisissez votre fixe", /^[0-9]+$/, function(fixeModif) {
                                    ask("choisissez votre email",/.*/, function(emailModif) {
                                        personne = (nomModif+";"+prenomModif+";"+orgModif+";"+fonctionModif+";"+adresseModif+";"+mobileModif+";"+fixeModif+"\n");
                                        fs.writeFile("test2.csv", begin + personne + end);
                                        console.log(personne + " a été ajoutée");
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
        
        fs.writeFile("test2.csv", begin + end);
        console.log("suppression réussie");
        menu();
    });
}