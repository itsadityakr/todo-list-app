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

function handleButtonClick() {
  window.location.href = "../pages/selection.html";
}

// Add click event listener to the button
document.getElementById("agreeButton").addEventListener("click", handleButtonClick);

// Add keydown event listener to the document
document.addEventListener("keydown", function(event) {
  // Check if the Enter key is pressed
  if (event.key === "Enter") {
    handleButtonClick();
  }
});