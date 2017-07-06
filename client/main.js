
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

			$("ul#auth-tab li").click(function(e){
				if(!$(this).hasClass("active"))
				let tabNum = $(this).index();
				let nthChild = tabNum+1;
				$("ul#auth-tab li.active").removeClass("active");
				$(this).addClass("active");
				$("ul#auth-form li.active").removeClass("active");
				$("ul#auth-form li:nth-child("+ nthChild + ")").addClass("active")

			})
		});