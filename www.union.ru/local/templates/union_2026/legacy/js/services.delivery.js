
var zones = {
	msk: { title: 'Москва и Московская область', params: [] },
	spb: { title: 'Санкт-Петербург', params: [] },
	nn:  { title: 'Нижний Новгород', params: [] },
	kr:  { title: 'Краснодар', params: [] }
}

if ('ymaps' in window) {

	ymaps.ready(function() {

		map = new ymaps.Map('map', {
			center: [55.7406, 37.6100],
			zoom: 12
		});

		$('.delivery--change').on('click.build', function(arguments) {
			var $section = $(this.getAttribute('href')),
				type = $section.data('zone'),
				zone = zones[type];

			// заполняем данными из html если их нет
			if (!zone.filled) {

				$section.find('.zone--item').each(function(key) {
					var $zone = $(this);

					zone.params.push({
						name:  $zone.find('.zone--name').html(),
						price: $zone.find('.zone--price').html(),
						color: $zone.find('.zone--color').css('background-color')
					});
				});

				for (var i in pointsYMap[type]) {

					var item = pointsYMap[type][i],
						config = zone.params[item.z - 1];

					zone.polygon = new ymaps.Polygon([
						item.arr
					], {
						hintContent: config.name,
						balloonContent: ['<h4>', zone.title, '</h4>', config.name, '<br>', 'Стоимость доставки: ', config.price].join('')
					}, {
						fillColor: config.color,
						fillOpacity: 0.35,
						// interactivityModel: 'default#transparent', // Делаем полигон прозрачным для событий карты.
						strokeWidth: 2,
						strokeColor: config.color,
						strokeOpacity: 0.8
					});

					map.geoObjects.add(zone.polygon);
				}

				zone.filled = true;
			}

			map.setBounds(zone.polygon.geometry.getBounds());

			//alert(type);
			if(type == 'msk'){
				map.setCenter([55.7406, 37.6100]);
			}else if(type == 'spb'){
				map.setCenter([59.9386300, 30.3141300], 10);
			}
		});

		$('#zones-nav > .active .delivery--change').trigger('click.build');

	});
}