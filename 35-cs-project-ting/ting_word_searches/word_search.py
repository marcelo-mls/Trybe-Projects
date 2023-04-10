def exists_word(word, instance):
    """Aqui irá sua implementação"""
    occurrences, data = list(), list()

    for i in range(len(instance)):
        iterable = instance.search(i)["linhas_do_arquivo"]

        for sentence in iterable:
            has_word = word.lower() in sentence.lower()

            if has_word:
                line = iterable.index(sentence)
                occurrences.append({
                    "linha": line + 1
                })

        data.append({
            "palavra": word,
            "arquivo": instance.search(i)["nome_do_arquivo"],
            "ocorrencias": occurrences,
        })

    result = [
        item
        for item in data
        if not len(item["ocorrencias"]) == 0
    ]

    return result


def search_by_word(word, instance):
    """Aqui irá sua implementação"""
