from challenges.challenge_encrypt_message import encrypt_message
import pytest


def test_encrypt_message():
    with pytest.raises(TypeError):
        encrypt_message('message', 'str')

    assert encrypt_message('maior', 10) == 'roiam'
    assert encrypt_message('par', 2) == 'r_ap'
    assert encrypt_message('impar', 3) == 'pmi_ra'
