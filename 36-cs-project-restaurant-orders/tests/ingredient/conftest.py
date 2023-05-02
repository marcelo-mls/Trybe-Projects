from unittest.mock import patch

import pytest
from pytest_dependency import build_mocked_assets

from src.models.ingredient import Ingredient
from tests.ingredient import mocks
from tests.ingredient.test_ingredient import test_ingredient

mocking = build_mocked_assets(
    mocks_module=mocks,
    asset_to_mock=Ingredient,
    test_function=test_ingredient,
)


@pytest.fixture(autouse=True, params=mocking)
def mock_it(request):
    with patch("tests.ingredient.test_ingredient.Ingredient", request.param):
        yield
