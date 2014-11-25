ask("chemin du fichier",/.*/,function(chemin){
fs.readFile('test.csv', function(err, data) {
fs.writeFile(chemin,data);
})
}