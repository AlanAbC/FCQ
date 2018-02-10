var urlCat = 'http://fcq.claresti.com/api/?o=posts_cat&cat='

$(document).ready(function(){
	$('html').niceScroll();
	$(document).foundation();
	cargarInicio();
});
document.addEventListener('deviceready', function () {

  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal
    .startInit("ee3ed7e5-a647-44f4-9e8e-e756e7147518")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
}, false);
//Funcion para llamar las funciones que cargan la informacion de la pantalla y muestra el loader
function cargarInicio() {
    $('.loader').show();
    addcard('http://fcq.claresti.com/api/?o=posts');
    addposts('http://fcq.claresti.com/api/?o=posts');
	  loadMenu();
    $('.loader').hide();
}
//Funcion para desplegar el menu
function pushmenu(){
  $('.ui.labeled.icon.sidebar').sidebar('toggle');
}
//Funcion para la navegacion entre ventanas
function pushpage(idevento){
    document.querySelector('#myNavigator').pushPage(idevento+'.html', {data: {title: 'Post'}});
    //page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
}

function home_card_template(le, item) {
  return '<div class="card_home"><div class="card_img" id="item-' + le + '"><div class="card_title">'+item["title"].substring(0,25)+'...'+'</div></div><div class="card_content"><div class="card_fecha">'+item["date"]+'</div><div class="card_compartir" id="push-button" onclick="pushpage('+item["id"]+')"><img src="img/share-option.png" alt="" class="compartir"></div><div class="card_text">'+item["excerpt"]+'</div></div></div>';
}

//Funcion para agregar cartas
function addcard(url){

  $(".cards").html("");

  $.getJSON(url, function(json, textStatus) {
      $.each(json,function(le, item) {
        $(".cards").append(home_card_template(le, item));
        $(".card_img#item-" + le).css('background-image', 'url("'+item["image"]+'")');

      });

  });
}
function addposts(url){

  $(".posts").html("");

  $.getJSON(url, function(json, textStatus) {
      $.each(json,function(le, item) {
        $(".posts").append('<template id="'+item["id"]+'.html"><ons-page id="page2"><ons-toolbar><div class="left"><ons-back-button>Inicio</ons-back-button></div><div class="center">Post</div></ons-toolbar><div class="img_single" style="background-image: url(' + "'" + item['image'] + "'" + ')"><div class="title_single">'+item["title"]+'</div><p class="fecha_single">'+item["date"]+'</p><div class="contenido_single">'+item["content"]+'</div></div></ons-page></template>');
      });

  });
}
function filterposts(cat){
    url = "http://fcq.claresti.com/api/?o=posts_cat&cat="+cat;
    addcard(url);
    addposts(url);

}
function homeposts(){
  url = "http://fcq.claresti.com/api/?o=posts"
  addcard(url);
  addposts(url);
}
function searchposts(){
  value = $(".srchinput").val()
  $(".srchcards").html("");
  $(".searchedposts").html("");
  url = "http://fcq.claresti.com/api/?o=search&sq="+value;
  $.getJSON(url, function(json, textStatus) {
      if(json.length != 0){
        $(".oops").css('display', 'none');
         $.each(json,function(le, item) {
          $(".srchcards").append(home_card_template(le, item));
          $(".card_img#item-" + le).css('background-image', 'url("'+item["image"]+'")');
          $(".searchedposts").append('<template id="'+item["id"]+'.html"><ons-page id="page2"><ons-toolbar><div class="left"><ons-back-button>Busqueda</ons-back-button></div><div class="center">Post</div></ons-toolbar><div class="img_single" style="background-image: url(' + "'" + item['image'] + "'" + ')"><div class="title_single"><strong>'+item["title"]+'</strong></div><p class="fecha_single">'+item["date"]+'</p><div class="contenido_single">'+item["content"]+'</div></div></ons-page></template>');
        });
      }else{
        $(".srchcards").append('<div class="oops"><i class="ion-sad-outline icon"></i><p class="emptytxt">No hay elementos</p></div>');
      }

  });
}

// Funcion para cargar los elementos del menú
function loadMenu(){
    var menu = $("#menu");
    menu.html("");
    menu.append('<a class="item" href="javascript:void(0)" onclick="pushmenu();homeposts();"><i class="ion-home icon"></i>Home </a> <a class="item" onclick="pushmenu();pushpage(\'pagebus\');"> <i class="ion-search icon"></i>Busqueda </a>');
    var url = "http://fcq.claresti.com/api/?o=categories"
    $.getJSON(url, function(json, textStatus){
  		$.each(json, function(index, item) {
        var icon = item['icon'] || 'ion-alert-circled';
        var item_menu = 
        $('<a>')
          .attr('id', item['slug'])
          .attr('href', 'javascript:void(0)')
          .attr('onclick', 'pushmenu();filtroCat(event);')
          .addClass('item')
          .append(
            $('<i>')
            .addClass(icon + ' icon')
          )
          .append(item['name']);
  			menu.append(item_menu);
  		});
    });
}

// Funcion para cargar los post de la categoria seleccionada en el menú
function filtroCat(event){
  var cat = event.path[0].id;
  var url = 'http://fcq.claresti.com/api/?o=posts_cat&cat=' + cat;
  $('.loader').show();
  addcard(url);
  addposts(url);

  $('.loader').hide();
}
