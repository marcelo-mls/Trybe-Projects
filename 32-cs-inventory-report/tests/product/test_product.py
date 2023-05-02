from inventory_report.inventory.product import Product


def test_cria_produto():
    p = Product(
        1,
        "produto",
        "empresa",
        "04/03/23",
        "05/03/23",
        "serie",
        "instrucoes_de_armazenamento",
    )

    assert isinstance(p.id, int)
    assert isinstance(p.nome_do_produto, str)
    assert isinstance(p.nome_da_empresa, str)
    assert p.data_de_fabricacao == "04/03/23"
    assert p.data_de_validade == "05/03/23"
    assert p.numero_de_serie == "serie"
    assert p.instrucoes_de_armazenamento == "instrucoes_de_armazenamento"
