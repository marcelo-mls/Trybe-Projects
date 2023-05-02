from numbers import Real

from models.dish import Dish
from models.ingredient import Ingredient, Restriction


class _TestDishInvalidDishName(Dish):
    """Garanta que o nome passado no construtor está correto no atributo name"""  # noqa: E501

    name_add = "isto não deveria fazer parte do nome"

    def __init__(self, name: str, price: float) -> None:
        super().__init__(name, price)
        self.name = name + self.name_add

    def __repr__(self) -> str:
        return super().__repr__().replace(self.name_add, "")


class _TestDishInvalidTypeErrorCheckOnConstructor(Dish):
    """Garanta que o construtor emite TypeError quando deveria"""

    def __init__(self, name: str, price: float) -> None:
        self.name = name
        if price == -1:
            raise ValueError("Dish price must be greater then zero.")
        self.price = price
        self.recipe = {}


class _TestDishInvalidValueErrorCheckOnConstructor(Dish):
    """Garanta que o construtor emite ValueError quando deveria"""

    def __init__(self, name: str, price: float) -> None:
        self.name = name

        if not isinstance(price, Real):
            raise TypeError("Dish price must be float.")

        self.price = price
        self.recipe = {}


class _TestDishInvalidHashEqual(Dish):
    """Garanta que hashs de pratos iguais também sejam iguais"""

    counter = 1

    @classmethod
    def __hash__(cls):
        cls.counter += 1
        return hash(cls.counter)


class _TestDishInvalidHashDifferent(Dish):
    """Garanta que hashs de pratos diferentes também sejam diferentes"""

    def __hash__(cls):
        return hash(1)


class _TestDishInvalidEqualEqual(Dish):
    """Garanta que o operador de igualdade identifique pratos iguais"""

    def __eq__(self, other: object) -> bool:
        return False

    # ? Overwrite/redefine dunder hash is mandatory when overwriting dunder eq
    def __hash__(self):
        return super().__hash__()


class _TestDishInvalidEqualDifferent(Dish):
    """Garanta que o operador de igualdade identifique pratos iguais"""

    def __eq__(self, other: object) -> bool:
        return not super().__eq__(other)

    # ? Overwrite/redefine dunder hash is mandatory when overwriting dunder eq
    def __hash__(self):
        return hash(self.name)


class _TestDishInvalidRepr(Dish):
    """Garanta que o método __repr__ tenha o comportamento esperado"""

    def __repr__(self) -> str:
        return super().__repr__() + "aloha"


class _TestDishInvalidAddIngredientDependency(Dish):
    """Garanta que o método add_ingredient_dependency tenha o comportamento esperado"""  # noqa: E501

    def add_ingredient_dependency(self, ingredient, amount: int):
        return


class _TestDishInvalidGetRestrictions(Dish):
    """Garanta que o método get_restrictions tenha o comportamento esperado"""  # noqa: E501

    def get_restrictions(self):
        initial_restrictions = super().get_restrictions()

        if initial_restrictions:
            initial_restrictions.clear()
        else:
            initial_restrictions.add(Restriction.ANIMAL_MEAT)

        return initial_restrictions


class _TestDishInvalidGetIngredients(Dish):
    """Garanta que o método get_restrictions tenha o comportamento esperado"""  # noqa: E501

    def get_ingredients(self):
        initial_ingredients = super().get_ingredients()

        if initial_ingredients:
            initial_ingredients.clear()
        else:
            initial_ingredients.update(
                {Ingredient("banana"), Ingredient("uva")}
            )

        return initial_ingredients
