import uuid
import openpyxl
import os
import api
import log


def generate_log_exception(error: Exception):
    log.log_entry(str(error), 'ERROR')


def get_customers():
    try:
        return api.get('http://localhost:8000/api/data')
    except Exception as e:
        raise Exception(f"\n\nError to get customers --> {e}")


def modify_excel_file(file_path: str = ''):
    try:
        print("Creating and updating excel file")

        # Cria uma instância do workbook
        workbook = openpyxl.Workbook()
        sheet = workbook.active

        cell_content_A1 = ' '.join([
            "Hi, I'm a sheet modified by code in python.",
            "File ./src/crud-excel.py"
        ])

        sheet.merge_cells('A1:C1')
        sheet['A1'] = cell_content_A1

        sheet['A2'] = 'ID'
        sheet['B2'] = 'Name'
        sheet['C2'] = 'E-mail'

        customers = get_customers()

        start_row_index = 3

        for customer in customers:
            sheet[f'A{start_row_index}'] = customer['id']
            sheet[f'B{start_row_index}'] = customer['name']
            sheet[f'C{start_row_index}'] = customer['email']
            start_row_index += 1

        # Salva o workbook no arquivo
        workbook.save(file_path)

        print("Excel file created and updated successfully.")
    except Exception as e:
        raise Exception(f"\nError to create and update excel file --> {e}")


def read_excel_file(file_path: str):
    try:
        print("Reading excel file")

        # Abre o arquivo Excel usando openpyxl
        workbook = openpyxl.load_workbook(file_path)
        sheet = workbook.active

        # Itera sobre as linhas da planilha e imprime o conteúdo
        for row in sheet.iter_rows():
            for cell in row:
                print(cell.value, end='\t')
            print()

    except Exception as e:
        raise Exception(f"\nError to read excel file --> {e}")


def delete_excel_file(file_path: str = ''):
    try:
        print("Deleting excel file")
        os.remove(file_path)
        print(f"File Excel '{file_path}' removed successful.")
    except FileNotFoundError:
        raise Exception(f"\nFile Excel '{file_path}' not found.")

    except Exception as e:
        raise Exception(f"\nError to remove file excel: {e}")


def main():
    try:
        id_file = str(uuid.uuid4())
        file_path = f'./temp/{id_file}.xlsx'

        modify_excel_file(file_path)
        # read_excel_file(file_path)
        # delete_excel_file(file_path)
    except Exception as e:
        generate_log_exception(e)


main()
