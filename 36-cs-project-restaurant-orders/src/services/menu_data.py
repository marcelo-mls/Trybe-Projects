import csv
from src.models.dish import Dish
from src.models.ingredient import Ingredient


# Req 3
class MenuData:
    def __init__(self, source_path: str) -> None:
        self.dishes = set()
        self.path = source_path

        with open(self.path) as file:
            content = csv.DictReader(file)
            orders = list(content)

        for order in orders:
            name = order["dish"]
            price = float(order["price"])
            ingredient = Ingredient(order["ingredient"])
            amount = int(order["recipe_amount"])

            self.dishes.add(Dish(name, price))

            for dish in self.dishes:
                if dish.name == name:
                    dish.add_ingredient_dependency(ingredient, amount)
