$(document).ready(function() {

window.showToast = function(message) {
    var $toast = $('<div class="toast-item"><i class="bi bi-check-circle-fill text-success me-2"></i>' + message + '</div>');
    $('#toast-container').append($toast);
    

    $toast.stop(true, true).fadeIn(300).delay(2500).fadeOut(400, function() {
        $(this).remove();
    });
};



$('.copy-btn').off('click').on('click', function (e) {
    e.preventDefault();

    var $btn = $(this);
    var targetSelector = $btn.attr('data-target');
    var textToCopy = '';

    if (targetSelector) {
        textToCopy = $(targetSelector).text().trim();
    }

    // Support code snippet buttons too
    if (!textToCopy) {
        textToCopy = $btn.siblings('.code-snippet').text().trim();
    }

    if (!textToCopy) {
        showToast('Nothing to copy!');
        return;
    }

    if (!navigator.clipboard) {
        showToast('Clipboard is not available. Use HTTPS or localhost.');
        return;
    }

    navigator.clipboard.writeText(textToCopy)
        .then(function () {

            var originalHtml = $btn.html();

            $btn.html('<i class="bi bi-check-lg"></i>')
                .removeClass('btn-outline-secondary btn-outline-danger')
                .addClass('btn-success');

            var $tooltip = $btn.siblings('.copy-tooltip');
            $tooltip.stop(true, true).text('Copied!').fadeIn(200);

            showToast('Copied successfully!');

            setTimeout(function () {
                $btn.html(originalHtml)
                    .removeClass('btn-success')
                    .addClass('btn-outline-secondary');

                $tooltip.fadeOut(200);
            }, 2000);

        })
        .catch(function () {
            showToast('Copy failed. Please try again.');
        });
});


    

    $('#ratingContainer .star-icon').on('mouseenter', function() {
        var hoverVal = $(this).data('value');
        $('#ratingContainer .star-icon').each(function() {
            if ($(this).data('value') <= hoverVal) {
                $(this).removeClass('text-muted').addClass('text-warning');
            } else {
                $(this).removeClass('text-warning').addClass('text-muted');
            }
        });
    });


    $('#ratingContainer').on('mouseleave', function() {
        var currentRating = $('#ratingValue').val();
        $('#ratingContainer .star-icon').each(function() {
            if ($(this).data('value') <= currentRating) {
                $(this).removeClass('text-muted').addClass('text-warning');
            } else {
                $(this).removeClass('text-warning').addClass('text-muted');
            }
        });
    });


    $('#ratingContainer .star-icon').on('click', function() {
        var selectedVal = $(this).data('value');
        $('#ratingValue').val(selectedVal);
        

        if (typeof showToast === 'function') {
            showToast('You rated: ' + selectedVal + ' out of 5');
        }


        $(this).css('transform', 'scale(1.3)');
        var $star = $(this);
        setTimeout(function() {
            $star.css('transform', 'scale(1)');
        }, 200);
    });


   $('#resetFormBtn').on('click', function() {

    const form = $('#contact-form, #contactForm').first()[0];

    if (form) {
        form.reset();
    }

    $('#ratingValue').val(0);

    $('#ratingContainer .star-icon')
        .removeClass('text-warning')
        .addClass('text-muted');

    $('#successMessage').addClass('d-none');

    showToast('Form cleared');
});
    // TASK 0: Setup check
    console.log("jQuery is ready!");

    // TASK 4: Scroll Progress Bar
    $(window).on('scroll', function() {
        var winScroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var scrolled = (winScroll / height) * 100;
        $('#scroll-progress').css('width', scrolled + '%');
    });



    // TASK 9: Image Lazy Loading
    function lazyLoad() {
        var windowBottom = $(window).scrollTop() + $(window).height();

        $('.lazy-img').each(function() {
            var $img = $(this);
            if (!$img.hasClass('loaded')) {
                var imgTop = $img.offset().top;
                if (imgTop < windowBottom + 100) {
                    var realSrc = $img.attr('data-src');
                    if (realSrc) {
                        $img.attr('src', realSrc).addClass('loaded');
                    }
                }
            }
        });
    }
    $(window).on('scroll resize', lazyLoad);
    lazyLoad();

    // TASK 6: Loading Spinner on Submit (Contact Form)
    $('#contact-form, #contactForm').on('submit', function(e) {
        e.preventDefault();
        var $form = $(this);
        var $submitBtn = $form.find('button[type="submit"]');
        var $spinner = $submitBtn.find('.spinner-border');


        $submitBtn.prop('disabled', true);
        $spinner.removeClass('d-none');
        

        setTimeout(function() {
            $spinner.addClass('d-none');
            $submitBtn.prop('disabled', false);
            $('#successMessage').removeClass('d-none');
            showToast('Form submitted successfully!');
            $form[0].reset();
            $('#ratingValue').val(0);
$('#ratingContainer .star-icon')
    .removeClass('text-warning')
    .addClass('text-muted');
        }, 1500);
    });
});