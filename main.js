var data = require('./data');

function forEach (array, callback) {
	for (var i = 0; i < array.length; i++) {
		callback(array[i]);
	}
}

function map (array, callback) {
	var newArray = [];
	for (var i = 0; i < array.length; i++) {
		newArray[i] = callback(array[i]);
	}
	return newArray;
}

function reduce (array, callback) {
	var result = array[0];
	for (var i = 1; i < array.length; i++) {
		result = callback(result, array[i]);
	}
	return result;
}

function filter (array, callback) {
	var newArray = [];
	for (var i = 0; i < array.length; i++) {
		if (callback(array[i])) {
			newArray[newArray.length] = array[i];
			// newArray.push(array[i]);
		}
	}
	return newArray;
}

// Weather-info function:
// Write a function that will take a single location object from the list array and print out a block of weather info

var list = data.list;

function tempConvert (deg) {
	var farenheit = (deg * 9/5) - 459.67;
	return Math.round(farenheit);
};

console.assert(tempConvert(278) === 41);
console.assert(tempConvert(321) === 118);

var cardinal = function (deg) {
	if (deg > 11.25 && deg < 33.75) {
		return 'NNE';
	} else if (deg > 33.75 && deg < 56.25) {
		return 'NE';
	} else if (deg > 56.25 && deg < 78.75) {
		return 'ENE';
	} else if (deg > 78.75 && deg < 101.25) {
		return 'E';
	} else if (deg > 101.25 && deg < 123.75) {
		return 'ESE';
	} else if (deg > 123.75 && deg < 146.25) {
		return 'SE';
	} else if (deg > 146.25 && deg < 168.75) {
		return 'SSE';
	} else if (deg > 168.75 && deg < 191.25) {
		return 'S';
	} else if (deg > 191.25 && deg < 213.75) {
		return 'SSW';
	} else if (deg > 213.75 && deg < 236.25) {
		return 'SW';
	} else if (deg > 236.25 && deg < 258.75) {
		return 'WSW';
	} else if (deg > 258.75 && deg < 281.25) {
		return 'W';
	} else if (deg > 281.25 && deg < 303.75) {
		return 'WNW';
	} else if (deg > 303.75 && deg < 326.25) {
		return 'NW';
	} else if (deg > 326.25 && deg < 348.75) {
		return 'NNW';
	} else {
		return 'N';
	}
};

console.assert(cardinal(65) === 'ENE');
console.assert(cardinal(278) === 'W');

var alphaSort = list;

alphaSort.sort(function (a, b) {
	if (a.name < b.name) {
		return -1;
	}
	if (a.name > b.name) {
		return 1;
	}
	return 0;
});

function filler (str, width, pad) {
	return (width <= str.length) ? str : filler(str + pad, width, pad);
};

function printCity (x) {
	console.log(filler(x.name + ' ', 30, '='));
	console.log('  ' + x.weather[0].description + '.');
	console.log('  Temp: ' + tempConvert(x.main.temp));
	console.log('  Lo: ' + tempConvert(x.main.temp_min) + ', Hi: ' + tempConvert(x.main.temp_max));
	console.log('  Humidity: ' + x.main.humidity + '%');
	console.log('  Wind: ' + x.wind.speed + ' MPH ' + cardinal(x.wind.deg));
	console.log(filler('', 30, '='));
	console.log('');
	console.log('');
};

forEach(list, printCity);



// Averages
// Calculate the average weather description, or the weather description that occurs the most frequently.

var counts = {};

forEach(list, function (x) {
	if (counts[x.weather[0].description]) {
		counts[x.weather[0].description]++;
	} else {
		counts[x.weather[0].description] = 1;
	}
});

var maxWeather;
var maxWeatherCount = 0;

for (var prop in counts) {
	if (counts[prop] > maxWeatherCount) {
		maxWeather = prop;
		maxWeatherCount = counts[prop];
	}
};

// Calculate the average temperature of all locations.

function avgTemp () {
	var temps = map(list, function (c) {
		return c.main.temp;
	});
	var sum = reduce(temps, function (a, b) {
		return a + b;
	});
	return (sum / list.length);
};

// Calculate the average minimum temperature (lo) of all locations.

function avgLoTemp () {
	var temps = map(list, function (c) {
		return c.main.temp_min;
	});
	var sum = reduce(temps, function (a, b) {
		return a + b;
	});
	return (sum / list.length);
};

// Calculate the average maximum temperature (hi) of all locations.

function avgHiTemp () {
	var temps = map(list, function (c) {
		return c.main.temp_max;
	});
	var sum = reduce(temps, function (a, b) {
		return a + b;
	});
	return (sum / list.length);
};

// Calculate the average humidity of all locations.

function avgHumidity () {
	var array = map(list, function (c) {
		return c.main.humidity;
	});
	var sum = reduce(array, function (a, b) {
		return a + b;
	});
	return Math.round(sum / list.length);
};

// Calculate the average wind speed and direction of all locations.

function avgWindSp () {
	var array = map(list, function (c) {
		return c.wind.speed;
	});
	var sum = reduce(array, function (a, b) {
		return a + b;
	});
	return Math.round(100 * (sum / list.length)) / 100;
};

function avgWindDir () {
	var array = map(list, function (c) {
		return c.wind.deg;
	});
	var sum = reduce(array, function (a, b) {
		return a + b;
	});
	return (sum / list.length);
};

// Create an object in the same format as the objects in the list array (with the same properties). Using your pre-existing weather info function from above, log out a new block of weather info titled "Average" with the averages you calculated.

function printAverages () {
	console.log(filler('Averages ', 30, '='));
	console.log('  ' + maxWeather);
	console.log('  Temp: ' + tempConvert(avgTemp()));
	console.log('  Lo: ' + tempConvert(avgLoTemp()) + ', Hi: ' + tempConvert(avgHiTemp()));
	console.log('  Humidity: ' + avgHumidity() + '%');
	console.log('  Wind: ' + avgWindSp() + ' MPH ' + cardinal(avgWindDir()));
	console.log(filler('', 30, '='));
	console.log('');
	console.log('');
};

printAverages();



// Additional calculations

//Calculate and log the lowest current temperature and the highest current temperature.

function lowestTemp () {
	var result = reduce(list, function (a, b) {
		return a.main.temp_min > b.main.temp_min ? b : a;
	});
	return tempConvert(result.main.temp_min);
};

console.log('The lowest current temperature is ' + lowestTemp() + '.');

function highestTemp () {
	var result = reduce(list, function (a, b) {
		if (a.main.temp_max < b.main.temp_max) {
			return b;
		} else {
			return a;
		}
	});
	return tempConvert(result.main.temp_max);
};

console.log('The highest current temperature is ' + highestTemp() + '.');

// Calculate and log the lowest current humidity and the highest current temperature.

function lowestHumid () {
	var result = reduce(list, function (a, b) {
		return a.main.humidity > b.main.humidity ? b : a;
	});
	return result.main.humidity;
};

console.log('The lowest current humidity is ' + lowestHumid() + '%.');

function highestHumid () {
	var result = reduce(list, function (a, b) {
		if (a.main.humidity < b.main.humidity) {
			return b;
		} else {
			return a;
		}
	});
	return result.main.humidity;
};

console.log('The highest current humidity is ' + highestHumid() + '%.');

// Calculate and log the lowest current wind speed and the highest current wind speed. Include the cardinal directions.

function lowestWindSp () {
	var result = reduce(list, function (a, b) {
		return a.wind.speed > b.wind.speed ? b : a;
	});
	return result.wind.speed + ' MPH ' + cardinal(result.wind.deg);
};

console.log('The lowest current wind speed is ' + lowestWindSp() + '.');

function highestWindSp () {
	var result = reduce(list, function (a, b) {
		if (a.wind.speed < b.wind.speed) {
			return b;
		} else {
			return a;
		}
	});
	return result.wind.speed + ' MPH ' + cardinal(result.wind.deg);
};

console.log('The highest current wind speed is ' + highestWindSp() + '.');











