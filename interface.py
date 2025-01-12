from __future__ import annotations
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from typing import TypedDict

    # ---------------------------------- Review ---------------------------------- #
    class Star(TypedDict):
        label: str
        value: int

    class Review(TypedDict):
        name: str
        review: str
        contrib: str
        humanized_timestamp: str
        minires_images: list[str]
        stars: Star

    class CrawlOptions(TypedDict):
        CRAWL_NAME: str
        TIME_TO_WAIT: float

    # ---------------------------------- Helper ---------------------------------- #
    class Urls(TypedDict):
        filename: str
        url: str
    
    class NamedDataset(TypedDict):
        label: str
        dataset: list[dict]