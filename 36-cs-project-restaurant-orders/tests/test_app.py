import pytest
from fastapi.testclient import TestClient
from pytest_unordered import unordered

from src.app import app


@pytest.fixture()
def client():
    return TestClient(app)


def test_get_main_with_no_restrictions(client: TestClient):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == unordered(
        [
            {
                "dish_name": "lasanha berinjela",
                "ingredients": unordered(
                    [
                        {"name": "farinha de trigo", "restrictions": []},
                        {"name": "água", "restrictions": []},
                        {"name": "berinjela", "restrictions": []},
                        {"name": "sal", "restrictions": []},
                        {"name": "tomate", "restrictions": []},
                        {
                            "name": "queijo mussarela",
                            "restrictions": unordered(
                                ["LACTOSE", "ANIMAL_DERIVED"]
                            ),
                        },
                    ]
                ),
                "price": 27.0,
                "restrictions": unordered(["LACTOSE", "ANIMAL_DERIVED"]),
            },
            {
                "dish_name": "lasanha presunto",
                "ingredients": unordered(
                    [
                        {"name": "farinha de trigo", "restrictions": []},
                        {"name": "água", "restrictions": []},
                        {
                            "name": "presunto",
                            "restrictions": unordered(
                                ["ANIMAL_MEAT", "ANIMAL_DERIVED"]
                            ),
                        },
                        {"name": "sal", "restrictions": []},
                        {"name": "tomate", "restrictions": []},
                        {
                            "name": "queijo mussarela",
                            "restrictions": unordered(
                                ["LACTOSE", "ANIMAL_DERIVED"]
                            ),
                        },
                    ]
                ),
                "price": 25.9,
                "restrictions": unordered(
                    ["ANIMAL_MEAT", "LACTOSE", "ANIMAL_DERIVED"]
                ),
            },
        ]
    )


def test_get_main_with_restriction(client: TestClient):
    response = client.get("/?restriction=ANIMAL_MEAT")
    assert response.status_code == 200
    assert response.json() == [
        {
            "dish_name": "lasanha berinjela",
            "ingredients": unordered(
                [
                    {"name": "tomate", "restrictions": []},
                    {"name": "berinjela", "restrictions": []},
                    {
                        "name": "queijo mussarela",
                        "restrictions": unordered(
                            ["LACTOSE", "ANIMAL_DERIVED"]
                        ),
                    },
                    {"name": "sal", "restrictions": []},
                    {"name": "água", "restrictions": []},
                    {"name": "farinha de trigo", "restrictions": []},
                ]
            ),
            "price": 27.0,
            "restrictions": unordered(["LACTOSE", "ANIMAL_DERIVED"]),
        }
    ]


@pytest.mark.dependency()
def test_post_order_okay(client: TestClient):
    response = client.post("/order?dish_name=lasanha berinjela")
    assert response.status_code == 201


@pytest.mark.dependency(depends=["test_post_order_okay"])
def test_post_order_not_enough_ingredients(client: TestClient):
    response = client.post("/order?dish_name=lasanha berinjela")
    assert response.status_code == 406


def test_post_order_invalid_dishes(client: TestClient):
    response = client.post("/order?dish_name=lasanha_berinjela")
    assert response.status_code == 404
