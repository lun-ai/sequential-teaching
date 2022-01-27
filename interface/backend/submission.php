#!/usr/bin/php
<?php
    function saveRecord($record, $partid, $groupid) {
        $partid = str_replace('"', '', $partid);
        $fp = fopen('../../data/'.$groupid.'_'.$partid.'.json', 'w');
        fwrite($fp, $record);
        fclose($fp);
    }

    function saveEmail($emailAddr) {
        $fp = fopen('./emails.csv', 'a');
        fwrite($fp, $emailAddr);
        fclose($fp);
    }

    if (isset($_POST['saveRecord']) and !empty($_POST['record'])) {
        $record = $_POST['record'];
        $partid = $_POST['participantCode'];
        $groupid = $_POST['groupid'];
        $emailAddr = $_POST['emailAddr'];
        saveRecord($record, $partid, $groupid);
        $emailAddr = str_replace('"', '', $emailAddr);
        if ($emailAddr != '') {
            saveEmail($emailAddr);
        }
        echo 200;
    } else {
        echo 500;
    }
?>
