$(document).ready(function() {
	$.ajaxSetup({
		cache: false //needed in order to update quotes
	});

	function getRandomQuote() {
		$.getJSON("//quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", function(data) {
      $("#quoteText").html(data[0].content);
			var quoteAuthor = " —" + data[0].title; 
			$("#quoteAuthor").html(quoteAuthor);
      });
	}

	getRandomQuote();//get a quote on first load
	
 function getShortQuote() {
		$.getJSON("//quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", function(data) {
		
      if(data[0].content.length > 50) {
				getShortQuote();
			}
			else{
				$("#quoteText").html(data[0].content);
				var quoteAuthor = " —" + data[0].title; 
				$("#quoteAuthor").html(quoteAuthor);
			}
    });
	}

  function getLongQuote() {
		$.getJSON("//quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", function(data) {
		
      if(data[0].content.length < 250) {
				getLongQuote();
			}
			else{
				$("#quoteText").html(data[0].content);
				var quoteAuthor = " —" + data[0].title; 
				$("#quoteAuthor").html(quoteAuthor);
			}
    });
	}
	///click to get a short quote
	$("#shortQuoteButton").click(function() {
    $("#quoteText").html("Finding a short quote...");
    $('body').css('background', colors[3]);
    $('.btn').css('background', colors[3]);
		getShortQuote();
	});
  //click to get a random quote
  $("#randomQuoteButton").click(function() {
    $('body').css('background', colors[0]);
    $('.btn').css('background', colors[0]);
		getRandomQuote();
	});
  //click to get a long quote
  $("#longQuoteButton").click(function() {
    $("#quoteText").html("Finding a long quote...");
    $('body').css('background', colors[1]);
    $('.btn').css('background', colors[1]);
		getLongQuote();
	});
  
  var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12',];
///twitter button
	$("#tweetButton").on('click', function(event) {
		event.preventDefault();	
		window.open("https://twitter.com/intent/tweet?text=" + "\"" + $("#quoteText").text() + "\""+ $("#quoteAuthor").text());
	});
});