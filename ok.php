<?php
error_reporting(E_ALL ^ E_NOTICE);
session_name('DokuWiki');
session_start();
$user = $_SESSION[array_keys($_SESSION)[0]];
//error_log(print_r($user, true));
if(!$user['auth']) exit;
$name = $user['auth']['user'];
//if(!in_array('toimitus', $user['auth']['info']['grps'])) exit;
$data = json_decode(file_get_contents('ok.json'), true);
if(!$data) $data = array();
for($i=0;$i<sizeof($data);$i++) {
  if($data[$i]['id'] == $_POST['id'] || $data[$i]['id'] == $_POST['delete']) {
    unset($data[$i]);
  }
}
$data = array_values($data);
if($_POST['id']) {
  $_POST['timestamp'] = (new DateTime())->format(DateTime::ATOM);
  $data[] = $_POST;
}

$api = $data;
for($i=0;$i<sizeof($api);$i++) {
  $api[$i]['start'] = (new DateTime($api[$i]['start']))->format(DateTime::ATOM);
  $api[$i]['end'] = (new DateTime($api[$i]['end']))->format(DateTime::ATOM);
  $filename = preg_replace('/[^a-z0-9-]/', '', mb_strtolower(iconv('UTF-8', 'ASCII//TRANSLIT', $api[$i]['title'])));
  $api[$i]['photo'] = 'https://wappuradio.fi/img/host/'.$filename.'.jpg';
  $api[$i]['thumb'] = 'https://wappuradio.fi/img/host/thumb/'.$filename.'.jpg';
  $api[$i]['name'] = $filename;
}
$api = json_encode($api, JSON_PRETTY_PRINT);
$fp = fopen('api.json', 'w+');
fwrite($fp, $api);
fclose($fp);

$data = json_encode($data, JSON_PRETTY_PRINT);
$fp = fopen('ok.json', 'w+');
fwrite($fp, $data);
fclose($fp);

$fp = fopen('.blame', 'w+');
fwrite($fp, $name);
fclose($fp);

header('Content-type: application/json');
print $data;
?>
