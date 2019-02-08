<?php

class Struct {

	private $data;

	public function __construct() {
		$this->data = [];
	}

	public function getError($number) {

		switch ($number) {
			case 404:
				$this->setError("404");
				break;
			case 1:
				$this->setError("No controller");
				break;
			case 2:
				$this->setError("No action");
				break;
			case 3:
				$this->setError("Parameters is not json format");
				break;
			default:
				$this->setError("What the F*ck?");
		}
	}

	public function setError($msg) {
		$this->data["error"] = $msg;
	}

	public function getResponse() {
		echo json_encode($this->data);
	}

	public function setResponse($var) {
		$this->data["response"] = $var;
	}

	public function getData() {
		return $this->data;
	}
}