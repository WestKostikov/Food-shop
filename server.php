<?php
$_POST = json_decode( file_get_contents("php://input"), true ); // всё что приходит от клиента, будем декодировать 
echo var_dump($_POST);