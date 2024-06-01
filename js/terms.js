var tab_lists = document.querySelectorAll(".tabs_list ul li");
var tab_items = document.querySelectorAll(".tab_item"); 

tab_lists.forEach(function(list){
  list.addEventListener("click", function(){
    var tab_data = list.getAttribute("data-tc");
    
    tab_lists.forEach(function(list){
      list.classList.remove("active");
    });
    list.classList.add("active");
    
    tab_items.forEach(function(item){
      var tab_class = item.getAttribute("class").split(" ");
      if(tab_class.includes(tab_data)){
        item.style.display = "block";
      }
      else{
        item.style.display = "none";
      }
      
    })
    
  })
});

document.getElementById("agreeButton").addEventListener("click", function() {
  window.location.href = "../pages/selection.html";
});
function closeTab() {
  // Attempt to close the current tab
  window.close();
}

document.addEventListener("DOMContentLoaded", function() {
  const declineButton = document.querySelector(".decline");
  declineButton.addEventListener("click", closeTab);
});