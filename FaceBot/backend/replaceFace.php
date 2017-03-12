<?php
function replaceFace($destPath, $srcPath, $newname) {
	$faceSrc = face_detect('src/'.$srcPath)[0]->faceRectangle;
	$xSrc = $faceSrc->left;
	$ySrc = $faceSrc->top;
	$widthSrc = $faceSrc->width;
	$heightSrc = $faceSrc->height;
	$faces = face_detect('dest/'.$destPath);

	$src = cropImage('src/'.$srcPath, $xSrc, $ySrc, $widthSrc, $heightSrc);
	imagejpeg($src, 'src/'.$srcPath);

	$dest = imagecreatefromjpeg('dest/'.$destPath);
	$patt = "src/".$srcPath;

	imagealphablending($dest, false);
	imagesavealpha($dest, true);
	for($i = 0; $i < count($faces); $i++) {
		$face = $faces[$i]->faceRectangle;
		list($width, $height) = getimagesize($patt);

		$x = $face->left;
		$y = $face->top;
		$newwidth = $face->width;
		$newheight = $face->height;
		$percent = $newwidth / $width;
		$newwidth = $width * $percent;
		$newheight = $height * $percent;

		$thumb = imagecreatetruecolor($newwidth, $newheight);
		$src = imagecreatefromjpeg($patt);

		imagecopyresized($thumb, $src, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

		imagecopymerge($dest, $thumb, $x, $y, 0, 0, $newwidth, $newheight, 100);
	}

	imagejpeg($dest, "result/".$newname);
	imagedestroy($dest);
	imagedestroy($src);
}
