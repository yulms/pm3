s<!-- 1. Сделать добавление кнопок через js -->

Слайдер состоит из двух главных компонентов -
1. Главная контентная часть (<div class="slider__list-container"></div>)
2. Навигационные ссылки в виде точек или миниизображений (<div class="slider__nav"></div>).
Эта часть не обязательная. Если присутствует, формат следующий:
<div class="slider__nav">
  <ul class="slider__nav-list">
    <li class="slider__nav-item">
      <a class="slider__nav-link" href="#slider__item-1">
        <img class="slider__nav-image" src="img/raster/product-1_thumb.jpg" alt="Перейти к изображению 1" width="56">
        <!-- или -->
        <span class="visually-hidden">Перейти к изображению 1</span>
      </a>
    </li>
  </ul>
</div>



Итоговая разметка навигационного контейнера:
    <div class="slider__nav">
      <button class="button slider__toggle slider__toggle--left" type="button">
        <span class="visually-hidden">Предыдущий слайд</span>
        <svg class="slider__toggle-icon" width="24" height="24">
          <use xlink:href="img/svg/_sprite.svg#icon-arrow"></use>
        </svg>
      </button>

      <ul class="slider__nav-list">
        <li class="slider__nav-item" data-index="0">
          <a class="slider__nav-link" href="#slider__item-1">
            <span class="visually-hidden">Перейти к изображению 1</span>
            <img class="slider__nav-image" src="img/raster/product-1_thumb.jpg" alt="Иконка" width="56">
          </a>
        </li>
      </ul>

      <button class="button slider__toggle slider__toggle--right" type="button">
        <span class="visually-hidden">Следующий слайд</span>
        <svg class="slider__toggle-icon" width="24" height="24">
          <use xlink:href="img/svg/_sprite.svg#icon-arrow"></use>
        </svg>
      </button>
    </div>
