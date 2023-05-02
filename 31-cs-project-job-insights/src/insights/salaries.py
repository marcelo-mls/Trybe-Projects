from typing import Union, List, Dict
from .jobs import read


def get_max_salary(path: str) -> int:
    data = read(path)
    salaries = set()
    for job in data:
        if job["max_salary"].isnumeric():
            salaries.add(int(job["max_salary"]))

    return max(salaries)


def get_min_salary(path: str) -> int:
    data = read(path)
    salaries = set()
    for job in data:
        if job["min_salary"].isnumeric():
            salaries.add(int(job["min_salary"]))

    return min(salaries)


def matches_salary_range(job: Dict, salary: Union[int, str]) -> bool:
    try:
        max = int(job["max_salary"])
        min = int(job["min_salary"])
        if min > max:
            # o valor de min_salary é maior que o valor de max_salary
            raise ValueError
        return min <= int(salary) <= max

    except (KeyError, TypeError):
        # alguma das chaves min_salary/max_salary estão ausentes no dicionário
        # alguma das chaves min_salary ou max_salary tem valores não-numéricos
        # o parâmetro salary tem valores não numéricos
        raise ValueError


def filter_by_salary_range(
    jobs: List[dict], salary: Union[str, int]
) -> List[Dict]:
    filtered_jobs = list()

    for job in jobs:
        try:
            if matches_salary_range(job, salary):
                filtered_jobs.append(job)
        except ValueError as error:
            print(error)

    return filtered_jobs
