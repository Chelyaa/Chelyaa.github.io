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
  $api_key = "9036ff65b2fe1300e793a5d62e206bc5";
  $file = "http://text-generator.zzz.com.ua/".$file;
  $url = "https://api.meerkat.com.br/frapi/detect/face?imageUrl=".$file;
  $options = array(
    "http" => array(
      "header" => "api_key: ".$api_key."\r\n".
      "Accept: application/json\r\n"
      )
    );
  $context  = stream_context_create($options);
  $result = file_get_contents($url, false, $context);
  $result = json_decode($result);

  return $result->faces;
  // $x = $result->faces[0]->top_left->x;
  // $y = $result->faces[0]->top_left->y;
}