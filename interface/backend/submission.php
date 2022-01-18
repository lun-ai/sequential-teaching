#!/usr/bin/php
<?php
    if (!empty($_POST['record'])) {
        $record = $_POST['record'];
        $groupid = $_POST['groupid'];
        $partid = $_POST['participantCode'];
        $fp = fopen('data/'.$groupid.'_'.$partid.'.json', 'w');
        fwrite($fp, $record);
        fclose($fp);
        echo "Submission successful. Thank you very much! You may exit now. ";
    } else {
        echo "Submission unsuccessful. Please contact the coordinator to return the record .csv file alternatively.";
    }
?>
