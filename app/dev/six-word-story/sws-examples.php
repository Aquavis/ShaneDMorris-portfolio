<?php

    $dir = 'stories/approved/';
    $imagesToShow = 18;
    $swsStories = array_diff(scandir($dir), array('..', '.'));

    if(isset($_POST['action']) && !empty($_POST['action'])) {

        shuffle($swsStories);
        $trimmedStories = array_slice($swsStories, 0, 18);

        echo json_encode(array("swsStories"=>$trimmedStories));
    }

?>