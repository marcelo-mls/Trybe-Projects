from tech_news.database import search_news
from datetime import datetime


# Requisito 7
def search_by_title(title):
    query = {"title": {"$regex": title, "$options": "i"}}
    result = search_news(query)

    return [(news["title"], news["url"]) for news in result]


# Requisito 8
def search_by_date(date):
    try:
        # https://pt.stackoverflow.com/questions/330458/como-formatar-datas-em-python
        date_format = datetime.strptime(date, "%Y-%m-%d").strftime("%d/%m/%Y")
        query = {"timestamp": {"$regex": date_format, "$options": "i"}}
        result = search_news(query)

        return [(news["title"], news["url"]) for news in result]

    except ValueError:
        raise ValueError("Data inválida")


# Requisito 9
def search_by_category(category):
    query = {"category": {"$regex": category, "$options": "i"}}
    result = search_news(query)

    return [(news["title"], news["url"]) for news in result]
