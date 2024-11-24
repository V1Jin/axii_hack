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
    ],
    "query": None
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


def magic(response):
    global tax_systems
    global filters
    global path

    # print (creating_promt(response))
    print ("magic is running...")
    promt_list = creating_promt(response)
    print ("PROMT LIST = ", promt_list[1])
    print ("Запрос - " + promt_list[0])
    got_links = links.get_links(promt_list[0])
    print (f"ПОЛУЧЕННЫЕ ССЫЛКИ = {got_links}, КОЛИЧЕСТВО = {len(got_links)}")

    text = zapros.get_text(got_links[0]["link"],0)
    temp = GPT.get_gpt_text(text, promt_list[1])
    for i in range(1,len(got_links)-9):
        try:
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
        except Exception as ex: print ("ERRORR === ", ex)   
    with open("tempo.json", "a", encoding="utf-8") as file:
        json.dump(temp, file, ensure_ascii=False, indent=4)

    print (str(temp))
    for i in range(len(promt_list[1])):
        Itog_gpt_text = GPT.gpt_progon(temp[i]["content"])
        if (Itog_gpt_text != None and Itog_gpt_text != "error"):
            temp[i]["content"] = Itog_gpt_text
    with open("Itog.json", "a", encoding="utf-8") as file:
        json.dump(temp, file, ensure_ascii=False, indent=4)
#прогнать каждый тхт через чатгпт, потом в json еще раз пребразуем чтоб подровнять

def magic_query(response):
    print ("magic query is running...")
    text = GPT.gpt_query(response)
    print (text)
    with open("Itog.txt", "a", encoding="utf-8") as file:
        file.write(text)


# def main():
#     global app
#     app.run(debug=False)
@app.route("/api/send_data", methods=["POST"])
def send_data():
    open("Itog.json","w").close()
    open("answer.json","w").close()
    open("tempo.json","w").close()
    # global response
    response = request.get_json()
    magic(response)
    with open("Itog.json","r",encoding="utf-8") as file:
        data = json.load(file)
    return data
@app.route("/api/send_query", methods=["POST"])
def send_query():
    open("Itog.json","w").close()
    open("answer.json","w").close()
    open("tempo.json","w").close()
    # global response
    response = request.get_json()
    magic_query(response["query"])
    with open("Itog.txt","r",encoding="utf-8") as file:
        data = str(file.read())
    print ("Sent data_query = ", data)
    return jsonify(query = data)


if __name__ == "__main__":
    # main()
    app.run(debug=False)
