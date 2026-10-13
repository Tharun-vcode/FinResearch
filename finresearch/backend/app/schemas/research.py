from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field, field_validator

SectionStatus = Literal["ready", "pending_integration", "error"]


class ResearchRequest(BaseModel):
    company: str = Field(..., min_length=1, max_length=120)

    @field_validator("company")
    @classmethod
    def normalise_company(cls, value: str) -> str:
        value = " ".join(value.split())
        if not value:
            raise ValueError("Company name must not be empty")
        return value


class ResearchSection(BaseModel):
    key: str
    title: str
    status: SectionStatus
    summary: str
    items: list[str] = Field(default_factory=list)


class ResearchResponse(BaseModel):
    request_id: str
    company: str
    generated_at: datetime
    elapsed_ms: int
    sections: list[ResearchSection]
