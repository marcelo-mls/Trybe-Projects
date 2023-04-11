def is_anagram(first_string, second_string):
    if len(first_string) == 0 and len(second_string) == 0:
        return (first_string, second_string, False)

    array_a, array_b = list(first_string.lower()), list(second_string.lower())

    merge_sort(array_a)
    merge_sort(array_b)

    array_a, array_b = "".join(array_a), "".join(array_b)

    return (array_a, array_b, array_a == array_b)


"""
Funções merge_sort e merge extraídas do course

>> Módulo: Ciência da Computação
    >> Algoritmos
        >> Dia 03: Algoritmos de ordenação e busca
            >> Algoritmos que usam dividir e conquistar
"""


def merge_sort(numeros, inicio=0, fim=None):
    if fim is None:
        fim = len(numeros)

    if (fim - inicio) > 1:
        meio = (inicio + fim) // 2
        merge_sort(numeros, inicio, meio)
        merge_sort(numeros, meio, fim)
        merge(numeros, inicio, meio, fim)


def merge(numeros, inicio, meio, fim):
    esquerda = numeros[inicio:meio]
    direita = numeros[meio:fim]

    indice_a_esquerda = 0
    indice_a_direita = 0

    for indice in range(inicio, fim):

        if indice_a_esquerda >= len(esquerda):
            numeros[indice] = direita[indice_a_direita]
            indice_a_direita = indice_a_direita + 1

        elif indice_a_direita >= len(direita):
            numeros[indice] = esquerda[indice_a_esquerda]
            indice_a_esquerda = indice_a_esquerda + 1

        elif esquerda[indice_a_esquerda] < direita[indice_a_direita]:
            numeros[indice] = esquerda[indice_a_esquerda]
            indice_a_esquerda = indice_a_esquerda + 1

        else:
            numeros[indice] = direita[indice_a_direita]
            indice_a_direita = indice_a_direita + 1
