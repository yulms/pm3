// Модуль выполняет изменение позиции на yandex карте при клике на элементе
// Data атрибуты элемента:
// data-map-coords - координаты точки

// Модуль выполняет подключение yandex карты при загрузке страницы и клике на элементе
// Инициализация
// data-map


// Отложенная загрузка карты
export default function initMap() {
  if (document.querySelector('#map')) {
    console.log(111);
    setTimeout(function () {
      var elem = document.createElement('script');
      elem.type = 'text/javascript';
      elem.src = 'https://api-maps.yandex.ru/2.1/?apikey=e46ca710-c34e-4eb0-af87-f1ae0cc4898a&lang=ru_RU';
      document.getElementsByTagName('body')[0].appendChild(elem);
    }, 0);

    setTimeout(function () {
      ymaps.ready(function () {
        var petersburgMap = new ymaps.Map('map', {
          center: [59.936324, 30.321006],
          zoom: 15,
          // убирает лишние контролы
          controls: ['smallMapDefaultSet']
        });

        var myPlacemark = new ymaps.Placemark(petersburgMap.getCenter(), {
          // balloonContentHeader: 'PINK',
          // balloonContentBody: 'Приложение для хорошего настроения',
          // balloonContentFooter: 'и не только',
          // hintContent: 'г. Санкт-Петербург, <br>ул. Большая Конюшенная, д.&nbsp;19/8,&nbsp;офис&nbsp;101'
        }, {
          // iconLayout: 'default#image',
          // iconImageHref: 'img/svg/icon-map-marker.svg',
          // iconImageSize: [36, 35],
          // iconImageOffset: [-18, -17]
        });

        petersburgMap.geoObjects.add(myPlacemark);
      });
    }, 2000);
  }
}
