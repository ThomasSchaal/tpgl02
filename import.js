/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var csv = process.argv.slice(1);

var delimiter = ";";
var EOL = "\n";

//Cr�ation du contact
var contact = [personne,organisation,fonction,adresse,coordonnees];
var organisation;

//Cr�ation de la variable de l'adresse
var adresse = [rue,ville];

//Cr�ation des variables de ville
var ville = [codePostal,nomVille,cedex];
var codePostal;
var nomVille;
var cedex;

//Cr�ation des variables de rue
var rue = [numRue,nomRue];
var numRue;
var nomRue;

//Cr�ation des variables de personne
var personne = [nomPersonne,prenomPersonne,surnom];
var nomPersonne;
var prenomPersonne;
var surnom;

//Cr�ation des variables de fonction
var fonction = [poste,niveauHierarchique];
var poste;
var niveauHierarchique;

//Cr�ation des variables de coordonn�es
var coordonnees = [mobile,telephone,fax,email];
var mobile;
var telephone;
var fax;
var email;