from flask import Flask, jsonify, request
from flask_cors import CORS
import links
import zapros
import GPT
import json

app = Flask(__name__)
CORS(app)


path = r""


filters = {
    1: "финансирования",
    2: "маркетинга и продвижения",
    3: "недвижимости",
    4: "консультирования",
    5: "поддержки экспорта",
    6: "регистрации, разрешении, экспертизы",
    7: "обеспечения хозяйственной деятельности",
    8: "выставок и ярмарок",
}

tax_systems = {
    1: "Общей системой налогообложения (ОСНО)",
    2: "Упрощенной системой налогообложения (УСН)",
    3: "Единым налогом на вмененный доход (ЕНВД)",
    4: "Единым сельскохозяйственным налогом (ЕСХН)",
    5: "Патентной системой налогообложения (ПСН)"
}


response = {
    "business": "Детская спортивная школа",
    "region": "Краснодар",
    "scale": 1,
    "taxSystem": 1,
    "filters": [
        1, 2, 3
    ]
}

def creating_promt(response):
    global filters
    global tax_systems
    named_filters = []
    prompt = "Получение  "  
    for i in response["filters"]:
        prompt +=  filters[i] + ", "
        named_filters.append(filters[i])
    prompt += " для региона " + response["region"]
    if (response["scale"] == 1):
        prompt += " Малого бизнеса"
    elif (response["scale"] == 2):
        prompt += " Среднего бизнеса"
    else:
        prompt += " Крупного бизнеса"
    prompt += " с " + tax_systems[response["taxSystem"]]
    prompt += " Для бизнеса '" + response["business"] + "' "
    return [prompt,named_filters]

def main():
    global tax_systems
    global filters
    global path
    

    # @app.route("/api/send_data", methods=["POST"])
    # def send_data():
    #     global response
    #     response = request.get_json()

    #     return response
    response = {
    "business": "Детская спортивная школа",
    "region": "Краснодар",
    "scale": 1,
    "taxSystem": 1,
    "filters": [
        1, 2, 3
        ]
    }
    # print (creating_promt(response))

    promt_list = creating_promt(response)
    print ("PROMT LIST = ", promt_list[1])
    print ("Запрос - " + promt_list[0])
    got_links = links.get_links(promt_list[0])
    print (f"ПОЛУЧЕННЫЕ ССЫЛКИ = {got_links}, КОЛИЧЕСТВО = {len(got_links)}")

    text = zapros.get_text(got_links[0]["link"],0)
    temp = GPT.get_gpt_text(text, promt_list[1])
    for i in range(1,len(got_links)):
        text = zapros.get_text(got_links[i]["link"],i)
        gpt_text = GPT.get_gpt_text(text, promt_list[1])
        print ("gpt_text = ", gpt_text)
        if (gpt_text != "error" and gpt_text):
            if (temp == None):
                temp = gpt_text
            else:    
                for x in range(len(promt_list[1])):
                    print ("x = ", x)
                    temp[x]["content"] += gpt_text[x]["content"]   
    with open("tempo.json", "a", encoding="utf-8") as file:
        json.dump(temp, file, ensure_ascii=False, indent=4)
    print (str(temp))
    Itog_gpt_text = GPT.gpt_progon(temp)  
    with open("Itog.json", "a", encoding="utf-8") as file:
        json.dump(Itog_gpt_text, file, ensure_ascii=False, indent=4)
#прогнать каждый тхт через чатгпт, потом в json еще раз пребразуем чтоб подровнять




if __name__ == "__main__":
    main()