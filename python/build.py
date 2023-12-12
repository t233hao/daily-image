import os
import sys
import json
import requests
from bing_brush import BingBrush
from datetime import datetime, timedelta

now = datetime.utcnow()
beijing_time = now + timedelta(hours=8)
formatted_date = beijing_time.strftime("%Y-%m-%d")
base_dir = os.path.dirname(os.path.abspath(__file__))

def imgData(content):

    file_path=os.path.join(base_dir, f'imgData/{formatted_date}')
    if not os.path.exists(file_path):
        os.makedirs(file_path)
    
    brush = BingBrush(cookie=cookie)
    brush.process(prompt=content, out_folder=file_path)

def jsonData():
    global data
    url = "https://v2.jinrishici.com/sentence"
    headers = {"X-User-Token": token}

    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json()
    else:
        print("请求失败:", response.status_code)
    
    content = data["data"]["content"]
    print(content)

    return content

def merge():

    #今日诗词json创建
    folder_name = "jsonData"
    filename = f"{formatted_date}.json"
    file_path = os.path.join(folder_name, filename)

    if not os.path.exists(folder_name):
        os.makedirs(folder_name)
    
    with open(file_path, "w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False)
    
    jsonData_path = os.path.join(base_dir, 'jsonData')
    mergeJson_path = os.path.join(base_dir, f'merge.json')
    mergeTxt_path = os.path.join(base_dir, f'merge.txt')
    json_data_list = []

    # 遍历文件夹中的所有文件
    filenames = [f for f in os.listdir(jsonData_path) if f.endswith(".json")]
    filenames = sorted(filenames, reverse=True)  # 返回一个新的逆序排序列表
    for filename in filenames:
        # 构建文件路径
        file_path = os.path.join(jsonData_path, filename)
        # 打开文件并读取 JSON 数据
        with open(file_path, "r", encoding="utf-8") as file:
            json_data = json.load(file)
            json_data_list.append(json_data)

    #打开文件并将 JSON 数据写入
    with open(mergeJson_path, "w", encoding="utf-8") as file:
        json.dump(json_data_list, file, ensure_ascii=False)

    link = "https://raw.githubusercontent.com/t233hao/daily-image/main/python/imgData/{}/file_1.jpg".format(formatted_date)

    head_link = f"{link}\n"

    with open(mergeTxt_path, 'r+') as file:
        txt = file.read()  # 读取文件内容
        file.seek(0, 0)  # 将文件指针移动到文件开头
        file.write(head_link + txt)  # 在开头追加内容

if __name__ == "__main__":
    cookie = sys.argv[1]
    token = sys.argv[2]
    content = jsonData()
    imgData(content)
    merge()