Librairie de conversion d�un vCard en CSV 

Conseil d�utilisation : 
Pr�requis : 
Avoir installer Node.js sur la machine cliente. 
Connaitre le chemin vers le dossier contenant la librairie

Utilisation : 
Ouvrir un invite de commande et se placer dans le dossier contenant la librairie en utilisant la fonction �cd�. Exemple H:/ISI1/GL02/Projet 
Taper la commande �node �nom_du_script.js��. Normalement le menu de l�application s�affiche, si ce n�est pas le cas reprenez au point 1
Le menu est donc affich�, choisissez la fonction que vous voulez utiliser. 

N.B. : 
L�application est sensible � la casse. 
Le nom d'un contact est enti�rement en majuscule (NOM) et le pr�nom a juste sa premi�re lettre en majuscule (Prenom). 
Quand un chemin est demand� il faut l�entrer de cette mani�re : H:/ISI1/GL02/Projet




Ecarts par rapport au cahier des charges donn� : 

- Il n'y a pas de base de donn�es de contact dans l'application, l'ensemble des contacts g�r�s par la librairie est 
	sous la forme d'un fichier CSV. L'application lit le fichier CSV et ajoute, supprime ou modifie un contact.
	
- Le format d'un fichier vCard a �t� modifi� pour conformer � la norme vCard. Le format Backus-Naur sp�cifi� �tait 
	trop g�n�ral pour �tre exploit�.

Exemple d'un fichier vCard utilis� dans l'application. 
BEGIN:VCARD
VERSION:3.0
FN:maxime reut
N:reut;maxime;;;
EMAIL;TYPE=INTERNET:maxime.reut@gmail.com
TEL;TYPE=WORK:0602020202
TEL;TYPE=HOME:0452542120
ADR;TYPE=HOME:;;26 chemin de chautard;Troyes;;10000;
ORG:UTT
TITLE:Informatique et syst�mes d'information
END:VCARD


- Le format d'un fichier CSV a �t� modifi� pour conformer � la norme CSV. Le format Backus-Naur sp�cifi� �tait le
	m�me que pour le fichier vCard, il y avait donc des incompatibilit�s. 

Exemple d'un fichier CSV correspondant � la norme
nom;prenom;organisation;fonction;adresse;mobile;fix;email
BERNARD;Nathan;UTT;Enseignant;10001 Troyes;06 01 01 01 01;04 93 01 01 02;bernard.nathan@utt.fr
PETIT;Mathis;UTT;Enseignant;10003 Troyes;06 01 01 01 03;04 93 01 01 04;petit.mathis@utt.fr
ROBERT;Louise;UTT;Enseignant;10004 Troyes;06 01 01 01 04;04 93 01 01 05;robert.louise@utt.fr 

- La SPEC_7 Recherche d'un contact et la SPEC_8 Affichage d'un contact ont fusionn�es. 
	L'application demande d'entrer un nom et un prenom de contact et l'affiche dans la m�me fonction. 



