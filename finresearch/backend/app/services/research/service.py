import asyncio
import logging
import time
import uuid
from collections.abc import Sequence
from datetime import datetime, timezone

from app.schemas.research import ResearchResponse, ResearchSection
from app.services.research.base import ResearchModule

logger = logging.getLogger(__name__)


class ResearchService:
    def __init__(self, modules: Sequence[ResearchModule]):
        self._modules = list(modules)

    async def run(self, company: str) -> ResearchResponse:
        started = time.perf_counter()
        sections = await asyncio.gather(
            *(self._run_module(module, company) for module in self._modules)
        )
        return ResearchResponse(
            request_id=str(uuid.uuid4()),
            company=company,
            generated_at=datetime.now(timezone.utc),
            elapsed_ms=int((time.perf_counter() - started) * 1000),
            sections=list(sections),
        )

    async def _run_module(self, module: ResearchModule, company: str) -> ResearchSection:
        # One failing module must never take down the whole report.
        try:
            return await module.run(company)
        except Exception:
            logger.exception("Research module %s failed", module.key)
            return ResearchSection(
                key=module.key,
                title=module.title,
                status="error",
                summary="This module failed to complete. See backend logs for details.",
                items=[],
            )
