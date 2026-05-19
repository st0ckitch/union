
; /* Start:"a:4:{s:4:"full";s:87:"/local/templates/union_2024/components/bitrix/catalog/all_page/script.js?17473160902094";s:6:"source";s:72:"/local/templates/union_2024/components/bitrix/catalog/all_page/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
// $(document).ready(function() {
//     // Обработчик события click
//     $(document).on('click', '.top_submenu span', function() {
//         var $secID = $(this).data('secid');
//         if (!$secID) {
//             $secID = $(this).parent().data('secid');
//         }
//         if ($secID) {
//             getSectionContent($secID);
//         }
//         return false; // Предотвращение стандартного поведения, если это необходимо
//     });
//
//     // Проверяем наличие GET-параметра 'id' при загрузке страницы
//     var $secID = getQueryParam('id');
//
//     // Если GET-параметр существует и не пустой
//     if ($secID) {
//         // Проверяем наличие элемента с соответствующим data-secid
//         var $element = $(".top_submenu span[data-secid='" + $secID + "']");
//
//         // Если элемент существует
//         if ($element.length) {
//             getSectionContent($secID);
//             // Выделяем соответствующий элемент
//             $('.top_submenu span').removeClass('active');
//             $element.addClass('active');
//         }
//     }
// });
//
// function getSectionContent($secID) {
//     $.ajax({
//         url: '/ajax/getBlockSection.php',
//         type: 'post',
//         dataType: 'html',
//         cache: false,
//         data: {'SECTION_ID': $secID},
//     }).done(function(data) {
//         // Обновляем содержимое блока
//         $('#blockSection').html(data);
//         // Управляем классом активного элемента
//         $('.top_submenu span').removeClass('active');
//         $(".top_submenu span[data-secid='" + $secID + "']").addClass('active');
//     }).fail(function(jqXHR, textStatus, errorThrown) {
//         console.error('Ошибка при загрузке данных:', textStatus, errorThrown);
//     });
// }

/* End */
;
; /* Start:"a:4:{s:4:"full";s:97:"/local/templates/union_2024/components/bitrix/catalog.section/.default/script.min.js?173099304589";s:6:"source";s:80:"/local/templates/union_2024/components/bitrix/catalog.section/.default/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
$(function (){
    $('.products-catalog').length && app.catalog('.productsd-catalog');
})
/* End */
;; /* /local/templates/union_2024/components/bitrix/catalog/all_page/script.js?17473160902094*/
; /* /local/templates/union_2024/components/bitrix/catalog.section/.default/script.min.js?173099304589*/
