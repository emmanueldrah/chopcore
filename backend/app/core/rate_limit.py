from datetime import datetime, timedelta
from typing import Dict, Tuple

class RateLimiter:
    def __init__(self, max_requests: int, window_hours: int):
        self.max_requests = max_requests
        self.window_hours = window_hours
        self.requests: Dict[str, list[datetime]] = {}

    def is_allowed(self, key: str) -> Tuple[bool, str]:
        now = datetime.utcnow()
        cutoff = now - timedelta(hours=self.window_hours)

        # Clean up old requests
        if key in self.requests:
            self.requests[key] = [t for t in self.requests[key] if t > cutoff]
        else:
            self.requests[key] = []

        if len(self.requests[key]) >= self.max_requests:
            return False, f"Rate limit exceeded. Max {self.max_requests} requests per {self.window_hours} hour(s)."

        self.requests[key].append(now)
        return True, ""

otp_rate_limiter = RateLimiter(max_requests=5, window_hours=1)
