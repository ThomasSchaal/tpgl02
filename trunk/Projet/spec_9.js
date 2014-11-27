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
