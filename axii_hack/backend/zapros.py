from g4f.client import Client
import requests
from bs4 import BeautifulSoup





def get_text(url,num):
    headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1'
}
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        print(f"Ошибка при выполнении запроса к {url}: {response.status_code}")
        return 
    else:
        print ('da')
        # Парсинг HTML-кода страницы
        soup = BeautifulSoup(response.text, 'html.parser')

        # Извлечение текста из параграфов (можно изменить селектор в зависимости от структуры сайта)
        paragraphs = soup.find_all('p')
        text = ' '.join([p.get_text() for p in paragraphs])
        # with open(fr"C:\Programs\texts\{num+1}.txt", "w",encoding="utf-8") as file:
        #     file.write(text)
        return text




# text = open(r"C:\Programs\backend\sometext.txt","r", encoding="utf-8").read()


# client = Client()
# response = client.chat.completions.create(
#     model="gpt-4o-mini",
#     messages=[{"role": "user", "content": "Выдели текст страницы (который не включает в себя текст меню, навигации, фильтров) по данному html-коду" + text}],
#     # Add any other necessary parameters
# )
# print(response.choices[0].message.content)

