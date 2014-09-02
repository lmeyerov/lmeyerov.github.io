$(function () {
  var where = window.location.pathname.split("#")[0].split("/");
  where = where[where.length - 1];  
  $("*").find("a[href='"+where+"']").each(function(){
    $(this).addClass("activeLink")
  })
  
  setTimeout(function() {
    $("html").append($(".toolbar").clone());
    }, 1000);
});


