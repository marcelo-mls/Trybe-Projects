from functools import lru_cache
from typing import List, Dict
import csv


@lru_cache
def read(path: str) -> List[Dict]:
    with open(path, mode="r", encoding="utf-8") as file:
        content = csv.DictReader(file, delimiter=",", quotechar='"')
        result = [row for row in content]
        return result


def get_unique_job_types(path: str) -> List[str]:
    data = read(path)
    job_types = set()
    for type in data:
        job_types.add(type["job_type"])

    result = [job_type for job_type in job_types]
    return result


def filter_by_job_type(jobs: List[Dict], job_type: str) -> List[Dict]:
    result = [job for job in jobs if job["job_type"] == job_type]

    return result
