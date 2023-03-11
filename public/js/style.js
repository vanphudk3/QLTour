
// // mobile menu
// // var offmenu = document.getElementById("mySidepanel");

// function openNav() {
//   document.getElementById("mySidepanel").style.width = "250px";
// }

// function closeNav() {
//   document.getElementById("mySidepanel").style.width = "0";
//   document.body.style.backgroundColor = "white";
//   document.body.style.cursor = "default";
// }

// var dropdown = document.getElementsByClassName("dropdown-btn");
// var i;

// for (i = 0; i < dropdown.length; i++) {
//   dropdown[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var dropdownContent = this.nextElementSibling;
//     if (dropdownContent.style.display === "block") {
//       dropdownContent.style.display = "none";
//     } else {
//       dropdownContent.style.display = "block";
//     }
//   });
// }

//   $(function () {
//     $('[data-toggle="tooltip"]').tooltip('show')
//   })

//   function openDescription(evt, DesName) {
//     var i, tabcontent, tablinks;
//     tabcontent = document.getElementsByClassName("tabcontent");
//     for (i = 0; i < tabcontent.length; i++) {
//       tabcontent[i].style.display = "none";
//     }
//     tablinks = document.getElementsByClassName("tablinks");
//     for (i = 0; i < tablinks.length; i++) {
//       tablinks[i].className = tablinks[i].className.replace(" active", "");
//     }
//     document.getElementById(DesName).style.display = "block";
//     evt.currentTarget.className += " active";
//   }

//   document.getElementById("defaultOpen").click();

//   $(document).ready(function() {
//     $('.bar span').hide();
//     $('#bar-five').animate({
//        width: '75%'}, 1000);
//     $('#bar-four').animate({
//        width: '35%'}, 1000);
//     $('#bar-three').animate({
//        width: '20%'}, 1000);
//     $('#bar-two').animate({
//        width: '15%'}, 1000);
//     $('#bar-one').animate({
//        width: '30%'}, 1000);
    
//     setTimeout(function() {
//       $('.bar span').fadeIn('slow');
//     }, 1000);
    
//   });

//   function payCash() {
//     var x = document.getElementById("byCash");
//     x.style.display = "block";
//   }

//   function payMomo() {
//     var y = document.getElementById("byMomo");
//     y.style.display = "block";
//   }

//   function payTransfer() {
//     var z = document.getElementById("byTransfer");
//     z.style.display = "block";
//   }

//   function payVNPAY() {
//     var l = document.getElementById("byVNPay");
//     l.style.display = "block";
//   }

