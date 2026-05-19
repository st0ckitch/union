
; /* Start:"a:4:{s:4:"full";s:91:"/local/templates/union_2024/components/bitrix/news.list/catalog_pdf/script.js?1766575015281";s:6:"source";s:77:"/local/templates/union_2024/components/bitrix/news.list/catalog_pdf/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
const hrefDownloadCatalog = document.querySelectorAll('.href-download-catalog')
hrefDownloadCatalog.forEach(item => {
    item.addEventListener('click', () => {
        if (typeof ym === 'function') {
            ym(49257718, 'reachGoal', 'download_catalogue')
        }
    })
})

/* End */
;; /* /local/templates/union_2024/components/bitrix/news.list/catalog_pdf/script.js?1766575015281*/
