from typing import List

import pytest

from src.models.dish import Dish
from src.models.ingredient import Ingredient
from src.services.menu_data import MenuData
from tests.ingredients import INGREDIENTS


@pytest.fixture()
def menu_data() -> MenuData:
    return MenuData("tests/mocks/menu_base_data.csv")


@pytest.fixture()
def menu_data_dishes(menu_data: MenuData) -> List[Dish]:
    return sorted(list(menu_data.dishes), key=lambda dish: dish.name)


# Testes do Req 3.1
@pytest.mark.dependency()
def test_correct_menu_data_length(menu_data: MenuData):
    assert len(menu_data.dishes) == 2


# Testes do Req 3.2
@pytest.mark.dependency()
def test_dishes_in_menu(menu_data: MenuData, dishes: List[Dish]):
    assert dishes[0] in menu_data.dishes
    assert dishes[1] in menu_data.dishes


# Testes do Req 3.3
@pytest.mark.dependency()
def test_quantity_of_ingredients_in_dishes(menu_data_dishes: List[Dish]):
    dish_1, dish_2 = menu_data_dishes
    dish_1_ingredients = list(dish_1.get_ingredients())
    dish_2_ingredients = list(dish_2.get_ingredients())

    assert len(dish_1_ingredients) == 6
    assert len(dish_2_ingredients) == 6


def id_func(val: int):
    if val == 0:
        return " dish: lasanha de berinjela "
    if val == 1:
        return " dish: lasanha de presunto "
    if val < 0:
        return repr(INGREDIENTS[val]) + " "
    return f" amount: {val}"


# Testes do Req 3.4
@pytest.mark.parametrize(
    ["ingredient_id", "dish_id", "expected_amount"],
    [
        pytest.param(-1, 0, 15, marks=pytest.mark.dependency(name="-1, 0")),
        pytest.param(-3, 0, 10, marks=pytest.mark.dependency(name="-3, 0")),
        pytest.param(-4, 0, 5, marks=pytest.mark.dependency(name="-4, 0")),
        pytest.param(-5, 0, 10, marks=pytest.mark.dependency(name="-5, 0")),
        pytest.param(-6, 0, 10, marks=pytest.mark.dependency(name="-6, 0")),
        pytest.param(-7, 0, 15, marks=pytest.mark.dependency(name="-7, 0")),
        pytest.param(-2, 1, 15, marks=pytest.mark.dependency(name="-2, 1")),
        pytest.param(-3, 1, 10, marks=pytest.mark.dependency(name="-3, 1")),
        pytest.param(-4, 1, 5, marks=pytest.mark.dependency(name="-4, 1")),
        pytest.param(-5, 1, 10, marks=pytest.mark.dependency(name="-5, 1")),
        pytest.param(-6, 1, 10, marks=pytest.mark.dependency(name="-6, 1")),
        pytest.param(-7, 1, 15, marks=pytest.mark.dependency(name="-7, 1")),
    ],
    ids=id_func,
)
def test_ingredient_quantity_in_dish(
    menu_data_dishes: List[Dish],
    ingredients: List[Ingredient],
    ingredient_id: int,
    dish_id: int,
    expected_amount: int,
):
    dish = menu_data_dishes[dish_id]
    dish_ingredients = list(dish.get_ingredients())

    expected_ingredient = ingredients[ingredient_id]
    assert expected_ingredient in dish_ingredients

    given_amount = dish.recipe.get(expected_ingredient)
    assert given_amount == expected_amount


# Testes do Req 3
@pytest.mark.dependency(
    depends=[
        "test_correct_menu_data_length",
        "test_dishes_in_menu",
        "test_quantity_of_ingredients_in_dishes",
        "-1, 0",
        "-3, 0",
        "-4, 0",
        "-5, 0",
        "-6, 0",
        "-7, 0",
        "-2, 1",
        "-3, 1",
        "-4, 1",
        "-5, 1",
        "-6, 1",
        "-7, 1",
    ]
)
def test_menu_data():
    pass
