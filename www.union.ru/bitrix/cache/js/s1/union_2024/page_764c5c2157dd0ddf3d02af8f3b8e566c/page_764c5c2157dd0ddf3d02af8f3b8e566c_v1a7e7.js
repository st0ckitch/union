
; /* Start:"a:4:{s:4:"full";s:106:"/local/templates/union_2024/components/bitrix/catalog.element/furniture-view/first-block.js?17654713306779";s:6:"source";s:91:"/local/templates/union_2024/components/bitrix/catalog.element/furniture-view/first-block.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
$(function () {

    let changePage = true
    const changeDots = (slick) => {
        if (window.innerWidth < 1201) {
            slick.$dots[0].classList.add("dots-mob");
            slick.$dots[0].style.top = 'auto';
        } else {
            slick.$dots[0].classList.remove("dots-mob");
            calculatePaginationPosition(slick, 'slick')
        }
    }
    $('.top-slider').on('init', function(event, slick) {
        initArrowSlider(slick);
        if (slick.$slides.length < 2) {
            slick.$dots[0].style.display = 'none';
        } else {
            let activeIndex = -1; // сюда сохраним индекс
            const $activeSlide = slick.$slides.filter(function(index) {
                const isActive = $(this).data('active-slide-custom') === 1;
                if (isActive) {
                    activeIndex = index;
                }
                return isActive;
            });
            if ($activeSlide) {
                slick.goTo(activeIndex)
            }
        }
        changePage = false
    });
    function loadContent(url) {
        // Показываем прелоадер, если нужно
        $('#second-block').addClass('loading');

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'html',
            success: function(response) {
                // создаём временный контейнер и парсим HTML без <script>
                const nodes = $.parseHTML(response, document, false); // false = remove scripts
                const $tmp = $('<div>').append(nodes);

                // пробуем найти нужный блок внутри распарсенного HTML
                let $newContent = $tmp.find('#second-block');

                // иногда ответ может быть именно фрагментом, тогда попытка через фильтр:
                if (!$newContent.length) {
                    $newContent = $tmp.filter('#second-block');
                }

                if ($newContent.length) {
                    // вставляем контент (скрипты в nodes уже удалены)
                    $('#second-block').html($newContent.html());
                } else {
                    console.warn('Не найден #second-block в ответе:', url);
                }

                $('#second-block').removeClass('loading');
            },
            error: function(xhr, status, error) {
                $('#second-block').removeClass('loading');
                console.error('Ошибка при загрузке контента:', status, error);
                console.log(xhr.responseText);
            }
        });
    }
    // При нажатии "Назад"/"Вперед"
    window.addEventListener('popstate', function() {
        loadContent(location.href);
    });
    $('.top-slider').on('beforeChange', function(event, slick, currentSlide, indexNextSlide){
        if (!changePage) {
            const nextSlide = slick.$slides[indexNextSlide]
            if (nextSlide) {
                const url = $(nextSlide).data('detail-page-url')
                if (url) {
                    // Меняем URL в адресной строке без перезагрузки страницы
                    history.pushState(null, '', url);

                    // Загружаем новый контент
                    loadContent(url);
                }
            }
        }
    });
    $('.top-slider').on('setPosition', function(event, slick) {
        changeDots(slick)
    });
    $('.top-slider').on('swipe', function(event, slick) {
        changeDots(slick)
    });
    $('.top-slider').on('reInit', function(event, slick) {
        changeDots(slick)
    });
    $('.top-slider').slick({
        slidesToShow: 1,
        //prevArrow: '<button class="slick-prev"><svg width="11" height="22" viewBox="0 0 11 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip path = "url(#clip0_362_182)" ><path d = "M9.61532 20.8657C9.96121 20.6431 10.2119 20.1739 10.2119 19.7287C10.2119 19.2234 10.267 19.2956 6.73283 15.0486L3.36909 11.0001L6.73283 6.95756C10.267 2.70451 10.2119 2.7767 10.2119 2.27139C10.2119 1.82021 9.96121 1.351 9.60529 1.12842C9.34962 0.978027 8.9185 0.978027 8.66785 1.12842C8.56258 1.19459 6.81805 3.24592 4.69253 5.80857C0.712191 10.597 0.787386 10.5008 0.787386 11.0001C0.787386 11.4994 0.712191 11.4031 4.69253 16.1915C6.81805 18.7542 8.56258 20.8055 8.66786 20.8717C8.91349 21.0221 9.36968 21.0221 9.61532 20.8657Z"fill = "white" / ></g> <defs ><clipPath id = "clip0_362_182" ><rect width = "11"height = "22"fill = "white "transform = "translate(11 22) rotate(180)" / ></clipPath> </defs> </svg></button>',
        //nextArrow: '<button class="slick-next"><svg width="11" height="22" viewBox="0 0 11 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d = "M1.38469 1.13432C1.03879 1.3569 0.788136 1.82611 0.788136 2.27127C0.788136 2.77658 0.732993 2.70439 4.26717 6.95143L7.63091 10.9999L4.26717 15.0424C0.732993 19.2955 0.788136 19.2233 0.788136 19.7286C0.788136 20.1798 1.03879 20.649 1.39471 20.8716C1.65038 21.022 2.0815 21.022 2.33215 20.8716C2.43742 20.8054 4.18195 18.7541 6.30747 16.1914C10.2878 11.403 10.2126 11.4992 10.2126 10.9999C10.2126 10.5006 10.2878 10.5969 6.30747 5.80846C4.18195 3.2458 2.43742 1.19447 2.33215 1.1283C2.08651 0.977911 1.63032 0.977911 1.38469 1.13432Z"fill = "white" /></svg></button>',
        prevArrow: '<div class="nav-prev-cursor-none cursor-none"></div>',
        nextArrow: '<div class="nav-next-cursor-none cursor-none"></div>',
        arrows: true,
        infinite: true,
        dots: true,
        fade: true,
        autoplay: true,
        autoplaySpeed: 5000,
        breakpoints: {
            0: {
                arrows: false,
            },
            1200: {
                arrows: true,
            }
        }
    });

    $('#first-block [data-fancybox]').fancybox({
        margin: 0, // делаю окно во весь экран без отступов
        //clickContent    : false, // отключаю второе увеличение при уже открытой картинке
        buttons: [ //оставляю только кнопку закрытия
            "close"
        ],
        src: "/catalog/imgs/loading.gif", //src1,
        thumbs : {
            autoStart : true
        }
    });

    $(document).on('click', '.question', function() {
            //$('#productcard_form .form-product--id').val( $(this).data('product-id') );

            $.fancybox.open({
                src: '#calculate-request',
                touch: false
            });
        });
});

/* End */
;
; /* Start:"a:4:{s:4:"full";s:101:"/local/templates/union_2024/components/bitrix/catalog.element/furniture-view/viewed.js?17605230772235";s:6:"source";s:86:"/local/templates/union_2024/components/bitrix/catalog.element/furniture-view/viewed.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
$(document).ready(function () {
    let timerId = setInterval(() => {
        let node = typeof Swiper !== "undefined"
        if (node) {
            clearInterval(timerId)

            const swiperViewed = new Swiper('.swiperViewed', {
                slidesPerView: "1.5",
                spaceBetween: 50,
                freeMode: true,
                navigation: {
                    nextEl: '.swiper-button-next-custom-viewed',
                    prevEl: '.swiper-button-prev-custom-viewed',
                },
                scrollbar: {
                    el: '.swiper-scrollbar-viewed',
                    // Makes the Scrollbar Draggable
                    draggable: false,
                    // Snaps slider position to slides when you release Scrollbar
                    snapOnRelease: true,
                    // Size (Length) of Scrollbar Draggable Element in px
                    dragSize: 'auto',
                },
                on: {
                    afterInit: (swiper) => {
                        initArrowSliderSwiper(swiper)
                    },
                },
                breakpoints: {
                    640: {
                        slidesPerView: "1.5",
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: '2.5',
                        spaceBetween: 50,
                    },
                    1510: {
                        slidesPerView: '3.5',
                        spaceBetween: 50,
                    },
                    1610: {
                        slidesPerView: '3.5',
                        spaceBetween: 50,
                    },
                    1920: {
                        slidesPerView: '4.5',
                        spaceBetween: 50,
                    }
                }
            });
            if (swiperViewed) {
                let node = document.querySelector('.viewed_row')
                if (node) {
                    node.style.display = 'block'
                }
            }

        }
    }, 500);
});
/* End */
;; /* /local/templates/union_2024/components/bitrix/catalog.element/furniture-view/first-block.js?17654713306779*/
; /* /local/templates/union_2024/components/bitrix/catalog.element/furniture-view/viewed.js?17605230772235*/
