<?php

function debug($str) {
	file_put_contents("debug.txt", strval($str) . "\n", FILE_APPEND);
}