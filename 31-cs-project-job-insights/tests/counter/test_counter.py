from src.pre_built.counter import count_ocurrences


def test_counter():
    path = "data/jobs.csv"
    assert count_ocurrences(path, "python") == 1639
    assert count_ocurrences(path, "pYtHoN") == 1639
    assert count_ocurrences(path, "SQL") == 1748
    assert count_ocurrences(path, "science") == 4505
