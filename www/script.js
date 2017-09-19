$(document).ready(function(){
	$('html').niceScroll();
	$(document).foundation();
	cargarInicio();
  
});
$(".menuButton").click(function(event) {
  $('.ui.labeled.icon.sidebar').sidebar('toggle');
});

// Add to index.js or the first page that loads with your app.
// For Intel XDK and please add this to your app.js.

document.addEventListener('deviceready', function () {
  // Enable to debug issues.
  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  
  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal
    .startInit("ee3ed7e5-a647-44f4-9e8e-e756e7147518")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
  
  // Call syncHashedEmail anywhere in your app if you have the user's email.
  // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
  // window.plugins.OneSignal.syncHashedEmail(userEmail);
}, false);
//Funcion para llamar las funciones que cargan la informacion de la pantalla y muestra el loader
function cargarInicio() {
    $('.loader').show();
    addcard();
    addposts();
    $('.loader').hide();
}

//Funcion para la navegacion entre ventanas
function pushpage(idevento){
    document.querySelector('#myNavigator').pushPage(idevento+'.html', {data: {title: 'Post'}});
    //page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
}
//Funcion para agregar cartas
function addcard(){

  $(".cards").html("");

  $.getJSON('http://fcq.claresti.com/api/?o=posts', function(json, textStatus) {
      $.each(json,function(le, item) {
        $(".cards").append('<div class="card_home"><div class="card_img"><div class="card_title">'+item["title"].substring(0,25)+'...'+'</div></div><div class="card_content"><div class="card_fecha">'+item["id"]+'</div><div class="card_compartir" id="push-button" onclick="pushpage('+item["id"]+')"><img src="img/share-option.png" alt="" class="compartir"></div><div class="card_text">'+item["excerpt"]+'</div></div></div>');
        $(".card_img").css('background-image', 'url("'+item["image"]+'")');

      });

  });
}
function addposts(){

  $(".posts").html("");

  $.getJSON('http://fcq.claresti.com/api/?o=posts', function(json, textStatus) {
      $.each(json,function(le, item) {
        $(".posts").append('<template id="'+item["id"]+'.html"><ons-page id="page2"><ons-toolbar><div class="left"><ons-back-button>Inicio</ons-back-button></div><div class="center">Post</div></ons-toolbar><div class="img_single" style="background-image: url(' + "'" + item['image'] + "'" + ')"><div class="title_single"><strong>'+item["title"]+'</strong></div><p class="fecha_single">'+item["id"]+'</p><div class="contenido_single">'+item["content"]+'</div></div></ons-page></template>');
      });

  });
}
