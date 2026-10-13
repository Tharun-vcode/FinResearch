from app.schemas.research import ResearchSection
from app.services.research.base import ResearchModule


class CompanyOverviewModule(ResearchModule):
    key = "company_overview"
    title = "Company Overview"

    async def run(self, company: str) -> ResearchSection:
        return ResearchSection(
            key=self.key,
            title=self.title,
            status="ready",
            summary=(
                f'Research request received for "{company}". The FastAPI pipeline '
                "is running and the frontend is connected. Live data sources will "
                "be attached in upcoming phases."
            ),
            items=[
                "Request validated and normalised by the backend",
                "Research modules executed concurrently",
                "Response returned to the Next.js frontend",
            ],
        )


class PlaceholderModule(ResearchModule):
    """Stand-in for a module that will be implemented in a later phase."""

    def __init__(self, key: str, title: str, description: str, planned: list[str]):
        self.key = key
        self.title = title
        self._description = description
        self._planned = planned

    async def run(self, company: str) -> ResearchSection:
        return ResearchSection(
            key=self.key,
            title=self.title,
            status="pending_integration",
            summary=self._description,
            items=self._planned,
        )


def default_modules() -> list[ResearchModule]:
    return [
        CompanyOverviewModule(),
        PlaceholderModule(
            key="sec_filings",
            title="SEC Filings (EDGAR)",
            description="Annual and quarterly filings will be pulled from SEC EDGAR.",
            planned=["10-K / 10-Q retrieval", "8-K event tracking", "Financial statement extraction"],
        ),
        PlaceholderModule(
            key="litigation",
            title="Litigation",
            description="Legal proceedings will be sourced through the Litigation MCP.",
            planned=["Active cases", "Regulatory actions", "Settlement history"],
        ),
        PlaceholderModule(
            key="news",
            title="News & Sentiment",
            description="Recent coverage will be sourced through the News MCP.",
            planned=["Latest headlines", "Sentiment trend", "Event timeline"],
        ),
        PlaceholderModule(
            key="knowledge_base",
            title="Knowledge Base (RAG)",
            description="Documents will be embedded and searchable via a vector database.",
            planned=["Document ingestion", "Semantic search", "Cited answers"],
        ),
        PlaceholderModule(
            key="risk_analysis",
            title="Risk Analysis",
            description="Risk factors will be synthesised from all collected sources.",
            planned=["Financial risk", "Legal and regulatory risk", "Market and news risk"],
        ),
        PlaceholderModule(
            key="pitchbook",
            title="Pitchbook",
            description="A structured pitchbook will be generated from the research.",
            planned=["Executive summary", "Key metrics", "Exportable document"],
        ),
    ]
