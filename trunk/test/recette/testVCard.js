QUnit.module("Program Semantic test");

QUnit.test("Créer une fiche de contact", function(assert){

	// Pas encore fait...
	var p = new POI("Café d'Albert", 48.857735, 2.394987, [0,3,3]);
	p.addRating(2);
	
	assert.ok(p, "POI created");
	assert.equal(p.name, "Café d'Albert", "Name recorded");
	assert.deepEqual(p.ratings, [0,3,3,2], "Empty ratings should equal [0,3,3,2]");
	assert.equal(p.averageRatings(), 2, "Average rating should equal 2");
	
});