<?php

class Connection {

	private static $connection;
	private static $lastResult;

	function __construct() {
		$host = "localhost";
		$username = "root";
		$password = "";
		$database_name = "iphone-repair";

		self::$connection = new mysqli($host, $username, $password, $database_name);

		if (self::$connection->connect_errno) {
			echo $mysqli->connect_error;
			exit();
		}
	}

	public static function query($str) {
		$result = self::$connection->query($str);
		self::$lastResult = $result;
		return $result;
	}

	public static function select($table, $fields = "*") {
		$query = "SELECT " . $fields . " FROM " . $table;
		$result = self::query($query);
		return new static;
	}

	public static function toArray() {
		$array = [];

		while ($element = self::$lastResult->fetch_array(MYSQLI_ASSOC))
			$array[] = $element;

		self::$lastResult = $array;
		return new static;
	}

	public static function get() {
		return self::$lastResult;
	}
}