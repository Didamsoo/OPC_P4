// Fonction principale $.fn.mauGallery ____________________________________________________________________________
(function($) { 
  $.fn.mauGallery = function(options) { 
    const settings = $.extend($.fn.mauGallery.defaults, options); 
    let tagsCollection = [];  

    return this.each(function() { 
      $.fn.mauGallery.methods.createRowWrapper($(this)); 

      if (settings.lightBox) { 
        $.fn.mauGallery.methods.createLightBox(
          $(this),
          settings.lightboxId,
          settings.navigation
        );
      }

      $.fn.mauGallery.listeners(settings); 

      $(this)
        .children(".gallery-item")
        .each(function() { 
          $.fn.mauGallery.methods.responsiveImageItem($(this)); 
          $.fn.mauGallery.methods.moveItemInRowWrapper($(this)); 
          $.fn.mauGallery.methods.wrapItemInColumn($(this), settings.columns); 

          const theTag = $(this).data("gallery-tag"); 
          if (
            settings.showTags && 
            theTag !== undefined && 
            tagsCollection.indexOf(theTag) === -1 
          ) {
            tagsCollection.push(theTag); 
          }
        });

      if (settings.showTags) { 
        $.fn.mauGallery.methods.showItemTags(
          $(this),
          settings.tagsPosition,
          tagsCollection 
        );
      }

      $(this).fadeIn(150); 
    });
  };





// Options par défaut de la galerie ____________________________________________________________________________
  $.fn.mauGallery.defaults = {
    columns: 3, 
    lightBox: true, 
    lightboxId: null, 
    showTags: true, 
    tagsPosition: "top", // Les tags seront affichés en haut de la galerie.
    navigation: true // 
  };







// Gestion des événements utilisateurs ____________________________________________________________________________

  $.fn.mauGallery.listeners = function(settings) { 
    $(".gallery-item").on("click", function() { 
      if (settings.lightBox && $(this).prop("tagName") === "IMG") { 
        $.fn.mauGallery.methods.openLightBox($(this), settings.lightboxId); 
      } else {
        return;
      }
    });

    $(".gallery").on("click", ".mg-prev", () =>
      $.fn.mauGallery.methods.prevImage(settings.lightboxId) 
    );
    $(".gallery").on("click", ".mg-next", () =>
      $.fn.mauGallery.methods.nextImage(settings.lightboxId) 
    );

    $(".gallery").on("click", ".nav-link", function(event) {
      event.preventDefault(); 
      $.fn.mauGallery.methods.filterByTag($(this)); 
    });

    $(".nav-link").on("click", function() {
      $(".nav-link").removeClass("active-tag"); 
      $(this).addClass("active-tag"); 
    });
  };







// Méthodes de la galerie ____________________________________________________________________________

  $.fn.mauGallery.methods = {
    createRowWrapper(element) {
      if (!element.children().first().hasClass("row")) { 
        element.append('<div class="gallery-items-row row"></div>');
      }
    },

    wrapItemInColumn(element, columns) { 
      if (columns.constructor === Number) { 
        element.wrap(`<div class='item-column mb-4 col-${Math.ceil(12 / columns)}'></div>`);
      } else if (columns.constructor === Object) { 
        let columnClasses = "";  
        if (columns.xs) {
          columnClasses += ` col-${Math.ceil(12 / columns.xs)}`;
        }
        if (columns.sm) {
          columnClasses += ` col-sm-${Math.ceil(12 / columns.sm)}`;
        }
        if (columns.md) {
          columnClasses += ` col-md-${Math.ceil(12 / columns.md)}`;
        }
        if (columns.lg) {
          columnClasses += ` col-lg-${Math.ceil(12 / columns.lg)}`;
        }
        if (columns.xl) {
          columnClasses += ` col-xl-${Math.ceil(12 / columns.xl)}`;
        }
        element.wrap(`<div class='item-column mb-4${columnClasses}'></div>`);
      } else {
        console.error(`Columns should be defined as numbers or objects. ${typeof columns} is not supported.`);
      }
    },

    moveItemInRowWrapper(element) { 
      element.appendTo(".gallery-items-row");
    },

    responsiveImageItem(element) { 
      if (element.prop("tagName") === "IMG") {
        element.addClass("img-fluid"); 
      }
    },
    
    openLightBox(element, lightboxId) {
      $(`#${lightboxId}`)
        .find(".lightboxImage")
        .attr("src", element.attr("src")); 
      $(`#${lightboxId}`).modal("toggle"); 
    },







// Méthodes de navigation et de filtrage  ____________________________________________________________________________    

    prevImage(lightboxId) { 
      let activeImage = null; // Je commence par définir une variable pour stocker l'image active.
      
      // Je parcours toutes les images de la galerie pour trouver celle actuellement affichée dans la lightbox.
      $("img.gallery-item").each(function() {
          if ($(this).attr("src") === $(`#${lightboxId} .lightboxImage`).attr("src")) {
              activeImage = $(this); // Je stocke l'image qui correspond à celle de la lightbox.
          }
      });

      const imagesCollection = []; // Je crée un tableau pour stocker toutes les images de la galerie.

      // J'ajoute chaque image de la galerie au tableau.
      $(".gallery-item").each(function() {
          imagesCollection.push($(this));
      });

      let index = 0; // Je définis un index pour suivre la position de l'image actuelle dans la collection.

      // Je parcours le tableau des images pour trouver l'index de l'image active.
      $(imagesCollection).each(function(i) {
          if ($(activeImage).attr("src") === $(this).attr("src")) {
              index = i - 1; // Je décremente l'index pour afficher l'image précédente.
          }
      });

      // Si l'index est inférieur à 0, je le réinitialise pour afficher la dernière image de la collection.
      if (index < 0) {
          index = imagesCollection.length - 1;
      }

      // Je change l'image dans la lightbox en fonction de l'index mis à jour.
      $(`#${lightboxId} .lightboxImage`).attr("src", $(imagesCollection[index]).attr("src"));
    },


    nextImage(lightboxId) {
      let activeImage = null; // Je commence par définir une variable pour stocker l'image active.
      
      // Je parcours toutes les images de la galerie pour trouver celle actuellement affichée dans la lightbox.
      $("img.gallery-item").each(function() {
          if ($(this).attr("src") === $(`#${lightboxId} .lightboxImage`).attr("src")) {
              activeImage = $(this); // Je stocke l'image qui correspond à celle de la lightbox.
          }
      });
  
      const imagesCollection = []; // Je crée un tableau pour stocker toutes les images de la galerie.
  
      // J'ajoute chaque image de la galerie au tableau.
      $(".gallery-item").each(function() {
          imagesCollection.push($(this));
      });
  
      let index = 0; // Je définis un index pour suivre la position de l'image actuelle dans la collection.
  
      // Je parcours le tableau des images pour trouver l'index de l'image active.
      $(imagesCollection).each(function(i) {
          if ($(activeImage).attr("src") === $(this).attr("src")) {
              index = i + 1; // Je passe à l'image suivante en incrémentant l'index.
          }
      });
  
      // Si l'index dépasse le nombre d'images, je le réinitialise à 0 pour revenir à la première image.
      if (index >= imagesCollection.length) {
          index = 0;
      }
  
      // Je change l'image dans la lightbox en fonction de l'index mis à jour.
      $(`#${lightboxId} .lightboxImage`).attr("src", $(imagesCollection[index]).attr("src"));
  },
  

    createLightBox(gallery, lightboxId, navigation) {
      gallery.append(`
        <div class="modal fade" id="${lightboxId ? lightboxId : "galleryLightbox"}" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-body">
                ${navigation ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>' : '<span style="display:none;" />'}
                <img class="lightboxImage img-fluid" alt="Contenu de l'image affichée dans la modale au clique"/>
                ${navigation ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;">></div>' : '<span style="display:none;" />'}
              </div>
            </div>
          </div>
        </div>
      `);
    },

    showItemTags(gallery, position, tags) {
      let tagItems = '<li class="nav-item"><span class="nav-link" data-images-toggle="all">Tous</span></li>'; // J'ajoute un bouton "Tous" qui affichera toutes les images.
      
      // Je parcours les tags pour créer un élément de navigation pour chaque catégorie.
      $.each(tags, function(index, value) {
          tagItems += `<li class="nav-item"><span class="nav-link" data-images-toggle="${value}">${value}</span></li>`;
      });
  
      const tagsRow = `<ul class="my-4 tags-bar nav nav-pills">${tagItems}</ul>`; // Je crée la barre de filtres sous forme de liste de navigation.
  
      // J'ajoute la barre de filtres au bon endroit dans la galerie, soit en haut, soit en bas.
      if (position === "bottom") {
          gallery.append(tagsRow); // Si la position est "bottom", j'ajoute les tags à la fin de la galerie.
      } else if (position === "top") {
          gallery.prepend(tagsRow); // Si la position est "top", j'ajoute les tags au début de la galerie.
      } else {
          console.error(`Unknown tags position: ${position}`); // Si la position est inconnue, j'affiche une erreur dans la console.
      }
  },


// Méthodes de filtrage  ____________________________________________________________________________    

    filterByTag(element) {
      const tag = element.data("images-toggle");

      $(".gallery-item").each(function() {
        $(this)
          .parents(".item-column")
          .hide();
        if (tag === "all") {
          $(this)
            .parents(".item-column")
            .show(300);
        } else if ($(this).data("gallery-tag") === tag) {
          $(this)
            .parents(".item-column")
            .show(300);
        }
      });
    }
  };
})(jQuery);