// If you're gonna play around with this, do it in the dev console on
// adventofcode's website, otherwise you'll be sent (rightfully) to Error Hell

// OBJECTIVE: https://adventofcode.com/2023/day/4

// Get the inputs from the day's problem
var aocInput = await fetch("https://adventofcode.com/2023/day/4/input");

// Get text from said fetch request
var ticketData = await aocInput.text();

// Split up the text blob into individual lines of text
var ticketDataRows = ticketData.trim().split("\n");

function getTicketValues(ticketDataRows){

	var ticketValues = [];
	var ticketValuesTotal = 0;
	

	ticketDataRows.forEach(function(ticketDataRow, index){

		var ticketValue = 0;
		var ticketDataRow = ticketDataRow.split(/\:|\|/g);
		var winningNumbers = ticketDataRow[1].trim().split(/\s+/);
		var playerNumbers = ticketDataRow[2].trim().split(/\s+/);
		
		playerNumbers.forEach(function(matchingNumber){
			if (winningNumbers.includes(matchingNumber)) {
				ticketValue = ticketValue * 2 || 1;
			}
		});

		if (ticketValue > 0) {
			ticketValues.push(ticketValue);
			ticketValuesTotal += ticketValue;
		}
	});

	return {"ticketValuesTotal": ticketValuesTotal, "ticketValues": ticketValues};
}

function getTicketsCount(ticketDataRows) {	

	var ticketWins = [];
	var ticketCount = [];
	var ticketCountTotal = 0;
	var lastTicketIndex = ticketDataRows.length - 1;

	ticketDataRows.forEach(function(ticketDataRow, ticketIndex){			

		var ticketDataRow = ticketDataRow.split(/\:|\|/g);
		var winningNumbers = ticketDataRow[1].trim().split(/\s+/);
		var playerNumbers = ticketDataRow[2].trim().split(/\s+/);

		// If the current ticket doesn't have a 'Win' in the ticketWins array
		// at the index of [ticketIndex] then we'll need to set a value of 0 now
		if (ticketWins[ticketIndex] === undefined) {
			ticketWins[ticketIndex] = 0;
		}

		// likewise, if there's no value for the ticketCount, we'll need to
		// do the same thing there
		if (ticketCount[ticketIndex] === undefined) {
			ticketCount[ticketIndex] = 0;
		}
		
		// See how many wins the ticket has
		playerNumbers.forEach(function(matchingNumber){
			if (winningNumbers.includes(matchingNumber)) {
				ticketWins[ticketIndex] += 1;
			}
		});

		// for each win...
		for (var i = 1; i <= ticketWins[ticketIndex]; i += 1) {

			// make sure there even *is* a next ticket
			let upcomingIndex = ticketIndex + i;
			if (upcomingIndex <= lastTicketIndex) {
				// if there is, add the sum of the current ticket's copies + 1 to the next ticket's ticketCount index
				ticketCount[upcomingIndex] = (ticketCount[upcomingIndex] + ticketCount[ticketIndex] + 1) || ticketCount[ticketIndex] + 1;
			}
		}		

		// add this ticket's ticketCount to the total ticket count!
		ticketCountTotal += (ticketCount[ticketIndex] + 1);		
	});

	return {"ticketCountTotal": ticketCountTotal, "ticketWins": ticketWins};
}

var test1 = getTicketValues(ticketDataRows);
// "ticketValuesTotal": 24160
var test2 = getTicketsCount(ticketDataRows);
// "ticketCountTotal": 5659035