function transfertFicheArchivee(){
    var compteur = 0;
    var numPersonne = 0;
    fs.readFile('archive.csv', function(err, data) {
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
        var adresse=array();;
         adresse = tabUtilisateur[1][4];
         
       var Vcard='BEGIN:VCARD\nVERSION:3.0\nFN:'+tabUtilisateur[1][1]+' '+tabUtilisateur[1][0]+'\nN:'+tabUtilisateur[1][0]+';'+tabUtilisateur[1][1]+';;;\nEMAIL;TYPE=INTERNET;TYPE=HOME:'+tabUtilisateur[1][7]+'\nTEL;TYPE=WORK: '+tabUtilisateur[1][5]+'\nTEL;TYPE=HOME: '+tabUtilisateur[1][6]+'\nADR;TYPE=HOME:;;'+adresse+'\nORG:UTT\nTITLE:'+tabUtilisateur[1][3]+'\nEND:VCARD';
       ask("Choisisser le chemin du fichier .vcf :", /.*/, function(chemin) {
                    
                        fs.writeFile(chemin,Vcard );
                        menu();
                    }); 
                });      
       

    
}