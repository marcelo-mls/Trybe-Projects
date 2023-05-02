from typing import List

import pytest

from src.models.dish import Dish
from src.models.ingredient import Ingredient
from tests.ingredients import INGREDIENTS


@pytest.fixture()
def ingredients() -> List[Ingredient]:
    return list(INGREDIENTS)


@pytest.fixture()
def dishes(ingredients: List[Ingredient]) -> List[Dish]:
    dish_1 = Dish("lasanha berinjela", 27.00)
    dish_2 = Dish("lasanha presunto", 25.90)

    dish_1.add_ingredient_dependency(ingredients[0], 15)
    dish_1.add_ingredient_dependency(ingredients[1], 10)
    dish_1.add_ingredient_dependency(ingredients[2], 10)
    dish_1.add_ingredient_dependency(ingredients[3], 5)
    dish_1.add_ingredient_dependency(ingredients[4], 10)
    dish_1.add_ingredient_dependency(ingredients[6], 15)

    dish_2.add_ingredient_dependency(ingredients[0], 15)
    dish_2.add_ingredient_dependency(ingredients[1], 10)
    dish_2.add_ingredient_dependency(ingredients[2], 10)
    dish_2.add_ingredient_dependency(ingredients[3], 5)
    dish_2.add_ingredient_dependency(ingredients[4], 10)
    dish_2.add_ingredient_dependency(ingredients[5], 15)

    return [dish_1, dish_2]
