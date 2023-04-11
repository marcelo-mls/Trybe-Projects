import requests
from time import sleep
from parsel import Selector
from tech_news.database import create_news


# Requisito 1
def fetch(url):
    sleep(1)
    headers = {"user-agent": "Fake user-agent"}

    try:
        response = requests.get(url, headers=headers, timeout=3)
        if response.status_code == 200:
            return response.text

    except requests.Timeout:
        return None


# Requisito 2
def scrape_updates(html_content):
    selector = Selector(html_content)
    posts = selector.css("h2.entry-title a::attr(href)").getall()

    return posts


# Requisito 3
def scrape_next_page_link(html_content):
    selector = Selector(html_content)
    next_page = selector.css("a.next::attr(href)").get()

    if not next_page:
        return None

    return next_page


# Requisito 4
def scrape_news(html_content):
    selector = Selector(html_content)
    news = dict()

    reading_time = selector.css("li.meta-reading-time::text").get()
    summ = selector.css("div.entry-content > p:first-of-type *::text").getall()

    news["url"] = selector.css("link[rel='canonical']::attr(href)").get()
    news["title"] = selector.css("h1.entry-title::text").get().strip()
    news["timestamp"] = selector.css("li.meta-date::text").get()
    news["writer"] = selector.css("span.author > a::text").get()
    news["reading_time"] = int(reading_time[0:2])
    news["summary"] = "".join(summ).strip()
    news["category"] = selector.css("span.label::text").get()

    return news


# Requisito 5
def get_tech_news(amount):
    tech_news = []
    curr_url = "https://blog.betrybe.com/"

    while curr_url is not None and len(tech_news) < amount:
        html_content = fetch(curr_url)
        urls = scrape_updates(html_content)

        for url in urls:
            if len(tech_news) >= amount:
                break
            else:
                html = fetch(url)
                news = scrape_news(html)
                tech_news.append(news)

        next_url = scrape_next_page_link(html_content)
        curr_url = next_url

    create_news(tech_news)
    return tech_news
