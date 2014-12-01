function compterNombreLigne(){
    var compteur = 0;
     fs.readFile('test.csv', function(err, data) {
        if (err)
            throw err;
        var tab1 = data.toString().split("\n");
        for (i in tab1) {
            
            compteur++;
        }
        console.log("Le fichier CSV contient "+compteur+" contact(s).");
    });  
}
