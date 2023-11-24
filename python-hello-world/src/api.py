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
