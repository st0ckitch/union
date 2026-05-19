
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
; /* Start:"a:4:{s:4:"full";s:100:"/local/templates/union_2024/components/bitrix/catalog.element/.default/script.min.js?173099304558999";s:6:"source";s:80:"/local/templates/union_2024/components/bitrix/catalog.element/.default/script.js";s:3:"min";s:84:"/local/templates/union_2024/components/bitrix/catalog.element/.default/script.min.js";s:3:"map";s:84:"/local/templates/union_2024/components/bitrix/catalog.element/.default/script.map.js";}"*/
(function(t){"use strict";if(t.JCCatalogElement)return;var i=function(t){i.superclass.constructor.apply(this,arguments);this.buttonNode=BX.create("SPAN",{props:{className:"btn btn-default btn-buy btn-sm",id:this.id},style:typeof t.style==="object"?t.style:{},text:t.text,events:this.contextEvents});if(BX.browser.IsIE()){this.buttonNode.setAttribute("hideFocus","hidefocus")}};BX.extend(i,BX.PopupWindowButton);t.JCCatalogElement=function(t){this.productType=0;this.config={useCatalog:true,showQuantity:true,showPrice:true,showAbsent:true,showOldPrice:false,showPercent:false,showSkuProps:false,showOfferGroup:false,useCompare:false,useStickers:false,useSubscribe:false,usePopup:false,useMagnifier:false,usePriceRanges:false,basketAction:["BUY"],showClosePopup:false,templateTheme:"",showSlider:false,sliderInterval:5e3,useEnhancedEcommerce:false,dataLayerName:"dataLayer",brandProperty:false,alt:"",title:"",magnifierZoomPercent:200};this.checkQuantity=false;this.maxQuantity=0;this.minQuantity=0;this.stepQuantity=1;this.isDblQuantity=false;this.canBuy=true;this.isGift=false;this.canSubscription=true;this.currentIsSet=false;this.updateViewedCount=false;this.currentPriceMode="";this.currentPrices=[];this.currentPriceSelected=0;this.currentQuantityRanges=[];this.currentQuantityRangeSelected=0;this.precision=6;this.precisionFactor=Math.pow(10,this.precision);this.visual={};this.basketMode="";this.product={checkQuantity:false,maxQuantity:0,stepQuantity:1,startQuantity:1,isDblQuantity:false,canBuy:true,canSubscription:true,name:"",pict:{},id:0,addUrl:"",buyUrl:"",slider:{},sliderCount:0,useSlider:false,sliderPict:[]};this.mess={};this.basketData={useProps:false,emptyProps:false,quantity:"quantity",props:"prop",basketUrl:"",sku_props:"",sku_props_var:"basket_props",add_url:"",buy_url:""};this.compareData={compareUrl:"",compareDeleteUrl:"",comparePath:""};this.defaultPict={preview:null,detail:null};this.offers=[];this.offerNum=0;this.treeProps=[];this.selectedValues={};this.mouseTimer=null;this.isTouchDevice=BX.hasClass(document.documentElement,"bx-touch");this.touch=null;this.slider={interval:null,progress:null,paused:null,controls:[]};this.quantityDelay=null;this.quantityTimer=null;this.obProduct=null;this.obQuantity=null;this.obQuantityUp=null;this.obQuantityDown=null;this.obPrice={price:null,full:null,discount:null,percent:null,total:null};this.obTree=null;this.obPriceRanges=null;this.obBuyBtn=null;this.obAddToBasketBtn=null;this.obBasketActions=null;this.obNotAvail=null;this.obSubscribe=null;this.obSkuProps=null;this.obMainSkuProps=null;this.obBigSlider=null;this.obMeasure=null;this.obQuantityLimit={all:null,value:null};this.obCompare=null;this.obTabsPanel=null;this.node={};this.smallCardNodes={};this.magnify={enabled:false,obBigImg:null,obBigSlider:null,height:0,width:0,timer:0};this.currentImg={id:0,src:"",width:0,height:0};this.viewedCounter={path:"/bitrix/components/bitrix/catalog.element/ajax.php",params:{AJAX:"Y",SITE_ID:"",PRODUCT_ID:0,PARENT_ID:0}};this.obPopupWin=null;this.basketUrl="";this.basketParams={};this.errorCode=0;if(typeof t==="object"){this.params=t;this.initConfig();if(this.params.MESS){this.mess=this.params.MESS}switch(this.productType){case 0:case 1:case 2:this.initProductData();break;case 3:this.initOffersData();break;default:this.errorCode=-1}this.initBasketData();this.initCompareData()}if(this.errorCode===0){BX.ready(BX.delegate(this.init,this))}this.params={};BX.addCustomEvent("onSaleProductIsGift",BX.delegate(this.onSaleProductIsGift,this));BX.addCustomEvent("onSaleProductIsNotGift",BX.delegate(this.onSaleProductIsNotGift,this))};t.JCCatalogElement.prototype={getEntity:function(t,i,e){if(!t||!i)return null;e=e||"";return t.querySelector(e+'[data-entity="'+i+'"]')},getEntities:function(t,i,e){if(!t||!i)return{length:0};e=e||"";return t.querySelectorAll(e+'[data-entity="'+i+'"]')},onSaleProductIsGift:function(t,i){if(i&&this.offers&&this.offers[this.offerNum].ID==i){this.setGift()}},onSaleProductIsNotGift:function(t,i){if(i&&this.offers&&this.offers[this.offerNum].ID==i){this.restoreSticker();this.isGift=false;this.setPrice()}},reloadGiftInfo:function(){if(this.productType===3){this.checkQuantity=true;this.maxQuantity=1;this.setPrice();this.redrawSticker({text:BX.message("PRODUCT_GIFT_LABEL")})}},setGift:function(){if(this.productType===3){this.isGift=true}if(this.productType===1||this.productType===2){this.isGift=true}if(this.productType===0){this.isGift=false}this.reloadGiftInfo()},setOffer:function(t){this.offerNum=parseInt(t);this.setCurrent()},init:function(){var i=0,e=0,s=null;this.obProduct=BX(this.visual.ID);if(!this.obProduct){this.errorCode=-1}this.obBigSlider=BX(this.visual.BIG_SLIDER_ID);this.node.imageContainer=this.getEntity(this.obProduct,"images-container");this.node.imageSliderBlock=this.getEntity(this.obProduct,"images-slider-block");this.node.sliderProgressBar=this.getEntity(this.obProduct,"slider-progress-bar");this.node.sliderControlLeft=this.getEntity(this.obBigSlider,"slider-control-left");this.node.sliderControlRight=this.getEntity(this.obBigSlider,"slider-control-right");if(!this.obBigSlider||!this.node.imageContainer||!this.node.imageContainer){this.errorCode=-2}if(this.config.showPrice){this.obPrice.price=BX(this.visual.PRICE_ID);if(!this.obPrice.price&&this.config.useCatalog){this.errorCode=-16}else{this.obPrice.total=BX(this.visual.PRICE_TOTAL);if(this.config.showOldPrice){this.obPrice.full=BX(this.visual.OLD_PRICE_ID);this.obPrice.discount=BX(this.visual.DISCOUNT_PRICE_ID);if(!this.obPrice.full||!this.obPrice.discount){this.config.showOldPrice=false}}if(this.config.showPercent){this.obPrice.percent=BX(this.visual.DISCOUNT_PERCENT_ID);if(!this.obPrice.percent){this.config.showPercent=false}}}this.obBasketActions=BX(this.visual.BASKET_ACTIONS_ID);if(this.obBasketActions){if(BX.util.in_array("BUY",this.config.basketAction)){this.obBuyBtn=BX(this.visual.BUY_LINK)}if(BX.util.in_array("ADD",this.config.basketAction)){this.obAddToBasketBtn=BX(this.visual.ADD_BASKET_LINK)}}this.obNotAvail=BX(this.visual.NOT_AVAILABLE_MESS)}if(this.config.showQuantity){this.obQuantity=BX(this.visual.QUANTITY_ID);this.node.quantity=this.getEntity(this.obProduct,"quantity-block");if(this.visual.QUANTITY_UP_ID){this.obQuantityUp=BX(this.visual.QUANTITY_UP_ID)}if(this.visual.QUANTITY_DOWN_ID){this.obQuantityDown=BX(this.visual.QUANTITY_DOWN_ID)}}if(this.productType===3){if(this.visual.TREE_ID){this.obTree=BX(this.visual.TREE_ID);if(!this.obTree){this.errorCode=-256}}if(this.visual.QUANTITY_MEASURE){this.obMeasure=BX(this.visual.QUANTITY_MEASURE)}if(this.visual.QUANTITY_LIMIT&&this.config.showMaxQuantity!=="N"){this.obQuantityLimit.all=BX(this.visual.QUANTITY_LIMIT);if(this.obQuantityLimit.all){this.obQuantityLimit.value=this.getEntity(this.obQuantityLimit.all,"quantity-limit-value");if(!this.obQuantityLimit.value){this.obQuantityLimit.all=null}}}if(this.config.usePriceRanges){this.obPriceRanges=this.getEntity(this.obProduct,"price-ranges-block")}}if(this.config.showSkuProps){this.obSkuProps=BX(this.visual.DISPLAY_PROP_DIV);this.obMainSkuProps=BX(this.visual.DISPLAY_MAIN_PROP_DIV)}if(this.config.useCompare){this.obCompare=BX(this.visual.COMPARE_LINK)}if(this.config.useSubscribe){this.obSubscribe=BX(this.visual.SUBSCRIBE_LINK)}this.obTabs=BX(this.visual.TABS_ID);this.obTabContainers=BX(this.visual.TAB_CONTAINERS_ID);this.obTabsPanel=BX(this.visual.TABS_PANEL_ID);this.smallCardNodes.panel=BX(this.visual.SMALL_CARD_PANEL_ID);if(this.smallCardNodes.panel){this.smallCardNodes.picture=this.getEntity(this.smallCardNodes.panel,"panel-picture");this.smallCardNodes.title=this.getEntity(this.smallCardNodes.panel,"panel-title");this.smallCardNodes.price=this.getEntity(this.smallCardNodes.panel,"panel-price");this.smallCardNodes.sku=this.getEntity(this.smallCardNodes.panel,"panel-sku-container");this.smallCardNodes.oldPrice=this.getEntity(this.smallCardNodes.panel,"panel-old-price");this.smallCardNodes.buyButton=this.getEntity(this.smallCardNodes.panel,"panel-buy-button");this.smallCardNodes.addButton=this.getEntity(this.smallCardNodes.panel,"panel-add-button");this.smallCardNodes.notAvailableButton=this.getEntity(this.smallCardNodes.panel,"panel-not-available-button");this.smallCardNodes.aligner=this.getEntity(this.obProduct,"main-button-container")}this.initPopup();this.initTabs();if(this.smallCardNodes.panel){this.smallCardNodes.picture&&BX.bind(this.smallCardNodes.picture.parentNode,"click",BX.proxy(this.scrollToProduct,this));this.smallCardNodes.title&&BX.bind(this.smallCardNodes.title,"click",BX.proxy(this.scrollToProduct,this));this.smallCardNodes.sku&&BX.bind(this.smallCardNodes.sku,"click",BX.proxy(this.scrollToProduct,this))}if(this.obTabsPanel||this.smallCardNodes.panel){this.checkTopPanels();BX.bind(t,"scroll",BX.proxy(this.checkTopPanels,this))}if(this.errorCode===0){if(this.config.showSlider&&!this.isTouchDevice){BX.bind(this.obBigSlider,"mouseenter",BX.proxy(this.stopSlider,this));BX.bind(this.obBigSlider,"mouseleave",BX.proxy(this.cycleSlider,this))}if(this.isTouchDevice){BX.bind(this.node.imageContainer,"touchstart",BX.proxy(this.touchStartEvent,this));BX.bind(this.node.imageContainer,"touchend",BX.proxy(this.touchEndEvent,this));BX.bind(this.node.imageContainer,"touchcancel",BX.proxy(this.touchEndEvent,this))}BX.bind(this.node.sliderControlLeft,"click",BX.proxy(this.slidePrev,this));BX.bind(this.node.sliderControlRight,"click",BX.proxy(this.slideNext,this));if(this.config.showQuantity){var a=this.isTouchDevice?"touchstart":"mousedown";var r=this.isTouchDevice?"touchend":"mouseup";if(this.obQuantityUp){BX.bind(this.obQuantityUp,a,BX.proxy(this.startQuantityInterval,this));BX.bind(this.obQuantityUp,r,BX.proxy(this.clearQuantityInterval,this));BX.bind(this.obQuantityUp,"mouseout",BX.proxy(this.clearQuantityInterval,this));BX.bind(this.obQuantityUp,"click",BX.delegate(this.quantityUp,this))}if(this.obQuantityDown){BX.bind(this.obQuantityDown,a,BX.proxy(this.startQuantityInterval,this));BX.bind(this.obQuantityDown,r,BX.proxy(this.clearQuantityInterval,this));BX.bind(this.obQuantityDown,"mouseout",BX.proxy(this.clearQuantityInterval,this));BX.bind(this.obQuantityDown,"click",BX.delegate(this.quantityDown,this))}if(this.obQuantity){BX.bind(this.obQuantity,"change",BX.delegate(this.quantityChange,this))}}switch(this.productType){case 0:case 1:case 2:if(this.product.useSlider){this.product.slider={ID:this.visual.SLIDER_CONT_ID,CONT:BX(this.visual.SLIDER_CONT_ID),COUNT:this.product.sliderCount};this.product.slider.ITEMS=this.getEntities(this.product.slider.CONT,"slider-control");for(e=0;e<this.product.slider.ITEMS.length;e++){BX.bind(this.product.slider.ITEMS[e],"mouseenter",BX.delegate(this.onSliderControlHover,this));BX.bind(this.product.slider.ITEMS[e],"mouseleave",BX.delegate(this.onSliderControlLeave,this));BX.bind(this.product.slider.ITEMS[e],"click",BX.delegate(this.selectSliderImg,this))}this.setCurrentImg(this.product.sliderPict[0],true,true);this.checkSliderControls(this.product.sliderCount);if(this.product.slider.ITEMS.length>1){this.initSlider()}}this.checkQuantityControls();this.fixFontCheck();this.setAnalyticsDataLayer("showDetail");break;case 3:s=this.obTree.querySelectorAll("li");for(i=0;i<s.length;i++){BX.bind(s[i],"click",BX.delegate(this.selectOfferProp,this))}for(i=0;i<this.offers.length;i++){this.offers[i].SLIDER_COUNT=parseInt(this.offers[i].SLIDER_COUNT,10)||0;if(this.offers[i].SLIDER_COUNT===0){this.slider.controls[i]={ID:"",COUNT:this.offers[i].SLIDER_COUNT,ITEMS:[]}}else{for(e=0;e<this.offers[i].SLIDER.length;e++){this.offers[i].SLIDER[e].WIDTH=parseInt(this.offers[i].SLIDER[e].WIDTH,10);this.offers[i].SLIDER[e].HEIGHT=parseInt(this.offers[i].SLIDER[e].HEIGHT,10)}this.slider.controls[i]={ID:this.visual.SLIDER_CONT_OF_ID+this.offers[i].ID,OFFER_ID:this.offers[i].ID,CONT:BX(this.visual.SLIDER_CONT_OF_ID+this.offers[i].ID),COUNT:this.offers[i].SLIDER_COUNT};this.slider.controls[i].ITEMS=this.getEntities(this.slider.controls[i].CONT,"slider-control");for(e=0;e<this.slider.controls[i].ITEMS.length;e++){BX.bind(this.slider.controls[i].ITEMS[e],"mouseenter",BX.delegate(this.onSliderControlHover,this));BX.bind(this.slider.controls[i].ITEMS[e],"mouseleave",BX.delegate(this.onSliderControlLeave,this));BX.bind(this.slider.controls[i].ITEMS[e],"click",BX.delegate(this.selectSliderImg,this))}}}this.setCurrent();break}this.obBuyBtn&&BX.bind(this.obBuyBtn,"click",BX.proxy(this.buyBasket,this));this.smallCardNodes.buyButton&&BX.bind(this.smallCardNodes.buyButton,"click",BX.proxy(this.buyBasket,this));this.obAddToBasketBtn&&BX.bind(this.obAddToBasketBtn,"click",BX.proxy(this.add2Basket,this));this.smallCardNodes.addButton&&BX.bind(this.smallCardNodes.addButton,"click",BX.proxy(this.add2Basket,this));if(this.obCompare){BX.bind(this.obCompare,"click",BX.proxy(this.compare,this));BX.addCustomEvent("onCatalogDeleteCompare",BX.proxy(this.checkDeletedCompare,this))}}},initConfig:function(){if(this.params.PRODUCT_TYPE){this.productType=parseInt(this.params.PRODUCT_TYPE,10)}if(this.params.CONFIG.USE_CATALOG!=="undefined"&&BX.type.isBoolean(this.params.CONFIG.USE_CATALOG)){this.config.useCatalog=this.params.CONFIG.USE_CATALOG}this.config.showQuantity=this.params.CONFIG.SHOW_QUANTITY;this.config.showPrice=this.params.CONFIG.SHOW_PRICE;this.config.showPercent=this.params.CONFIG.SHOW_DISCOUNT_PERCENT;this.config.showOldPrice=this.params.CONFIG.SHOW_OLD_PRICE;this.config.showSkuProps=this.params.CONFIG.SHOW_SKU_PROPS;this.config.showOfferGroup=this.params.CONFIG.OFFER_GROUP;this.config.useCompare=this.params.CONFIG.DISPLAY_COMPARE;this.config.useStickers=this.params.CONFIG.USE_STICKERS;this.config.useSubscribe=this.params.CONFIG.USE_SUBSCRIBE;this.config.showMaxQuantity=this.params.CONFIG.SHOW_MAX_QUANTITY;this.config.relativeQuantityFactor=parseInt(this.params.CONFIG.RELATIVE_QUANTITY_FACTOR);this.config.usePriceRanges=this.params.CONFIG.USE_PRICE_COUNT;if(this.params.CONFIG.MAIN_PICTURE_MODE){this.config.usePopup=BX.util.in_array("POPUP",this.params.CONFIG.MAIN_PICTURE_MODE);this.config.useMagnifier=BX.util.in_array("MAGNIFIER",this.params.CONFIG.MAIN_PICTURE_MODE)}if(this.params.CONFIG.ADD_TO_BASKET_ACTION){this.config.basketAction=this.params.CONFIG.ADD_TO_BASKET_ACTION}this.config.showClosePopup=this.params.CONFIG.SHOW_CLOSE_POPUP;this.config.templateTheme=this.params.CONFIG.TEMPLATE_THEME||"";this.config.showSlider=this.params.CONFIG.SHOW_SLIDER==="Y";if(this.config.showSlider&&!this.isTouchDevice){this.config.sliderInterval=parseInt(this.params.CONFIG.SLIDER_INTERVAL)||5e3}else{this.config.sliderInterval=false}this.config.useEnhancedEcommerce=this.params.CONFIG.USE_ENHANCED_ECOMMERCE==="Y";this.config.dataLayerName=this.params.CONFIG.DATA_LAYER_NAME;this.config.brandProperty=this.params.CONFIG.BRAND_PROPERTY;this.config.alt=this.params.CONFIG.ALT||"";this.config.title=this.params.CONFIG.TITLE||"";this.config.magnifierZoomPercent=parseInt(this.params.CONFIG.MAGNIFIER_ZOOM_PERCENT)||200;if(!this.params.VISUAL||typeof this.params.VISUAL!=="object"||!this.params.VISUAL.ID){this.errorCode=-1;return}this.visual=this.params.VISUAL},initProductData:function(){var t=0;if(this.params.PRODUCT&&typeof this.params.PRODUCT==="object"){if(this.config.showPrice){this.currentPriceMode=this.params.PRODUCT.ITEM_PRICE_MODE;this.currentPrices=this.params.PRODUCT.ITEM_PRICES;this.currentPriceSelected=this.params.PRODUCT.ITEM_PRICE_SELECTED;this.currentQuantityRanges=this.params.PRODUCT.ITEM_QUANTITY_RANGES;this.currentQuantityRangeSelected=this.params.PRODUCT.ITEM_QUANTITY_RANGE_SELECTED}if(this.config.showQuantity){this.product.checkQuantity=this.params.PRODUCT.CHECK_QUANTITY;this.product.isDblQuantity=this.params.PRODUCT.QUANTITY_FLOAT;if(this.product.checkQuantity){this.product.maxQuantity=this.product.isDblQuantity?parseFloat(this.params.PRODUCT.MAX_QUANTITY):parseInt(this.params.PRODUCT.MAX_QUANTITY,10)}this.product.stepQuantity=this.product.isDblQuantity?parseFloat(this.params.PRODUCT.STEP_QUANTITY):parseInt(this.params.PRODUCT.STEP_QUANTITY,10);this.checkQuantity=this.product.checkQuantity;this.isDblQuantity=this.product.isDblQuantity;this.stepQuantity=this.product.stepQuantity;this.maxQuantity=this.product.maxQuantity;this.minQuantity=this.currentPriceMode==="Q"?parseFloat(this.currentPrices[this.currentPriceSelected].MIN_QUANTITY):this.stepQuantity;if(this.isDblQuantity){this.stepQuantity=Math.round(this.stepQuantity*this.precisionFactor)/this.precisionFactor}}this.product.canBuy=this.params.PRODUCT.CAN_BUY;this.canSubscription=this.product.canSubscription=this.params.PRODUCT.SUBSCRIPTION;this.product.name=this.params.PRODUCT.NAME;this.product.pict=this.params.PRODUCT.PICT;this.product.id=this.params.PRODUCT.ID;this.product.category=this.params.PRODUCT.CATEGORY;if(this.params.PRODUCT.ADD_URL){this.product.addUrl=this.params.PRODUCT.ADD_URL}if(this.params.PRODUCT.BUY_URL){this.product.buyUrl=this.params.PRODUCT.BUY_URL}if(this.params.PRODUCT.SLIDER_COUNT){this.product.sliderCount=parseInt(this.params.PRODUCT.SLIDER_COUNT,10)||0;if(this.product.sliderCount>0&&this.params.PRODUCT.SLIDER.length){for(t=0;t<this.params.PRODUCT.SLIDER.length;t++){this.product.useSlider=true;this.params.PRODUCT.SLIDER[t].WIDTH=parseInt(this.params.PRODUCT.SLIDER[t].WIDTH,10);this.params.PRODUCT.SLIDER[t].HEIGHT=parseInt(this.params.PRODUCT.SLIDER[t].HEIGHT,10)}this.product.sliderPict=this.params.PRODUCT.SLIDER;this.setCurrentImg(this.product.sliderPict[0],false)}}this.currentIsSet=true}else{this.errorCode=-1}},initOffersData:function(){if(this.params.OFFERS&&BX.type.isArray(this.params.OFFERS)){this.offers=this.params.OFFERS;this.offerNum=0;if(this.params.OFFER_SELECTED){this.offerNum=parseInt(this.params.OFFER_SELECTED,10)||0}if(this.params.TREE_PROPS){this.treeProps=this.params.TREE_PROPS}if(this.params.DEFAULT_PICTURE){this.defaultPict.preview=this.params.DEFAULT_PICTURE.PREVIEW_PICTURE;this.defaultPict.detail=this.params.DEFAULT_PICTURE.DETAIL_PICTURE}if(this.params.PRODUCT&&typeof this.params.PRODUCT==="object"){this.product.id=parseInt(this.params.PRODUCT.ID,10);this.product.name=this.params.PRODUCT.NAME;this.product.category=this.params.PRODUCT.CATEGORY}}else{this.errorCode=-1}},initBasketData:function(){if(this.params.BASKET&&typeof this.params.BASKET==="object"){if(this.productType===1||this.productType===2){this.basketData.useProps=this.params.BASKET.ADD_PROPS;this.basketData.emptyProps=this.params.BASKET.EMPTY_PROPS}if(this.params.BASKET.QUANTITY){this.basketData.quantity=this.params.BASKET.QUANTITY}if(this.params.BASKET.PROPS){this.basketData.props=this.params.BASKET.PROPS}if(this.params.BASKET.BASKET_URL){this.basketData.basketUrl=this.params.BASKET.BASKET_URL}if(this.productType===3){if(this.params.BASKET.SKU_PROPS){this.basketData.sku_props=this.params.BASKET.SKU_PROPS}}if(this.params.BASKET.ADD_URL_TEMPLATE){this.basketData.add_url=this.params.BASKET.ADD_URL_TEMPLATE}if(this.params.BASKET.BUY_URL_TEMPLATE){this.basketData.buy_url=this.params.BASKET.BUY_URL_TEMPLATE}if(this.basketData.add_url===""&&this.basketData.buy_url===""){this.errorCode=-1024}}},initCompareData:function(){if(this.config.useCompare){if(this.params.COMPARE&&typeof this.params.COMPARE==="object"){if(this.params.COMPARE.COMPARE_PATH){this.compareData.comparePath=this.params.COMPARE.COMPARE_PATH}if(this.params.COMPARE.COMPARE_URL_TEMPLATE){this.compareData.compareUrl=this.params.COMPARE.COMPARE_URL_TEMPLATE}else{this.config.useCompare=false}if(this.params.COMPARE.COMPARE_DELETE_URL_TEMPLATE){this.compareData.compareDeleteUrl=this.params.COMPARE.COMPARE_DELETE_URL_TEMPLATE}else{this.config.useCompare=false}}else{this.config.useCompare=false}}},initSlider:function(){if(this.node.sliderProgressBar){if(this.slider.progress){this.resetProgress()}else{this.slider.progress=new BX.easing({transition:BX.easing.transitions.linear,step:BX.delegate(function(t){this.node.sliderProgressBar.style.width=t.width/10+"%"},this)})}}this.cycleSlider()},setAnalyticsDataLayer:function(i){if(!this.config.useEnhancedEcommerce||!this.config.dataLayerName)return;var e={},s={},a=[],r,o,n,h,l,u;switch(this.productType){case 0:case 1:case 2:e={id:this.product.id,name:this.product.name,price:this.currentPrices[this.currentPriceSelected]&&this.currentPrices[this.currentPriceSelected].PRICE,category:this.product.category,brand:BX.type.isArray(this.config.brandProperty)?this.config.brandProperty.join("/"):this.config.brandProperty};break;case 3:for(r in this.offers[this.offerNum].TREE){if(this.offers[this.offerNum].TREE.hasOwnProperty(r)){h=r.substring(5);l=this.offers[this.offerNum].TREE[r];for(o in this.treeProps){if(this.treeProps.hasOwnProperty(o)&&this.treeProps[o].ID==h){for(n in this.treeProps[o].VALUES){u=this.treeProps[o].VALUES[n];if(u.ID==l){a.push(u.NAME);break}}}}}}e={id:this.offers[this.offerNum].ID,name:this.offers[this.offerNum].NAME,price:this.currentPrices[this.currentPriceSelected]&&this.currentPrices[this.currentPriceSelected].PRICE,category:this.product.category,brand:BX.type.isArray(this.config.brandProperty)?this.config.brandProperty.join("/"):this.config.brandProperty,variant:a.join("/")};break}switch(i){case"showDetail":s={event:"showDetail",ecommerce:{currencyCode:this.currentPrices[this.currentPriceSelected]&&this.currentPrices[this.currentPriceSelected].CURRENCY||"",detail:{products:[{name:e.name||"",id:e.id||"",price:e.price||0,brand:e.brand||"",category:e.category||"",variant:e.variant||""}]}}};break;case"addToCart":s={event:"addToCart",ecommerce:{currencyCode:this.currentPrices[this.currentPriceSelected]&&this.currentPrices[this.currentPriceSelected].CURRENCY||"",add:{products:[{name:e.name||"",id:e.id||"",price:e.price||0,brand:e.brand||"",category:e.category||"",variant:e.variant||"",quantity:this.config.showQuantity&&this.obQuantity?this.obQuantity.value:1}]}}};break}t[this.config.dataLayerName]=t[this.config.dataLayerName]||[];t[this.config.dataLayerName].push(s)},initTabs:function(){var t=this.getEntities(this.obTabs,"tab"),i=this.getEntities(this.obTabsPanel,"tab");var e,s,a=false;if(t.length!==i.length)return;for(var r in t){if(t.hasOwnProperty(r)&&BX.type.isDomNode(t[r])){e=t[r].getAttribute("data-value");if(e){s=this.obTabContainers.querySelector('[data-value="'+e+'"]');if(BX.type.isDomNode(s)){BX.bind(t[r],"click",BX.proxy(this.changeTab,this));BX.bind(i[r],"click",BX.proxy(this.changeTab,this));if(!a){BX.addClass(t[r],"active");BX.addClass(i[r],"active");BX.show(s);a=true}else{BX.removeClass(t[r],"active");BX.removeClass(i[r],"active");BX.hide(s)}}}}}},checkTouch:function(t){if(!t||!t.changedTouches)return false;return t.changedTouches[0].identifier===this.touch.identifier},touchStartEvent:function(t){if(t.touches.length!=1)return;this.touch=t.changedTouches[0]},touchEndEvent:function(t){if(!this.checkTouch(t))return;var i=this.touch.pageX-t.changedTouches[0].pageX,e=this.touch.pageY-t.changedTouches[0].pageY;if(Math.abs(i)>=Math.abs(e)+10){if(i>0){this.slideNext()}if(i<0){this.slidePrev()}}},cycleSlider:function(t){t||(this.slider.paused=false);this.slider.interval&&clearInterval(this.slider.interval);if(this.config.sliderInterval&&!this.slider.paused){if(this.slider.progress){this.slider.progress.stop();var i=parseInt(this.node.sliderProgressBar.style.width);this.slider.progress.options.duration=this.config.sliderInterval*(100-i)/100;this.slider.progress.options.start={width:i*10};this.slider.progress.options.finish={width:1e3};this.slider.progress.options.complete=BX.delegate(function(){this.slider.interval=true;this.slideNext()},this);this.slider.progress.animate()}else{this.slider.interval=setInterval(BX.proxy(this.slideNext,this),this.config.sliderInterval)}}},stopSlider:function(t){t||(this.slider.paused=true);this.slider.interval&&(this.slider.interval=clearInterval(this.slider.interval));if(this.slider.progress){this.slider.progress.stop();var i=parseInt(this.node.sliderProgressBar.style.width);this.slider.progress.options.duration=this.config.sliderInterval*i/200;this.slider.progress.options.start={width:i*10};this.slider.progress.options.finish={width:0};this.slider.progress.options.complete=null;this.slider.progress.animate()}},resetProgress:function(){this.slider.progress&&this.slider.progress.stop();this.node.sliderProgressBar.style.width=0},slideNext:function(){return this.slide("next")},slidePrev:function(){return this.slide("prev")},slide:function(t){if(!this.product.slider||!this.product.slider.CONT)return;var i=this.getEntity(this.product.slider.CONT,"slider-control",".active"),e=this.getItemForDirection(t,i);BX.removeClass(i,"active");this.selectSliderImg(e);this.slider.interval&&this.cycleSlider()},getItemForDirection:function(t,i){var e=this.getItemIndex(i),s=t==="prev"?-1:1,a=(e+s)%this.product.slider.COUNT;return this.eq(this.product.slider.ITEMS,a)},getItemIndex:function(t){return BX.util.array_values(this.product.slider.ITEMS).indexOf(t)},eq:function(t,i){var e=t.length,s=+i+(i<0?e:0);return s>=0&&s<e?t[s]:{}},scrollToProduct:function(){var i=BX.GetWindowScrollPos().scrollTop,e=BX.pos(this.obProduct).top-30;if(i>e){new BX.easing({duration:500,start:{scroll:i},finish:{scroll:e},transition:BX.easing.makeEaseOut(BX.easing.transitions.quint),step:BX.delegate(function(i){t.scrollTo(0,i.scroll)},this)}).animate()}},checkTopPanels:function(){var t=BX.GetWindowScrollPos().scrollTop,i;if(this.smallCardNodes.panel){i=BX.pos(this.smallCardNodes.aligner).bottom-50;if(t>i){BX.addClass(this.smallCardNodes.panel,"active")}else if(BX.hasClass(this.smallCardNodes.panel,"active")){BX.removeClass(this.smallCardNodes.panel,"active")}}if(this.obTabsPanel){i=BX.pos(this.obTabs).top;if(t+73>i){BX.addClass(this.obTabsPanel,"active")}else if(BX.hasClass(this.obTabsPanel,"active")){BX.removeClass(this.obTabsPanel,"active")}}},changeTab:function(i){BX.PreventDefault(i);var e=BX.proxy_context&&BX.proxy_context.getAttribute("data-value"),s,a,r;if(!BX.hasClass(BX.proxy_context,"active")&&e){s=this.getEntities(this.obTabContainers,"tab-container");for(var o in s){if(s.hasOwnProperty(o)&&BX.type.isDomNode(s[o])){if(s[o].getAttribute("data-value")===e){BX.show(s[o])}else{BX.hide(s[o])}}}a=this.getEntities(this.obTabs,"tab");r=this.getEntities(this.obTabsPanel,"tab");for(o in a){if(a.hasOwnProperty(o)&&BX.type.isDomNode(a[o])){if(a[o].getAttribute("data-value")===e){BX.addClass(a[o],"active");BX.addClass(r[o],"active")}else{BX.removeClass(a[o],"active");BX.removeClass(r[o],"active")}}}}var n=BX.GetWindowScrollPos().scrollTop,h=BX.pos(this.obTabContainers).top;if(n+150>h){new BX.easing({duration:500,start:{scroll:n},finish:{scroll:h-150},transition:BX.easing.makeEaseOut(BX.easing.transitions.quint),step:BX.delegate(function(i){t.scrollTo(0,i.scroll)},this)}).animate()}},initPopup:function(){if(this.config.usePopup){this.node.imageContainer.style.cursor="zoom-in";BX.bind(this.node.imageContainer,"click",BX.delegate(this.toggleMainPictPopup,this));BX.bind(document,"keyup",BX.proxy(this.closeByEscape,this));BX.bind(this.getEntity(this.obBigSlider,"close-popup"),"click",BX.proxy(this.hideMainPictPopup,this))}},checkSliderControls:function(t){var i=t>1?"":"none";this.node.sliderControlLeft&&(this.node.sliderControlLeft.style.display=i);this.node.sliderControlRight&&(this.node.sliderControlRight.style.display=i)},setCurrentImg:function(t,i,e){var s,a;this.currentImg.id=t.ID;this.currentImg.src=t.SRC;this.currentImg.width=t.WIDTH;this.currentImg.height=t.HEIGHT;if(i&&this.node.imageContainer){s=this.getEntities(this.node.imageContainer,"image");a=s.length;while(a--){if(s[a].getAttribute("data-id")==t.ID){if(!BX.hasClass(s[a],"active")){this.node.sliderProgressBar&&this.resetProgress()}BX.addClass(s[a],"active")}else if(BX.hasClass(s[a],"active")){BX.removeClass(s[a],"active")}}}if(e&&this.smallCardNodes.picture){this.smallCardNodes.picture.setAttribute("src",this.currentImg.src)}if(this.config.useMagnifier&&!this.isTouchDevice){this.setMagnifierParams();if(i){this.disableMagnifier(true)}}},setMagnifierParams:function(){var t=this.getEntities(this.node.imageContainer,"image"),i=t.length,e;while(i--){e=t[i].querySelector("img");e.setAttribute("data-title",e.getAttribute("title")||"");e.removeAttribute("title");if(t[i].getAttribute("data-id")==this.currentImg.id){BX.unbind(this.currentImg.node,"mouseover",BX.proxy(this.enableMagnifier,this));this.currentImg.node=e;this.currentImg.node.style.backgroundImage="url('"+this.currentImg.src+"')";this.currentImg.node.style.backgroundSize="100% auto";BX.bind(this.currentImg.node,"mouseover",BX.proxy(this.enableMagnifier,this))}}},enableMagnifier:function(){BX.bind(document,"mousemove",BX.proxy(this.moveMagnifierArea,this))},disableMagnifier:function(t){if(!this.magnify.enabled)return;clearTimeout(this.magnify.timer);BX.removeClass(this.obBigSlider,"magnified");this.magnify.enabled=false;this.currentImg.node.style.backgroundSize="100% auto";if(t){this.currentImg.node.style.height=this.magnify.height+"px";this.currentImg.node.style.width=this.magnify.width+"px";this.magnify.timer=setTimeout(BX.delegate(function(){this.currentImg.node.src=this.currentImg.src;this.currentImg.node.style.height="";this.currentImg.node.style.width=""},this),250)}else{this.currentImg.node.src=this.currentImg.src;this.currentImg.node.style.height="";this.currentImg.node.style.width=""}BX.unbind(document,"mousemove",BX.proxy(this.moveMagnifierArea,this))},moveMagnifierArea:function(t){var i=BX.pos(this.currentImg.node),e=this.inRect(t,i);if(this.inBound(i,e)){var s=e.X/this.currentImg.node.width*100,a=e.Y/this.currentImg.node.height*100,r,o,n,h,l;this.currentImg.node.style.backgroundPosition=s+"% "+a+"%";if(!this.magnify.enabled){clearTimeout(this.magnify.timer);BX.addClass(this.obBigSlider,"magnified");this.currentImg.node.style.height=(this.magnify.height=this.currentImg.node.clientHeight)+"px";this.currentImg.node.style.width=(this.magnify.width=this.currentImg.node.offsetWidth)+"px";r=this.currentImg.width/this.currentImg.height;o=this.obBigSlider.offsetWidth;if(o>this.currentImg.width&&!BX.hasClass(this.obBigSlider,"popup")){n=o;h=n/r;l=100}else{n=this.currentImg.width;h=this.currentImg.height;l=this.config.magnifierZoomPercent>100?this.config.magnifierZoomPercent:100}this.currentImg.node.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12P4zwAAAgEBAKrChTYAAAAASUVORK5CYII=";this.currentImg.node.style.backgroundSize=l+"% auto";this.magnify.timer=setTimeout(BX.delegate(function(){this.currentImg.node.style.height=h+"px";this.currentImg.node.style.width=n+"px"},this),10)}this.magnify.enabled=true}else{this.disableMagnifier(true)}},inBound:function(t,i){return i.Y>=0&&t.height>=i.Y&&(i.X>=0&&t.width>=i.X)},inRect:function(t,i){var e=BX.GetWindowSize(),s={X:0,Y:0,globalX:0,globalY:0};s.globalX=t.clientX+e.scrollLeft;if(t.offsetX&&t.offsetX<0){s.globalX-=t.offsetX}s.X=s.globalX-i.left;s.globalY=t.clientY+e.scrollTop;if(t.offsetY&&t.offsetY<0){s.globalY-=t.offsetY}s.Y=s.globalY-i.top;return s},setProductMainPict:function(t){var i=-1,e=0,s=0,a="";if(this.product.sliderCount){for(s=0;s<this.product.sliderPict.length;s++){if(t===this.product.sliderPict[s].ID){i=s;break}}if(i>-1){if(this.product.sliderPict[i]){this.setCurrentImg(this.product.sliderPict[i],true)}for(e=0;e<this.product.slider.ITEMS.length;e++){a=this.product.slider.ITEMS[e].getAttribute("data-value");if(a===t){BX.addClass(this.product.slider.ITEMS[e],"active")}else if(BX.hasClass(this.product.slider.ITEMS[e],"active")){BX.removeClass(this.product.slider.ITEMS[e],"active")}}}}},onSliderControlHover:function(){var t=BX.proxy_context;this.mouseTimer=setTimeout(BX.delegate(function(){this.selectSliderImg(t)},this),200)},onSliderControlLeave:function(){clearTimeout(this.mouseTimer);this.mouseTimer=null},selectSliderImg:function(t){var i="",e=[];t=BX.type.isDomNode(t)?t:BX.proxy_context;if(t&&t.hasAttribute("data-value")){i=t.getAttribute("data-value");if(i.indexOf("_")!==-1){e=i.split("_");this.setMainPict(e[0],e[1])}else{this.setProductMainPict(i)}}},setMainPict:function(t,i,e){var s=-1,a=-1,r,o,n="",h="";for(r=0;r<this.offers.length;r++){if(t===this.offers[r].ID){s=r;break}}if(s>-1){if(this.offers[s].SLIDER_COUNT>0){for(o=0;o<this.offers[s].SLIDER.length;o++){if(i===this.offers[s].SLIDER[o].ID){a=o;break}}if(a>-1){if(this.offers[s].SLIDER[a]){this.setCurrentImg(this.offers[s].SLIDER[a],true,e)}h=t+"_"+i;for(r=0;r<this.product.slider.ITEMS.length;r++){n=this.product.slider.ITEMS[r].getAttribute("data-value");if(n===h){BX.addClass(this.product.slider.ITEMS[r],"active")}else if(BX.hasClass(this.product.slider.ITEMS[r],"active")){BX.removeClass(this.product.slider.ITEMS[r],"active")}}}}}},setMainPictFromItem:function(t){if(this.node.imageContainer){var i=false,e={};if(this.offers[t]){if(this.offers[t].DETAIL_PICTURE){e=this.offers[t].DETAIL_PICTURE;i=true}else if(this.offers[t].PREVIEW_PICTURE){e=this.offers[t].PREVIEW_PICTURE;i=true}}if(!i){if(this.defaultPict.detail){e=this.defaultPict.detail;i=true}else if(this.defaultPict.preview){e=this.defaultPict.preview;i=true}}if(i){this.setCurrentImg(e,true,true)}}},toggleMainPictPopup:function(){if(BX.hasClass(this.obBigSlider,"popup")){this.hideMainPictPopup()}else{this.showMainPictPopup()}},showMainPictPopup:function(){this.config.useMagnifier&&this.disableMagnifier(false);BX.addClass(this.obBigSlider,"popup");this.node.imageContainer.style.cursor="";document.body.style.overflow="hidden"},hideMainPictPopup:function(){this.config.useMagnifier&&this.disableMagnifier(false);BX.removeClass(this.obBigSlider,"popup");this.node.imageContainer.style.cursor="zoom-in";document.body.style.overflow=""},closeByEscape:function(i){i=i||t.event;if(i.keyCode==27){this.hideMainPictPopup()}},startQuantityInterval:function(){var t=BX.proxy_context;var i=t.id===this.visual.QUANTITY_DOWN_ID?BX.proxy(this.quantityDown,this):BX.proxy(this.quantityUp,this);this.quantityDelay=setTimeout(BX.delegate(function(){this.quantityTimer=setInterval(i,150)},this),300)},clearQuantityInterval:function(){clearTimeout(this.quantityDelay);clearInterval(this.quantityTimer)},quantityUp:function(){var t=0,i=true;if(this.errorCode===0&&this.config.showQuantity&&this.canBuy&&!this.isGift){t=this.isDblQuantity?parseFloat(this.obQuantity.value):parseInt(this.obQuantity.value,10);if(!isNaN(t)){t+=this.stepQuantity;t=this.checkQuantityRange(t,"up");if(this.checkQuantity&&t>this.maxQuantity){i=false}if(i){if(this.isDblQuantity){t=Math.round(t*this.precisionFactor)/this.precisionFactor}this.obQuantity.value=t;this.setPrice()}}}},quantityDown:function(){var t=0,i=true;if(this.errorCode===0&&this.config.showQuantity&&this.canBuy&&!this.isGift){t=this.isDblQuantity?parseFloat(this.obQuantity.value):parseInt(this.obQuantity.value,10);if(!isNaN(t)){t-=this.stepQuantity;t=this.checkQuantityRange(t,"down");if(t<this.minQuantity){i=false}if(i){if(this.isDblQuantity){t=Math.round(t*this.precisionFactor)/this.precisionFactor}this.obQuantity.value=t;this.setPrice()}}}},quantityChange:function(){var t=0,i;if(this.errorCode===0&&this.config.showQuantity){if(this.canBuy){t=this.isDblQuantity?parseFloat(this.obQuantity.value):Math.round(this.obQuantity.value);if(!isNaN(t)){t=this.checkQuantityRange(t);if(this.checkQuantity){if(t>this.maxQuantity){t=this.maxQuantity}}this.checkPriceRange(t);i=Math.floor(Math.round(t*this.precisionFactor/this.stepQuantity)/this.precisionFactor)||1;t=i<=1?this.stepQuantity:i*this.stepQuantity;t=Math.round(t*this.precisionFactor)/this.precisionFactor;if(t<this.minQuantity){t=this.minQuantity}this.obQuantity.value=t}else{this.obQuantity.value=this.minQuantity}}else{this.obQuantity.value=this.minQuantity}this.setPrice()}},quantitySet:function(t){var i,e;var s=this.offers[t],a=this.offers[this.offerNum];if(this.errorCode===0){this.canBuy=s.CAN_BUY;this.currentPriceMode=s.ITEM_PRICE_MODE;this.currentPrices=s.ITEM_PRICES;this.currentPriceSelected=s.ITEM_PRICE_SELECTED;this.currentQuantityRanges=s.ITEM_QUANTITY_RANGES;this.currentQuantityRangeSelected=s.ITEM_QUANTITY_RANGE_SELECTED;if(this.canBuy){this.node.quantity&&BX.style(this.node.quantity,"display","");this.obBasketActions&&BX.style(this.obBasketActions,"display","");this.smallCardNodes.buyButton&&BX.style(this.smallCardNodes.buyButton,"display","");this.smallCardNodes.addButton&&BX.style(this.smallCardNodes.addButton,"display","");this.obNotAvail&&BX.style(this.obNotAvail,"display","none");this.smallCardNodes.notAvailableButton&&BX.style(this.smallCardNodes.notAvailableButton,"display","none");this.obSubscribe&&BX.style(this.obSubscribe,"display","none")}else{this.node.quantity&&BX.style(this.node.quantity,"display","none");this.obBasketActions&&BX.style(this.obBasketActions,"display","none");this.smallCardNodes.buyButton&&BX.style(this.smallCardNodes.buyButton,"display","none");this.smallCardNodes.addButton&&BX.style(this.smallCardNodes.addButton,"display","none");this.obNotAvail&&BX.style(this.obNotAvail,"display","");this.smallCardNodes.notAvailableButton&&BX.style(this.smallCardNodes.notAvailableButton,"display","");if(this.obSubscribe){if(s.CATALOG_SUBSCRIBE==="Y"){BX.style(this.obSubscribe,"display","");this.obSubscribe.setAttribute("data-item",s.ID);BX(this.visual.SUBSCRIBE_LINK+"_hidden").click()}else{BX.style(this.obSubscribe,"display","none")}}}this.isDblQuantity=s.QUANTITY_FLOAT;this.checkQuantity=s.CHECK_QUANTITY;if(this.isDblQuantity){this.stepQuantity=Math.round(parseFloat(s.STEP_QUANTITY)*this.precisionFactor)/this.precisionFactor;this.maxQuantity=parseFloat(s.MAX_QUANTITY);this.minQuantity=this.currentPriceMode==="Q"?parseFloat(this.currentPrices[this.currentPriceSelected].MIN_QUANTITY):this.stepQuantity}else{this.stepQuantity=parseInt(s.STEP_QUANTITY,10);this.maxQuantity=parseInt(s.MAX_QUANTITY,10);this.minQuantity=this.currentPriceMode==="Q"?parseInt(this.currentPrices[this.currentPriceSelected].MIN_QUANTITY):this.stepQuantity}if(this.config.showQuantity){var r=a.ITEM_PRICES.length&&a.ITEM_PRICES[a.ITEM_PRICE_SELECTED]&&a.ITEM_PRICES[a.ITEM_PRICE_SELECTED].MIN_QUANTITY!=this.minQuantity;if(this.isDblQuantity){e=Math.round(parseFloat(a.STEP_QUANTITY)*this.precisionFactor)/this.precisionFactor!==this.stepQuantity||r||a.MEASURE!==s.MEASURE||this.checkQuantity&&parseFloat(a.MAX_QUANTITY)>this.maxQuantity&&parseFloat(this.obQuantity.value)>this.maxQuantity}else{e=parseInt(a.STEP_QUANTITY,10)!==this.stepQuantity||r||a.MEASURE!==s.MEASURE||this.checkQuantity&&parseInt(a.MAX_QUANTITY,10)>this.maxQuantity&&parseInt(this.obQuantity.value,10)>this.maxQuantity}this.obQuantity.disabled=!this.canBuy;if(e){this.obQuantity.value=this.minQuantity}if(this.obMeasure){if(s.MEASURE){BX.adjust(this.obMeasure,{html:s.MEASURE})}else{BX.adjust(this.obMeasure,{html:""})}}}if(this.obQuantityLimit.all){if(!this.checkQuantity||this.maxQuantity==0){BX.adjust(this.obQuantityLimit.value,{html:""});BX.adjust(this.obQuantityLimit.all,{style:{display:"none"}})}else{if(this.config.showMaxQuantity==="M"){i=this.maxQuantity/this.stepQuantity>=this.config.relativeQuantityFactor?BX.message("RELATIVE_QUANTITY_MANY"):BX.message("RELATIVE_QUANTITY_FEW")}else{i=this.maxQuantity;if(s.MEASURE){i+=" "+s.MEASURE}}BX.adjust(this.obQuantityLimit.value,{html:i});BX.adjust(this.obQuantityLimit.all,{style:{display:""}})}}if(this.config.usePriceRanges&&this.obPriceRanges){if(this.currentPriceMode==="Q"&&s.PRICE_RANGES_HTML){var o=this.getEntity(this.obPriceRanges,"price-ranges-body"),n=this.getEntity(this.obPriceRanges,"price-ranges-ratio-header");if(o){o.innerHTML=s.PRICE_RANGES_HTML}if(n){n.innerHTML=s.PRICE_RANGES_RATIO_HTML}this.obPriceRanges.style.display=""}else{this.obPriceRanges.style.display="none"}}}},selectOfferProp:function(){var t=0,i="",e=[],s=null,a=BX.proxy_context,r;if(a&&a.hasAttribute("data-treevalue")){if(BX.hasClass(a,"selected"))return;if(typeof document.activeElement==="object"){document.activeElement.blur()}i=a.getAttribute("data-treevalue");e=i.split("_");this.searchOfferPropIndex(e[0],e[1]);s=BX.findChildren(a.parentNode,{tagName:"li"},false);if(s&&s.length){for(t=0;t<s.length;t++){BX.removeClass(s[t],"selected")}}BX.addClass(a,"selected");if(this.smallCardNodes.panel){r=this.smallCardNodes.panel.querySelector('[data-treevalue="'+i+'"]');if(r){s=this.smallCardNodes.panel.querySelectorAll('[data-sku-line="'+r.getAttribute("data-sku-line")+'"]');for(t=0;t<s.length;t++){s[t].style.display="none"}r.style.display=""}}}},searchOfferPropIndex:function(t,i){var e="",s=false,a=[],r=[],o=-1,n,h,l={},u=[];for(n=0;n<this.treeProps.length;n++){if(this.treeProps[n].ID===t){o=n;break}}if(o>-1){for(n=0;n<o;n++){e="PROP_"+this.treeProps[n].ID;l[e]=this.selectedValues[e]}e="PROP_"+this.treeProps[o].ID;l[e]=i;for(n=o+1;n<this.treeProps.length;n++){e="PROP_"+this.treeProps[n].ID;s=this.getRowValues(l,e);if(!s)break;r=[];if(this.config.showAbsent){a=[];u=[];u=BX.clone(l,true);for(h=0;h<s.length;h++){u[e]=s[h];r[r.length]=s[h];if(this.getCanBuy(u))a[a.length]=s[h]}}else{a=s}if(this.selectedValues[e]&&BX.util.in_array(this.selectedValues[e],a)){l[e]=this.selectedValues[e]}else{if(this.config.showAbsent){l[e]=a.length?a[0]:r[0]}else{l[e]=a[0]}}this.updateRow(n,l[e],s,a)}this.selectedValues=l;this.changeInfo()}},updateRow:function(t,i,e,s){var a=0,r="",o=false,n=null;var h=this.getEntities(this.obTree,"sku-line-block");if(t>-1&&t<h.length){n=h[t].querySelectorAll("li");for(a=0;a<n.length;a++){r=n[a].getAttribute("data-onevalue");o=r===i;if(o){BX.addClass(n[a],"selected")}else{BX.removeClass(n[a],"selected")}if(BX.util.in_array(r,s)){BX.removeClass(n[a],"notallowed")}else{BX.addClass(n[a],"notallowed")}n[a].style.display=BX.util.in_array(r,e)?"":"none";if(o){h[t].style.display=r==0&&s.length==1?"none":""}}if(this.smallCardNodes.panel){n=this.smallCardNodes.panel.querySelectorAll('[data-sku-line="'+t+'"]');for(a=0;a<n.length;a++){r=n[a].getAttribute("data-onevalue");o=r===i;if(o){n[a].style.display=""}else{n[a].style.display="none"}if(BX.util.in_array(r,s)){BX.removeClass(n[a],"notallowed")}else{BX.addClass(n[a],"notallowed")}if(o){n[a].style.display=r==0&&s.length==1?"none":""}}}}},getRowValues:function(t,i){var e=[],s=0,a=0,r=false,o=true;if(t.length===0){for(s=0;s<this.offers.length;s++){if(!BX.util.in_array(this.offers[s].TREE[i],e)){e[e.length]=this.offers[s].TREE[i]}}r=true}else{for(s=0;s<this.offers.length;s++){o=true;for(a in t){if(t[a]!==this.offers[s].TREE[a]){o=false;break}}if(o){if(!BX.util.in_array(this.offers[s].TREE[i],e)){e[e.length]=this.offers[s].TREE[i]}r=true}}}return r?e:false},getCanBuy:function(t){var i,e=0,s=true,a=false;for(i=0;i<this.offers.length;i++){s=true;for(e in t){if(t[e]!==this.offers[i].TREE[e]){s=false;break}}if(s){if(this.offers[i].CAN_BUY){a=true;break}}}return a},setCurrent:function(){var t,i=0,e="",s=false,a=[],r={},o=[],n=this.offers[this.offerNum].TREE;for(t=0;t<this.treeProps.length;t++){e="PROP_"+this.treeProps[t].ID;s=this.getRowValues(r,e);if(!s)break;if(BX.util.in_array(n[e],s)){r[e]=n[e]}else{r[e]=s[0];this.offerNum=0}if(this.config.showAbsent){a=[];o=[];o=BX.clone(r,true);for(i=0;i<s.length;i++){o[e]=s[i];if(this.getCanBuy(o)){a[a.length]=s[i]}}}else{a=s}this.updateRow(t,r[e],s,a)}this.selectedValues=r;this.changeInfo()},changeInfo:function(){var t=-1,i=0,e=true,s={currentId:this.offerNum>-1?this.offers[this.offerNum].ID:0,newId:0};var a,r;for(a=0;a<this.offers.length;a++){e=true;for(i in this.selectedValues){if(this.selectedValues[i]!==this.offers[a].TREE[i]){e=false;break}}if(e){t=a;break}}if(t>-1){if(t!=this.offerNum){this.isGift=false}this.drawImages(this.offers[t].SLIDER);this.checkSliderControls(this.offers[t].SLIDER_COUNT);for(a=0;a<this.offers.length;a++){if(this.config.showOfferGroup&&this.offers[a].OFFER_GROUP){if(r=BX(this.visual.OFFER_GROUP+this.offers[a].ID)){r.style.display=a==t?"":"none"}}if(this.slider.controls[a].ID){if(a===t){this.product.slider=this.slider.controls[a];this.slider.controls[a].CONT&&BX.show(this.slider.controls[a].CONT)}else{this.slider.controls[a].CONT&&BX.hide(this.slider.controls[a].CONT)}}else if(a===t){this.product.slider={}}}if(this.offers[t].SLIDER_COUNT>0){this.setMainPict(this.offers[t].ID,this.offers[t].SLIDER[0].ID,true)}else{this.setMainPictFromItem(t)}if(this.offers[t].SLIDER_COUNT>1){this.initSlider()}else{this.stopSlider()}if(this.config.showSkuProps){if(this.obSkuProps){if(!this.offers[t].DISPLAY_PROPERTIES){BX.adjust(this.obSkuProps,{style:{display:"none"},html:""})}else{BX.adjust(this.obSkuProps,{style:{display:""},html:this.offers[t].DISPLAY_PROPERTIES})}}if(this.obMainSkuProps){if(!this.offers[t].DISPLAY_PROPERTIES_MAIN_BLOCK){BX.adjust(this.obMainSkuProps,{style:{display:"none"},html:""})}else{BX.adjust(this.obMainSkuProps,{style:{display:""},html:this.offers[t].DISPLAY_PROPERTIES_MAIN_BLOCK})}}}this.quantitySet(t);this.setPrice();this.setCompared(this.offers[t].COMPARED);this.offerNum=t;this.fixFontCheck();this.setAnalyticsDataLayer("showDetail");this.incViewedCounter();s.newId=this.offers[this.offerNum].ID;BX.onCustomEvent("onCatalogStoreProductChange",[this.offers[this.offerNum].ID]);BX.onCustomEvent("onCatalogElementChangeOffer",[s]);s=null}},drawImages:function(t){if(!this.node.imageContainer)return;var i,e,s=this.getEntities(this.node.imageContainer,"image");for(i in s){if(s.hasOwnProperty(i)&&BX.type.isDomNode(s[i])){BX.remove(s[i])}}for(i=0;i<t.length;i++){e=BX.create("IMG",{props:{src:t[i].SRC,alt:this.config.alt,title:this.config.title}});if(i==0){e.setAttribute("itemprop","image")}this.node.imageContainer.appendChild(BX.create("DIV",{attrs:{"data-entity":"image","data-id":t[i].ID},props:{className:"product-item-detail-slider-image"+(i==0?" active":"")},children:[e]}))}},restoreSticker:function(){if(this.previousStickerText){this.redrawSticker({text:this.previousStickerText})}else{this.hideSticker()}},hideSticker:function(){BX.hide(BX(this.visual.STICKER_ID))},redrawSticker:function(t){t=t||{};var i=t.text||"";var e=BX(this.visual.STICKER_ID);if(!e)return;BX.show(e);var s=e.getAttribute("title");if(s&&s!=i){this.previousStickerText=s}BX.adjust(e,{text:i,attrs:{title:i}})},checkQuantityRange:function(t,i){if(typeof t==="undefined"||this.currentPriceMode!=="Q"){return t}t=parseFloat(t);var e=t;var s,a,r,o,n,h;for(var l in this.currentQuantityRanges){if(this.currentQuantityRanges.hasOwnProperty(l)){s=this.currentQuantityRanges[l];if(parseFloat(t)>=parseFloat(s.SORT_FROM)&&(s.SORT_TO==="INF"||parseFloat(t)<=parseFloat(s.SORT_TO))){e=t;break}else{a=parseFloat(s.SORT_FROM)-t;r=Math.abs(a);o=parseFloat(s.SORT_TO)-t;n=Math.abs(o);if(h===undefined||h>r){if(i===undefined||i==="up"&&a>0||i==="down"&&a<0){h=r;e=parseFloat(s.SORT_FROM)}}if(h===undefined||h>n){if(i===undefined||i==="up"&&a>0||i==="down"&&a<0){h=n;e=parseFloat(s.SORT_TO)}}}}}return e},checkPriceRange:function(t){if(typeof t==="undefined"||this.currentPriceMode!=="Q"){return}var i,e=false;for(var s in this.currentQuantityRanges){if(this.currentQuantityRanges.hasOwnProperty(s)){i=this.currentQuantityRanges[s];if(parseFloat(t)>=parseFloat(i.SORT_FROM)&&(i.SORT_TO==="INF"||parseFloat(t)<=parseFloat(i.SORT_TO))){e=true;this.currentQuantityRangeSelected=i.HASH;break}}}if(!e&&(i=this.getMinPriceRange())){this.currentQuantityRangeSelected=i.HASH}for(var a in this.currentPrices){if(this.currentPrices.hasOwnProperty(a)){if(this.currentPrices[a].QUANTITY_HASH==this.currentQuantityRangeSelected){this.currentPriceSelected=a;break}}}},getMinPriceRange:function(){var t;for(var i in this.currentQuantityRanges){if(this.currentQuantityRanges.hasOwnProperty(i)){if(!t||parseInt(this.currentQuantityRanges[i].SORT_FROM)<parseInt(t.SORT_FROM)){t=this.currentQuantityRanges[i]}}}return t},checkQuantityControls:function(){if(!this.obQuantity)return;var t=this.checkQuantity&&parseFloat(this.obQuantity.value)+this.stepQuantity>this.maxQuantity,i=parseFloat(this.obQuantity.value)-this.stepQuantity<this.minQuantity;if(t){BX.addClass(this.obQuantityUp,"product-item-amount-field-btn-disabled")}else if(BX.hasClass(this.obQuantityUp,"product-item-amount-field-btn-disabled")){BX.removeClass(this.obQuantityUp,"product-item-amount-field-btn-disabled")}if(i){BX.addClass(this.obQuantityDown,"product-item-amount-field-btn-disabled")}else if(BX.hasClass(this.obQuantityDown,"product-item-amount-field-btn-disabled")){BX.removeClass(this.obQuantityDown,"product-item-amount-field-btn-disabled")}if(t&&i){this.obQuantity.setAttribute("disabled","disabled")}else{this.obQuantity.removeAttribute("disabled")}},setPrice:function(){var t="",i;if(this.obQuantity){this.checkPriceRange(this.obQuantity.value)}this.checkQuantityControls();i=this.currentPrices[this.currentPriceSelected];if(this.isGift){i.PRICE=0;i.DISCOUNT=i.BASE_PRICE;i.PERCENT=100}if(this.obPrice.price){if(i){BX.adjust(this.obPrice.price,{html:BX.Currency.currencyFormat(i.RATIO_PRICE,i.CURRENCY,true)});this.smallCardNodes.price&&BX.adjust(this.smallCardNodes.price,{html:BX.Currency.currencyFormat(i.RATIO_PRICE,i.CURRENCY,true)})}else{BX.adjust(this.obPrice.price,{html:""});this.smallCardNodes.price&&BX.adjust(this.smallCardNodes.price,{html:""})}if(i&&i.RATIO_PRICE!==i.RATIO_BASE_PRICE){if(this.config.showOldPrice){this.obPrice.full&&BX.adjust(this.obPrice.full,{style:{display:""},html:BX.Currency.currencyFormat(i.RATIO_BASE_PRICE,i.CURRENCY,true)});this.smallCardNodes.oldPrice&&BX.adjust(this.smallCardNodes.oldPrice,{style:{display:""},html:BX.Currency.currencyFormat(i.RATIO_BASE_PRICE,i.CURRENCY,true)});if(this.obPrice.discount){t=BX.message("ECONOMY_INFO_MESSAGE");t=t.replace("#ECONOMY#",BX.Currency.currencyFormat(i.RATIO_DISCOUNT,i.CURRENCY,true));BX.adjust(this.obPrice.discount,{style:{display:""},html:t})}}if(this.config.showPercent){this.obPrice.percent&&BX.adjust(this.obPrice.percent,{style:{display:""},html:-i.PERCENT+"%"})}}else{if(this.config.showOldPrice){this.obPrice.full&&BX.adjust(this.obPrice.full,{style:{display:"none"},html:""});this.smallCardNodes.oldPrice&&BX.adjust(this.smallCardNodes.oldPrice,{style:{display:"none"},html:""});this.obPrice.discount&&BX.adjust(this.obPrice.discount,{style:{display:"none"},html:""})}if(this.config.showPercent){this.obPrice.percent&&BX.adjust(this.obPrice.percent,{style:{display:"none"},html:""})}}if(this.obPrice.total){if(i&&this.obQuantity&&this.obQuantity.value!=this.stepQuantity){BX.adjust(this.obPrice.total,{html:BX.message("PRICE_TOTAL_PREFIX")+" <strong>"+BX.Currency.currencyFormat(i.PRICE*this.obQuantity.value,i.CURRENCY,true)+"</strong>",style:{display:""}})}else{BX.adjust(this.obPrice.total,{html:"",style:{display:"none"}})}}}},compare:function(t){var i=this.obCompare.querySelector('[data-entity="compare-checkbox"]'),e=BX.getEventTarget(t),s=true;if(i){s=e===i?i.checked:!i.checked}var a=s?this.compareData.compareUrl:this.compareData.compareDeleteUrl,r;if(a){if(e!==i){BX.PreventDefault(t);this.setCompared(s)}switch(this.productType){case 0:case 1:case 2:r=a.replace("#ID#",this.product.id.toString());break;case 3:r=a.replace("#ID#",this.offers[this.offerNum].ID);break}BX.ajax({method:"POST",dataType:s?"json":"html",url:r+(r.indexOf("?")!==-1?"&":"?")+"ajax_action=Y",onsuccess:s?BX.proxy(this.compareResult,this):BX.proxy(this.compareDeleteResult,this)})}},compareResult:function(t){var e,s;if(this.obPopupWin){this.obPopupWin.close()}if(!BX.type.isPlainObject(t))return;this.initPopupWindow();if(this.offers.length>0){this.offers[this.offerNum].COMPARED=t.STATUS==="OK"}if(t.STATUS==="OK"){BX.onCustomEvent("OnCompareChange");e='<div style="width: 100%; margin: 0; text-align: center;"><p>'+BX.message("COMPARE_MESSAGE_OK")+"</p></div>";if(this.config.showClosePopup){s=[new i({text:BX.message("BTN_MESSAGE_COMPARE_REDIRECT"),events:{click:BX.delegate(this.compareRedirect,this)},style:{marginRight:"10px"}}),new i({text:BX.message("BTN_MESSAGE_CLOSE_POPUP"),events:{click:BX.delegate(this.obPopupWin.close,this.obPopupWin)}})]}else{s=[new i({text:BX.message("BTN_MESSAGE_COMPARE_REDIRECT"),events:{click:BX.delegate(this.compareRedirect,this)}})]}}else{e='<div style="width: 100%; margin: 0; text-align: center;"><p>'+(t.MESSAGE?t.MESSAGE:BX.message("COMPARE_UNKNOWN_ERROR"))+"</p></div>";s=[new i({text:BX.message("BTN_MESSAGE_CLOSE"),events:{click:BX.delegate(this.obPopupWin.close,this.obPopupWin)}})]}this.obPopupWin.setTitleBar(BX.message("COMPARE_TITLE"));this.obPopupWin.setContent(e);this.obPopupWin.setButtons(s);this.obPopupWin.show()},compareDeleteResult:function(){BX.onCustomEvent("OnCompareChange");if(this.offers&&this.offers.length){this.offers[this.offerNum].COMPARED=false}},setCompared:function(t){if(!this.obCompare)return;var i=this.getEntity(this.obCompare,"compare-checkbox");if(i){i.checked=t}},setCompareInfo:function(t){if(!BX.type.isArray(t))return;for(var i in this.offers){if(this.offers.hasOwnProperty(i)){this.offers[i].COMPARED=BX.util.in_array(this.offers[i].ID,t)}}},compareRedirect:function(){if(this.compareData.comparePath){location.href=this.compareData.comparePath}else{this.obPopupWin.close()}},checkDeletedCompare:function(t){switch(this.productType){case 0:case 1:case 2:if(this.product.id==t){this.setCompared(false)}break;case 3:var i=this.offers.length;while(i--){if(this.offers[i].ID==t){this.offers[i].COMPARED=false;if(this.offerNum==i){this.setCompared(false)}break}}}},initBasketUrl:function(){this.basketUrl=this.basketMode==="ADD"?this.basketData.add_url:this.basketData.buy_url;switch(this.productType){case 1:case 2:this.basketUrl=this.basketUrl.replace("#ID#",this.product.id.toString());break;case 3:this.basketUrl=this.basketUrl.replace("#ID#",this.offers[this.offerNum].ID);break}this.basketParams={ajax_basket:"Y"};if(this.config.showQuantity){this.basketParams[this.basketData.quantity]=this.obQuantity.value}if(this.basketData.sku_props){this.basketParams[this.basketData.sku_props_var]=this.basketData.sku_props}},fillBasketProps:function(){if(!this.visual.BASKET_PROP_DIV)return;var t=0,i=null,e=false,s=null;if(this.basketData.useProps&&!this.basketData.emptyProps){if(this.obPopupWin&&this.obPopupWin.contentContainer){s=this.obPopupWin.contentContainer}}else{s=BX(this.visual.BASKET_PROP_DIV)}if(s){i=s.getElementsByTagName("select");if(i&&i.length){for(t=0;t<i.length;t++){if(!i[t].disabled){switch(i[t].type.toLowerCase()){case"select-one":this.basketParams[i[t].name]=i[t].value;e=true;break;default:break}}}}i=s.getElementsByTagName("input");if(i&&i.length){for(t=0;t<i.length;t++){if(!i[t].disabled){switch(i[t].type.toLowerCase()){case"hidden":this.basketParams[i[t].name]=i[t].value;e=true;break;case"radio":if(i[t].checked){this.basketParams[i[t].name]=i[t].value;e=true}break;default:break}}}}}if(!e){this.basketParams[this.basketData.props]=[];this.basketParams[this.basketData.props][0]=0}},sendToBasket:function(){if(!this.canBuy)return;this.initBasketUrl();this.fillBasketProps();BX.ajax({method:"POST",dataType:"json",url:this.basketUrl,data:this.basketParams,onsuccess:BX.proxy(this.basketResult,this)})},add2Basket:function(){this.basketMode="ADD";this.basket()},buyBasket:function(){this.basketMode="BUY";this.basket()},basket:function(){var t="";if(!this.canBuy)return;switch(this.productType){case 1:case 2:if(this.basketData.useProps&&!this.basketData.emptyProps){this.initPopupWindow();this.obPopupWin.setTitleBar(BX.message("TITLE_BASKET_PROPS"));if(BX(this.visual.BASKET_PROP_DIV)){t=BX(this.visual.BASKET_PROP_DIV).innerHTML}this.obPopupWin.setContent(t);this.obPopupWin.setButtons([new i({text:BX.message("BTN_SEND_PROPS"),events:{click:BX.delegate(this.sendToBasket,this)}})]);this.obPopupWin.show()}else{this.sendToBasket()}break;case 3:this.sendToBasket();break}},basketResult:function(t){var e,s,a;if(this.obPopupWin){this.obPopupWin.close()}if(!BX.type.isPlainObject(t))return;if(t.STATUS==="OK"){this.setAnalyticsDataLayer("addToCart")}if(t.STATUS==="OK"&&this.basketMode==="BUY"){this.basketRedirect()}else{this.initPopupWindow();if(t.STATUS==="OK"){BX.onCustomEvent("OnBasketChange");switch(this.productType){case 1:case 2:a=this.product.pict.SRC;break;case 3:a=this.offers[this.offerNum].PREVIEW_PICTURE?this.offers[this.offerNum].PREVIEW_PICTURE.SRC:this.defaultPict.pict.SRC;break}e='<div style="width: 100%; margin: 0; text-align: center;">'+'<img src="'+a+'" height="130" style="max-height:130px"><p>'+this.product.name+"</p></div>";if(this.config.showClosePopup){s=[new i({text:BX.message("BTN_MESSAGE_BASKET_REDIRECT"),events:{click:BX.delegate(this.basketRedirect,this)},style:{marginRight:"10px"}}),new i({text:BX.message("BTN_MESSAGE_CLOSE_POPUP"),events:{click:BX.delegate(this.obPopupWin.close,this.obPopupWin)}})]}else{s=[new i({text:BX.message("BTN_MESSAGE_BASKET_REDIRECT"),events:{click:BX.delegate(this.basketRedirect,this)}})]}}else{e='<div style="width: 100%; margin: 0; text-align: center;"><p>'+(t.MESSAGE?t.MESSAGE:BX.message("BASKET_UNKNOWN_ERROR"))+"</p></div>";s=[new i({text:BX.message("BTN_MESSAGE_CLOSE"),events:{click:BX.delegate(this.obPopupWin.close,this.obPopupWin)}})]}this.obPopupWin.setTitleBar(t.STATUS==="OK"?BX.message("TITLE_SUCCESSFUL"):BX.message("TITLE_ERROR"));this.obPopupWin.setContent(e);this.obPopupWin.setButtons(s);this.obPopupWin.show()}},basketRedirect:function(){location.href=this.basketData.basketUrl?this.basketData.basketUrl:BX.message("BASKET_URL")},initPopupWindow:function(){if(this.obPopupWin)return;this.obPopupWin=BX.PopupWindowManager.create("CatalogElementBasket_"+this.visual.ID,null,{autoHide:false,offsetLeft:0,offsetTop:0,overlay:true,closeByEsc:true,titleBar:true,closeIcon:true,contentColor:"white",className:this.config.templateTheme?"bx-"+this.config.templateTheme:""})},incViewedCounter:function(){if(this.currentIsSet&&!this.updateViewedCount){switch(this.productType){case 1:case 2:this.viewedCounter.params.PRODUCT_ID=this.product.id;this.viewedCounter.params.PARENT_ID=this.product.id;break;case 3:this.viewedCounter.params.PARENT_ID=this.product.id;this.viewedCounter.params.PRODUCT_ID=this.offers[this.offerNum].ID;break;default:return}this.viewedCounter.params.SITE_ID=BX.message("SITE_ID");this.updateViewedCount=true;BX.ajax.post(this.viewedCounter.path,this.viewedCounter.params,BX.delegate(function(){this.updateViewedCount=false},this))}},allowViewedCount:function(t){this.currentIsSet=true;if(t){this.incViewedCounter()}},fixFontCheck:function(){if(BX.type.isDomNode(this.obPrice.price)){BX.FixFontSize&&BX.FixFontSize.init({objList:[{node:this.obPrice.price,maxFontSize:28,smallestValue:false,scaleBy:this.obPrice.price.parentNode}],onAdaptiveResize:true})}}}})(window);$(function(){$("ul.tabs__caption").on("click","li:not(.active)",function(){$(".tabs .tabs__content").hide(),$(this).addClass("active").siblings().removeClass("active").closest("div.tabs").find("div.tabs__content").removeClass("active").eq($(this).index()).addClass("active").show()});var t=window.location.hash.replace("#tab","")-1;-1!=t&&$("ul.tabs__caption li").eq(t).click(),$('a[href*="#tab"]').click(function(){var t=$(this).attr("href").replace(/(.*)#tab/,"")-1;$("ul.tabs__caption li").eq(t).click()})});
/* End */
;
; /* Start:"a:4:{s:4:"full";s:61:"/local/templates/union_2024/js/catalog.view.js?17579269995581";s:6:"source";s:46:"/local/templates/union_2024/js/catalog.view.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
var product = new function() {
	return {

		cart: {
			add: function(args) {
				var args = args || {};

				/*$.ajax({
					url: '/ajax/basket',
					type: 'POST',
					data: {id_product: args.id},
					success: function(resp) {
						var $counts = $('.carts--count');

						$('.to-cart--add').hide();
						$('.to-cart--added').show();

						$counts.length && $counts.attr('data-count', resp.baskets_count);
					},
					complete: function() {
						args.complete && args.complete();
					}
				});
				*/
			}
		}

		/*favorite: {
			toggle: function(args) {
				var args = args || {};

				$.ajax({
					url: '/ajax/favorites',
					type: 'POST',
					data: {id_product: args.id},
					success: function(resp) {
						var status = 'status' in resp ? parseInt(resp.status) : -1,
							$counts = $('.favorites--count');

						if (status != -1) {
							app.notify(resp.status ? 'Товар добавлен в избранное' : 'Товар удален из избранного', {duration: 2800});
							args.success && args.success(status);
						}

						if ($counts.length) {
							var count = parseInt($counts.attr('data-count')) || 0;
							$counts.attr('data-count', count + (status ? 1 : -1));
						}
					},
					complete: function() {
						args.complete && args.complete();
					}
				});
			}
		}*/
	}
}();

jQuery(document).ready(function($) {

	/*$('.products-catalog').each(function() {
		var $self = $(this),
			count = parseInt($self.data('count')) || 1;

		$self.lightSlider({
			slideMargin: 20,
			item: Math.min(count, 6),
			pager: false,
			responsive: [
				{
					breakpoint: 1199,
					settings: {
						item: Math.min(count, 5)
					}
				},
				{
					breakpoint: 800,
					settings: {
						item: Math.min(count, 4)
					}
				},
				{
					breakpoint: 680,
					settings: {
						item: Math.min(count, 3)
					}
				},
				{
					breakpoint: 400,
					settings: {
						item: Math.min(count, 2)
					}
				}
			]
		});
	});*/

	$(document)
		.on('click', '.calc-request--create', function() {
			//$('#productcard_form .form-product--id').val( $(this).data('product-id') );

			$.fancybox.open({
				src: '#calculate-request',
				touch: false
			});
		})
		.on('click', '.local--nav', function(e) {
			e.preventDefault();
			var $target = $(this.getAttribute('href'));
			$target.length && $(window).scrollTop($target.offset().top - ((app.device.is('xs') || app.device.is('sm') ? $('#header-main').outerHeight() : $('#nav-main').outerHeight()) || 0) - 10);
		});


	$('#productcard_form').on('app.form.response-success', function() {
		var $cartAddButton = $('.to-cart--add:visible:first');
		app.notify('ЗАЯВКА НА РАСЧЕТ ОТПРАВЛЕНА.' + ($cartAddButton.length ? '<br>Выбранная модель сохранена в разделе КОРЗИНА' : ''));
		$cartAddButton.trigger('click');
	});

	/*$('.favorite--toggle').on('click', function() {
		var button = this;

		app.loading(true, button);

		product.favorite.toggle({
			id: $(button).data('product-id'),
			success: function(status) {
				app.loading(false, button);
				button.innerHTML = status ? 'Удалить из избранного' : 'Добавить в избранное';
			},
			complete: function() {
				app.loading(false, button);
			}
		});
	});*/

	var zoomerOptions = {
		buttons: ['fullScreen', 'zoom', 'thumbs', 'close'],
		// caption: function( instance, item ) {
		// 	return this.getAttribute('title') || '';
		// },
		thumbs: {
			autoStart : true,
			hideOnClose: true,
			axis: 'y'
		}
	}

	$('.one--zoomer').fancybox(zoomerOptions);

	$('.pdf--zoomer').fancybox({
		defaultType: 'iframe',
		baseClass: 'fancybox-pdf-viewer',
		buttons: ['fullScreen', 'zoom', 'thumbs', 'close'],
		touch: false,
		caption: function( instance, item ) {
			return this.getAttribute('title') || '';
		},
		iframe: {
			preload: false
		}
	});

	$('.one-zoomer--linked').on('click', function() {
		var $link = $(this),
			$images = $('[data-fancybox="' + $link.data('target') + '"]');

		$.fancybox.open($images, zoomerOptions, $link.closest('li').index());
		return false;
	});

	$('.to-collections--scroll').on('click', function(e) {
		e.preventDefault();

		var $block = $('#products-in-collection');

		if (!$block.length) {
			return false;
		}

		var y = $block.offset().top,
			h = $block.outerHeight(),
			wh = $(window).height();

		$('html, body').animate({scrollTop: h > wh ? y : (y - ((wh - h) / 2))});
	});

	$(document).on('city-phone-changed', function(e, phoneValue) {
		//a$('.help-phone--primary').toggleClass('hide', phoneValue === '+79167055046');
	});

	$('.collection-products--load').on('click', function(e) {
		e.preventDefault();

		var button = this,
			$catalog = $('#collection-products-catalog');

		$.ajax({
			url: '/ajax/catalog/get-collection-products',
			type: 'get',
			data: {
				product_id: $catalog.data('product-id'),
				offset: $catalog.find('.product--column').length
			},
			beforeSend: function() {
				app.loading(true, button);
			},
			success: function(response) {
				if (response && 'catalog_html' in response) {
					var $loadBefore = $catalog.find('.product-load--before'),
						$added = $(response.catalog_html);

					$loadBefore.length ? $added.insertBefore($loadBefore) : $catalog.append($added);
					app.lazy.add($added.find('.img--lazy'));

					if ($catalog.find('.product--column').length >= response.total) {
						$(button.parentNode).remove();
						$loadBefore.remove();
					}
				}
			},
			complete: function() {
				app.loading(false, button);
			}
		})
	});

});
/* End */
;
; /* Start:"a:4:{s:4:"full";s:65:"/local/templates/union_2024/js/catalog.view.v9.js?175792699920131";s:6:"source";s:49:"/local/templates/union_2024/js/catalog.view.v9.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
if (window.frameCacheVars !== undefined) {
    BX.addCustomEvent("onFrameDataReceived", runFunction_cat_v9);
	//console.log("Отдаётся композитный кеш(catalog.view.v9.js)");
} else {
    $(runFunction_cat_v9);
	//console.log("Страница без композита(catalog.view.v9.js)");
}

function runFunction_cat_v9() {
	//console.log("go go go(catalog.view.v9.js)");

	product.gallery = {
		slider: null,
		$controls: null,

		init: function() {

			var _initedAt = null;

			function _zoomerInit(image) {
				if ('imagezoomsl' in $.fn) {
					// remove all prev zoomers
					$('body > .zoomslobj').remove();

					if (window.innerWidth > 1000) {
						// init new one zoomer
						$(image).imagezoomsl({
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

			function _selectSlidePage(page) {
				var $pages = $('#product-slider-pager .slide-page-item');
				$pages.removeClass('active').find('a[data-page="'+page+'"]').parent().addClass('active');
			}
			

			function _build(options) {

				if (product.gallery.slider !== null) {
					product.gallery.slider.destroy();
				}
				product.gallery.slider = $('#product-slider').lightSlider(
					$.extend({}, {
						gallery: true,
						auto: false,
						item: 1,
						pause: 5000,
						pager: false,
						slideMargin: 0,
						galleryMargin: 50,
						loop: true,
						controls: true,
						enableTouch: false,
						enableDrag: false,
						currentPagerPosition: 'middle',
						onSliderLoad: function($s) {							
							$s.closest('.slider-product-wrap').addClass('slider--inited');
							_zoomerInit($s.find('.slide-image-self:not([data-src])'));
							_selectSlidePage(0);
						},
						onBeforeSlide: function($s, index) {
							var $image = $s.children('.slide-image').eq(index).find('.slide-image-self'),
								count  = $s.find('.lslide').length;

							$image.filter('img[data-src]').length ? app.lazy.load($image, function(image, loaded) {
								loaded && _zoomerInit(image);
								$image.removeAttr('data-src');
							}) : _zoomerInit($image);

							_selectSlidePage(index);
						}, 
						/*onBeforePrevSlide: function($s, index) {
							//slider_pager2.goToPrevSlide();
							$('#slider_pager2_prev').click();
							console.log("3");
						}, 
						onBeforeNextSlide: function($s, index) {
							//slider_pager2.goToNextSlide();
							$('#slider_pager2_next').click();
							console.log("4");
						}*/
					}, options)
				);
			}

			function _controlsPosUpdate() {
				var $sliderWrap = $('#product-slider-wrap'),
					sliderOffset = $sliderWrap.offset(),
					sliderHeight = $sliderWrap.height();

				product.gallery.$controls.each(function() {
					this.style.top  = (sliderOffset.top + sliderHeight / 2 - this.clientHeight / 2) + 'px';
					this.style.left = (sliderOffset.left + (this.getAttribute('data-pos') == 'up' ? ($sliderWrap.width() - this.clientWidth) : 0)) + 'px';
				});
			}

			function _pagerScrollState(init) {
				var $pagerWrap = $('#product-slider-pager-wrap');

				if (init === false) {
					$pagerWrap.removeClass('jsp--scrollable').data('jsp').destroy();
				} else {
					$pagerWrap.jScrollPane({
						mouseWheelSpeed: 50,
						verticalDragMaxHeight: 100
					}).addClass('jsp--scrollable');
				}
			}

			$('[data-fancybox]').fancybox({
				buttons: ['slideShow', 'fullScreen', 'thumbs', 'zoom', 'close']
			});

			$('.slide--change').on('click', function(e) {
				e.preventDefault();
				product.gallery.slider !== null && product.gallery.slider.goToSlide( $(this).data('page') );
			});

			// absolute controls position. перемещаем в > body и позиционируем при каждом ресайзе браузера
			// этот велосипед из-за проблем с зумом при ховере на фото
			product.gallery.$controls = $('.slider-abs--control');
			product.gallery.$controls.length && product.gallery.$controls.appendTo('body').on('click', function(e) {
				e.preventDefault();
				product.gallery.slider !== null && product.gallery.slider[this.getAttribute('data-pos') == 'up' ? 'goToNextSlide' : 'goToPrevSlide']();
			});


			/*$(window).on('load.gallery', function() {
				_pagerScrollState(true);
			});*/
		

			$(window).on('resize.gallery', function() {
				var size = app.device.size(),
					$pagerWrap = $('#product-slider-pager-wrap'),
					topSidesOffset = 50,
					$window = $(window),
					infoColumnHeight = $(document.getElementById('product-info-column')).height(),
					sliderHeight   = Math.min(
						(infoColumnHeight || parseInt($(document.getElementById('product-slider')).data('height'))),
						$window.height() - topSidesOffset
					);

				$('#slider-product-plugin').css('height', sliderHeight);

				if (product.gallery.$controls.length) {
					_controlsPosUpdate();

					$window.off('scroll.slider-controls-pos');

					// актуальность position: sticky для слайдера
					if (infoColumnHeight && (sliderHeight < infoColumnHeight)) {
						$window.on('scroll.slider-controls-pos', function() {
							_controlsPosUpdate();
						});
					}
				}

				setTimeout(function() {
					$pagerWrap.hasClass('jsp--scrollable') && $pagerWrap.data('jsp').reinitialise();
				}, 100);

				if (_initedAt !== size) {

					if (product.gallery.slider !== null) {
						setTimeout(function() {
							product.gallery.slider.goToSlide( product.gallery.slider.getCurrentSlideCount() - 1 );
						}, 70);
					}

					_initedAt = size;
				}
			}).trigger('resize.gallery');

			_build();
		}
	}

	$(function() {

		product.gallery.init();

		if (window.innerWidth > 1000 && 'imagezoomsl' in $.fn) {

			$(document).on('click', 'body > .tracker', function() {
				$('#product-slider .lslide.active .slide-image-one').trigger('click');
			});

		}

	});

	/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/




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
			gallery: true,
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
	console.log('$slides.length', $slides.length);

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


	$(document).on('click', '.slide-page-item2 a.slide--change', function(e) {
		var $pages = $('.slide-page-item2');
		var cur_atr_page = $(this).attr('data-page');
		$pages.removeClass('active').find('a[data-page="'+cur_atr_page+'"]').parent().addClass('active');
	});
	
}
/* End */
;
; /* Start:"a:4:{s:4:"full";s:100:"/local/templates/union_2024/components/bitrix/catalog.top/union/slider/script.min.js?173099304532306";s:6:"source";s:80:"/local/templates/union_2024/components/bitrix/catalog.top/union/slider/script.js";s:3:"min";s:84:"/local/templates/union_2024/components/bitrix/catalog.top/union/slider/script.min.js";s:3:"map";s:84:"/local/templates/union_2024/components/bitrix/catalog.top/union/slider/script.map.js";}"*/
(function(t){if(!!t.JCCatalogTopSlider){return}var s=function(t){s.superclass.constructor.apply(this,arguments);this.nameNode=BX.create("span",{props:{className:"bx_medium bx_bt_button",id:this.id},style:typeof t.style==="object"?t.style:{},text:t.text});this.buttonNode=BX.create("span",{attrs:{className:t.ownerClass},style:{borderBottom:"0 none transparent",marginBottom:"0",position:"static"},children:[this.nameNode],events:this.contextEvents});if(BX.browser.IsIE()){this.buttonNode.setAttribute("hideFocus","hidefocus")}};BX.extend(s,BX.PopupWindowButton);t.JCCatalogTopSlider=function(t){this.productType=0;this.showQuantity=true;this.showAbsent=true;this.secondPict=false;this.showOldPrice=false;this.showPercent=false;this.showSkuProps=false;this.basketAction="ADD";this.showClosePopup=false;this.useCompare=false;this.visual={ID:"",PICT_ID:"",SECOND_PICT_ID:"",QUANTITY_ID:"",QUANTITY_UP_ID:"",QUANTITY_DOWN_ID:"",PRICE_ID:"",DSC_PERC:"",SECOND_DSC_PERC:"",DISPLAY_PROP_DIV:""};this.product={checkQuantity:false,maxQuantity:0,stepQuantity:1,isDblQuantity:false,canBuy:true,canSubscription:true,name:"",pict:{},id:0,addUrl:"",buyUrl:""};this.basketMode="";this.basketData={useProps:false,emptyProps:false,quantity:"quantity",props:"prop",basketUrl:"",sku_props:"",sku_props_var:"basket_props",add_url:"",buy_url:""};this.compareData={compareUrl:"",comparePath:""};this.defaultPict={pict:null,secondPict:null};this.checkQuantity=false;this.maxQuantity=0;this.stepQuantity=1;this.isDblQuantity=false;this.canBuy=true;this.currentBasisPrice={};this.canSubscription=true;this.precision=6;this.precisionFactor=Math.pow(10,this.precision);this.offers=[];this.offerNum=0;this.treeProps=[];this.obTreeRows=[];this.showCount=[];this.showStart=[];this.selectedValues={};this.obProduct=null;this.obQuantity=null;this.obQuantityUp=null;this.obQuantityDown=null;this.obPict=null;this.obSecondPict=null;this.obPrice=null;this.obTree=null;this.obBuyBtn=null;this.obBasketActions=null;this.obNotAvail=null;this.obDscPerc=null;this.obSecondDscPerc=null;this.obSkuProps=null;this.obMeasure=null;this.obCompare=null;this.treeRowShowSize=5;this.treeEnableArrow={display:"",cursor:"pointer",opacity:1};this.treeDisableArrow={display:"",cursor:"default",opacity:.2};this.lastElement=false;this.containerHeight=0;this.errorCode=0;if("object"===typeof t){this.productType=parseInt(t.PRODUCT_TYPE,10);this.showQuantity=t.SHOW_QUANTITY;this.showAbsent=t.SHOW_ABSENT;this.secondPict=!!t.SECOND_PICT;this.showOldPrice=!!t.SHOW_OLD_PRICE;this.showPercent=!!t.SHOW_DISCOUNT_PERCENT;this.showSkuProps=!!t.SHOW_SKU_PROPS;if(!!t.ADD_TO_BASKET_ACTION){this.basketAction=t.ADD_TO_BASKET_ACTION}this.showClosePopup=!!t.SHOW_CLOSE_POPUP;this.useCompare=!!t.DISPLAY_COMPARE;this.visual=t.VISUAL;switch(this.productType){case 0:case 1:case 2:if(!!t.PRODUCT&&"object"===typeof t.PRODUCT){if(this.showQuantity){this.product.checkQuantity=t.PRODUCT.CHECK_QUANTITY;this.product.isDblQuantity=t.PRODUCT.QUANTITY_FLOAT;if(this.product.checkQuantity){this.product.maxQuantity=this.product.isDblQuantity?parseFloat(t.PRODUCT.MAX_QUANTITY):parseInt(t.PRODUCT.MAX_QUANTITY,10)}this.product.stepQuantity=this.product.isDblQuantity?parseFloat(t.PRODUCT.STEP_QUANTITY):parseInt(t.PRODUCT.STEP_QUANTITY,10);this.checkQuantity=this.product.checkQuantity;this.isDblQuantity=this.product.isDblQuantity;this.maxQuantity=this.product.maxQuantity;this.stepQuantity=this.product.stepQuantity;if(this.isDblQuantity){this.stepQuantity=Math.round(this.stepQuantity*this.precisionFactor)/this.precisionFactor}}this.product.canBuy=t.PRODUCT.CAN_BUY;this.product.canSubscription=t.PRODUCT.SUBSCRIPTION;if(!!t.PRODUCT.BASIS_PRICE){this.currentBasisPrice=t.PRODUCT.BASIS_PRICE}this.canBuy=this.product.canBuy;this.canSubscription=this.product.canSubscription;this.product.name=t.PRODUCT.NAME;this.product.pict=t.PRODUCT.PICT;this.product.id=t.PRODUCT.ID;if(!!t.PRODUCT.ADD_URL){this.product.addUrl=t.PRODUCT.ADD_URL}if(!!t.PRODUCT.BUY_URL){this.product.buyUrl=t.PRODUCT.BUY_URL}if(!!t.BASKET&&"object"===typeof t.BASKET){this.basketData.useProps=!!t.BASKET.ADD_PROPS;this.basketData.emptyProps=!!t.BASKET.EMPTY_PROPS}}else{this.errorCode=-1}break;case 3:if(!!t.OFFERS&&BX.type.isArray(t.OFFERS)){this.product.name=t.PRODUCT.NAME;this.product.id=t.PRODUCT.ID;this.offers=t.OFFERS;this.offerNum=0;if(!!t.OFFER_SELECTED){this.offerNum=parseInt(t.OFFER_SELECTED,10)}if(isNaN(this.offerNum)){this.offerNum=0}if(!!t.TREE_PROPS){this.treeProps=t.TREE_PROPS}if(!!t.DEFAULT_PICTURE){this.defaultPict.pict=t.DEFAULT_PICTURE.PICTURE;this.defaultPict.secondPict=t.DEFAULT_PICTURE.PICTURE_SECOND}}break;default:this.errorCode=-1}if(!!t.BASKET&&"object"===typeof t.BASKET){if(!!t.BASKET.QUANTITY){this.basketData.quantity=t.BASKET.QUANTITY}if(!!t.BASKET.PROPS){this.basketData.props=t.BASKET.PROPS}if(!!t.BASKET.BASKET_URL){this.basketData.basketUrl=t.BASKET.BASKET_URL}if(3===this.productType){if(!!t.BASKET.SKU_PROPS){this.basketData.sku_props=t.BASKET.SKU_PROPS}}if(!!t.BASKET.ADD_URL_TEMPLATE){this.basketData.add_url=t.BASKET.ADD_URL_TEMPLATE}if(!!t.BASKET.BUY_URL_TEMPLATE){this.basketData.buy_url=t.BASKET.BUY_URL_TEMPLATE}if(this.basketData.add_url===""&&this.basketData.buy_url===""){this.errorCode=-1024}}if(this.useCompare){if(!!t.COMPARE&&typeof t.COMPARE==="object"){if(!!t.COMPARE.COMPARE_PATH){this.compareData.comparePath=t.COMPARE.COMPARE_PATH}if(!!t.COMPARE.COMPARE_URL_TEMPLATE){this.compareData.compareUrl=t.COMPARE.COMPARE_URL_TEMPLATE}else{this.useCompare=false}}else{this.useCompare=false}}this.lastElement=!!t.LAST_ELEMENT&&"Y"===t.LAST_ELEMENT}if(0===this.errorCode){BX.ready(BX.delegate(this.Init,this))}};t.JCCatalogTopSlider.prototype.Init=function(){var s=0,e="",i=null;this.obProduct=BX(this.visual.ID);if(!this.obProduct){this.errorCode=-1}this.obPict=BX(this.visual.PICT_ID);if(!this.obPict){this.errorCode=-2}if(this.secondPict&&!!this.visual.SECOND_PICT_ID){this.obSecondPict=BX(this.visual.SECOND_PICT_ID)}this.obPrice=BX(this.visual.PRICE_ID);if(!this.obPrice){this.errorCode=-16}if(this.showQuantity&&!!this.visual.QUANTITY_ID){this.obQuantity=BX(this.visual.QUANTITY_ID);if(!!this.visual.QUANTITY_UP_ID){this.obQuantityUp=BX(this.visual.QUANTITY_UP_ID)}if(!!this.visual.QUANTITY_DOWN_ID){this.obQuantityDown=BX(this.visual.QUANTITY_DOWN_ID)}}if(3===this.productType&&this.offers.length>0){if(!!this.visual.TREE_ID){this.obTree=BX(this.visual.TREE_ID);if(!this.obTree){this.errorCode=-256}e=this.visual.TREE_ITEM_ID;for(s=0;s<this.treeProps.length;s++){this.obTreeRows[s]={LEFT:BX(e+this.treeProps[s].ID+"_left"),RIGHT:BX(e+this.treeProps[s].ID+"_right"),LIST:BX(e+this.treeProps[s].ID+"_list"),CONT:BX(e+this.treeProps[s].ID+"_cont")};if(!this.obTreeRows[s].LEFT||!this.obTreeRows[s].RIGHT||!this.obTreeRows[s].LIST||!this.obTreeRows[s].CONT){this.errorCode=-512;break}}}if(!!this.visual.QUANTITY_MEASURE){this.obMeasure=BX(this.visual.QUANTITY_MEASURE)}}this.obBasketActions=BX(this.visual.BASKET_ACTIONS_ID);if(!!this.obBasketActions){if(!!this.visual.BUY_ID){this.obBuyBtn=BX(this.visual.BUY_ID)}}this.obNotAvail=BX(this.visual.NOT_AVAILABLE_MESS);if(this.showPercent){if(!!this.visual.DSC_PERC){this.obDscPerc=BX(this.visual.DSC_PERC)}if(this.secondPict&&!!this.visual.SECOND_DSC_PERC){this.obSecondDscPerc=BX(this.visual.SECOND_DSC_PERC)}}if(this.showSkuProps){if(!!this.visual.DISPLAY_PROP_DIV){this.obSkuProps=BX(this.visual.DISPLAY_PROP_DIV)}}if(0===this.errorCode){if(this.showQuantity){if(!!this.obQuantityUp){BX.bind(this.obQuantityUp,"click",BX.delegate(this.QuantityUp,this))}if(!!this.obQuantityDown){BX.bind(this.obQuantityDown,"click",BX.delegate(this.QuantityDown,this))}if(this.obQuantity){BX.bind(this.obQuantity,"change",BX.delegate(this.QuantityChange,this))}}switch(this.productType){case 1:break;case 3:if(this.offers.length>0){i=BX.findChildren(this.obTree,{tagName:"li"},true);if(!!i&&0<i.length){for(s=0;s<i.length;s++){BX.bind(i[s],"click",BX.delegate(this.SelectOfferProp,this))}}for(s=0;s<this.obTreeRows.length;s++){BX.bind(this.obTreeRows[s].LEFT,"click",BX.delegate(this.RowLeft,this));BX.bind(this.obTreeRows[s].RIGHT,"click",BX.delegate(this.RowRight,this))}this.SetCurrent()}break}if(!!this.obBuyBtn){if(this.basketAction==="ADD"){BX.bind(this.obBuyBtn,"click",BX.delegate(this.Add2Basket,this))}else{BX.bind(this.obBuyBtn,"click",BX.delegate(this.BuyBasket,this))}}if(this.lastElement){this.containerHeight=parseInt(this.obProduct.parentNode.offsetHeight,10);if(isNaN(this.containerHeight)){this.containerHeight=0}this.setHeight();BX.bind(t,"resize",BX.delegate(this.checkHeight,this));BX.bind(this.obProduct.parentNode,"mouseover",BX.delegate(this.setHeight,this));BX.bind(this.obProduct.parentNode,"mouseout",BX.delegate(this.clearHeight,this))}if(this.useCompare){this.obCompare=BX(this.visual.COMPARE_LINK_ID);if(!!this.obCompare){BX.bind(this.obCompare,"click",BX.proxy(this.Compare,this))}}}};t.JCCatalogTopSlider.prototype.checkHeight=function(){this.containerHeight=parseInt(this.obProduct.parentNode.offsetHeight,10);if(isNaN(this.containerHeight)){this.containerHeight=0}};t.JCCatalogTopSlider.prototype.setHeight=function(){if(0<this.containerHeight){BX.adjust(this.obProduct.parentNode,{style:{height:this.containerHeight+"px"}})}};t.JCCatalogTopSlider.prototype.clearHeight=function(){BX.adjust(this.obProduct.parentNode,{style:{height:"auto"}})};t.JCCatalogTopSlider.prototype.QuantityUp=function(){var t=0,s=true,e;if(0===this.errorCode&&this.showQuantity&&this.canBuy){t=this.isDblQuantity?parseFloat(this.obQuantity.value):parseInt(this.obQuantity.value,10);if(!isNaN(t)){t+=this.stepQuantity;if(this.checkQuantity){if(t>this.maxQuantity){s=false}}if(s){if(this.isDblQuantity){t=Math.round(t*this.precisionFactor)/this.precisionFactor}this.obQuantity.value=t;e={DISCOUNT_VALUE:this.currentBasisPrice.DISCOUNT_VALUE*t,VALUE:this.currentBasisPrice.VALUE*t,DISCOUNT_DIFF:this.currentBasisPrice.DISCOUNT_DIFF*t,DISCOUNT_DIFF_PERCENT:this.currentBasisPrice.DISCOUNT_DIFF_PERCENT,CURRENCY:this.currentBasisPrice.CURRENCY};this.setPrice(e)}}}};t.JCCatalogTopSlider.prototype.QuantityDown=function(){var t=0,s=true,e;if(0===this.errorCode&&this.showQuantity&&this.canBuy){t=this.isDblQuantity?parseFloat(this.obQuantity.value):parseInt(this.obQuantity.value,10);if(!isNaN(t)){t-=this.stepQuantity;if(t<this.stepQuantity){s=false}if(s){if(this.isDblQuantity){t=Math.round(t*this.precisionFactor)/this.precisionFactor}this.obQuantity.value=t;e={DISCOUNT_VALUE:this.currentBasisPrice.DISCOUNT_VALUE*t,VALUE:this.currentBasisPrice.VALUE*t,DISCOUNT_DIFF:this.currentBasisPrice.DISCOUNT_DIFF*t,DISCOUNT_DIFF_PERCENT:this.currentBasisPrice.DISCOUNT_DIFF_PERCENT,CURRENCY:this.currentBasisPrice.CURRENCY};this.setPrice(e)}}}};t.JCCatalogTopSlider.prototype.QuantityChange=function(){var t=0,s,e,i;if(0===this.errorCode&&this.showQuantity){if(this.canBuy){t=this.isDblQuantity?parseFloat(this.obQuantity.value):parseInt(this.obQuantity.value,10);if(!isNaN(t)){if(this.checkQuantity){if(t>this.maxQuantity){t=this.maxQuantity}}if(t<this.stepQuantity){t=this.stepQuantity}else{i=Math.round(t*this.precisionFactor/this.stepQuantity)/this.precisionFactor;e=parseInt(i,10);if(isNaN(e)){e=1;i=1.1}if(i>e){t=e<=1?this.stepQuantity:e*this.stepQuantity;t=Math.round(t*this.precisionFactor)/this.precisionFactor}}this.obQuantity.value=t}else{this.obQuantity.value=this.stepQuantity}}else{this.obQuantity.value=this.stepQuantity}s={DISCOUNT_VALUE:this.currentBasisPrice.DISCOUNT_VALUE*this.obQuantity.value,VALUE:this.currentBasisPrice.VALUE*this.obQuantity.value,DISCOUNT_DIFF:this.currentBasisPrice.DISCOUNT_DIFF*this.obQuantity.value,DISCOUNT_DIFF_PERCENT:this.currentBasisPrice.DISCOUNT_DIFF_PERCENT,CURRENCY:this.currentBasisPrice.CURRENCY};this.setPrice(s)}};t.JCCatalogTopSlider.prototype.QuantitySet=function(t){if(0===this.errorCode){this.canBuy=this.offers[t].CAN_BUY;if(this.canBuy){if(!!this.obBasketActions){BX.style(this.obBasketActions,"display","")}if(!!this.obNotAvail){BX.style(this.obNotAvail,"display","none")}}else{if(!!this.obBasketActions){BX.style(this.obBasketActions,"display","none")}if(!!this.obNotAvail){BX.style(this.obNotAvail,"display","")}}if(this.showQuantity){this.isDblQuantity=this.offers[t].QUANTITY_FLOAT;this.checkQuantity=this.offers[t].CHECK_QUANTITY;if(this.isDblQuantity){this.maxQuantity=parseFloat(this.offers[t].MAX_QUANTITY);this.stepQuantity=Math.round(parseFloat(this.offers[t].STEP_QUANTITY)*this.precisionFactor)/this.precisionFactor}else{this.maxQuantity=parseInt(this.offers[t].MAX_QUANTITY,10);this.stepQuantity=parseInt(this.offers[t].STEP_QUANTITY,10)}this.obQuantity.value=this.stepQuantity;this.obQuantity.disabled=!this.canBuy;if(!!this.obMeasure){if(!!this.offers[t].MEASURE){BX.adjust(this.obMeasure,{html:this.offers[t].MEASURE})}else{BX.adjust(this.obMeasure,{html:""})}}}this.currentBasisPrice=this.offers[t].BASIS_PRICE}};t.JCCatalogTopSlider.prototype.SelectOfferProp=function(){var t=0,s="",e="",i=[],a=null,o=BX.proxy_context;if(!!o&&o.hasAttribute("data-treevalue")){e=o.getAttribute("data-treevalue");i=e.split("_");if(this.SearchOfferPropIndex(i[0],i[1])){a=BX.findChildren(o.parentNode,{tagName:"li"},false);if(!!a&&0<a.length){for(t=0;t<a.length;t++){s=a[t].getAttribute("data-onevalue");if(s===i[1]){BX.addClass(a[t],"bx_active")}else{BX.removeClass(a[t],"bx_active")}}}}}};t.JCCatalogTopSlider.prototype.SearchOfferPropIndex=function(t,s){var e="",i=false,a,o,r=[],h=[],n=-1,l={},p=[];for(a=0;a<this.treeProps.length;a++){if(this.treeProps[a].ID===t){n=a;break}}if(-1<n){for(a=0;a<n;a++){e="PROP_"+this.treeProps[a].ID;l[e]=this.selectedValues[e]}e="PROP_"+this.treeProps[n].ID;i=this.GetRowValues(l,e);if(!i){return false}if(!BX.util.in_array(s,i)){return false}l[e]=s;for(a=n+1;a<this.treeProps.length;a++){e="PROP_"+this.treeProps[a].ID;i=this.GetRowValues(l,e);if(!i){return false}h=[];if(this.showAbsent){r=[];p=[];p=BX.clone(l,true);for(o=0;o<i.length;o++){p[e]=i[o];h[h.length]=i[o];if(this.GetCanBuy(p)){r[r.length]=i[o]}}}else{r=i}if(!!this.selectedValues[e]&&BX.util.in_array(this.selectedValues[e],r)){l[e]=this.selectedValues[e]}else{if(this.showAbsent)l[e]=r.length>0?r[0]:h[0];else l[e]=r[0]}this.UpdateRow(a,l[e],i,r)}this.selectedValues=l;this.ChangeInfo()}return true};t.JCCatalogTopSlider.prototype.RowLeft=function(){var t=0,s="",e=-1,i=BX.proxy_context;if(!!i&&i.hasAttribute("data-treevalue")){s=i.getAttribute("data-treevalue");for(t=0;t<this.treeProps.length;t++){if(this.treeProps[t].ID===s){e=t;break}}if(-1<e&&this.treeRowShowSize<this.showCount[e]){if(0>this.showStart[e]){this.showStart[e]++;BX.adjust(this.obTreeRows[e].LIST,{style:{marginLeft:this.showStart[e]*20+"%"}});BX.adjust(this.obTreeRows[e].RIGHT,{style:this.treeEnableArrow})}if(0<=this.showStart[e]){BX.adjust(this.obTreeRows[e].LEFT,{style:this.treeDisableArrow})}}}};t.JCCatalogTopSlider.prototype.RowRight=function(){var t=0,s="",e=-1,i=BX.proxy_context;if(!!i&&i.hasAttribute("data-treevalue")){s=i.getAttribute("data-treevalue");for(t=0;t<this.treeProps.length;t++){if(this.treeProps[t].ID===s){e=t;break}}if(-1<e&&this.treeRowShowSize<this.showCount[e]){if(this.treeRowShowSize-this.showStart[e]<this.showCount[e]){this.showStart[e]--;BX.adjust(this.obTreeRows[e].LIST,{style:{marginLeft:this.showStart[e]*20+"%"}});BX.adjust(this.obTreeRows[e].LEFT,{style:this.treeEnableArrow})}if(this.treeRowShowSize-this.showStart[e]>=this.showCount[e]){BX.adjust(this.obTreeRows[e].RIGHT,{style:this.treeDisableArrow})}}}};t.JCCatalogTopSlider.prototype.UpdateRow=function(t,s,e,i){var a=0,o=0,r="",h=0,n="",l={},p=false,u=false,c=false,d=0,f=this.treeEnableArrow,P=this.treeEnableArrow,T=0,b=null;if(-1<t&&t<this.obTreeRows.length){b=BX.findChildren(this.obTreeRows[t].LIST,{tagName:"li"},false);if(!!b&&0<b.length){p="PICT"===this.treeProps[t].SHOW_MODE;h=e.length;u=this.treeRowShowSize<h;n=u?100/h+"%":"20%";l={props:{className:""},style:{width:n}};if(p){l.style.paddingTop=n}for(a=0;a<b.length;a++){r=b[a].getAttribute("data-onevalue");c=r===s;if(BX.util.in_array(r,i)){l.props.className=c?"bx_active":""}else{l.props.className=c?"bx_active bx_missing":"bx_missing"}l.style.display="none";if(BX.util.in_array(r,e)){l.style.display="";if(c){d=o}o++}BX.adjust(b[a],l)}l={style:{width:(u?20*h:100)+"%",marginLeft:"0%"}};if(p){BX.adjust(this.obTreeRows[t].CONT,{props:{className:u?"bx_item_detail_scu full":"bx_item_detail_scu"}})}else{BX.adjust(this.obTreeRows[t].CONT,{props:{className:u?"bx_item_detail_size full":"bx_item_detail_size"}})}if(u){if(d+1===h){P=this.treeDisableArrow}if(this.treeRowShowSize<=d){T=this.treeRowShowSize-d-1;l.style.marginLeft=T*20+"%"}if(0===T){f=this.treeDisableArrow}BX.adjust(this.obTreeRows[t].LEFT,{style:f});BX.adjust(this.obTreeRows[t].RIGHT,{style:P})}else{BX.adjust(this.obTreeRows[t].LEFT,{style:{display:"none"}});BX.adjust(this.obTreeRows[t].RIGHT,{style:{display:"none"}})}BX.adjust(this.obTreeRows[t].LIST,l);this.showCount[t]=h;this.showStart[t]=T}}};t.JCCatalogTopSlider.prototype.GetRowValues=function(t,s){var e=0,i,a=[],o=false,r=true;if(0===t.length){for(e=0;e<this.offers.length;e++){if(!BX.util.in_array(this.offers[e].TREE[s],a)){a[a.length]=this.offers[e].TREE[s]}}o=true}else{for(e=0;e<this.offers.length;e++){r=true;for(i in t){if(t[i]!==this.offers[e].TREE[i]){r=false;break}}if(r){if(!BX.util.in_array(this.offers[e].TREE[s],a)){a[a.length]=this.offers[e].TREE[s]}o=true}}}return o?a:false};t.JCCatalogTopSlider.prototype.GetCanBuy=function(t){var s=0,e,i=false,a=true;for(s=0;s<this.offers.length;s++){a=true;for(e in t){if(t[e]!==this.offers[s].TREE[e]){a=false;break}}if(a){if(this.offers[s].CAN_BUY){i=true;break}}}return i};t.JCCatalogTopSlider.prototype.SetCurrent=function(){var t=0,s=0,e=[],i="",a=false,o={},r=[],h=this.offers[this.offerNum].TREE;for(t=0;t<this.treeProps.length;t++){i="PROP_"+this.treeProps[t].ID;a=this.GetRowValues(o,i);if(!a){break}if(BX.util.in_array(h[i],a)){o[i]=h[i]}else{o[i]=a[0];this.offerNum=0}if(this.showAbsent){e=[];r=[];r=BX.clone(o,true);for(s=0;s<a.length;s++){r[i]=a[s];if(this.GetCanBuy(r)){e[e.length]=a[s]}}}else{e=a}this.UpdateRow(t,o[i],a,e)}this.selectedValues=o;this.ChangeInfo()};t.JCCatalogTopSlider.prototype.ChangeInfo=function(){var t=0,s,e=-1,i={},a=true,o="";for(t=0;t<this.offers.length;t++){a=true;for(s in this.selectedValues){if(this.selectedValues[s]!==this.offers[t].TREE[s]){a=false;break}}if(a){e=t;break}}if(-1<e){if(!!this.obPict){if(!!this.offers[e].PREVIEW_PICTURE){BX.adjust(this.obPict,{style:{backgroundImage:"url("+this.offers[e].PREVIEW_PICTURE.SRC+")"}})}else{BX.adjust(this.obPict,{style:{backgroundImage:"url("+this.defaultPict.pict.SRC+")"}})}}if(this.secondPict&&!!this.obSecondPict){if(!!this.offers[e].PREVIEW_PICTURE_SECOND){BX.adjust(this.obSecondPict,{style:{backgroundImage:"url("+this.offers[e].PREVIEW_PICTURE_SECOND.SRC+")"}})}else if(!!this.offers[e].PREVIEW_PICTURE.SRC){BX.adjust(this.obSecondPict,{style:{backgroundImage:"url("+this.offers[e].PREVIEW_PICTURE.SRC+")"}})}else if(!!this.defaultPict.secondPict){BX.adjust(this.obSecondPict,{style:{backgroundImage:"url("+this.defaultPict.secondPict.SRC+")"}})}else{BX.adjust(this.obSecondPict,{style:{backgroundImage:"url("+this.defaultPict.pict.SRC+")"}})}}if(this.showSkuProps&&!!this.obSkuProps){if(0===this.offers[e].DISPLAY_PROPERTIES.length){BX.adjust(this.obSkuProps,{style:{display:"none"},html:""})}else{BX.adjust(this.obSkuProps,{style:{display:""},html:this.offers[e].DISPLAY_PROPERTIES})}}this.setPrice(this.offers[e].PRICE);this.offerNum=e;this.QuantitySet(this.offerNum)}};t.JCCatalogTopSlider.prototype.setPrice=function(t){var s,e;if(!!this.obPrice){s=BX.Currency.currencyFormat(t.DISCOUNT_VALUE,t.CURRENCY,true);if(this.showOldPrice&&t.DISCOUNT_VALUE!==t.VALUE){s+=" <span>"+BX.Currency.currencyFormat(t.VALUE,t.CURRENCY,true)+"</span>"}BX.adjust(this.obPrice,{html:s});if(this.showPercent){if(t.DISCOUNT_VALUE!==t.VALUE){e={style:{display:""},html:t.DISCOUNT_DIFF_PERCENT}}else{e={style:{display:"none"},html:""}}if(!!this.obDscPerc){BX.adjust(this.obDscPerc,e)}if(!!this.obSecondDscPerc){BX.adjust(this.obSecondDscPerc,e)}}}};t.JCCatalogTopSlider.prototype.Compare=function(){var t,s;if(!!this.compareData.compareUrl){switch(this.productType){case 0:case 1:case 2:s=this.compareData.compareUrl.replace("#ID#",this.product.id.toString());break;case 3:s=this.compareData.compareUrl.replace("#ID#",this.offers[this.offerNum].ID);break}t={ajax_action:"Y"};BX.ajax.loadJSON(s,t,BX.proxy(this.CompareResult,this))}};t.JCCatalogTopSlider.prototype.CompareResult=function(t){var e,i;if(!!this.obPopupWin)this.obPopupWin.close();if(!BX.type.isPlainObject(t))return;this.InitPopupWindow();if(t.STATUS==="OK"){BX.onCustomEvent("OnCompareChange");e='<div style="width: 100%; margin: 0; text-align: center;"><p>'+BX.message("COMPARE_MESSAGE_OK")+"</p></div>";if(this.showClosePopup){i=[new s({ownerClass:this.obProduct.parentNode.parentNode.parentNode.parentNode.className,text:BX.message("BTN_MESSAGE_COMPARE_REDIRECT"),events:{click:BX.delegate(this.CompareRedirect,this)},style:{marginRight:"10px"}}),new s({ownerClass:this.obProduct.parentNode.parentNode.parentNode.parentNode.className,text:BX.message("BTN_MESSAGE_CLOSE_POPUP"),events:{click:BX.delegate(this.obPopupWin.close,this.obPopupWin)}})]}else{i=[new s({ownerClass:this.obProduct.parentNode.parentNode.parentNode.parentNode.className,text:BX.message("BTN_MESSAGE_COMPARE_REDIRECT"),events:{click:BX.delegate(this.CompareRedirect,this)}})]}}else{e='<div style="width: 100%; margin: 0; text-align: center;"><p>'+(!!t.MESSAGE?t.MESSAGE:BX.message("COMPARE_UNKNOWN_ERROR"))+"</p></div>";i=[new s({ownerClass:this.obProduct.parentNode.parentNode.parentNode.parentNode.className,text:BX.message("BTN_MESSAGE_CLOSE"),events:{click:BX.delegate(this.obPopupWin.close,this.obPopupWin)}})]}this.obPopupWin.setTitleBar(BX.message("COMPARE_TITLE"));this.obPopupWin.setContent(e);this.obPopupWin.setButtons(i);this.obPopupWin.show()};t.JCCatalogTopSlider.prototype.CompareRedirect=function(){if(!!this.compareData.comparePath){location.href=this.compareData.comparePath}else{this.obPopupWin.close()}};t.JCCatalogTopSlider.prototype.InitBasketUrl=function(){this.basketUrl=this.basketMode==="ADD"?this.basketData.add_url:this.basketData.buy_url;switch(this.productType){case 1:case 2:this.basketUrl=this.basketUrl.replace("#ID#",this.product.id.toString());break;case 3:this.basketUrl=this.basketUrl.replace("#ID#",this.offers[this.offerNum].ID);break}this.basketParams={ajax_basket:"Y"};if(this.showQuantity){this.basketParams[this.basketData.quantity]=this.obQuantity.value}if(!!this.basketData.sku_props){this.basketParams[this.basketData.sku_props_var]=this.basketData.sku_props}};t.JCCatalogTopSlider.prototype.FillBasketProps=function(){if(!this.visual.BASKET_PROP_DIV){return}var t=0,s=null,e=false,i=null;if(this.basketData.useProps&&!this.basketData.emptyProps){if(!!this.obPopupWin&&!!this.obPopupWin.contentContainer){i=this.obPopupWin.contentContainer}}else{i=BX(this.visual.BASKET_PROP_DIV)}if(!!i){s=i.getElementsByTagName("select");if(!!s&&!!s.length){for(t=0;t<s.length;t++){if(!s[t].disabled){switch(s[t].type.toLowerCase()){case"select-one":this.basketParams[s[t].name]=s[t].value;e=true;break;default:break}}}}s=i.getElementsByTagName("input");if(!!s&&!!s.length){for(t=0;t<s.length;t++){if(!s[t].disabled){switch(s[t].type.toLowerCase()){case"hidden":this.basketParams[s[t].name]=s[t].value;e=true;break;case"radio":if(s[t].checked){this.basketParams[s[t].name]=s[t].value;e=true}break;default:break}}}}}if(!e){this.basketParams[this.basketData.props]=[];this.basketParams[this.basketData.props][0]=0}};t.JCCatalogTopSlider.prototype.Add2Basket=function(){this.basketMode="ADD";this.Basket()};t.JCCatalogTopSlider.prototype.BuyBasket=function(){this.basketMode="BUY";this.Basket()};t.JCCatalogTopSlider.prototype.SendToBasket=function(){if(!this.canBuy){return}this.InitBasketUrl();this.FillBasketProps();BX.ajax.loadJSON(this.basketUrl,this.basketParams,BX.delegate(this.BasketResult,this))};t.JCCatalogTopSlider.prototype.Basket=function(){var t="";if(!this.canBuy){return}switch(this.productType){case 1:case 2:if(this.basketData.useProps&&!this.basketData.emptyProps){this.InitPopupWindow();this.obPopupWin.setTitleBar(BX.message("TITLE_BASKET_PROPS"));if(BX(this.visual.BASKET_PROP_DIV)){t=BX(this.visual.BASKET_PROP_DIV).innerHTML}this.obPopupWin.setContent(t);this.obPopupWin.setButtons([new s({ownerClass:this.obProduct.parentNode.parentNode.parentNode.parentNode.className,text:BX.message("BTN_MESSAGE_SEND_PROPS"),events:{click:BX.delegate(this.SendToBasket,this)}})]);this.obPopupWin.show()}else{this.SendToBasket()}break;case 3:this.SendToBasket();break}};t.JCCatalogTopSlider.prototype.BasketResult=function(t){var e="",i="",a,o=[];if(!!this.obPopupWin)this.obPopupWin.close();if(!BX.type.isPlainObject(t))return;a=t.STATUS==="OK";if(a&&this.basketAction==="BUY"){this.BasketRedirect()}else{this.InitPopupWindow();if(a){BX.onCustomEvent("OnBasketChange");switch(this.productType){case 1:case 2:i=this.product.pict.SRC;break;case 3:i=!!this.offers[this.offerNum].PREVIEW_PICTURE?this.offers[this.offerNum].PREVIEW_PICTURE.SRC:this.defaultPict.pict.SRC;break}e='<div style="width: 100%; margin: 0; text-align: center;"><img src="'+i+'" height="130" style="max-height:130px"><p>'+this.product.name+"</p></div>";if(this.showClosePopup){o=[new s({ownerClass:this.obProduct.parentNode.parentNode.parentNode.parentNode.className,text:BX.message("BTN_MESSAGE_BASKET_REDIRECT"),events:{click:BX.delegate(this.BasketRedirect,this)},style:{marginRight:"10px"}}),new s({ownerClass:this.obProduct.parentNode.parentNode.parentNode.parentNode.className,text:BX.message("BTN_MESSAGE_CLOSE_POPUP"),events:{click:BX.delegate(this.obPopupWin.close,this.obPopupWin)}})]}else{o=[new s({ownerClass:this.obProduct.parentNode.parentNode.parentNode.parentNode.className,text:BX.message("BTN_MESSAGE_BASKET_REDIRECT"),events:{click:BX.delegate(this.BasketRedirect,this)}})]}}else{e='<div style="width: 100%; margin: 0; text-align: center;"><p>'+(!!t.MESSAGE?t.MESSAGE:BX.message("BASKET_UNKNOWN_ERROR"))+"</p></div>";o=[new s({ownerClass:this.obProduct.parentNode.parentNode.parentNode.parentNode.className,text:BX.message("BTN_MESSAGE_CLOSE"),events:{click:BX.delegate(this.obPopupWin.close,this.obPopupWin)}})]}this.obPopupWin.setTitleBar(a?BX.message("TITLE_SUCCESSFUL"):BX.message("TITLE_ERROR"));this.obPopupWin.setContent(e);this.obPopupWin.setButtons(o);this.obPopupWin.show()}};t.JCCatalogTopSlider.prototype.BasketRedirect=function(){location.href=!!this.basketData.basketUrl?this.basketData.basketUrl:BX.message("BASKET_URL")};t.JCCatalogTopSlider.prototype.InitPopupWindow=function(){if(!!this.obPopupWin)return;this.obPopupWin=BX.PopupWindowManager.create("CatalogSectionBasket_"+this.visual.ID,null,{autoHide:false,offsetLeft:0,offsetTop:0,overlay:true,closeByEsc:true,titleBar:true,closeIcon:true,contentColor:"white"})};if(!!t.JCCatalogTopSliderList){return}t.JCCatalogTopSliderList=function(t){this.params=null;this.currentIndex=0;this.size=0;this.rotate=false;this.rotateTimer=3e4;this.rotatePause=false;this.showPages=false;this.errorCode=0;this.slider={cont:null,rows:null,left:null,right:null,pagination:null,pages:null};if(!t||"object"!==typeof t){this.errorCode=-1}if(0===this.errorCode){this.params=t}if(!!this.params.rotate){this.rotate=this.params.rotate}if(!!this.params.rotateTimer){this.params.rotateTimer=parseInt(this.params.rotateTimer,10);if(!isNaN(this.params.rotateTimer)&&0<=this.params.rotateTimer){this.rotateTimer=this.params.rotateTimer}}if(0===this.errorCode){BX.ready(BX.delegate(this.Init,this))}};t.JCCatalogTopSliderList.prototype.Init=function(){if(0>this.errorCode){return}var t=0;if(!!this.params.cont){this.slider.cont=BX(this.params.cont)}if(!!this.params.rows&&BX.type.isArray(this.params.rows)){this.slider.rows=[];for(t=0;t<this.params.rows.length;t++){this.slider.rows[this.slider.rows.length]=BX(this.params.rows[t]);if(!this.slider.cont){this.slider.cont=this.slider.rows[this.slider.rows.length-1].parent}}this.size=this.slider.rows.length}if(!!this.params.left){if(BX.type.isDomNode(this.params.left)){this.slider.left=this.params.left}else if("object"===typeof this.params.left){this.slider.left=this.slider.cont.appendChild(BX.create("DIV",{props:{id:this.params.left.id,className:this.params.left.className}}))}else if(BX.type.isNotEmptyString(this.params.left)){this.slider.left=BX(this.params.left)}}if(!!this.params.right){if(BX.type.isDomNode(this.params.right)){this.slider.right=this.params.right}else if("object"===typeof this.params.right){this.slider.right=this.slider.cont.appendChild(BX.create("DIV",{props:{id:this.params.right.id,className:this.params.right.className}}))}else if(BX.type.isNotEmptyString(this.params.right)){this.slider.right=BX(this.params.right)}}if(!!this.params.pagination){if(BX.type.isDomNode(this.params.pagination)){this.slider.pagination=this.params.pagination}else if("object"===typeof this.params.pagination){this.slider.pagination=this.slider.cont.appendChild(BX.create("UL",{props:{id:this.params.pagination.id,className:this.params.pagination.className}}))}else if(BX.type.isNotEmptyString(this.params.pagination)){this.slider.pagination=BX(this.params.pagination)}}if(!!this.slider.pagination){this.showPages=true;this.slider.pages=[];for(t=0;t<this.slider.rows.length;t++){this.slider.pages[this.slider.pages.length]=this.slider.pagination.appendChild(BX.create("LI",{props:{className:0===t?"active":"notactive"},attrs:{"data-pagevalue":t.toString()},events:{click:BX.delegate(this.RowMove,this)},html:"<span></span>"}))}}if(0===this.errorCode){if(this.rotate&&!!this.slider.cont&&0<this.rotateTimer){BX.bind(this.slider.cont,"mouseover",BX.delegate(this.RotateStop,this));BX.bind(this.slider.cont,"mouseout",BX.delegate(this.RotateStart,this));setTimeout(BX.delegate(this.RowRotate,this),this.rotateTimer)}if(!!this.slider.left){BX.bind(this.slider.left,"click",BX.delegate(this.RowLeft,this))}if(!!this.slider.right){BX.bind(this.slider.right,"click",BX.delegate(this.RowRight,this))}}};t.JCCatalogTopSliderList.prototype.RowLeft=function(){if(0>this.errorCode){return}if(this.showPages){BX.adjust(this.slider.pages[this.currentIndex],{props:{className:"notactive"}})}BX.adjust(this.slider.rows[this.currentIndex],{props:{className:"bx_catalog_tile_slide notactive"}});this.currentIndex=(0===this.currentIndex?this.size:this.currentIndex)-1;if(this.showPages){BX.adjust(this.slider.pages[this.currentIndex],{props:{className:"active"}})}BX.adjust(this.slider.rows[this.currentIndex],{props:{className:"bx_catalog_tile_slide active"}})};t.JCCatalogTopSliderList.prototype.RowRight=function(){if(0>this.errorCode){return}if(this.showPages){BX.adjust(this.slider.pages[this.currentIndex],{props:{className:"notactive"}})}BX.adjust(this.slider.rows[this.currentIndex],{props:{className:"bx_catalog_tile_slide notactive"}});this.currentIndex++;if(this.currentIndex===this.size){this.currentIndex=0}if(this.showPages){BX.adjust(this.slider.pages[this.currentIndex],{props:{className:"active"}})}BX.adjust(this.slider.rows[this.currentIndex],{props:{className:"bx_catalog_tile_slide active"}})};t.JCCatalogTopSliderList.prototype.RowMove=function(){if(0>this.errorCode){return}var t=0,s=BX.proxy_context;if(!!s&&s.hasAttribute("data-pagevalue")){t=parseInt(s.getAttribute("data-pagevalue"),10);if(!isNaN(t)&&t<this.size){if(this.showPages){BX.adjust(this.slider.pages[this.currentIndex],{props:{className:"notactive"}})}BX.adjust(this.slider.rows[this.currentIndex],{props:{className:"bx_catalog_tile_slide notactive"}});this.currentIndex=t;if(this.showPages){BX.adjust(this.slider.pages[this.currentIndex],{props:{className:"active"}})}BX.adjust(this.slider.rows[this.currentIndex],{props:{className:"bx_catalog_tile_slide active"}})}}};t.JCCatalogTopSliderList.prototype.RowRotate=function(){if(0>this.errorCode){return}if(!this.rotatePause){this.RowRight()}setTimeout(BX.delegate(this.RowRotate,this),this.rotateTimer);

};t.JCCatalogTopSliderList.prototype.RotateStart=function(){if(0>this.errorCode){return}this.rotatePause=false};t.JCCatalogTopSliderList.prototype.RotateStop=function(){if(0>this.errorCode){return}this.rotatePause=true}})(window);
/* End */
;; /* /local/templates/union_2024/components/bitrix/catalog/all_page/script.js?17473160902094*/
; /* /local/templates/union_2024/components/bitrix/catalog.element/.default/script.min.js?173099304558999*/
; /* /local/templates/union_2024/js/catalog.view.js?17579269995581*/
; /* /local/templates/union_2024/js/catalog.view.v9.js?175792699920131*/
; /* /local/templates/union_2024/components/bitrix/catalog.top/union/slider/script.min.js?173099304532306*/

//# sourceMappingURL=page_4a09f2b31cfaa150f51bc2fc58c2530d.map.js