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
- src/scss/styles.scss — корневой файл стилей
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
- В отличие от Controller, который обычно просто обрабатывает входящие запросы, здесь View и Model не взаимодействуют напрямую, как в архитектуре MVC. Обновление View происходит исключительно через index.ts, то есть через Presenter

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
  
- SellList - внутренний тип для репозитария товаров, в описание включён флаг принадлежности корзине -> расширяет SellItem
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

##Классы

### Базовые классы
* BasePopup - шаблон базового класса, шаблонный параметр - интерфейс с набором полей, которые должны отображаться в попапе
  * constructor - создать объект по тегу обёртки, тегу содержимого, диспетчеру событий, тегу содержимого попапа
    * вешается обработчик закрытия попапа по крестику
  * show - показать попап
* Component - шаблонный класс для элемента отображения, шаблонный параметр задаёт набор свойств, отображаемых с помощью данного класса 
  * constructor - создать объект
  * toggleClass - переключить наличие класса у элемента
  * setText - установить текст
  * setDisabled - установить атрибут недоступности
  * setHidden - установить атрибут скрытости
  * setVisible - установить видимость
  * setImage - установить картинку и альтернативный текст
  * render - отобразить информацию

### Производные классы
* ICatalogue - определяет структуру для компонента галереи 
  * ListItems: HTMLElement[]; - элементы для отображения в галлерее
* Catalogue  - реализация интерфейса IGallery; наследуется от Component
  * constructor - создать объект
  * set galleryItems - установить элементы для отображения
* ICatalogueCard - интерфейс к отображению карточки в галерее
	 * category: string;  - категория
	 * title: string; - заголовок
	 * price: number; - цена
	 * image: string; - картинка
* CatalogueCard - реализация отображения карточки в галерее; наследуется от Component
   * constructor - создать объект
   * set category(val: string)  - установить категорию
   * set title(val: string)  - установить заголовок
   * set price(val: number)  - установить цену
   * set image(val: string)  - установить картинку
* ISuccess - интерфейс к отображению карточки в галерее
   * totalPrice:number; - полная цена
* Success - отображение синапсов,закрытие,открытие карточки
   * constructor - создать объект
   * set totalPrice(val: number) - отобразить полную цену товаров в корзине
* ICart - интерфейс к попапу корзины
   * basketItems: HTMLElement[]; список товаров
   * basketTotal: number; полная стоимость
* Cart - попап корзины; наследуется от Component
   * кнопка "оформить"
   * закрыть
* ICartCard - интерфейс отображения карточки в корзине
  * title: string заголовок
  * price: number цена
* CartCard - элемент отображения карточки в корзинке -> наследуется от Component
  * set title(val: string) - установить заголовок
  * set price(val: number) - установить цену
  * кнопка "удалить из корзины"
* IPersonalInfoFirst - интерфейс попапа данных об оплате
  * paymentType: PaymentTypeEnum; - тип оплаты
  * deliveryAddress: string; - адрес доставки
  * enableButton:boolean; - кнопка доступна
* PersonalInfoFirst - попап с первой частью персональной информации -> наследуется от Component
  * constructor
  * set paymentType(val: PaymentTypeEnum) - установить тип оплаты
  * set deliveryAddress(val: string) - установить адрес доставки
  * set enableButton(val:boolean) - показать кнопку перехода дальше
* IPersonalInfoSecond -интерфейс попапа со второй частью
  * email: string; - электронный адрес
  * phone: string; - телефон 
  * enableButton:boolean; - показать кнопку дальше
* PersonalInfoSecond - попап ввода деталей об оплате -> наследуется от Component
  * поле ввода "почта"
  * поле ввода "телефон"
  * кнопка "оплатить"
* ISuccess - интерфейс к попапу успешной покупки
  * стоимость
* Success - попап успешной покупки -> наследуется от Component
  * кнопка "закрыть"
  * кнопка "за новыми покупками"
* ICartButton
  * количество товаров в корзине
* CartButton -> наследуется от Component
  * кнопка перехода в форму корзины
  
* ICardPopup - интерфейс к отображению попап карточки -> содержит все поля карточки 
	* category: string; - категория товара
	* title: string; - заголовок
	* description: string; - описание
	* price: number; - цена
	* image: string; - картинка
	* id:string; - идентификатор 
	* inBasket: boolean; - в корзине ли

* CardPopup - попап карточки отображает картинку,заголовок,описание и цену товара -> наследуется от Component
	* set category(val: string) - установить категории
	* set title(val: string) - установить заголовок
	* set description(val: string) - установить описание 
	* set price(val: number) - установить цену
	* set image(val: string) - установить картинку 
	* set id(val:string) - установить идентификатор товара
	* get id() - получить идентификатор товара
	* set inBasket(val: boolean) - отобразить направление перекладывание товара

* Сomponent - базовый класс html element
  *  toggleClass - переключить класс
  *  setDisabled - переключить недоступность
  *  setHidden - переключить скрытость
  *  setVisible - переключить видимость
  *  setImage - установить изображение
  *  render - отобразить данные

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


## Об архитектуре 

Взаимодействия внутри приложения происходят через события. Модели инициализируют события, слушатели событий в основном коде выполняют передачу данных компонентам отображения, 
а также вычислениями между этой передачей, и еще они меняют значения в моделях.
* View отправляет событие (например, нажатие кнопки) Presenter.
* Presenter обрабатывает событие, взаимодействует с Model для получения или изменения данных.
* Model выполняет операции над данными и возвращает результат Presenter.
* Presenter обновляет View с полученными данными.


