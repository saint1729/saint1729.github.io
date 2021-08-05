import json
import csv
import os


def flatten_json(b, delimiter):
    val = {}
    for i in b.keys():
        if isinstance(b[i], dict):
            get = flatten_json(b[i], delimiter)
            for j in get.keys():
                val[i + delimiter + j] = str(get[j])
        else:
            val[i] = str(b[i])

    return val


def write_row_to_file(output_file, data, row, is_header=False):
    with open(output_file, 'a') as out_file:
        csv_w = csv.writer(out_file)
        if is_header:
            csv_w.writerow(row)
        else:
            csv_w.writerow(map(lambda column: data.get(column, ""), row))


def do_it():
    path = './data/'
    output_file = 'output.csv'
    with open(output_file, 'w') as out_file:
        out_file.write('')
    directory_names = [d for d in os.listdir(path) if os.path.isdir(os.path.join(path, d))]
    columns = []
    for directory_name in directory_names:
        directory_name = path + directory_name
        files = os.listdir(directory_name)
        for file in files:
            if file.endswith(".json"):
                json_file_name = os.path.join(directory_name, file)
                f = open(json_file_name)
                data = json.load(f)
                f.close()
                data = flatten_json(data, "_")
                data["transactionid"] = json_file_name.split("/")[2]
                if len(columns) == 0:
                    # columns = [x for x in data]
                    # columns = list(set(columns))
                    # uncomment the above 2 lines and comment the below 5 lines to get all columns
                    columns = ['transactionid', '@http_status_code',
                               'available_data_basic_educations', 'available_data_basic_emails',
                               'person_dob_date_range_end', 'person_dob_date_range_start',
                               'person_dob_display', 'person_emails', 'person_gender_@inferred',
                               'person_gender_content']
                    write_row_to_file(output_file, data, columns, True)
                write_row_to_file(output_file, data, columns)


do_it()
