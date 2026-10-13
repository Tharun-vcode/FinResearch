from functools import lru_cache

from app.services.research.modules import default_modules
from app.services.research.service import ResearchService


@lru_cache
def get_research_service() -> ResearchService:
    return ResearchService(default_modules())
