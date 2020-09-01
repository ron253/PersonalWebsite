let textArea = document.getElementById("msg");
let textElement =  document.getElementById("charNum");

textArea.addEventListener("input", function() {
  textElement.textContent = `${Math.max(0, 500-this.value.length)} characters remaining`

})
