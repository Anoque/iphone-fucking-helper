<?php

require "core/Functions.php";
require "core/Connection.php";
require "core/Controller.php";
require "core/Struct.php";

// For tests
// print_r($_POST);

$app = new Struct();

if (isset($_POST["controller"])) {

	$controller_name = $_POST["controller"] . "Controller";
	$action = $_POST["action"];
	$params = null;

	// Should be json-format
	if (isset($_POST["params"]))
		try {
			json_encode($_POST["params"]);
		} catch (Extention $e) {
			$app->setError(3);
		}

	$cFile = "controllers/" . $controller_name . ".php";

	if (file_exists($cFile)) {
		include_once $cFile;
		$controller = new $controller_name;

		if (method_exists($controller, $action)) {

			if ($params != "")
				$app->setResponse($controller->$action($params));
			else
				$app->setResponse($controller->$action());

		} else {
			$app->getError(2);
		}
	} else {
		$app->getError(1);
	}
} else {
	$app->getError(404);
}

$app->getResponse();

?>