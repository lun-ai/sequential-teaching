#!/usr/bin/php
<?php
    function getCurrentSessionId(){
        $csvFile = file('./participant_code.csv');
        $data = [];
        $count = 0;
        $currentSessionId = 0;
        foreach ($csvFile as $line) {
            $data[] = str_getcsv($line);
            if ($count > 0) {
                if($data[$count][2] == 0 and $currentSessionId == 0){
                    $currentSessionId = $count;
                    $data[$count][2] = 1;
                }
            }
            $count += 1;
        }

        if($currentSessionId != 0) {
            $fp = fopen('./participant_code.csv', 'w');
            foreach ($data as $fields) {
                fputcsv($fp, $fields);
            }
            fclose($fp);
        }
        return json_encode($currentSessionId);
    }

    if (isset($_POST['getCurrentSessionId'])) {
        $result = getCurrentSessionId();
        if ($result != '0') {
            echo $result;
        } else {
            header('HTTP/1.1 500 Internal Server Error');
        }
    }
?>