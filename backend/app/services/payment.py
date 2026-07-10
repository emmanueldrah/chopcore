from abc import ABC, abstractmethod
from enum import Enum

class PaymentStatus(Enum):
    SUCCESS = "success"
    PENDING = "pending"
    FAILED = "failed"

class PaymentProvider(ABC):
    @abstractmethod
    async def initiate_payment(self, phone_number: str, amount: int, order_id: str) -> str:
        """Initiates a payment and returns a provider reference"""
        pass

    @abstractmethod
    async def verify_payment(self, reference: str) -> PaymentStatus:
        """Verifies payment status with the provider"""
        pass

class MockPaymentProvider(PaymentProvider):
    async def initiate_payment(self, phone_number: str, amount: int, order_id: str) -> str:
        print(f"[MOCK PAYMENT] Initiating payment of {amount} pesewas for order {order_id} via {phone_number}")
        return f"mock_ref_{order_id}"

    async def verify_payment(self, reference: str) -> PaymentStatus:
        print(f"[MOCK PAYMENT] Verifying payment for reference {reference}")
        return PaymentStatus.SUCCESS
