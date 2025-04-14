import requests
import json
from django.conf import settings


class PesapalV30Helper:
    def __init__(self, api="live"):
        self.url = "https://cybqa.pesapal.com/pesapalv3" if api == "demo" else "https://pay.pesapal.com/v3"
        self.PESAPAL_CONSUMER_KEY = settings.PESAPAL_CONSUMER_KEY
        self.PESAPAL_CONSUMER_SECRET = settings.PESAPAL_CONSUMER_SECRET

    def get_access_token(self):
        headers = {
            'accept': 'text/plain',
            'content-type': 'application/json'
        }
        post_data = {
            'consumer_key': self.PESAPAL_CONSUMER_KEY,
            'consumer_secret': self.PESAPAL_CONSUMER_SECRET
        }
        endpoint = f'{self.url}/api/Auth/RequestToken'
        response = self.curl_request(endpoint, headers, post_data)
        token = response.get("token")

        return token

    def get_registered_ipn(self, access_token):
        headers = {
            'accept': 'text/plain',
            'content-type': 'application/json',
            'authorization': f'Bearer {access_token}'
        }
        endpoint = f'{self.url}/api/URLSetup/GetIpnList'
        response = self.curl_request(endpoint, headers)
        return response

    def get_notification_id(self, access_token, callback_url):
        headers = {
            'accept': 'text/plain',
            'content-type': 'application/json',
            'authorization': f'Bearer {access_token}'
        }
        post_data = {
            'ipn_notification_type': 'GET',
            'url': callback_url
        }
        endpoint = f'{self.url}/api/URLSetup/RegisterIPN'
        response = self.curl_request(endpoint, headers, post_data)
        return response

    def get_merchant_order_url(self, data, access_token):
        headers = {
            'accept': 'text/plain',
            'content-type': 'application/json',
            'authorization': f'Bearer {access_token}'
        }
        endpoint = f'{self.url}/api/Transactions/SubmitOrderRequest'
        response = self.curl_request(endpoint, headers, data)
        return response

    def get_transaction_status(self, order_tracking_id, access_token):
        headers = {
            'accept': 'text/plain',
            'content-type': 'application/json',
            'authorization': f'Bearer {access_token}'
        }
        endpoint = f'{self.url}/api/Transactions/GetTransactionStatus?orderTrackingId={order_tracking_id}'
        response = self.curl_request(endpoint, headers)
        return response

    def curl_request(self, url, headers=None, post_data=None):
        try:
            response = requests.post(url, headers=headers, data=json.dumps(
                post_data)) if post_data else requests.get(url, headers=headers)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f'Error: {e}')
            return None
