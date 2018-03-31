<?php
/*
    [id] => f76c7827-216c-47b3-8746-f35e9730f0ea
    [start] => 2016-04-27 18:00
    [end] => 2016-04-27 20:00
    [title] => Euroviisuspesiaali!  
    [host] => Lorens, Bjanze  
    [prod] => Jaketus
    [desc] => Euroviisut tulevat taas - apua?! 
*/
$data = json_decode(file_get_contents('/var/www/intra/okdb/ok.json'));
$out = 'BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//hacksw/handcal//NONSGML v1.0//EN
NAME:Wappuradio
X-WR-CALNAME:Wappuradio
';
for($i=0;$i<sizeof($data);$i++) {
  $out .= 'BEGIN:VEVENT
UID:'.$data[$i]->id.'
DTSTAMP;TZID="Europe/Helsinki":'.date('Ymd\THis').'
DTSTART;TZID="Europe/Helsinki":'.date('Ymd\THis', strtotime($data[$i]->start)).'
DTEND;TZID="Europe/Helsinki":'.date('Ymd\THis', strtotime($data[$i]->end)).'
SUMMARY:'.$data[$i]->title.'
END:VEVENT
';
}
$out .= 'END:VCALENDAR
';
header('Content-type: text/calendar');
print $out;
?>
