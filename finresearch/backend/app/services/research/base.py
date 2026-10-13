from abc import ABC, abstractmethod

from app.schemas.research import ResearchSection


class ResearchModule(ABC):
    """One unit of research (EDGAR, litigation, news, RAG, risk, pitchbook...).

    Later phases add new subclasses and register them in `default_modules()`.
    The orchestrator never needs to change.
    """

    key: str
    title: str

    @abstractmethod
    async def run(self, company: str) -> ResearchSection:
        """Produce this module's section for the given company."""
        raise NotImplementedError
