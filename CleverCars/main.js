window.onload = function() {
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	var img1 = document.getElementById("red");
	var img2 = document.getElementById("blue");

	ctx.drawImage(img1, 10, 10);
	ctx.drawImage(img2, 200, 10);

	var imgData1 = ctx.getImageData(10, 10, 100, 100);
	var imgData2 = ctx.getImageData(200, 10, 100, 100);

	var isCollision = isPixelCollision(imgData1, 10, 10, imgData2, 200, 10, false);
	console.log(isCollision);
};