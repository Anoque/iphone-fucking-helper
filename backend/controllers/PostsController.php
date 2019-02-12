<?php

class PostsController extends Controller {

	public function lol($params = "") {
		$data["test"] = "Need to be removed this is controller";
		$data["params"] = $params;
		$data["posts"] = Connection::select("posts")->toArray()->get();

		return $data;
	}
}