<?php
ini_set('display_errors',1);
error_reporting(E_ALL);

include('faceDetector.php');
include('replaceVladFace.php');
include('cropImage.php');
include('replaceFace.php');
include_once('logF.php');

$confirmation_token = '55acf079';
$token = "eb74fec3870af2f5a99f5d993ddc238f8a7e8b0aa0a655d3085cb79d4f790505fef4f8560a6c15eefd407";

$client_id = "5918527";
$scope = 'offline,messages';
$access_token = "bad8da110601a4347e4b865eb41942ef20939e80d26f4e50db96bc659e01828ef5c651ea068cb1d6b6a5c";

logF(file_get_contents('php://input'));

$data = json_decode(file_get_contents('php://input')); 
$req = "https://api.vk.com/method/messages.send?user_id=189335746&message=Hi,Vlad&v=5.37&access_token=".$token;
$res = file_get_contents($req); 
echo $res;

// switch($data->type) {
// 	case 'confirmation': 
//     echo $confirmation_token; 
//     break; 
//   case 'message_new': 
//   	// $user_id = $data->object->user_id; 
//    //  $user_info = json_decode(file_get_contents("https://api.vk.com/method/users.get?user_ids={$user_id}&v=5.0"));
//    //  $user_name = $user_info->response[0]->first_name; 

//     // $request_params = array( 
//     //   'message' => "Hello, {$user_name}!", 
//     //   'user_id' => $user_id, 
//     //   'access_token' => $access_token, 
//     //   'v' => '3.0' 
//     // ); 
			// $get_params = http_build_query($request_params); 
//     echo('ok'); 
//   	break;	
// }
?>
<!-- <a href="https://oauth.vk.com/authorize?client_id=<?=$client_id;?>&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=<?=$scope;?>&response_type=token&v=5.37">Push the button</a> -->
