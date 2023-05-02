import itertools

import pytest

from src.models.dish import Recipe
from src.models.ingredient import Ingredient
from src.services.inventory_control import InventoryMapping, read_csv_inventory

BASE_INVENTORY = "tests/mocks/inventory_base_data.csv"
EXPECTED_INVENTORY = {
    "queijo mussarela": 300,
    "tomate": 300,
    "farinha": 350,
    "sal": 300,
    "cravo": 200,
    "água": 500,
    "orégano": 250,
    "molho shoyu": 200,
    "batata": 450,
    "fermento": 200,
    "bacon": 300,
    "manteiga": 300,
    "caldo de carne": 150,
    "manjericão": 300,
    "camarão": 200,
    "carne": 250,
    "creme de leite": 250,
    "frango": 300,
    "ovo": 250,
    "azeite": 200,
    "vinagre": 100,
    "queijo gorgonzola": 200,
    "salmão": 200,
    "alface": 200,
    "soja": 400,
    "queijo parmesão": 150,
    "queijo provolone": 250,
    "tofu": 300,
    "pepino": 200,
    "açúcar": 200,
    "limão": 250,
    "alho": 200,
    "vinho madeira": 150,
    "massa de lasanha": 200,
    "arroz": 300,
    "molho de tomate": 300,
    "cebola": 200,
    "massa de ravioli": 300,
    "farinha de trigo": 100,
    "presunto": 50,
    "berinjela": 20,
}


# ! Internal test, should always pass
def test_read_csv_inventory():
    assert read_csv_inventory(BASE_INVENTORY) == {
        Ingredient(name): amount for name, amount in EXPECTED_INVENTORY.items()
    }, "Default inventory file must not be modified"


# Req 5.1 part 1
# ? Check if all recipes with one ingredient at maximum available amount are
# ? available
@pytest.mark.parametrize(
    "ingredient, amount",
    [
        pytest.param(
            Ingredient(ingredient),
            amount,
            marks=pytest.mark.dependency(name=f"req_5_1_{index}"),
        )
        for index, (ingredient, amount) in enumerate(
            EXPECTED_INVENTORY.items()
        )
    ],
    ids=lambda x: f" amount {x}" if type(x) == int else f"{x} ",
)
def test_check_recipe_availability_okay(ingredient: str, amount: int):
    mapping = InventoryMapping(inventory_file_path=BASE_INVENTORY)
    is_recipe_available = mapping.check_recipe_availability(
        {ingredient: amount}
    )
    assert (
        is_recipe_available
    ), f"Recipe with {ingredient = } and {amount = } should be available"


# Req 5.1 part 2
# ? Check if all recipes with one ingredient at maximum available amount plus
# ? one are not available
@pytest.mark.parametrize(
    "ingredient, amount",
    [
        pytest.param(
            Ingredient(ingredient),
            amount + 1,
            marks=pytest.mark.dependency(name=f"req_5_1_{index}"),
        )
        for index, (ingredient, amount) in enumerate(
            EXPECTED_INVENTORY.items(), start=len(EXPECTED_INVENTORY)
        )
    ],
    ids=lambda x: f" amount {x}" if type(x) == int else f"{x} ",
)
def test_check_recipe_availability_not_okay(ingredient: str, amount: int):
    mapping = InventoryMapping(inventory_file_path=BASE_INVENTORY)
    is_recipe_available = mapping.check_recipe_availability(
        {ingredient: amount}
    )
    assert (
        not is_recipe_available
    ), f"Recipe with {ingredient = } and {amount = } should not be available"


# Req 5.2 part 1
@pytest.mark.parametrize(
    "recipe",
    [
        pytest.param(
            {Ingredient("limão"): 10, Ingredient("fermento"): 10},
            marks=pytest.mark.dependency(name="req_5_2_1"),
        ),
        pytest.param(
            {Ingredient("fermento"): 10, Ingredient("limão"): 240},
            marks=pytest.mark.dependency(name="req_5_2_2"),
        ),
        pytest.param(
            {Ingredient("fermento"): 180},
            marks=pytest.mark.dependency(name="req_5_2_3"),
        ),
        pytest.param({}, marks=pytest.mark.dependency(name="req_5_2_4")),
    ],
    ids=lambda x: f" amount {x}" if type(x) == int else f"{x} ",
)
def test_consume_recipe_okay(recipe: Recipe):
    mapping = InventoryMapping(inventory_file_path=BASE_INVENTORY)

    previous_inventory_amount = {
        ingredient: mapping.inventory[ingredient]
        for ingredient, value in recipe.items()
    }
    try:
        assert (
            mapping.consume_recipe(recipe) is None
        ), "consume_recipe should return None"
    except Exception:
        assert False, "Consume recipe should not raise any errors"

    for ingredient, amount in recipe.items():
        current_amount = mapping.inventory[ingredient]
        expected_amount = previous_inventory_amount[ingredient] - amount
        assert (
            current_amount == expected_amount
        ), "consume_recipe should consume the ingredients from the inventory"


# Req 5.2 part 2
@pytest.mark.dependency(name="req_5_2_5")
def test_consume_recipe_raises_error():
    mapping = InventoryMapping(inventory_file_path=BASE_INVENTORY)

    with pytest.raises(ValueError):
        mapping.consume_recipe({Ingredient("limão"): 251})
    with pytest.raises(ValueError):
        mapping.consume_recipe({Ingredient("fermento"): 201})
    with pytest.raises(ValueError):
        mapping.consume_recipe({Ingredient("fermento"): 10})
        mapping.consume_recipe({Ingredient("fermento"): 191})


# Req 5
@pytest.mark.dependency(
    depends=list(
        itertools.chain(
            [
                f"req_5_1_{sub_req}"
                for sub_req in range(len(EXPECTED_INVENTORY) * 2)
            ],
            [f"req_5_2_{x}" for x in range(1, 6)],
        )
    )
)
def test_inventory_mapping():
    pass
