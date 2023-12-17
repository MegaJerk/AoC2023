// If you're gonna play around with this, do it in the dev console on
// adventofcode's website, otherwise you'll be sent (rightfully) to Error Hell

// OBJECTIVE: https://adventofcode.com/2023/day/1

// Get the inputs from the day's problem
var aocInput = await fetch("https://adventofcode.com/2023/day/1/input");

// Get text from said fetch request
var calibrationDoc = await aocInput.text();

// Split up the text blob into individual lines of text
var calibrationDocRows = calibrationDoc.trim().split("\n");

function getCalibrationValuesPart1(calDocRows){
	var calibrationValues = [];
	var calibrationValuesTotal = 0;

	calDocRows.forEach(function(calDocRow, index) {
		var rowNumbers = ((calDocRow !== "") ? calDocRow.match(/\d/g) : ["0"]);
		var firstNumber = rowNumbers[0];
		var lastNumber = rowNumbers[rowNumbers.length - 1];
		var calibrationValue = `${firstNumber}${lastNumber}`;
		calibrationValues.push(calibrationValue);
		calibrationValuesTotal += parseInt(calibrationValue, 10);
	});

	return {"calibrationValues": calibrationValues, "calibrationValuesTotal": calibrationValuesTotal};
}

function getCalibrationValuesPart2(calDocRows){
	var calibrationValues = [];
	var calibrationValuesTotal = 0;
	var numStrObject = {
		"one": "1",
		"two": "2",
		"three": "3",
		"four": "4",
		"five": "5",
		"six": "6",
		"seven": "7",
		"eight": "8",
		"nine": "9"
	};

	function extractValue(expReturn){
		if (expReturn[0]) {
			return expReturn[0];
		} else {
			return numStrObject[expReturn[1]];
		}
	}

	// maybe the most insane way to do this but ¯\_(ツ)_/¯
	var regexp = /(?=(?:(one|two|three|four|five|six|seven|eight|nine)))|\d/g;

	calDocRows.forEach(function(calDocRow, index) {
		var rowNumbers = ((calDocRow !== "") ? [...calDocRow.matchAll(regexp)] : [["0"]]);
		var firstNumber = extractValue(rowNumbers[0]);
		var lastNumber = extractValue(rowNumbers[rowNumbers.length - 1]);
		var calibrationValue = `${firstNumber}${lastNumber}`;
		calibrationValues.push(calibrationValue);
		calibrationValuesTotal += parseInt(calibrationValue, 10);
	});

	return {"calibrationValues": calibrationValues, "calibrationValuesTotal": calibrationValuesTotal};
}

var test1 = getCalibrationValuesPart1(calibrationDocRows);
// calibrationValuesTotal: 56108
var test2 = getCalibrationValuesPart2(calibrationDocRows);
// calibrationValuesTotal: 55652