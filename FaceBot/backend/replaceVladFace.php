<?php

function replaceVladFace($dest, $newname) {//echo $dest;
	$faces = face_detect('dest/'.$dest);

	// print_r($faces);

	$dest = imagecreatefromjpeg('dest/'.$dest);
	$patt = "src/vlad.jpeg";

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