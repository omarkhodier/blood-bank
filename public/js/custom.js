$(document).ready(function(){
  $('.shop-fy li button').click(function(){
      
      $('.search').slideToggle();
  });
     var slider = new MasterSlider();
	slider.setup('masterslider', {
		width: 1170, // slider standard width
		height: 700, // slider standard height
		space: 5,
        fullwidth: true,
        loop: true,
        view: "slide",
        autoplay: 5000
			// more slider options goes here...
	});
	// adds Arrows navigation control to the slider.
	slider.control('arrows'  , {autohide:false});
    slider.control('bullets' , {autohide:false  , dir:"v", align:"top"});
    
    
    //tabs
    $("#tabbed-nav").zozoTabs({
        position: "top-left",
        style: "clean",
        theme: "flat-alizarin",
        spaced: true,
        rounded: true,
        animation: {
            easing: "easeInOutExpo",
            duration: 600,
            effects: "slideH"
        },
        size:"large"
    });
    
    //owl-last
    
    $(".owl-last").owlCarousel({
 
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        stopOnHover:true,
        items : 4,
        itemsDesktop : [1199,3],
        itemsTabletSmall:false	,
        itemsDesktopSmall : [979,3],
        itemsMobile :	[479,1]
 
  });
    var e = new WOW({
        boxClass: "wow",
        animateClass: "animated",
        offset: 100,
        mobile: true,
        live: true,
        callback: function (e) {}
    });
    e.init();
    
    $('#gfg').click(function(){
        $('.tyo').slideToggle();
    })
  $('.dd').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 3000);
        return false;
      }
    }
  });
  $("[name='faculty']").parent().hide()
  $("[name='grade']").parent().hide()
  $("[name='facID']").parent().hide()
  $("select").change(function(event){
    if(event.target.value!="Student"){
        $("[name='faculty']").parent().hide(1500)
        $("[name='grade']").parent().hide(1500)
        $("[name='facID']").parent().hide(1500)
    }
    else{
        $("[name='faculty']").parent().show(1500)
        $("[name='grade']").parent().show(1500)
        $("[name='facID']").parent().show(1500)
    }
   })
// validations 
   $('#login-form').on('submit',function(){
    event.preventDefault(); 
    var id = $('#ID').val();
     alert(id);
   });

   $('#register-form').on('submit',function(){
    event.preventDefault();
    var type = $('#type').val();
    var id = $('#ID-Reg').val();
    

    //  data:{"type":type,"id":id}  
   });

   $('').on('click',function(){

   });
   $('').on('click',function(){

  });

  $('#date-foundation').hide();
  $('#amount-blood').hide();
  $('#save-new').hide();

  $('#save-new').on('click',function(e){
    e.preventDefault();
   var dateof =  $('#date-foundation-input').val();
   var amount =  $('#amount-blood-input').val();
   var user_id=  $(this).attr('data-user-id');
   alert(amount);
    $.ajax({
      method: "POST",
      url: "/users/student/save/",
      type: 'application/json',
      data:{amount:amount,dateof:dateof,userId:user_id},
      success:function(response){
        console.log(response);
      },
      error:function(error){

      },
      compelete:function(){

      }
    })
  });

  $('#search-button').on('click',function(e){
    e.preventDefault();
    var userId =  $('#search-id-input').val();
    var table  =  $('#table-result');
    
    $.ajax({
      method: "POST",
      url: "/users/physician/search",
      type: 'application/json',
      data:{userId:userId},
      success:function(response){
        console.log(response.records);
        table.html("");
        $.each(response.records, function(i, item) {
          var $tr = $('<tr>').append(
              $('<td>').text(item.Id),
              $('<td>').text(item.blood),
              $('<td>').text(item.width),
              $('<td>').text(item.height)
          ); //.appendTo('#records_table');
          $(table).append($tr)

      });
      },
      error:function(error){

      },
      compelete:function(){

      }
    })
  });

  $('#user_blood').hide();
  $('#user_blood').val('');

  $('#user_Id').hide();
  $('#user_Id').val('');

  $('#search-type').on('change',function(){
    if($(this).val() == 'bloodType'){
      $('#user_Id').hide();
      $('#user_Id').val("");
      $('#user_blood').show();
    }else if($(this).val() == 'Id'){
      $('#user_blood').hide();
      $('#user_blood').val("");
      $('#user_Id').show();
    }
  });

  $('#students-list').on('change',function(){
    $('#student-id').val($(this).val());
  });


  $('#Add-data-by-emp').on('click',function(){
    $('#date-foundation').show();
    $('#amount-blood').show();
    $('#save-new').show();
  });


});

