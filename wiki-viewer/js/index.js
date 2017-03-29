$(document).ready(function(){
    /*
    var hh = "hh";
    var html ="";
    
    html += "<p>" + hh +"</p>";
    $('#location').html(html);
*/
  
  function lookup(){
  var query = document.getElementById("searchinput").value;
  //var query = 'tree';///set this to serched for item
  $.getJSON('https://en.wikipedia.org/w/api.php?action=opensearch&search='+ query + '&callback=?', function(data){
  var html ="";
    for(var i = 0; i <data[1].length;i++ ){
      
      var result = data[1][i];
      var link = data[3][i];
      
      html += "<div class = 'col-md-6'><h4><a href ="+link+">"+result+ "</a></h4></div>";
    }
    $('#location').html(html);
});
}
  
  $("#searchButn").click(function() {
		lookup();
	});
  
  $("#randomButn").click(function() {
    window.location.href = 'https://en.wikipedia.org/wiki/Special:Random';
		
	});
  
  $('#searchinput').keyup(function(e){
    if(e.keyCode == 13)
    {
        lookup();
    }
});
  
});