from app.core.rate_limit import RateLimiter
from datetime import datetime, timedelta

def test_rate_limiter():
    limiter = RateLimiter(max_requests=2, window_hours=1)

    # First request
    allowed, _ = limiter.is_allowed("test-key")
    assert allowed == True

    # Second request
    allowed, _ = limiter.is_allowed("test-key")
    assert allowed == True

    # Third request (should be blocked)
    allowed, msg = limiter.is_allowed("test-key")
    assert allowed == False
    assert "Rate limit exceeded" in msg

def test_rate_limiter_cleanup():
    limiter = RateLimiter(max_requests=1, window_hours=1)

    # Request 1.5 hours ago
    limiter.requests["old-key"] = [datetime.utcnow() - timedelta(hours=1.5)]

    allowed, _ = limiter.is_allowed("old-key")
    assert allowed == True
