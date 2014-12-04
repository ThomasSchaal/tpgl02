Librairie de conversion d’un vCard en CSV 

Conseil d’utilisation : 
Prérequis : 
Avoir installer Node.js sur la machine cliente. 
Connaitre le chemin vers le dossier contenant la librairie

Utilisation : 
Ouvrir un invite de commande et se placer dans le dossier contenant la librairie en utilisant la fonction ‘cd’. Exemple H:/ISI1/GL02/Projet 
Taper la commande ‘node “nom_du_script.js”’. Normalement le menu de l’application s’affiche, si ce n’est pas le cas reprenez au point 1
Le menu est donc affiché, choisissez la fonction que vous voulez utiliser. 

N.B. : 
L’application est sensible à la casse. 
Le nom d'un contact est entièrement en majuscule (NOM) et le prénom a juste sa première lettre en majuscule (Prenom). 
Quand un chemin est demandé il faut l’entrer de cette manière : H:/ISI1/GL02/Projet




Ecarts par rapport au cahier des charges donné : 

- Il n'y a pas de base de données de contact dans l'application, l'ensemble des contacts gérés par la librairie est 
	sous la forme d'un fichier CSV. L'application lit le fichier CSV et ajoute, supprime ou modifie un contact.
	
- Le format d'un fichier vCard a été modifié pour conformer à la norme vCard. Le format Backus-Naur spécifié était 
	trop général pour être exploité.

Exemple d'un fichier vCard utilisé dans l'application. 
BEGIN:VCARD
VERSION:3.0
FN:maxime reut
N:reut;maxime;;;
EMAIL;TYPE=INTERNET:maxime.reut@gmail.com
TEL;TYPE=WORK:0602020202
TEL;TYPE=HOME:0452542120
ADR;TYPE=HOME:;;26 chemin de chautard;Troyes;;10000;
ORG:UTT
TITLE:Informatique et systèmes d'information
END:VCARD


- Le format d'un fichier CSV a été modifié pour conformer à la norme CSV. Le format Backus-Naur spécifié était le
	même que pour le fichier vCard, il y avait donc des incompatibilités. 

Exemple d'un fichier CSV correspondant à la norme
nom;prenom;organisation;fonction;adresse;mobile;fix;email
BERNARD;Nathan;UTT;Enseignant;10001 Troyes;06 01 01 01 01;04 93 01 01 02;bernard.nathan@utt.fr
PETIT;Mathis;UTT;Enseignant;10003 Troyes;06 01 01 01 03;04 93 01 01 04;petit.mathis@utt.fr
ROBERT;Louise;UTT;Enseignant;10004 Troyes;06 01 01 01 04;04 93 01 01 05;robert.louise@utt.fr 

- La SPEC_7 Recherche d'un contact et la SPEC_8 Affichage d'un contact ont fusionnées. 
	L'application demande d'entrer un nom et un prenom de contact et l'affiche dans la même fonction. 



