 document.addEventListener("DOMContentLoaded", function () {

     console.log("deb")
     
//    var hero = document.querySelector(".hero")
//    console.log(heroImg[0]);
// //    hero.style.backgroundImage = heroImg[0];
//    if (heroImg[0]) {
//     hero.style.backgroundImage = heroImg[0];
//     console.log("done")
//     console.log(hero.style.backgroundImage)
// } else {
//     console.error("Erreur: heroImg[0] n'est pas défini.");
// }
   //hero.style.backgroundImage = "url('http://localhost:8888/wp-content/uploads/2024/03/nathalie-11-scaled.webp')";

   
       // //  Popup
       var contactItems = document.querySelectorAll(".popup-contact");
       const popup = document.querySelector(".popup");
      // // const siteBackground = document.querySelector(".site");
       const overlay = document.querySelector(".popup-overlay");
   
       contactItems.forEach(function (contactItem) {
   
           // ouvertur de la popup
           contactItem.onclick = function (event) {
               event.preventDefault()
               popup.style.display = "flex";
               overlay.style.display = "block";
           }
   
           // fermerture de la popup
           window.addEventListener("click", function (event) {
               // Si la popup est affichée
               // Si l'élément sur lequel le clic a été effectué n'est pas contenu dans la popup
               // Si l'élément sur lequel le clic a été effectué n'est pas l'élément qui ouvre la popup
               if (popup.style.display === "flex" && !popup.contains(event.target) && !isClickedOnContactItem(event.target)) {
                   popup.style.display = "none";
                   overlay.style.display = "none";
   
               }
           });
       });
   
   
       function isClickedOnContactItem(target) {
           // Vérifie si l'élément cliqué est l'un des éléments qui ouvre la popup
           for (var i = 0; i < contactItems.length; i++) {
               if (contactItems[i].contains(target)) {
                   return true;
               }
           }
           return false;
       }
   
   
       // Gestion dynamique de la référence
   
       // récupérer la valeur
        var reference = document.getElementById("reference-value").innerText;
       // insérer la valeur
       document.getElementById("reference").value = reference;
   
       // Hover navigation
       var arrowItems = document.querySelectorAll(".arrow");
       var thumbnailItems = document.querySelectorAll(".thumbnail")
   
       for(let i = 0; i < arrowItems.length; i++){
           arrowItems[i].onmouseover = function () {
               thumbnailItems[i].classList.add("thumbnail-display");
           }
   
           arrowItems[i].onmouseout = function () {
               thumbnailItems[i].classList.remove("thumbnail-display");
           }
       };
   
       console.log('ok')



       /// lightbox


 });

//Select dropdown

(function ($) {
    $(document).ready(function() {
        $('.dropdown').select2({
            minimumResultsForSearch: Infinity
        });

        $('b[role="presentation"]').hide();
        // $('.select2-selection__arrow').append('<i class="fa fa-angle-down"></i>');
        // $('.select2-container--open .select2-selection__arrow').removeClass('fa fa-angle-down')
        // .append('<i class="fa fa-angle-up"></i>');

        $('.select2-results__option--highligted').click(function() {
                $(this).addClass(".select2-results__option--selected");
            }).mousedown(function(){
                $(this).removeClass(".select2-results__option--highlighted").addClass(".select2-results__option--pressed");
            }).mouseup(function(){
                $(this).removeClass(".select2-results__option--pressed").addClass(".select2-results__option--selected");
            console.log("color");
          });


          $('cat-list').change(function(){
            if($(this).val() === '') {
                if ($(this).data('prevValue')) {
                  $(this).val($(this).find('option[value=""]').eq(1).val()); // Sélectionne la deuxième option vide
                } else {
                  // Do nothing, already selected
                }
              } else {
                $(this).data('prevValue', $(this).val());
              }
          });

    })
})(jQuery);