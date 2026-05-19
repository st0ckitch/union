
; /* Start:"a:4:{s:4:"full";s:65:"/local/templates/union_2024/js/catalog.view.v2.js?173099304614065";s:6:"source";s:49:"/local/templates/union_2024/js/catalog.view.v2.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
if (window.frameCacheVars !== undefined) {
    BX.addCustomEvent("onFrameDataReceived", runFunction_cat_v2);
	//console.log("Отдаётся композитный кеш(catalog.view.v9.js)");
} else {
    $(runFunction_cat_v2);
	//console.log("Страница без композита(catalog.view.v9.js)");
}

function runFunction_cat_v2() {
	var refreshProdVZoom = function() {
		if ('imagezoomsl' in $.fn) {
			// remove all prev zoomers
			$('body > .zoomslobj').remove();

			if (window.innerWidth > 1000) {
				$('#viewer-main-image').imagezoomsl({
					zoomrange: [1, 1],
					magnifiereffectanimate: 'fadeIn',
					disablewheel: true,
					magnifycursor: 'pointer',
					magnifiersize: [320, 380],
					zindex: 5
				});
			}
		}
	}

	var shareRefresh = (function() {

		if (!('Ya' in window)) {
			console.error('shareRefresh init1');
			return function() {};
		}

		$('.socials--share').each(function() {
			try {
				Ya.share2(this);
			}catch (e) {
				console.error('shareRefresh init2');
			}
		});

		return function() {
			var image = document.getElementById('viewer-main-image');

			$('.socials--share').each(function() {
				var shareplug = Ya.share2(this);

				shareplug && shareplug.updateContent({
					title: document.title,
					description: $('meta[name="Description"]').attr('content'),
					url: window.location.href,
					image: image ? image.src : ''
				});
			});
		}
	})();

	var sliderRefresh = function() {

		var $slider = $('#product-slider');

		if ($slider.hasClass('lightSlider')) {
			return false;
		}

		var $caption = $slider.closest('.slider-product-wrap').find('.image--caption');

		$slider.closest('.slider-product-wrap').find('.slider--slide').on('click', function(e) {
			e.preventDefault();

			$slider[$(this).data('pos') == 'prev' ? 'goToPrevSlide' : 'goToNextSlide']();

			// var pos = $(this).data('pos'),
			// 	$slides = $slider.find('.lslide'),
			// 	activeKey = $slides.filter('.active').index(),
			// 	nextKey = 0;

			// $slider.goToSlide(pos == 'prev' ? (
			// 	activeKey == 0 ? $slides.length - 1 : activeKey - 1
			// ) : (
			// 	activeKey == $slides.length - 1 ? 0 : activeKey + 1
			// ));
		});

		$slider.find('.image--target')
			.on('mousedown', function(e) {
				e.preventDefault();

				this.pressClientX = e.clientX;
				this.pressClientY = e.clientY;
			})
			.on('mouseup', function(e) {
				var allow = 10;

				if (e.which == 1 && ((Math.abs(e.clientX - this.pressClientX) < allow) && (Math.abs(e.clientY - this.pressClientY) < allow))) {
					var images = $.map($slider.find('.lslide .image--target'), function(image) {
						return {
							src: image.getAttribute('data-full') || image.getAttribute('data-src'),
							opts: { caption: image.alt }
						}
					});

					$.fancybox.open(images, { loop: false }, $(this).closest('.slide--item').data('original-index'));
				}
			});

		// function sliderBackUpdate(source) {
		// 	var $elem = $slider.closest('.slider-product-wrap').find('.slide-image--helper'),
		// 		$helper = $elem.children('span');

		// 	$helper.css('background-image', 'url('+source+')').css('opacity', 1);

		// 	setTimeout(function() {
		// 		$elem.css('background-image', 'url('+source+')');
		// 		$helper.css('opacity', 0);
		// 	}, 500);
		// }

		// function captionSizeUpdate() {
		// 	if (!$caption.length) {
		// 		return false;
		// 	}

		// 	var $wrap  = $slider.closest('.slider-product-wrap'),
		// 		$pager = $wrap.find('.lSPager'),
		// 		$controlNext = $wrap.find('.lSAction > .lSNext');

		// 	$caption.css('max-width', $wrap.width() - 40 - (
		// 		$pager.length
		// 			? ($pager.position().left + $pager.outerWidth())
		// 			: (
		// 				$controlNext.length ? (
		// 					$controlNext.position().left + $controlNext.outerWidth()
		// 				) : 0
		// 			  )
		// 		)
		// 	);
		// }

		// $(window).off('resize.slidercaption').on('resize.slidercaption', function() {
		// 	captionSizeUpdate();
		// });

		// find max text length and set height of it
		function captionSizeUpdate() {
			var imageKey = $caption.data('max-length-image-key');

			if (imageKey === undefined) {
				var maxlength = 0;

				$slider.find('.image--target').each(function(key) {
					var text = this.alt || this.getAttribute('data-caption') || '';

					if (text.length > maxlength) {
						maxlength = text.length;
						imageKey = key;
					}
				});

				$caption.data('max-length-image-key', imageKey);
			}

			var maxlengthText = $slider.find('.image--target').eq(imageKey).attr('alt'),
				tempText = $caption.text();

			$caption.css('height', 'auto').css('height', $caption.html(maxlengthText).height()).html(tempText);
		}
		
		$(window).off('resize.slidercaption').on('resize.slidercaption', function() {
			captionSizeUpdate();
		});

		function setActivePage(page) {
			$slider.closest('.slider-product-wrap')
				.find('.slider--pager li[data-page="'+page+'"]')
					.addClass('active')
						.siblings('.active').removeClass('active');
		}
		$slider.length && $slider.lightSlider({
			auto: false,
			thumbItem: 6,
			loop: true,
			item: 1,
			pager: false,
			controls: false,
			slideMargin: 0,
			onSliderLoad: function($s) {
				var $image = $s.find('.slide-image.active .image--target'),
					$wrap = $s.closest('.slider-product-wrap'),
					$slides = $s.find('.lslide'),
					eachIndexDiff = $s.children('.clone').length ? 1 : 0;

				$wrap.find('.lslide:not(.clone) .yt--target').each(function() {
					this.src = this.getAttribute('data-src');
				});

				// remember index of each (with clone!) slides
				$s.children().each(function() {
					var $slide = $(this);

					$slide.data('original-index', (this.className.indexOf('clone') !== -1 ? (
						$slide.is(':first-child') ? $s.children('.lslide').length : 1
					) : $slide.index()) - eachIndexDiff);
				});
	//console.log('$slides.length', $slides.length);

				if ($slides.length > 1) {
					var pager = document.createElement('ul');
					pager.className = 'slider-pager-outer slider--pager';

					for (var i = 0; i < $slides.length; i++) {
						var page = document.createElement('li');
						page.setAttribute('data-page', i);
						page.onclick = function() {
							$slider.goToSlide(parseInt(this.getAttribute('data-page')) + eachIndexDiff);
						}
						pager.appendChild(page);
					}

					$wrap.find('.slider--pager').html(pager).find('li:first').addClass('active');
				}

				$wrap.addClass('slider--inited');

				$image.length && $caption.html($image.attr('alt') || $image.data('caption') || '');
				// $image.length && sliderBackUpdate($image.attr('src'));
				captionSizeUpdate();
			},
			onAfterSlide: function($s, index) {
				setActivePage( $s.children('.slide-image').eq(index).data('original-index') );
			},
			onBeforeSlide: function($s, index) {
				var $slide = $s.children('.slide-image').eq(index),
					$image = $slide.find('.image--target'),
					$currentSlide = $s.find('.lslide.active');

				setActivePage( $slide.data('original-index') );

				if ($currentSlide.length) {
					var $yt = $currentSlide.find('.yt--target');
					($yt.length && $yt[0].contentWindow && $yt[0].contentWindow.postMessage) && $yt[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
				}

				$caption.html($image.attr('alt') || $image.data('caption') || '');

				if (!$image.length) {
					return false;
				}

				if (!$image.hasClass('loaded') && $image.filter('img[data-src]').length) {
					app.lazy.load($image, null, {
						loader: $slide
					});
				}

				// if ($image.hasClass('loaded--success') || !$image.filter('img[data-src]').length) {
					// sliderBackUpdate($image[0].src);
				// } else {
					// app.lazy.load($image, function(image, loaded) {
						// sliderBackUpdate(image.src);
					// });
				// }
			}
		});
	}

	$(function() {

		var settings = {
			windowSizeDefault: null,
			openedGroupIDs: []
		};

		refreshProdVZoom();
		sliderRefresh();

		$('#main-view-section')
			.on('click', '.viewer--control', function() {
				var $nav    = $('#collection-products-nav'),
					next    = this.getAttribute('data-pos') == 'next',
					$active = $nav.find('.nav--item.active'),
					$furture;

				$active = $active.length ? $active : $nav.children('.nav--item:first');

				$furture = next ? $active.next('.nav--item') : $active.prev('.nav--item');
				$furture = $furture.length ? $furture : ( $nav.children('.nav--item:'+(next ? 'first' : 'last')) );

				if ($furture.length) {
					$furture.addClass('active').siblings('.active').removeClass('active');
					$furture.find('.product--load').trigger('click');
					//window.location.href = this.href
				}
			})
			.on('click', '.options-group--toggle', function() {
				var $button = $(this),
					groupID = $button.data('group-id'),
					$group  = $('#options-group-item-'+groupID),
					$mixin  = $group.find('.group--mixin'),
					toggleText = $button.data('toggle-text'),
					openedIDsKey = $.inArray(groupID, settings.openedGroupIDs);

				$mixin.toggleClass('active').css('max-height', Math.max($('#viewer-item').outerHeight(), 374));
				$button.data('toggle-text', $button.text()).text(toggleText);

				if ($mixin.hasClass('active')) {
					openedIDsKey == -1 && settings.openedGroupIDs.push(groupID);
				} else {
					openedIDsKey != -1 && settings.openedGroupIDs.splice(openedIDsKey, 1);
				}

				// if($mixin.hasClass('active')){
				// 	setTimeout(function() {
				// 		$mixin.jScrollPane({
				// 			mouseWheelSpeed: 50,
				// 			verticalDragMaxHeight: 100
				// 		}).addClass('jsp--scrollable');
				// 	}, 10);
				// }
				// else{
				// 	$mixin.hasClass('jsp--scrollable') && $mixin.removeClass('jsp--scrollable').data('jsp').destroy();
				// }
			});

		$(document).on('click', '.product--load', function(e) {
			window.location.href = this.href;
			//e.preventDefault();
			return;
			var $button = $(this);

			app.loading(true);

			$.ajax({
				url: this.href,
				type: 'get',
				data: $.extend({
					ajax: 1
				}, $button.data('params') || {}),
				success: function(response) {

					$button.hasClass('product-nav--link') && $button.parent().addClass('active').siblings().removeClass('active');

					$('.ajax--refresher').each(function() {
						var $block = $(this),
							name = $block.data('rf-name');

						if (name && name in response) {
							console.log(name);
							$block.html(response[name]);
						}
					});
					
					// meta tags
					if ('META_TITLE'    in response) {
						document.title = response.META_TITLE;
					}

					'META_DESC'     in response && $('meta[name="Description"]').attr('content', response.META_DESC);
					'META_KEYWORDS' in response && $('meta[name="Keywords"]').attr('content', response.META_KEYWORDS);
					'breadcrumbs'   in response && $('#breadcrumbs-list > .active').html(response.breadcrumbs['']);

					if ('product_url' in response && (!!(window.history && history.replaceState))) {
						window.history.replaceState(null , document.title, '/product/' + response.product_url);
					}

					if ('slider_images_section' in response) {
						sliderRefresh();
					}

					if ('openedGroupIDs' in settings) {
						for (var i = 0; i < settings.openedGroupIDs.length; i++) {
							$('#options-group-item-'+settings.openedGroupIDs[i]).find('.options-group--toggle:first').trigger('click');
						}
					}

					/// update plugins
					refreshProdVZoom();
					shareRefresh();

					$(window).trigger('resize.viewer');
				},
				error: function(err) {
					console.log('error', err);
				},
				complete: function() {
					app.loading(false);
				}
			});
		});

		$('.options-hidden--toggle').on('click', function(e) {
			var $list = $(this).toggleClass('active').closest('.options--block');

			$list.find('.target--hidden').toggleClass('visible');
			$list.find('.bg-image--lazy:not(.loaded)').length && app.lazy.load($list.find('.bg-image--lazy:not(.loaded)'));

			if (!$(this).hasClass('active')) {
				var viewportTop  = $(window).scrollTop(),
					containerTop = $list.offset().top;

				viewportTop > containerTop && $(window).scrollTop(containerTop - 10);
			}
		});

		if ('lightSlider' in $.fn) {
			$('.carousel--single').lightSlider({
				loop: false,
				item: 1,
				pager: false,
			});
		}

		$('.image--zoom').fancybox({
			buttons: ['fullScreen', 'zoom', 'thumbs', 'close'],
			caption: function( instance, item ) {
				return this.getAttribute('title') || '';
			}
		});

		;(function() {

			function hide($block) {
				//alert('hide');
				var $b = $block.find('.panel-body');

				 $b.wrap($('<div/>', {
					class: 'height-overflow-block',
					title: 'Развернуть текст'
				}).css('max-height', 62));

				$('a[data-toggle=maxheight][href="#'+$block.attr('id')+'"]').addClass('collapsed');
			}

			function show($block) {
				//alert('show');
				$block.find('.panel-body').unwrap('.height-overflow-block');
				$block.removeClass('collapse');
				$('a[data-toggle=maxheight][href="#'+$block.attr('id')+'"]').removeClass('collapsed');
			}

			$('[data-toggle="maxheight"]').each(function() {
				var $block = $(this.getAttribute('href'));

				$block.hasClass('in') || hide($block);

				$(this).on('click', function(e) {
					e.preventDefault();
					$block.children('.height-overflow-block').length ? show($block) : hide($block);
				});
			});
		})();


		$(window).on('resize.size', function() {
			var size = app.device.size();

			if (settings.windowSizeDefault !== size) {

				var $images = $('.options--images > li:visible .bg-image--lazy:not(loaded)');
				$images.length && app.lazy.load($images);

				/* $('.options--images .bg-image--caption').each(function() {
					if (this.offsetHeight > 32) {
						$(this).addClass('expand-hover');
					}
				}); */

				refreshProdVZoom();
				settings.windowSizeDefault = size;
			}
		}).trigger('resize.size');

		$(window).on('resize.viewer', function() {
			var $viewer = $('#viewer-item');
			$viewer.find('.item-viewer--image').css('padding-bottom', $viewer.find('.item-viewer--caption').outerHeight() || 0);
		}).trigger('resize.viewer');
	});
}
/* End */
;; /* /local/templates/union_2024/js/catalog.view.v2.js?173099304614065*/
