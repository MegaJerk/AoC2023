// If you're gonna play around with this, do it in the dev console on
// adventofcode's website, otherwise you'll be sent (rightfully) to Error Hell

// OBJECTIVE: Each line of text from the input contains *some* qty of numbers.
// Get the first and last number for every row of text to create a 2 digit number.
// OUTPUT: The TOTAL of every two digit number from every row of text.

// Get the inputs from the day's problem
var aocInput = await fetch("https://adventofcode.com/2023/day/2/input");

// Get text from said fetch request
var gameData = await aocInput.text();

// Split up the text blob into individual lines of text
var gameDataRows = gameData.trim().split("\n");

// 12 red cubes, 13 green cubes, and 14 blue cubes
function getWinningGames(gameDataRows){
	var winningGameIDs = [];
	var gameIDsTotal = 0;
	var winCondition = {"red": 12, "green": 13, "blue": 14};

	gameDataRows.forEach(function(gameDataRow){

		var rowData = gameDataRow.split(/\:|\;/g);
		var gameID = "";

		console.log(`rowData: ${rowData}`);

		for (var i = 0; i < rowData.length; i += 1) {
			let data = rowData[i];
			if (i === 0) {
				gameID = data.match(/\d+/g)[0];
			} else {
				let dicePool = data.split(",");
				for (var c = 0; c < dicePool.length; c += 1) {
					let die = dicePool[c];
					let dieColor = die.match(/[a-zA-Z]+/g)[0];
					let dieQty = parseInt(die.match(/[0-9]+/g)[0], 10);

					if (dieQty > winCondition[dieColor]) {
						console.log(`Game: ${gameID}, Status: FAIL`);
						return;

					}
				}
			}
		}

		winningGameIDs.push(gameID);
		gameIDsTotal += parseInt(gameID, 10);
	});

	return {"winningGameIDs": winningGameIDs, "gameIDsTotal": gameIDsTotal};
}

function getGamePowers(gameDataRows){
	var gamePowers = [];
	var powersTotal = 0;

	gameDataRows.forEach(function(gameDataRow){

		var rowData = gameDataRow.split(/\:|\;/g);
		var colorCount = {"red": 0, "green": 0, "blue": 0};
		var rowPower = 1;

		console.log(`rowData: ${rowData}`);

		// we don't care about GameID with this one, so we'll
		// just skip the first index of each Game
		for (var i = 1; i < rowData.length; i += 1) {
			let data = rowData[i];
			let dicePool = data.split(",");

			for (var c = 0; c < dicePool.length; c += 1) {
				let die = dicePool[c];
				let dieColor = die.match(/[a-zA-Z]+/g)[0];
				let dieQty = parseInt(die.match(/[0-9]+/g)[0], 10);

				if (dieQty > colorCount[dieColor]) {
					colorCount[dieColor] = dieQty;
				}
			}
		}

		Object.keys(colorCount).forEach(function(key){
			rowPower *= colorCount[key]
		});

		gamePowers.push(rowPower);
		powersTotal += rowPower;

		console.log(`colorCount: ${JSON.stringify(colorCount)}`);
	});

	return {"gamePowers": gamePowers, "powersTotal": powersTotal};
}

var test1 = getWinningGames(gameDataRows);
// gameIDsTotal: 2727

var test2 = getGamePowers(gameDataRows);
// powersTotal: 56580