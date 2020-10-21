import "../../css/articles.css";
import MainApi from "../api/MainApi";
import Header from "../components/Header";
import constants from "../constants/constants";
import NewsCard from "../components/NewsCard";
import NewsCardList from "../components/NewsCardList";

(() => {
  const {
    API_KEY, NEWS_URL, MAIN_URL, TOKEN,
  } = constants;
  const mainApi = new MainApi(MAIN_URL);
  let isLoggedIn = true;
  const page = document;
  const amountSavedArticles = document.getElementById("header__info_amoumt-articles");
  const savedNewsArray = [];
  const arrayKeywords = [];
  const template = document.getElementById("card-template");
  const header = new Header(page);
  const newsCardList = new NewsCardList(
    template,
    "",
    "",
    (element, card) => new NewsCard(element, card, page, mainApi, newsCardList),
    page,
    isLoggedIn,
  );
  const savedName = document.getElementById("header__info-name");

  // проверка токена, если нет - переместим на главную
  if (TOKEN) {
    mainApi
      .getUserData(TOKEN)
      .then((data) => {
        isLoggedIn = true;
        header.render(isLoggedIn, data.name);
        savedName.textContent = data.name;
      })
      .catch(() => {
        isLoggedIn = false;
        header.render(isLoggedIn, "");
      });
  } else {
    document.location.replace("./index.html");
  }
  // setTimeout(() => {
  //   console.log(isLoggedIn);
  // }, 1001);

  // отрисовка информации о сохраненных статьях
  function showAmount(length) {
    amountSavedArticles.textContent = length;
  }

  // запрос сохраненных карточек
  mainApi.getArticles().then((res) => {
    res.data.forEach((element) => {
      savedNewsArray.push(element);
      arrayKeywords.push(element.keyword);
    });
  })
    .then(() => {
      if (savedNewsArray.length > 0) {
        showAmount(savedNewsArray.length);
        newsCardList._openSearchResultBlock();
        savedNewsArray.forEach((element) => {
          newsCardList.addCard(element);
        });
      }
    }).catch((err) => {
      console.log(err);
    });

  // function arr() {
  //   let arr = arrayKeywords;

  //     const res = [];
  //     arrayKeywords.forEach((el) => {
  //       res.push(el);
  //       // console.log(el);
  //     });
  //     for (let len = arr.length, i = len; --i >= 0;) {
  //       if (arr[arr[i]]) {
  //         arr[arr[i]] += 1;
  //         arr.splice(i, 1);

  //       } else {
  //         arr[arr[i]] = 1;
  //       }
  //     }
  //     arr.sort(function (a, b) {
  //       return arr[b] - arr[a];
  //     });
  // }
  // console.log(arr());

  // const taggs = ["яблоки", "фара", "мыло", "фара", "фара", "яблоки", "кролик"];
  // const array = taggs.reduce(function (obj, item, index, array) {
  //   if (!obj[item]) {
  //     obj[item] = 0;
  //   }
  //   // console.log(item);
  //   obj[item]++;

  //   return obj, index, array;
  // }, {})
  // console.table(array);

  // let originalLog = console.log;
  // console.log = (a) => {
  //   originalLog(JSON.parse(JSON.stringify(a)));
  // };
  // console.log(setTimeout(() => {
  //   console.log(arrayKeywords[2]);
  // }, 5000));
})();

// сортирует по алфавиту
// const taggs = ["яблоки", "фара", "мыло", "фара", "фара", "яблоки", "кролик"];
// const array = taggs.sort(function (last, next) {
//   return last > next ? 1 : -1;
// })
// console.log(array);
