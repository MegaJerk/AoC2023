// If you're gonna play around with this, do it in the dev console on
// adventofcode's website, otherwise you'll be sent (rightfully) to Error Hell

// OBJECTIVE: https://adventofcode.com/2023/day/5

// Get the inputs from the day's problem
var aocInput = await fetch("https://adventofcode.com/2023/day/5/input");

// Get text from said fetch request
var almanacData = await aocInput.text();


var almanacDataTable = (function(almanacData) {
	var dataTableContainer = {
		"farmSeeds": [],
		"conversionTables": []
	};

  var almanacDataSections = almanacData.split("\n\n");

	// this will remove the first index (0) from the almanacDataSections
	// which contains our seed values.
	dataTableContainer.farmSeeds = almanacDataSections.shift().match(/\d+/g);


	// For every entry left in tthe almanacDataSections array...
	almanacDataSections.forEach(function(almanacDataSection, index){
		// 	conversionTables: [ *container level*
		//		{index}[ *row level*
		//			[*destination*], [*source*], [*range*]
		//		]
		//	]
		// this is the row level right below, with the conversion parts inside
		dataTableContainer.conversionTables[index] = [[],[],[]];
		var sectionRows = almanacDataSection.split("\n");

		// Initialize i at 1 instead of 0 because we need to skip the first
		// index (which is just the name of the conversion chart)
		for(var i = 1; i < sectionRows.length; i += 1) {
			let conversionParts = sectionRows[i].split(" ");
			dataTableContainer.conversionTables[index][0].push(conversionParts[0]);
			dataTableContainer.conversionTables[index][1].push(conversionParts[1]);
			dataTableContainer.conversionTables[index][2].push(conversionParts[2]);			
		}
	});
	return dataTableContainer;
}(almanacData));


function getLowestLocation (farmSeeds, conversionTables){
	
	var seedLocations = [];

	// let's hope the lowest location is lower than this!
	var lowestSeedLocation = Number.MAX_SAFE_INTEGER;

	// with each seed, go through every conversion table to arive at the final location
	farmSeeds.forEach(function(seed, index){

		var seedDestinationValue = parseInt(seed, 10);

		// because we're working with string data, we need to convert
		// all of our values to actual numbers if we wanna do math with em.

		conversionTables.forEach(function(conversionTable){
			// table: [(destination values), (source values), (range)]
			seedDestinationValue = getDestinationFromSource(seedDestinationValue, conversionTable);
		});

		seedLocations.push(seedDestinationValue);
		if (seedDestinationValue < lowestSeedLocation) {
			lowestSeedLocation = seedDestinationValue;
		}

	});

	function getDestinationFromSource (seedValue, conversionTable){

		for (var i = 0; i < conversionTable[1].length; i += 1) {
			let destinationValue = parseInt(conversionTable[0][i], 10);
			let sourceValue = parseInt(conversionTable[1][i], 10);
			let rangeValue = parseInt(conversionTable[2][i], 10);

			if (seedValue >= sourceValue && seedValue <= sourceValue + (rangeValue -1)) {
				// basic formula is
				// destination = (seedValue - sourceValue) + destinationValue;
				return (seedValue - sourceValue) + destinationValue;
			}
		}

		return seedValue;
	}

	return {"lowestSeedLocation": lowestSeedLocation, "seedLocations": seedLocations};
}

function convertSeedRanges (farmSeeds) {
	var newSeeds = [];
	farmSeeds = farmSeeds.map(function(farmSeed){return parseInt(farmSeed, 10);});
	for (var s = 0; s < farmSeeds.length; s += 2) {
		let seedValue = farmSeeds[s];
		for (var range = 0; range < farmSeeds[s + 1]; range += 1) {
			newSeeds.push(seedValue + range);
		}
	}
	return newSeeds;
}


var test1 = getLowestLocation(almanacDataTable.farmSeeds, almanacDataTable.conversionTables);
// lowestSeedLocation: 424490994


function getLowestLocationFromRange (farmSeeds, conversionTables){	
	
	// let's hope the lowest location is lower than this!
	var lowestSeedLocation = Number.MAX_SAFE_INTEGER;

	farmSeeds = farmSeeds.map(function(farmSeed){return parseInt(farmSeed, 10)});

	// values from farmSeeds are actually pairs of instrutions
	// the first value is the starting seed number, the next value is the length
	// of the range of seeds starting from the original seed number.

	// now we start at index 0 and hop to index 2 for the next base seed value
	for (var s = 0; s < farmSeeds.length; s += 2) {
		let seedValue = farmSeeds[s];
		for (var range = 0; range < farmSeeds[s + 1]; range += 1) {

			let seedDestinationValue = seedValue + range;
			console.log(`
			seedDestinationValue: ${seedDestinationValue},
			range: ${range},
			rangeLeft: ${farmSeeds[s + 1] - range}
			`)
			conversionTables.forEach(function(conversionTable){
				// table: [(destination values), (source values), (range)]
				seedDestinationValue = getDestinationFromSource(seedDestinationValue, conversionTable);
			});

			if (seedDestinationValue < lowestSeedLocation) {
				lowestSeedLocation = seedDestinationValue;
			}
		}
	}

	function getDestinationFromSource (seedValue, conversionTable){

		for (var i = 0; i < conversionTable[1].length; i += 1) {
			let destinationValue = parseInt(conversionTable[0][i], 10);
			let sourceValue = parseInt(conversionTable[1][i], 10);
			let rangeValue = parseInt(conversionTable[2][i], 10);

			if (seedValue >= sourceValue && seedValue <= sourceValue + (rangeValue -1)) {
				// basic formula is
				// destination = (seedValue - sourceValue) + destinationValue;
				return (seedValue - sourceValue) + destinationValue;
			}
		}

		return seedValue;
	}

	return {"lowestSeedLocation": lowestSeedLocation};
}




var test2 = getLowestLocationFromRange(almanacDataTable.farmSeeds, almanacDataTable.conversionTables);


