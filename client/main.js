
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

			$("#search-button").click(function(e){
				$("div").removeClass("hidden");
				$("p").removeClass("hidden");
			})

			$(".close-button").click(function(e){
				$("div").addClass("hidden");
				$("p").addClass("hidden");
			})
		});