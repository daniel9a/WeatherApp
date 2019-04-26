
let imageArray = []  // global variable to hold stack of images for animation 
let count = 0;          // global var
let myCount = 0;
function animation() {
	setInterval( function(){
		if(myCount % 10 > 0)
		{
			document.getElementById('img'+((myCount % 10)-1)).style.display="none";
		}
		else if(myCount % 10 === 0)
		{
			document.getElementById('img'+9).style.display="none";
		}
		if(document.getElementById('img'+((myCount % 10)-1)) === null)
		{
			console.log((myCount % 10));
		}
		document.getElementById('img'+((myCount % 10))).style.display="inline";
		myCount++;
		
	}, 500);
}
function callAnimation()
{
	window.setInterval( animation(), 1000);
}

function addToArray(newImage) {
	if (count < 10) {
		newImage.id = "doppler_"+count;
		newImage.style.display = "none";
		imageArray.push(newImage);
		count = count+1;
		if (count >= 10) {
			console.log("Got 10 doppler images");
			for(i = 0; i < 10; i++)
			{
				//document.getElementById('myImg'+i).src = imageArray[i].src;	
			}
			// for(j=0; j < 10; j++)
			// {
			// 	setInterval( function(){
			// 	//	let myElement = document.getElementById("myImg"+j).style.display="block";
			// 	}, 800);
			// }

			//document.getElementById('myImg').src = imageArray[1].src;
		}
		// console.log("Size of my imageARRay = "+imageArray.length);
	}
}


function tryToGetImage(dateObj) {
	let dateStr = dateObj.getUTCFullYear();
	dateStr += String(dateObj.getUTCMonth() + 1).padStart(2, '0'); //January is 0!
	dateStr += String(dateObj.getUTCDate()).padStart(2, '0');

	let timeStr = String(dateObj.getUTCHours()).padStart(2,'0')
	timeStr += String(dateObj.getUTCMinutes()).padStart(2,'0');

	let filename = "DAX_"+dateStr+"_"+timeStr+"_N0R.gif";
	let newImage = new Image();
	newImage.onload = function () {
		//console.log("got image "+filename);
		addToArray(newImage);
	}
	newImage.onerror = function() {
		// console.log("failed to load "+filename);
	}
	console.log(imageArray.length);
	newImage.src = "http://radar.weather.gov/ridge/RadarImg/N0R/DAX/"+filename;
}


function getTenImages() {
	let dateObj = new Date();  // defaults to current date and time
	// if we try 150 images, and get one out of every 10, we should get enough
	for (let i = 0; i < 150; i++) {
		newImage = tryToGetImage(dateObj);
		dateObj.setMinutes( dateObj.getMinutes()-1 ); // back in time one minute
	}
	//console.log(imageArray.length);
	//document.getElementById('myImg4').style.display="block";

}

// console.log("Size of my imageARRay = "+imageArray.length);
getTenImages();
//callAnimation();
animation();


// console.log("Size of my imageARRay = "+imageArray.length);





