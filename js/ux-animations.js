$(document).ready(function () {
    function updateScrollProgress() {
        const scrollTop = $(window).scrollTop();
        const documentHeight = $(document).height();
        const windowHeight = $(window).height();
        const scrollableHeight = documentHeight - windowHeight;

        let progress = 0;

        if (scrollableHeight > 0) {
            progress = (scrollTop / scrollableHeight) * 100;
        }

        $("#scrollProgress").css("width", progress + "%");
    }

    $(window).on("scroll resize", updateScrollProgress);
    updateScrollProgress();

    $(".counter").each(function () {
        const counter = $(this);
        const target = Number(counter.attr("data-count"));

        counter.prop("Counter", 0);

        counter.animate(
            { Counter: target },
            {
                duration: 2000,
                easing: "swing",
                step: function (now) {
                    counter.text(Math.ceil(now));
                },
                complete: function () {
                    counter.text(target);
                }
            }
        );
    });
});