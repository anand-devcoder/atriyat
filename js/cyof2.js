function goToPreviousPage(url) {
    window.location.href = url;
}

function goToNextPage(url) {
    // Get all checked bottles
    const selectedBottles = Array.from(document.querySelectorAll('[data-group="bottle"] .corner-checkbox:checked')).map(cb => ({
        name: cb.dataset.value,
        img: cb.closest('.option-card').querySelector('img').getAttribute('data-img')
    }));

    // Get all checked boxes
    const selectedBoxes = Array.from(document.querySelectorAll('[data-group="box"] .corner-checkbox:checked')).map(cb => ({
        name: cb.dataset.value,
        img: cb.closest('.option-card').querySelector('img').getAttribute('data-img')
    }));

    const secondPageData = {
        bottle: selectedBottles,
        box: selectedBoxes
    };

    // Save to localStorage
    localStorage.setItem("secondPageData", JSON.stringify(secondPageData));

    // Go to next page
    window.location.href = url;
}
