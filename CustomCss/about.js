/**
 * @description Change Home page slider's arrows active status
 */
function updateSliderArrowsStatus(
    cardsContainer,
    containerWidth,
    cardCount,
    cardWidth
) {
    if ($(cardsContainer).scrollLeft() + containerWidth < cardCount * cardWidth + 15) {
        $("#slide-right-container").addClass("active");
    } else {
        $("#slide-right-container").removeClass("active");
    }
    if ($(cardsContainer).scrollLeft() > 0) {
        $("#slide-left-container").addClass("active");
    } else {
        $("#slide-left-container").removeClass("active");
    }
}

$(function () {
    // Scroll products' slider left/right
    let div = $("#cards-container");
    let cardCount = $(div).find(".cards").children(".card21").length;
    let speed = 500;
    let containerWidth = $(".container21").width();
    let cardWidth = 250;
    let autoplayInterval;

    updateSliderArrowsStatus(div, containerWidth, cardCount, cardWidth);

    // Remove scrollbars
    $("#slide-right-container").click(function () {
        moveSliderRight();
    });

    $("#slide-left-container").click(function () {
        moveSliderLeft();
    });

    function moveSliderRight() {
        $(div).animate(
            {
                scrollLeft: $(div).scrollLeft() + cardWidth
            },
            {
                duration: speed,
                complete: function () {
                    updateSliderArrowsStatus(div, containerWidth, cardCount, cardWidth);
                    checkSliderEnd();
                }
            }
        );
    }

    function moveSliderLeft() {
        $(div).animate(
            {
                scrollLeft: $(div).scrollLeft() - cardWidth
            },
            {
                duration: speed,
                complete: function () {
                    updateSliderArrowsStatus(div, containerWidth, cardCount, cardWidth);
                    checkSliderEnd();
                }
            }
        );
    }

    function checkSliderEnd() {
        // Check if reached the end of the slider
        if ($(div).scrollLeft() + containerWidth >= cardCount * cardWidth) {
            // Move to the first card instantly (for infinite loop)
            $(div).scrollLeft(0);
        } else if ($(div).scrollLeft() <= 0) {
            // Move to the last card instantly (for infinite loop)
            $(div).scrollLeft(cardCount * cardWidth);
        }
    }

    // Autoplay functionality
    function startAutoplay() {
        autoplayInterval = setInterval(function () {
            moveSliderRight();
        }, 3000); // Adjust the interval (in milliseconds) based on your preference
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Start autoplay when the page loads
    startAutoplay();

    // Handle mouseenter and mouseleave events to stop autoplay on hover
    $("#cards-container").on("mouseenter", stopAutoplay).on("mouseleave", startAutoplay);

    // If resize action occurred then update the container width value
    $(window).resize(function () {
        try {
            containerWidth = $("#cards-container").width();
            updateSliderArrowsStatus(div, containerWidth, cardCount, cardWidth);
        } catch (error) {
            console.log(
                `Error occurred while trying to get updated slider container width: 
              ${error}`
            );
        }
    });
});
 