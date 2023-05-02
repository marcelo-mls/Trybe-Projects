from inventory_report.inventory.product import Product


def test_relatorio_produto():
    p = Product(
        1,
        "produto",
        "empresa",
        "04/03/23",
        "05/03/23",
        "serie",
        "instrucoes_de_armazenamento",
    )

    expected_output = (
        'O produto produto fabricado em 04/03/23 por empresa com validade'
        ' até 05/03/23 precisa ser armazenado instrucoes_de_armazenamento.'
        )

    assert p.__repr__() == expected_output
