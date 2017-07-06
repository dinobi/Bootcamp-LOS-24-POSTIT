
	$(document).ready(function(){
		
	//Responsive page header navigation
		$('#mobile-nav').html($('.nav-list').html())
			$('.nav-mobile').click(function(){
				if ($('#mobile-nav').hasClass('expanded')){
					$('#mobile-nav.expanded').removeClass('expanded').slideUp(500);
					$(this).removeClass('open');
				}
				else {
					$('#mobile-nav').addClass('expanded').slideDown(500);
					$(this).addClass('open');
				}
			})

			//Toggle between authentication window
            var toggled = false;
            $(".auth-tab").on("click",function(){
              if(toggled == false){
                $(".registration.active").removeClass("active");
				$(".login").addClass("active");
                toggled = true;
              }
              else {
                $(".auth-tab #active");
                toggled = false;
              }
            });

		});