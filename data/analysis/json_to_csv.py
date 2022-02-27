import json
import csv
from os import listdir

DATA_DIR = "../test/records_json/"
WRITE_DIR = "csv/"

def parse_json_to_csv(data_dirs, suffix):
    json_files = []
    csv_files = []
    for path in data_dirs:
        files = listdir(path)
        json_files = sorted([file for file in files if file.endswith(".json")])

    for jf in json_files:
        with open(path + jf) as json_file:
            jd = json.load(json_file)

            data_file = open(path + suffix + jf.split(".")[0] + ".csv", 'w')
            csv_writer = csv.writer(data_file)

            header = []
            for d1 in jd:
                for h in d1.keys():
                    if h not in header:
                        header.append(h)
            csv_writer.writerow(header)
            totalCol = len(header)

            for d2 in jd:
                newline = [""] * totalCol
                for k in d2:
                    newline[header.index(k)] = d2[k]
                csv_writer.writerow(newline)
            csv_files.append(jf.split(".")[0]+".csv")
            data_file.close()
    return csv_files

parse_json_to_csv([DATA_DIR], WRITE_DIR)