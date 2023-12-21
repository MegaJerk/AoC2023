// If you're gonna play around with this, do it in the dev console on
// adventofcode's website, otherwise you'll be sent (rightfully) to Error Hell

// OBJECTIVE: https://adventofcode.com/2023/day/3

// Get the inputs from the day's problem
var aocInput = await fetch("https://adventofcode.com/2023/day/3/input");

// Get text from said fetch request
var schematicData = await aocInput.text();

// Split up the text blob into individual lines of text
var schematicDataRows = schematicData.trim().split("\n");

function getPartNumbers(schematicDataRows) {
	// each row of data contains 140 characters
	// there are 140 rows of potential part numbers.

	// Go through each row, split the numbers out with regex
	// which will give us the index and value, then create
	// a searchStart and End range, which we can use to slice
	// across the current row, row above, and row below.

	// If a symbol is found in any of those rows, then the
	// part number is valid.

	var partNumbers = [];
	var partNumbersTotal = 0;

	function isValidPartNumber(start, end, schematicDataRows, currentRowIndex) {
		var rowsToCheck = [
			schematicDataRows[currentRowIndex],
			schematicDataRows[currentRowIndex - 1],
			schematicDataRows[currentRowIndex + 1]
		];

		for (var i = 0; i < rowsToCheck.length; i += 1) {
			if (rowsToCheck[i]) {
				if (rowsToCheck[i].substring(start, end).match(/[^0-9\.]/g) !== null) {
					return true;
				}
			}
		}

		return false;
	}

	schematicDataRows.forEach(function(schematicDataRow, index) {
		var rowNumbers = [...schematicDataRow.matchAll(/[0-9]+/g)];
		
		for (var i = 0; i < rowNumbers.length; i += 1) {
			let rowNumber = rowNumbers[i][0];
			let rowNumberIndex = rowNumbers[i].index;
			let searchStart = rowNumberIndex - 1;
			let searchEnd = rowNumberIndex + rowNumber.length + 1;

			if (isValidPartNumber(searchStart, searchEnd, schematicDataRows, index)) {
				partNumbers.push(rowNumber);
				partNumbersTotal += parseInt(rowNumber, 10);
			}
		}
	});

	return {"partNumbersTotal": partNumbersTotal, "partNumbers": partNumbers};
}

function getGearRatios(schematicDataRows) {
	var gearRatios = [];
	var gearRatiosTotal = 0;

	// Go through each row of data
	schematicDataRows.forEach(function(schematicDataRow, index) {

		// Get all of the "gears" (literally "*")
		var rowGears = [...schematicDataRow.matchAll(/[\*]+/g)];
		
		// Go through each gear to test it
		for (var i = 0; i < rowGears.length; i += 1) {
			//let rowGear = rowGears[i][0];
			let rowGearIndex = rowGears[i].index;
			let searchStart = rowGearIndex - 1;
			let searchEnd = rowGearIndex + 1;

			// test the gear!
			let gearData = getGearData(searchStart, searchEnd, schematicDataRows, index);

			// if the gear is valid then...
			if (gearData.isValid) {
				// we multiply the part numbers to get the ratio
				// and add the ratio to previous ratios
				let gearRatio = gearData.part1 * gearData.part2;
				gearRatios.push(gearRatio);
				gearRatiosTotal += gearRatio;
			}
		}
		
	});

	function getGearData (start, end, schematicDataRows, currentRowIndex) {

		// Need to check the row the gear was found in, and the rows above and below
		var rowsToCheck = [
			schematicDataRows[currentRowIndex],
			schematicDataRows[currentRowIndex - 1],
			schematicDataRows[currentRowIndex + 1]
		];

		// make our default return object
		var gearData = {
			"isValid": false,
			"part1": 0,
			"part2": 0
		};

		// I'm going to create a regex that is so toxic...
		var partFinder = new RegExp(`[0-9]*(?<=^.{${start}})(?=[0-9])[0-9]*|[0-9]*(?<=^.{${end}})(?=[0-9])[0-9]*`, "g");

		// For each row...
		for (var i = 0; i < rowsToCheck.length; i += 1) {

			// If the row contains data...
			if (rowsToCheck[i]) {

				// Find any part number that falls within the range of where our gear is
				let foundParts = [...rowsToCheck[i].matchAll(partFinder)];

				// If you find a part number then...
				if (foundParts.length > 0) {

					// check to see if you actually found 2 in the same row!
					if (foundParts.length === 2) {
						// push em into the part# prop respectively
						gearData.part1 = parseInt(foundParts[0][0], 10);
						gearData.part2 = parseInt(foundParts[1][0], 10);
					} else if (foundParts.length === 1) {
						// otherwise push it to part1 if part1 is 0
						if (gearData.part1 === 0) {
							gearData.part1 = parseInt(foundParts[0][0], 10);
						} else {
							// or part2 if part1 isn't 0
							gearData.part2 = parseInt(foundParts[0][0], 10);
						}
					}

					// if 2 parts have been found...
					if (gearData.part1 > 0 && gearData.part2 > 0) {
						// set isValid to true and return the object
						gearData.isValid = true;
						return gearData;
					}
				}
			}
		}

		return gearData;
	}

	// return our answer!
	return {"gearRatiosTotal": gearRatiosTotal, "gearRatios": gearRatios};
}


var test1 = getPartNumbers(schematicDataRows);
// partNumbersTotal: 546312


var test2 = getGearRatios(schematicDataRows);
// gearRatiosTotal: 87449461

