from abc import ABC, abstractmethod

class SMSProvider(ABC):
    @abstractmethod
    async def send_sms(self, phone_number: str, message: str) -> bool:
        pass

class HubtelSMSProvider(SMSProvider):
    def __init__(self, api_key: str, client_id: str, sender_id: str):
        self.api_key = api_key
        self.client_id = client_id
        self.sender_id = sender_id

    async def send_sms(self, phone_number: str, message: str) -> bool:
        # Real Hubtel API call would go here
        print(f"Sending SMS via Hubtel to {phone_number}: {message}")
        return True

class MockSMSProvider(SMSProvider):
    async def send_sms(self, phone_number: str, message: str) -> bool:
        print(f"[MOCK SMS] To: {phone_number}, Message: {message}")
        return True
