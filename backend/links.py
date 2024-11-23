from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import json
from loguru import logger
import os

path = r"C:\\Programs\\"  
#до папки backend, не включая её


def get_html_with_selenium(url):
    """Получение HTML страницы через Selenium."""
    options = Options()
    options.headless = True
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    service = Service(path  + "backend/chromedriver/chromedriver.exe")  # Укажите путь к chromedriver

    driver = webdriver.Chrome(service=service, options=options)
    driver.get(url)

    # Ждём, пока страница прогрузится
    driver.implicitly_wait(10)
    html = driver.page_source
    driver.quit()
    return html


def parse_yandex_results(html):
    """Парсинг HTML для извлечения ссылок и названий."""
    soup = BeautifulSoup(html, "lxml")
    results = []

    for item in soup.find_all("li", {"class": "serp-item"}):
        title = item.find("h2")
        link = item.find("a", href=True)
        if title and link and link["href"].count("yabs") == 0 :
            results.append({
                "title": title.text.strip(),
                "link": link["href"]
            })

    return results


def get_links(query):
    url = f"https://yandex.ru/search/?text={query}&p=0"
    logger.info(f"Fetching results for query: {query}")

    # Получение HTML через Selenium
    html = get_html_with_selenium(url)
    results = parse_yandex_results(html)

    # Сохранение результатов
    # if (results):
    #     with open("yandex_search_results.json", "w", encoding="utf-8") as f:
    #         json.dump(results, f, ensure_ascii=False, indent=4)

    logger.info(f"Collected {len(results)} results.")
    return results


