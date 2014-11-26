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
