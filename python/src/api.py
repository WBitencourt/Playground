import requests


class CustomError(Exception):
    def __init__(self, message, api_url):
        self.message = message if message else f'Error to get data from API {
            api_url}'
        super().__init__(self.message)


def get(api_url: str):
    try:
        response = requests.get(api_url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as e:
        error_message = f'\n HTTP error - {e} \n Body - {e.response.json()}'
        raise CustomError(error_message, api_url)


def post(api_url: str, data: dict):
    try:
        response = requests.post(api_url, json=data)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as e:
        error_message = f'\n HTTP error - {e} \n Body - {e.response.json()}'
        raise CustomError(error_message, api_url)


def put(api_url: str, data: dict):
    try:
        response = requests.put(api_url, json=data)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as e:
        error_message = f'\n HTTP error - {e} \n Body - {e.response.json()}'
        raise CustomError(error_message, api_url)


def delete(api_url: str):
    try:
        response = requests.delete(api_url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as e:
        error_message = f'\n HTTP error - {e} \n Body - {e.response.json()}'
        raise CustomError(error_message, api_url)
