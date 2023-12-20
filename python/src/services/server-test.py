from http.server import BaseHTTPRequestHandler, HTTPServer
import json


class JSONRequestHandler(BaseHTTPRequestHandler):
    def _send_response(self, status, response):
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(response).encode('utf-8'))

    def do_GET(self):
        if self.path != '/api/data/customers':
            self._send_response(404, {'error': 'Endpoint não encontrado'})
            return

        data = [
            {'id': 1, 'name': 'John Doe', 'email': 'john@teste.com'},
            {'id': 2, 'name': 'Ed Sheeran', 'email': 'ed@teste.com'},
            {'id': 3, 'name': 'Bob Esponja', 'email': 'bob@teste.com'},
            {'id': 4, 'name': 'João Frango', 'email': 'joao@teste.com'},
        ]

        self._send_response(200, data)


def run():
    port = 8000
    server_address = ('', port)
    httpd = HTTPServer(server_address, JSONRequestHandler)
    print(f'Servidor rodando na porta {port}')
    httpd.serve_forever()


if __name__ == '__main__':
    run()
