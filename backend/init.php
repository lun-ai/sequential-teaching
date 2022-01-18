#!/usr/bin/php
<?php
    function phpFunction(){
        $csvFile = file('./participant_code.csv');
        $data = [];
        $count = 0;
        $currentSessionId = 0;
        foreach ($csvFile as $line) {
            if ($count > 0) {
                $count = $count + 1;
                $data[] = str_getcsv($line);
                if($data[2]==0){
                    $currentSessionId = $count;
                    $data[2] = 1;
                }
            }
        }

        if($currentSessionId==0) {
            $currentSessionId=$count;
        }

        $fp = fopen('./participant_code.csv', 'w');

        foreach ($data as $fields) {
            fputcsv($fp, $fields);
        }

        fclose($fp);

        return $currentSessionId;
    }
?>