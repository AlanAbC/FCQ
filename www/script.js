$(document).ready(function(){
	$('html').niceScroll();
	$(document).foundation();
  addcard();
  addposts();
});
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