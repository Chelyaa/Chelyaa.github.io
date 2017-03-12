<?php
function logF($l) {
	$file = 'logs.txt';
	$current = file_get_contents($file);
	$current .= $l."\n";
	file_put_contents($file, $current);
}