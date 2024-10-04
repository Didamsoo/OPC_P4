!function(t){t.fn.mauGallery=function(e){let a=t.extend(t.fn.mauGallery.defaults,e),l=[];return this.each(function(){t.fn.mauGallery.methods.createRowWrapper(t(this)),a.lightBox&&t.fn.mauGallery.methods.createLightBox(t(this),a.lightboxId,a.navigation),t.fn.mauGallery.listeners(a),t(this).children(".gallery-item").each(function(){t.fn.mauGallery.methods.responsiveImageItem(t(this)),t.fn.mauGallery.methods.moveItemInRowWrapper(t(this)),t.fn.mauGallery.methods.wrapItemInColumn(t(this),a.columns);let e=t(this).data("gallery-tag");a.showTags&&void 0!==e&&-1===l.indexOf(e)&&l.push(e)}),a.showTags&&t.fn.mauGallery.methods.showItemTags(t(this),a.tagsPosition,l),t(this).fadeIn(150)})},t.fn.mauGallery.defaults={columns:3,lightBox:!0,lightboxId:null,showTags:!0,tagsPosition:"top",navigation:!0},t.fn.mauGallery.listeners=function(e){t(".gallery-item").on("click",function(){e.lightBox&&"IMG"===t(this).prop("tagName")&&t.fn.mauGallery.methods.openLightBox(t(this),e.lightboxId)}),t(".gallery").on("click",".mg-prev",()=>t.fn.mauGallery.methods.prevImage(e.lightboxId)),t(".gallery").on("click",".mg-next",()=>t.fn.mauGallery.methods.nextImage(e.lightboxId)),t(".gallery").on("click",".nav-link",function(e){e.preventDefault(),t.fn.mauGallery.methods.filterByTag(t(this))}),t(".nav-link").on("click",function(){t(".nav-link").removeClass("active-tag"),t(this).addClass("active-tag")})},t.fn.mauGallery.methods={createRowWrapper(t){t.children().first().hasClass("row")||t.append('<div class="gallery-items-row row"></div>')},wrapItemInColumn(t,e){if(e.constructor===Number)t.wrap(`<div class='item-column mb-4 col-${Math.ceil(12/e)}'></div>`);else if(e.constructor===Object){let a="";e.xs&&(a+=` col-${Math.ceil(12/e.xs)}`),e.sm&&(a+=` col-sm-${Math.ceil(12/e.sm)}`),e.md&&(a+=` col-md-${Math.ceil(12/e.md)}`),e.lg&&(a+=` col-lg-${Math.ceil(12/e.lg)}`),e.xl&&(a+=` col-xl-${Math.ceil(12/e.xl)}`),t.wrap(`<div class='item-column mb-4${a}'></div>`)}else console.error(`Columns should be defined as numbers or objects. ${typeof e} is not supported.`)},moveItemInRowWrapper(t){t.appendTo(".gallery-items-row")},responsiveImageItem(t){"IMG"===t.prop("tagName")&&t.addClass("img-fluid")},openLightBox(e,a){t(`#${a}`).find(".lightboxImage").attr("src",e.attr("src")),t(`#${a}`).modal("toggle")},prevImage(e){let a=null;t("img.gallery-item").each(function(){t(this).attr("src")===t(`#${e} .lightboxImage`).attr("src")&&(a=t(this))});let l=[];t(".gallery-item").each(function(){l.push(t(this))});let i=0;t(l).each(function(e){t(a).attr("src")===t(this).attr("src")&&(i=e-1)}),i<0&&(i=l.length-1),t(`#${e} .lightboxImage`).attr("src",t(l[i]).attr("src"))},nextImage(e){let a=null;t("img.gallery-item").each(function(){t(this).attr("src")===t(`#${e} .lightboxImage`).attr("src")&&(a=t(this))});let l=[];t(".gallery-item").each(function(){l.push(t(this))});let i=0;t(l).each(function(e){t(a).attr("src")===t(this).attr("src")&&(i=e+1)}),i>=l.length&&(i=0),t(`#${e} .lightboxImage`).attr("src",t(l[i]).attr("src"))},createLightBox(t,e,a){t.append(`
        <div class="modal fade" id="${e||"galleryLightbox"}" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-body">
                ${a?'<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>':'<span style="display:none;" />'}
                <img class="lightboxImage img-fluid" alt="Contenu de l'image affich\xe9e dans la modale au clique"/>
                ${a?'<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;">></div>':'<span style="display:none;" />'}
              </div>
            </div>
          </div>
        </div>
      `)},showItemTags(e,a,l){let i='<li class="nav-item"><span class="nav-link" data-images-toggle="all">Tous</span></li>';t.each(l,function(t,e){i+=`<li class="nav-item"><span class="nav-link" data-images-toggle="${e}">${e}</span></li>`});let s=`<ul class="my-4 tags-bar nav nav-pills">${i}</ul>`;"bottom"===a?e.append(s):"top"===a?e.prepend(s):console.error(`Unknown tags position: ${a}`)},filterByTag(e){let a=e.data("images-toggle");t(".gallery-item").each(function(){t(this).parents(".item-column").hide(),"all"===a?t(this).parents(".item-column").show(150):t(this).data("gallery-tag")===a&&t(this).parents(".item-column").show(150)})}}}(jQuery);