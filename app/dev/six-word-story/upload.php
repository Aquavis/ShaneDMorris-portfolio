<?php

	date_default_timezone_set('America/New_York');
	
	$date = new DateTime();

	$build = $_POST['value'];
	$story = $_POST['story'];
	$saveAgain = $_POST['saveAgain'];
	
	if ($saveAgain === 'true'){
		$path = 'stories/user/';
	} else {
		$path = 'stories/pending-approval/';
	}

	function seoUrl($string) {
		//Lower case everything
		$string = strtolower($string);
		//Make alphanumeric (removes all other characters)
		$string = preg_replace("/[^a-z0-9_\s-]/", "", $string);
		//Clean up multiple dashes or whitespaces
		$string = preg_replace("/[\s-]+/", " ", $string);
		//Convert whitespaces and underscore to dash
		$string = preg_replace("/[\s_]/", "-", $string);
		return $string;
	}

	if($build === ''){
		$send = 'fail';
	}else{
		// File name = Timestamp + user-inputted six word story.png
		$fileName = $date->getTimestamp() . "-" . seoUrl($story);
		file_put_contents($path . $fileName . '.png', base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $build)));
		echo $fileName;
	}

?>