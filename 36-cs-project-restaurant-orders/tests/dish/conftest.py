from unittest.mock import patch

import pytest
from _pytest.outcomes import Failed
from pytest_dependency import build_mocked_assets

from src.models.dish import Dish
from tests.dish import mocks
from tests.dish.test_dish import test_dish

mocking = build_mocked_assets(
    mocks_module=mocks,
    asset_to_mock=Dish,
    test_function=test_dish,
    custom_exceptions={
        mocks._TestDishInvalidTypeErrorCheckOnConstructor: Failed,
        mocks._TestDishInvalidValueErrorCheckOnConstructor: Failed,
    },
)


@pytest.fixture(autouse=True, params=mocking)
def mock_it(request):
    with patch("tests.dish.test_dish.Dish", request.param):
        yield
