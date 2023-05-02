from src.models.ingredient import Ingredient, Restriction, restriction_map


class _TestIngredientInvalidName(Ingredient):
    """Garanta que o nome passado no construtor está correto no atributo name"""  # noqa: E501

    def __init__(self, name: str) -> None:
        self._name = name
        self.name = name + "isto não deveria fazer parte do nome"
        self.restrictions = restriction_map().get(name, set())

    def __hash__(self):
        return hash(self._name)

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Ingredient):
            return NotImplemented
        return repr(self) == repr(other)

    def __repr__(self) -> str:
        return f"Ingredient('{self._name}')"


class _TestIngredientInvalidHashEqual(Ingredient):
    """Garanta que hashs de ingredientes iguais também sejam iguais"""

    counter = 1

    @classmethod
    def __hash__(cls):
        cls.counter += 1
        return hash(cls.counter)


class _TestIngredientInvalidHashDifferent(Ingredient):
    """Garanta que hashs de ingredientes diferentes também sejam diferentes"""

    def __hash__(cls):
        return hash(1)


class _TestIngredientInvalidEqualEqual(Ingredient):
    """Garanta que o operador de igualdade identifique ingredientes iguais"""

    def __eq__(self, other: object) -> bool:
        return False

    # ? Overwrite/redefine dunder hash is mandatory when overwriting dunder eq
    def __hash__(self):
        return super().__hash__()


class _TestIngredientInvalidEqualDifferent(Ingredient):
    """Garanta que o operador de igualdade identifique ingredientes iguais"""

    def __eq__(self, other: object) -> bool:
        return not super().__eq__(other)

    # ? Overwrite/redefine dunder hash is mandatory when overwriting dunder eq
    def __hash__(self):
        return hash(self.name)


class _TestIngredientInvalidRepr(Ingredient):
    """Garanta que o método __repr__ tenha o comportamento esperado"""

    def __repr__(self) -> str:
        return super().__repr__() + "aloha"


class _TestIngredientInvalidRestrictionMap(Ingredient):
    """Garanta que o atributo restrictions seja preenchido corretamente"""

    def __init__(self, name: str) -> None:
        super().__init__(name)
        if self.restrictions:
            self.restrictions.clear()
        else:
            self.restrictions.add(Restriction.ANIMAL_MEAT)
