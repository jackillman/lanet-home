	// параллакс для первого и второго блока в блоке juicy
	function parallax(){
		// блок, в котором обьекты двигаются
		let parentJuicy = document.querySelector('.juicy'),
			blockWidth = parentJuicy.getBoundingClientRect().width,
			blockHeight = parentJuicy.getBoundingClientRect().height;

		let parallax_images_config = [
			{speed: 1.0, name: '.parallax_area-1_1', direction: 'translateX', speedCof: 1},
			{speed: 0.8, name: '.parallax_area-1_2', direction: 'translateX', speedCof: 1},
			{speed: 0.6, name: '.parallax_area-1_3', direction: 'translateX', speedCof: 1},
			{speed: 0.4, name: '.parallax_area-1_4', direction: 'translateX', speedCof: 1},
			// {speed: 1.0, name: '.parallax_area-2_1', direction: 'translateY', speedCof: 2},
			// {speed: 0.8, name: '.parallax_area-2_2', direction: 'translateY', speedCof: 2},
			// {speed: 0.6, name: '.parallax_area-2_3', direction: 'translateY', speedCof: 2}
		];

		parentJuicy.addEventListener('mousemove',function(e){
			let clientX = e.clientX,
				clientY = e.clientY;

			parallax_images_config.forEach((item) => {
				let imageConfig = getImageConfig(clientY, clientX, item);

				// плавно перемещаем картинки, если разница между начальной и будущей цифрой трансформации отличается на 20
				if (Math.abs(imageConfig.start - imageConfig.finish) > 20) {
					slowParallax(imageConfig.imgWrapper, imageConfig.start, imageConfig.finish);
				}

				// задаем картинкам необходимое изменение
				imageTransform(imageConfig.imgWrapper, item.direction, imageConfig.formula);
			});
		});

		// узнаем и высчитываем всю информацию про картинку
		function getImageConfig(clY, clX, image){
			let imageWrapper = document.querySelector(image.name) || '',
				startedTransform = 0,
				finishedTransform = 0,
				formula = 0;

			if (image.direction === 'translateY') {
				formula = (blockHeight/2 - clY)/100*image.speed*image.speedCof;
				startedTransform = new WebKitCSSMatrix(window.getComputedStyle(imageWrapper).webkitTransform).m42;
			} else if (image.direction === 'translateX') {
				formula = (blockWidth/2 - clX)/100*image.speed*image.speedCof;
				startedTransform = new WebKitCSSMatrix(window.getComputedStyle(imageWrapper).webkitTransform).m41;
			}

			finishedTransform = formula/image.speedCof * 6;

			return {
				'formula': formula,
				'start': startedTransform,
				'finish': finishedTransform,
				'imgWrapper': imageWrapper
			};
		}

		// плавное перемещение картинки c изменением скорости плавности
		function slowParallax(img, start, finish){
			let currentPercent = 5; /*стартовая скорость изменения транфсормации*/

			img.style.transitionDuration = currentPercent/50 + 's';
			let showPercent = setInterval(function() {
				if (currentPercent <= 0) {
						clearInterval(showPercent);
				} else if (currentPercent <= 3) {
						currentPercent -= 1; /*число, на которое надо уменьшать скорость изменения транфсормации*/
						img.style.transitionDuration = currentPercent/50 + 's';
				} else {
						currentPercent = 1;
				}
			}, 100); /*скорость с которой уменьшается скорость изменения транфсормации*/
		}

		// Запись трансформации картинки в ее атрибут style
		function imageTransform(wrapp, direction, formula){
			wrapp.style.webkitTransform = direction + '(' + formula + '%)';
			wrapp.style.transform = direction + '(' + formula + '%)';
		}
	}

	window.addEventListener('load', parallax);