<?php
session_name('DokuWiki');
session_start();
$user = $_SESSION[array_keys($_SESSION)[0]];
if(!$user['auth']) exit;
if(!in_array('toimitus', $user['auth']['info']['grps'])) exit;
$data = json_decode(file_get_contents('ok.json'));
if(!$data) $data = array();
for($i=0;$i<sizeof($data);$i++) {
  if($data[$i]->id == $_POST['id'] || $data[$i]->id == $_POST['delete']) {
    unset($data[$i]);
    $data = array_values($data);
  }
}
if($_POST['id']) {
  $data[] = $_POST;
}
$data = json_encode($data);
$fp = fopen('ok.json', 'w+');
fwrite($fp, $data);
fclose($fp);
header('Content-type: application/json');
print $data;
?>
