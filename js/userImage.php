<?php
$uploaddir = '../images/';
$apend='userImage.jpg';
//$apend=$_POST['name'].'.jpg';
$uploadfile = "$uploaddir$apend"; 
move_uploaded_file($_FILES['userFile']['tmp_name'], $uploadfile)
?>








