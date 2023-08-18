import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.jungle

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get(
    'https://movie.daum.net/ranking/boxoffice/weekly', headers=headers)
soup = BeautifulSoup(data.text, 'html.parser')

movies = list(soup.select(".list_movieranking > li"))
db.movies.drop()

for movie in movies:
    # 필요한 정보
    # 제목, 이미지, 세부url, 개봉년월일, 관객수, 좋아요수, 삭제여부
    title = movie.select_one(".tit_item").text
    image_url = movie.select_one(".poster_movie > img")["src"]
    movie_url = "https://movie.daum.net" + \
        movie.select_one(".tit_item > a")["href"]
    (open_year, open_month, open_day) = movie.select_one(
        ".txt_num").text.split(".")
    view_text = movie.select_one(
        ".txt_info > .info_txt:nth-child(2)").findChild(string=True, recursive=False)
    view_num = int(view_text.replace(",", "").replace("명", ""))
    movie_data = {
        "title": title,
        "image_url": image_url,
        "movie_url": movie_url,
        "open_year": int(open_year),
        "open_month": int(open_month),
        "open_day": int(open_day),
        "view_text": view_text,
        "view_num": view_num,
        "like": 0,
        "is_deleted": False
    }
    db.movies.insert_one(movie_data)

print("Scrapping is done! ✨")

# <li>
#     <div class="item_poster">
#         <div class="thumb_item">
#             <div class="poster_movie">
#                     <img src="https://img1.daumcdn.net/thumb/C408x596/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fmovie%2Fce3dda655bc0eb73ffd6e82ba32e1bc6322b173a" class="img_thumb" alt="콘크리트 유토피아">
#                 <span class="rank_num">1</span>
#                     <span class="txt_tag">
#                         <span class="ico_movie ico_see see15">15세이상관람가</span>
#                     </span>
#             </div>
#             <div class="poster_info">
#                 <a href="/moviedb/main?movieId=143538" class="link_story">
#                     “아파트는 주민의 것”온 세상을 집어삼킨 대지진, 그리고 하루아침에 폐허가 된 서울.모든 것이 무너졌지만 오직 황궁 아파트만은 그대로다.소문을 들은 외부 생존자들이 황궁 아파트로 몰려들자위협을 느끼기 시작하는 입주민들.생존을 위해 하나가 된 그들은 새로운 주민 대표 ‘영탁’을 중심으로외부인의 출입을 철저히 막아선 채 아파트 주민만을 위한 새로운 규칙을 만든다.덕분에 지옥 같은 바깥 세상과 달리주민들에겐 더 없이 안전하고 평화로운 유토피아 황궁 아파트.하지만 끝이 없는 생존의 위기 속그들 사이에서도 예상치 못한 갈등이 시작되는데...!살아남은 자들의 생존 규칙따르거나떠나거나
#                 </a>
#             </div>
#         </div>
#         <div class="thumb_cont">
#             <strong class="tit_item"><a href="/moviedb/main?movieId=143538" class="link_txt">콘크리트 유토피아</a></strong>
#             <span class="txt_info">
#                     <span class="info_txt">개봉<span class="txt_num">23.08.09</span></span>
#                     <span class="info_txt"><span class="screen_out">관객수</span>1,546,173명</span>
#             </span>
#         </div>
#     </div>
# </li>
