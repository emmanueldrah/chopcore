from sqlalchemy.ext.asyncio import AsyncSession
from app.models.models import AuditLog
from typing import Any
import uuid

async def log_action(
    db: AsyncSession,
    entity_type: str,
    entity_id: uuid.UUID,
    action: str,
    actor_id: uuid.UUID,
    before_state: Any = None,
    after_state: Any = None
):
    log = AuditLog(
        entity_type=entity_type,
        entity_id=entity_id,
        action=action,
        actor_user_id=actor_id,
        before_state=before_state,
        after_state=after_state
    )
    db.add(log)
    # We don't commit here, we assume the caller will commit as part of the transaction
