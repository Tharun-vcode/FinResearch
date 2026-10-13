from fastapi import APIRouter, Depends

from app.api.deps import get_research_service
from app.schemas.research import ResearchRequest, ResearchResponse
from app.services.research.service import ResearchService

router = APIRouter(tags=["research"])


@router.post("/research", response_model=ResearchResponse)
async def research(
    payload: ResearchRequest,
    service: ResearchService = Depends(get_research_service),
) -> ResearchResponse:
    return await service.run(payload.company)
