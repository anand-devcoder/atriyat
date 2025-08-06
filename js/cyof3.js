
function goToNextPage(url) {
    const giftCards = Array.from(document.querySelectorAll('[data-group="giftCard"] .corner-checkbox:checked')).map(cb => ({
        name: cb.dataset.value,
        img: cb.closest('.option-card').querySelector('img').getAttribute('data-img')
    }));

    const giftWrappings = Array.from(document.querySelectorAll('[data-group="wrapping"] .corner-checkbox:checked')).map(cb => ({
        name: cb.dataset.value,
        img: cb.closest('.option-card').querySelector('img').getAttribute('data-img')
    }));

    const customCardCheckbox = document.querySelector('[data-group="customCard"] .corner-checkbox:checked');
    const customCardMessage = document.getElementById("customMessage").value;

    const thirdPageData = {
        giftCard: [],
        giftWrapping: giftWrappings,
        customCard: null,
        customMessage: ''
    };

    if (customCardCheckbox) {
        // Custom card selected – prioritize this
        thirdPageData.customCard = {
            name: customCardCheckbox.dataset.value,
            img: customCardCheckbox.closest('.option-card').querySelector('img').getAttribute('data-img')
        };
        thirdPageData.customMessage = customCardMessage;
    } else {
        // No custom card – fallback to regular gift cards
        thirdPageData.giftCard = giftCards;
    }
debugger;
    localStorage.setItem("thirdPageData", JSON.stringify(thirdPageData));
    window.location.href = url;
}
