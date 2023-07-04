<?php
//чтобы рабоать с JSON файлами через php нужно добавить
$_POST = json_decode(file_get_contents("php://input"), true);//это то что нужно добавить чтобы рабоать с json файлами в php 
echo var_dump($_POST);//позволяет увидеть инфу которая приходит