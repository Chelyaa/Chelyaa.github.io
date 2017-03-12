<?php
  function cropImage($image, $x_o, $y_o, $w_o, $h_o) {
    if (($x_o < 0) || ($y_o < 0) || ($w_o < 0) || ($h_o < 0)) {
      echo "Некорректные входные параметры";
      return false;
    }
    list($w_i, $h_i, $type) = getimagesize($image);
    $types = array("", "gif", "jpeg", "png");
    $ext = $types[$type]; 
    if ($ext) {
      $func = 'imagecreatefrom'.$ext; 
      $img_i = $func($image); 
    } else {
      echo 'Некорректное изображение'; 
      return false;
    }
    if ($x_o + $w_o > $w_i) $w_o = $w_i - $x_o; 
    if ($y_o + $h_o > $h_i) $h_o = $h_i - $y_o; 
    $img_o = imagecreatetruecolor($w_o, $h_o); 
    imagecopy($img_o, $img_i, 0, 0, $x_o, $y_o, $w_o, $h_o); 
    
    return $img_o;
  }
