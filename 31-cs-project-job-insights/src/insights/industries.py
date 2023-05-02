from typing import List, Dict
from .jobs import read


def get_unique_industries(path: str) -> List[str]:
    data = read(path)
    industries = set()
    for job in data:
        if job["industry"]:
            industries.add(job["industry"])

    return list(industries)


def filter_by_industry(jobs: List[Dict], industry: str) -> List[Dict]:
    result = [job for job in jobs if job["industry"] == industry]

    return result
