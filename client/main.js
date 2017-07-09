
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
			}) //send of header nav

		//Wikipedia search Request
      $(".search button").on("click",function(){
        $("form").submit(function() { return false; });
        var searchTerm = $("#search-wiki").val();
        if(searchTerm == "" || searchTerm == undefined){
          var searchTerm = "https://en.wikipedia.org/wiki/Special:Random"
          window.open(searchTerm, "_blank");
        }
        else {
          $.ajax({
            url : "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json&callback=?",
            dataType : "json",
            type : "GET",
            cache : false,
            success : function(data){
              var contentUI = "<div><h5>"+data[0]+"</h5><br>";
              if (data[2].length < 3){
                contentUI += "<p><em>" + data[1] + "</em><br>" + data[2] + "</p></div>";
                $(".search-result").html(contentUI);
              }
              else {
              for(var i = 1;i<10;i++){
                contentUI += "<p><em>" + data[1][i] + "</em><br>" + data[2][i] + "</p><br><br>"
              }
              contentUI += "</div>"
              $(".search-result").html(contentUI);
            }
            },
            error : function(message){
              $(".search-result").html("An error was encountere");
            }
          })
 
        }
      }) //end of wiki search

});