from src.pre_built.brazilian_jobs import read_brazilian_file


def test_brazilian_jobs():
    path = "tests/mocks/brazilians_jobs.csv"
    output_sample = {
        "title": "Analista de Software",
        "salary": "4000",
        "type": "full time",
    }

    data = read_brazilian_file(path)

    assert 'title' and 'salary' and 'type' in data[0]
    assert data[2] == output_sample
