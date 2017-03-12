<?php
// 
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.     
// 
// @Author Karthik Tharavaad 
//         karthik_tharavaad@yahoo.com
// @Contributor Maurice Svay
//              maurice@svay.Com

function face_detect($file) {
  // $api_key = "9036ff65b2fe1300e793a5d62e206bc5";
  $api_key = "02cfe479f5d141698d065b74997365e7";
  $api_key1 = "9ba269b71cbf441eb79c86ac06f08b60";
  $file = "http://face-bot.000webhostapp.com/".$file;
  $url = "https://westus.api.cognitive.microsoft.com/face/v1.0/detect";
  // $options = array(
  //   "http" => array(
  //     "header" => "api_key: ".$api_key."\r\n".
  //     "Accept: application/json\r\n"
  //     )
  //   );
  $data = "{url : \"".$file."\"}";
  $options = array(
    "http" => array(
      "header" => "Ocp-Apim-Subscription-Key: ".$api_key1."\r\n"."Content-Type: application/json\r\n",
      'method'  => 'POST',
      'content' => $data
    )
  );
  $context = stream_context_create($options);
  $result = file_get_contents($url, false, $context);
  $result = json_decode($result);

  return $result;
  // $x = $result->faces[0]->top_left->x;
  // $y = $result->faces[0]->top_left->y;
}