import sys
from ting_file_management.file_management import txt_importer


def process(path_file, instance):
    """Aqui irá sua implementação"""
    result = [data["nome_do_arquivo"] for data in instance.data]

    if path_file not in result:
        data_list = txt_importer(path_file)

        data_dict = {
            "nome_do_arquivo": path_file,
            "qtd_linhas": len(data_list),
            "linhas_do_arquivo": data_list,
        }

        instance.enqueue(data_dict)

        print(data_dict, file=sys.stdout)


def remove(instance):
    """Aqui irá sua implementação"""
    if not len(instance):
        print("Não há elementos", file=sys.stdout)
    else:
        file = instance.dequeue()
        data = file["nome_do_arquivo"]
        print(f"Arquivo {data} removido com sucesso", file=sys.stdout)


def file_metadata(instance, position):
    """Aqui irá sua implementação"""
    try:
        file = instance.search(position)
        print(file, file=sys.stdout)
    except IndexError:
        sys.stderr.write("Posição inválida")
