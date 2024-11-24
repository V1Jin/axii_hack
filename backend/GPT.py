from g4f.client import Client
import json


def get_gpt_text(text,filters):
    client = Client()
    print ("GPT - ЗАПРОС =  Summarize text and Put the text on the titles(" + ', '.join(filters) + ") and return dict like [{title: "",content: ""},] on russian language, где:" )
    stroka = "Summarize text and Put the text on the titles(" + ', '.join(filters) + ") and return dict like [{title: "",content: ""},] on russian language, где: ", text
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": "Summarize text and Put the text on the titles(" + ', '.join(filters) + ") and return dict like [{title: "",content: ""},] on russian language, где: " + text }],
        # Add any other necessary parameters
    )
    # print (response.choices[0].message.content)

    # answer = response.choices[0].message.content
    # print (answer)
    jason = response.choices[0].message.content[8:-4]
    print (f"\n\nJSON: \n{jason}")
    try:
        if (jason):
            data = json.loads(jason)
            print ("TYPE DATA = ", type(data))
            with open (r"C:\Programs\answer.json", "a", encoding="utf-8") as file:
                json.dump(data, file, ensure_ascii=False, indent=4)
                # file.write(data)
                # file.write("\n\n\n\n\n\n")
            # return json.dumps(data, ensure_ascii=False, indent=4)
            # return response.choices[0].message.content
            return data
    except Exception as ex: 
        print ("error = ", ex)
        return "error"
    

def gpt_progon(text):
    client = Client()
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": "Не изменяй никакие слова в тексте, ты должен подравнять текст, чтоб он читался лучше " + text }],
        # Add any other necessary parameters
    )
    jason = response.choices[0].message.content[8:-4]
    print (f"\n\nJSON: \n{jason}")
    try:
        if (jason):
            data = json.loads(jason)
            print ("TYPE DATA = ", type(data))
            with open (r"C:\Programs\answer.json", "a", encoding="utf-8") as file:
                json.dump(data, file, ensure_ascii=False, indent=4)
                # file.write(data)
                # file.write("\n\n\n\n\n\n")
            # return json.dumps(data, ensure_ascii=False, indent=4)
            # return response.choices[0].message.content
            return data
    except Exception as ex: 
        print ("error = ", ex)
        return "error" 

def gpt_query(text):
    client = Client()
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": "Ответь на русском не используя переход на новую строку: " + text }],
        # Add any other necessary parameters
    )
    jason = str(response.choices[0].message.content)
    print (jason)
    return jason



# [
#     {
#         title: "",
#         content: ""
#     },
# ]