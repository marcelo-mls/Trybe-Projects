from src.models.dish import Dish  # noqa: F401, E261, E501
from src.models.ingredient import Ingredient
import pytest


# Req 2
def test_dish():
    with pytest.raises(TypeError):
        Dish("dish", None)
    with pytest.raises(ValueError):
        Dish("dish", -10.00)

    dish_one = Dish("dish_one", 10.00)
    ingredient_one = Ingredient("ingredient_one")
    dish_one.add_ingredient_dependency(ingredient_one, 10)

    assert dish_one.name == "dish_one"
    assert dish_one.get_restrictions() == set()
    assert dish_one.__repr__() == "Dish('dish_one', R$10.00)"
    assert dish_one == dish_one
    assert hash(dish_one) == hash(repr(dish_one))
    assert dish_one.get_ingredients() == set({ingredient_one})
