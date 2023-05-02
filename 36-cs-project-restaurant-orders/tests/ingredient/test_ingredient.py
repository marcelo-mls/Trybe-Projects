from src.models.ingredient import Ingredient  # noqa: F401, E261, E501


# Req 1
def test_ingredient():
    instance_one = Ingredient("ingredient_one")
    instance_two = Ingredient("ingredient_two")

    assert instance_one.name == "ingredient_one"
    assert hash(instance_two) == hash("ingredient_two")
    assert instance_one.__repr__() == "Ingredient('ingredient_one')"
    assert instance_two == instance_two
    assert instance_one != instance_two
    assert instance_two.restrictions == set()
