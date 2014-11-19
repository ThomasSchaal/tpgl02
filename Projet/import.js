//Maxime
var delimiteur = ";";
var EOL = "\n";
console.log(“va te faire foutre, enculé”);
function ajoutCSV(contact) {
    if (!file_exists("test.csv")) {
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
        fileSystem.CreateTextFile("test.txt", false);
    }
    var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
    var monfichier = fileSystem.OpenTextFile("test.csv", 2, true);
    monfichier.WriteLine(contact.getPersonne().getNomPersonne() + delimiteur + contact.getPersonne().getPrenomPersonne() + delimiteur + contact.getOrganisation() + delimiteur + contact.getFonction() + delimiteur + contact.getAdresse() + delimiteur + contact.getCoordonnees().getMobile() + delimiteur + contact.getCoordonnees().getFixe() + delimiteur + contact.getCoordonnees().getEmail() + EOL);
    monFichier.Close();
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
