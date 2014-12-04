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
                    });
                }
            });
        });
    });
}