<?php
ini_set('display_errors',1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");

include('faceDetector.php');
include('replaceVladFace.php');
include('cropImage.php');
include('replaceFace.php');
include_once('logF.php');
include_once('sendFile.php');

// $data = json_decode(file_get_contents('php://input'));

// echo file_get_contents('php://input');

// replaceFace('people.jpg', 'vlad.jpeg', 'newpeople.jpg');

$uploaddir = dirname(__FILE__).'/dest'.'/';
$filname = basename($_FILES['userfile']['name']);
$uploadfile = $uploaddir.$filname;

if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {
    // echo "Файл корректен и был успешно загружен.\n";
} else {
    // echo "Возможная атака с помощью файловой загрузки!\n";
}


replaceVladFace($filname, 'res.jpg');
echo 'http://face-bot.000webhostapp.com/result/res.jpg';