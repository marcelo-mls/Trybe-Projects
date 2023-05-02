from typing import Iterator, List, TypedDict

import pytest
from pandas import DataFrame

from src.models.dish import Dish
from src.models.ingredient import Ingredient, Restriction
from src.services.menu_builder import MenuBuilder

DATA_PATH = "tests/mocks/menu_base_data.csv"
INVENTORY_PATH = "tests/mocks/inventory_base_data.csv"


class DictDish(TypedDict):
    dish_name: str
    price: float
    restrictions: Iterator[Restriction]
    ingredients: Iterator[Ingredient]


def compare_dishes_ingredients(
    given_dish: DictDish, expected_dish: Dish
) -> bool:
    for ingredient in given_dish["ingredients"]:
        ingredients = expected_dish.get_ingredients()
        if ingredient not in ingredients:
            return False
    return True


def compare_dishes_restrictions(
    given_dish: DictDish, expected_dish: Dish
) -> bool:
    for given_restriction in given_dish["restrictions"]:
        for possible_expected_restriction in expected_dish.get_restrictions():
            if repr(given_restriction) == repr(possible_expected_restriction):
                break
        else:
            return False
    return True


def compare_dishes(given_dish: DictDish, expected_dish: Dish) -> bool:
    if (
        (not given_dish["dish_name"] == expected_dish.name)
        or (not given_dish["price"] == expected_dish.price)
        or (not compare_dishes_ingredients(given_dish, expected_dish))
        or (not compare_dishes_restrictions(given_dish, expected_dish))
    ):
        return False
    return True


def get_dishes_from_menu(menu: DataFrame) -> List[DictDish]:
    dishes = [{} for _ in range(len(menu))]
    for label, contents in menu.items():
        for index, content in enumerate(contents):
            dishes[index][label] = content

    dishes.sort(key=lambda dish: dish["dish_name"])
    return dishes


# Testes do requisito 4.1
@pytest.mark.dependency(name="req_4_1")
def test_get_main_menu_returns_a_data_frame():
    menu = MenuBuilder(
        data_path=DATA_PATH, inventory_path=INVENTORY_PATH
    ).get_main_menu()

    assert isinstance(menu, DataFrame)


# Testes do requisito 4.2
@pytest.mark.dependency(name="req_4_2", depends=["req_4_1"])
def test_get_main_menu_data_frame_have_correct_keys():
    menu = MenuBuilder(
        data_path=DATA_PATH, inventory_path=INVENTORY_PATH
    ).get_main_menu()
    menu_keys = menu.keys()

    assert "dish_name" in menu_keys
    assert "ingredients" in menu_keys
    assert "price" in menu_keys
    assert "restrictions" in menu_keys


# Testes do requisito 4.3
@pytest.mark.dependency(name="req_4_3", depends=["req_4_2"])
def test_get_main_menu_returns_all_dishes_when_called_with_no_restrictions(
    dishes: List[Dish],
):
    menu = MenuBuilder(
        data_path=DATA_PATH, inventory_path=INVENTORY_PATH
    ).get_main_menu()
    assert len(menu) == 2

    given_dishes = get_dishes_from_menu(menu)

    # ? Checa se os pratos são os mesmos que estão no banco de dados
    assert compare_dishes(given_dish=given_dishes[0], expected_dish=dishes[0])
    assert compare_dishes(given_dish=given_dishes[1], expected_dish=dishes[1])


# Testes do requisito 4.4
@pytest.mark.dependency(name="req_4_4", depends=["req_4_2"])
def test_get_main_menu_returns_all_dishes_when_called_with_restriction(
    dishes: List[Dish],
):
    menu = MenuBuilder(
        data_path=DATA_PATH, inventory_path=INVENTORY_PATH
    ).get_main_menu(restriction=Restriction.ANIMAL_MEAT)
    assert len(menu) == 1

    given_dishes = get_dishes_from_menu(menu)
    assert compare_dishes(given_dish=given_dishes[0], expected_dish=dishes[0])


# Testes do requisito 4.5
@pytest.mark.dependency(name="req_4_5", depends=["req_4_2"])
def test_get_main_menu_returns_no_dishes_when_called_with_restriction():
    menu = MenuBuilder(
        data_path=DATA_PATH, inventory_path=INVENTORY_PATH
    ).get_main_menu(restriction=Restriction.ANIMAL_DERIVED)
    assert len(menu) == 0


# Testes do requisito 4
@pytest.mark.dependency(depends=["req_4_3", "req_4_4", "req_4_5"])
def test_get_main_menu():
    pass


# Testes do requisito 6
@pytest.mark.dependency(depends=["req_4_3", "req_4_4"])
def test_get_main_menu_returns_no_dishes_when_ingredients_are_not_available():
    """Reforçando: Teste relativo ao requsito 6"""
    menu = MenuBuilder(
        data_path=DATA_PATH,
        inventory_path="tests/mocks/inventory_base_data_2.csv",
    ).get_main_menu()
    assert len(menu) == 0
