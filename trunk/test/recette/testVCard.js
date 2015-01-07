QUnit.module("Test Unitaire");

QUnit.test("Créer une fiche de contact", function(assert){

	// Pas encore fait...
	var p = "POI Created";
	p.addRating(2);
	
	assert.ok(p, "POI created");
	assert.equal(p.name, "Café d'Albert", "Name recorded");
	assert.deepEqual(p.ratings, [0,3,3,2], "Empty ratings should equal [0,3,3,2]");
	assert.equal(p.averageRatings(), 2, "Average rating should equal 2");
	
});
 /*
QUnit.module("Program Syntatic parsing");
QUnit.test("Name", function(assert){
	var inpt = ["name", "Café d'Albert"];
	assert.equal(name(inpt), "Café d'Albert", "Name matched and returned");
});
QUnit.test("Coordinates", function(assert){
	var input = ["latlng", "48.866205;2.399279"];
	assert.deepEqual(latlng(input), { lat: "48.866205" , lng: "2.399279" }, "Coordinates matched and returned");
});
QUnit.test("Ratings", function(assert){
	assert.ok(true, "Dummy test");
});*/