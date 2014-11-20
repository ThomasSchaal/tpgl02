//Maxime
var delimiteur = ";";
var EOL = "\n";
menu();

function menu() {
    console.log("1: Importer la liste des contacts au format vCard");
    console.log("2: Creer, modifier ou supprimer un ficher de contact");
    console.log("3: Exporter les contacts dans un format adéquat  aux logiciels de bureautiques");
    console.log("4: Gestion des doublons"); // Cette fonction devrait être automatique non ? 
    console.log("5: Archivager une fiche contact");
    console.log("6: Transferer une fiche archivée");
    console.log("7:  Rechercher un contact");
    console.log("8: Afficher une fiche contact");
    console.log("9: Tracer les modifications effectuées sur un contact");
    console.log("10: Afficher de statistiques générales");
    var choix = window.print();

    switch (choix) {
        case 1 : // Importer la liste des contacts au format vCard
            ouvrirFichierVcf();
            // si ok 
            verifierFichierVcf();
            // si retourne ok 
            parserFichierVcf();
            // si ok
            remplirCsv();
            break;
        case 8 :
            var nom = print();
            var prenom = print();
            csvGetLine(nom,prenom);
            break;
        case 3 :
            break;
    }

    function ajoutCSV(contact) {
        if (!file_exists("test.csv")) {
            var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
            fileSystem.CreateTextFile("test.txt", false);
        }
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
        var monfichier = fileSystem.OpenTextFile("test.csv", 2, true);
        monfichier.WriteLine(contact.getPersonne().getNomPersonne() + delimiteur + contact.getPersonne().getPrenomPersonne() + delimiteur + contact.getOrganisation() + delimiteur + contact.getFonction() + delimiteur + contact.getAdresse() + delimiteur + contact.getCoordonnees().getMobile() + delimiteur + contact.getCoordonnees().getFixe() + delimiteur + contact.getCoordonnees().getEmail() + EOL);
        monfichier.Close();
    }

    function afficherContact(nom, prenom) {
        var line = csvGetLine(nom, prenom);
        console.log("nom :" + line[0]);
        console.log("prenom :" + line[1]);
        console.log("organisation :" + line[2]);
        console.log("fonction :" + line[3]);
        console.log("adresse :" + line[4]);
        console.log("mobile :" + line[5]);
        console.log("fixe :" + line[6]);
        console.log("email :" + line[7]);
    }

    function csvGetLine(nom, prenom) {
        var test = 0;
        var caractere = null;
        var infoContact;
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
        var monfichier = fileSystem.OpenTextFile("test.csv", 2, true);
        var contenu = monfichier.readAll();
        while (test < contenu.length) {
            var countInfo = 0;
            while (contenu.indexOf(test) !== EOL) {
                while (contenu.indexOf(test) !== delimiteur || contenu.indexOf(test) !== EOL) {
                    caractere += contenu.indexOf(test);
                    test++;
                }
                infoContact[countInfo] += caractere;
                caractere = null;
                countInfo++;
                test++;
            }
            if (infoContact[0] === nom && infoContact[1] === prenom) {
                break;
            }
        }
        if(infoContact === null){
            console.log("personne non trouvée");
        }
        else{
            return infoContact;
        }
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

// Thomas 
    function lireFichierVCard() {
        var url_vcf_file = "./thomas_schaal.vcf";

    }
}
