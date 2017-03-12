<?php
function replaceFace($destPath, $srcPath, $newname) {
	$faceSrc = face_detect('src/'.$srcPath)[0];
	$xSrc = $faceSrc->top_left->x;
	$ySrc = $faceSrc->top_left->y;
	$xSrc1 = $faceSrc->bottom_right->x;
	$ySrc1 = $faceSrc->bottom_right->y;
	$faces = face_detect('dest/'.$destPath);

	$src = cropImage('src/'.$srcPath, $xSrc, $ySrc, $xSrc1-$xSrc, $ySrc1-$ySrc);
	imagejpeg($src, 'src/'.$srcPath);

	$dest = imagecreatefromjpeg('dest/'.$destPath);
	$patt = "src/".$srcPath;

	imagealphablending($dest, false);
	imagesavealpha($dest, true);
	for($i = 0; $i < count($faces); $i++) {
		list($width, $height) = getimagesize($patt);

		$x = $faces[$i]->top_left->x;
		$y = $faces[$i]->top_left->y;
		$x1 = $faces[$i]->bottom_right->x;
		$y1 = $faces[$i]->bottom_right->y;
		$newwidth = $x1 - $x;
		$newheight = $y1 - $y;
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
