import sentry_sdk
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/ferako"
    SUPABASE_URL: str = ""
    SUPABASE_ANON_KEY: str = ""
    SUPABASE_SERVICE_ROLE_KEY: str = ""
    JWT_SECRET: str = "secret"
    ENVIRONMENT: str = "local"
    SENTRY_DSN: str = ""

    HUBTEL_CLIENT_ID: str = ""
    HUBTEL_API_KEY: str = ""
    SMS_SENDER_ID: str = "Ferako"

    class Config:
        env_file = ".env"

settings = Settings()

if settings.SENTRY_DSN:
    sentry_sdk.init(
        dsn=settings.SENTRY_DSN,
        environment=settings.ENVIRONMENT,
        traces_sample_rate=1.0,
    )
