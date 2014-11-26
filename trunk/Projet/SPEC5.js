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
                for (countPersonne = 0; countPersonne < 7; countPersonne++) {
                    if (personne === null) {
                        personne = (tabUtilisateur[j][countBegin] + ";");
                    }
                    else {
                        personne += (tabUtilisateur[j][countBegin] + ";");
                    }

                }
                personne += (tabUtilisateur[j][7] + "\n");
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
        console.log(begin + end);
        fs.writeFile("test.csv", begin + end);
        console.log("suppression réussie");
        fs.exists("archive.csv", function(exists) {
            if (exists) {
                fs.readFile("archive.csv", function(err, data) {
                    if (err)
                        throw err;
                    fs.writeFile("archive.csv", data + personne);
                    console.log(personne + " ajouté à l'archive");
                    menu();
                });
            }
            else{
                fs.writeFile("archive.csv");
                fs.readFile("archive.csv", function(err, data) {
                    if (err)
                        throw err;
                    fs.writeFile("archive.csv", data + personne);
                    console.log(personne + " ajouté à l'archive");
                    menu();
                });
            }
        });        
    });
}
