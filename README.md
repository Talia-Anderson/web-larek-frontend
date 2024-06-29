https://github.com/Talia-Anderson/web-larek-frontend.git

# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

# Архитектура проекта

## Паттерн

В данном приложении используется паттерн MVP

- Presenter - файл index.ts, управляет View, изменяет Model
- View не взаимодействует с Model
- Всё основное взаимодействие, обработка и логика прописана в index.ts

## API 

- Api - осуществляет получение данных с сервера
  constructor(baseUrl: string, options: RequestInit = {}) конструктор
  get - получаем ответ в формате промиса
  post - отправка данных

- SellAPI - получает товары с сервера
  getSell(): Promise - получить товары с сервера
  getOneSell(sellID: string): Promise - получение описания ОДНОГО товара
  
-ISellItemAPI - интерфейс получения товаров с сервера
  getSell(): Promise - получить полный список товаров
  getOneSell(SellID: string): Promise; - получить один товар
  performPurchase - покупка

## Данные и Интерфейсы
- ICardID - хранит id карточки д удаления
- IPutGetEvent - хранит id карточки для перемещения 
- IEventText - содержит информацию персональных данных пользователя

- Sell - описание товара 
  id string - идентификатор
  category string - тип
  description string - название 
  image string - изображение
  title string - заголовок
  price number | null - цена в синапсах

- IList - список товаров
 getSell - получить товар по его идентификатору
 setItems - установить карточки
 delItem - удалить карточку
 getCatalogItems - получить карточки для каталога
 getCartItems - получить карточки из корзины
 getTotalSum - получить полную сумму
 cartItemsNumber - общее число товаров в корзине
 toggleCartState - изменить положение товара в корзине
 inCart - проверка на корзину
 clearCart - очистить корзину

- ListModel - реализация хранилища товаров имплементирует IList
  protected ListContent: SellList[] = [] - массив всех товаров
  protected events; - то что отвечает за события
  
- SellFromAPI - информация о товарах с сервера
  total number - количество карточек
  items SellItem[] - набор карточек
  
- SellList - внутренний тип для репозитария товаров, в описание включён флаг принадлежности корзине; расширяет SellItem
  inBasket - проверка на нахождение в корзине
  
- IPersonalInfoModel - интерфейс персональных данных
  paymentType - способ оплаты
  address - адрес
  email - почта
  phone - телефон
  
- PersonalInfoModel - персональные данные; имплементирует IPersonalInfoModel
  constructor(events:IEvents) - создать объект события
  set paymentType(val: PaymentTypeEnum) установить тип оплаты
  set address(val: string) установить адрес
  set email(val: string) установить почту
  set phone(val: string) установить телефон
  get paymentType() получить тип оплаты
  get address() получить адрес
  get email() получить почту
  get phone() получить телефон

# События

- "click: on_Catalogue_card" - кликнули на карточку в каталоге
- "click: next_basket" - событие перехода в попап корзины
- "click: toggle_basket" - клик на кнопке "поместить в корзину/удалить из корзины"
- "click: online_purchaise_form" - клик на кнопке "онлайн"
- "click: on_place" - клик на кнопке "при доставке"
- "click: new_purchases" - клик на кнопке "за новыми покупками"
- "click: close_popup" - закрытие попапа
- "click: basket_button" - щелчок на кнопке корзины
- "click: card payment" - клик на кнопке выбора оплаты карточкой
- "click: cash payment" - клик на кнопке выбора оплаты наличными
- "click: personal info first button" - нажатие кнопки "далее"
- "click: personalInfoSecondNext" - щелчок на форме оформить
- "click: order success" - кнопка в форме удачной сделки
- "click: delete__card" - удаление карточки

- "items: changed" - любое изменение карточек, данные изменились
- "put-get-item" - добавить/удалить в/из корзины, перемещение товаров в / из корзину
- "modal:open"/"modal:close" - открыть/закрыть модальное окно
- "address_input:change" - изменение адреса, адрес изменился
- "email_input:change" - изменение почты, почта изменилась
- "phone_input:change" - телефон изменился
- "personal_info_first_next" - щелчок на форме оформить после первого ввода данных



