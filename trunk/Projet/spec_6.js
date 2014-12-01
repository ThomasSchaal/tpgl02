
function choixFicheArchivee() {
    fs.readFile('archive.csv', function(err, data) {
        if (err)
            throw err;
        var tab1 = data.toString().split("\n");
        for (i in tab1) {
            console.log(tab1[i]);
        }
        console.log('longueur array=' + tab1.length);
        ask("choisissez le nom", /[A-Za-z]/, function(nom) {
            ask("choisissez le prenom", /[A-Za-z]/, function(prenom) {
                transfertFicheArchivee(nom, prenom);
                menu();
            });
        });
    });


}




function transfertFicheArchivee(nom, prenom) {
    var compteur = 0;
    var numPersonne = 0;
    fs.readFile('archive.csv', function(err, data) {
        if (err)
            throw err;
        var tab1 = data.toString().split("\n");
        console.log(tab1);
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
                //console.log("ok");
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
                var adresse = new Array();
                adresse = tabUtilisateur[j][4].toString().split(" ");
                var rue="";
                var ville;
                var cp;

                for (h = 0; h < adresse.length; h++) {
                    if (h < adresse.length - 2) {

                        rue += adresse[h]+" ";
                    }
                    else if (h === adresse.length - 1) {
                        ville = adresse[h];
                    }
                    else if (h === adresse.length - 2) {
                        cp = adresse[h];
                    }
                }
               rue=rue.trim();
                var Vcard = 'BEGIN:VCARD\nVERSION:3.0\nFN:' + tabUtilisateur[j][1] + ' ' + tabUtilisateur[j][0] + '\nN:' + tabUtilisateur[j][0] + ';' + tabUtilisateur[j][1] + ';;;\nEMAIL;TYPE=INTERNET;TYPE=HOME:' + tabUtilisateur[j][7] + '\nTEL;TYPE=WORK: ' + tabUtilisateur[j][5] + '\nTEL;TYPE=HOME: ' + tabUtilisateur[j][6] + '\nADR;TYPE=HOME:;;' + rue + ';' + ville + ';;' + cp + ';' + '\nORG:UTT\nTITLE:' + tabUtilisateur[j][3] + '\nEND:VCARD\n\n';
                console.log(Vcard);
                var chemin = tabUtilisateur[j][1] + "_" + tabUtilisateur[j][0] + ".vcf";
                fs.writeFile(chemin, Vcard);
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
            for (k = 0; k < 8; k++) {
                console.log(tabUtilisateur[0][k] + " : " + tabUtilisateur[numPersonne][k] + ' ');
            }
            if (personne !== null) {
                personne = personne.trim();
                personne = personne + "\n";
                console.log('personne: ' + personne);
                fs.writeFile("archive.csv", begin + end);
                console.log("suppression reussie");

                fs.readFile("test.csv", function(err, data) {
                    if (err)
                        throw err;
                    fs.writeFile("test.csv", data + personne);
                    console.log(personne + " import dans la base");
                    fs.exists("modification.txt", function(exists) {
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
        } else {
            console.log("Le client n'existe pas");
            menu();
        }
    });
}

