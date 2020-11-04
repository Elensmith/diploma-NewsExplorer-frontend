##### NewsExplorer - дипломный проект (учеба в Яндекс.Практикум)

### NewsExplorer - сервис поиска новостей. Можно сохранить новости в личном кабинете.

##  Как работает:
- По нажатию кнопки «Искать» сайт выполняет два действия:
  - отправляет запрос к сервису NewsAP (newsapi.org), находит все статьи по запросу за последнюю неделю и отображает карточки с найденными статьями;

  - после этого пользователь может сохранять понравившиеся статьи, они будут отображаться в отдельном разделе на сайте.
- Сайт состоит из двух страниц:

  - Главная. Содержит только окно поиска.

  - Страница с сохранёнными статьями. На ней отображаются новости, которые пользователь добавил в избранное.
- Кроме этих страниц на сайте есть всплывающие окна (попапы):

  - с формой регистрации нового пользователя (Регистрация нужна, чтобы пользователь мог сохранить статьи в своём личном кабинете);
  - формой входа.

## Запуск:

- npm run build - версия для продакшн
- npm run deploy -- загрузка на gh-pages
- npm run dev -- запуск в режиме разработки

## Ссылки:
- проект на gh-pages: https://elensmith.github.io/diploma-NewsExplorer-frontend
- фронт и бэк на одном сервере https://www.elena-k.tk/ 

- бэк тут: https://github.com/Elensmith/diploma-NewsExplorer-api

## Скриншоты:
главная страница пользователь не вошел 
![главная страница пользователь не вошел](https://github.com/Elensmith/diploma-NewsExplorer-frontend/blob/master/src/images/show-main-not-log.png)
главная страница пользователь вошел
![главная страница пользователь вошел](https://github.com/Elensmith/diploma-NewsExplorer-frontend/blob/master/src/images/show-main-logged.png)
попап регистрации
![попап регистрации](https://github.com/Elensmith/diploma-NewsExplorer-frontend/blob/master/src/images/show-main-popup.png)
результаты поиска
![результаты поиска](https://github.com/Elensmith/diploma-NewsExplorer-frontend/blob/master/src/images/show-main-search.png)
страница сохраненных статей
![страница сохраненных статей](https://github.com/Elensmith/diploma-NewsExplorer-frontend/blob/master/src/images/show-saved.png)

#### version 1.0.7
