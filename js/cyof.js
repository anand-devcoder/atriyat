debugger;
function updatePercentage(slider) {
    const percentageSpan = slider.nextElementSibling;
    percentageSpan.textContent = slider.value + "%";
}

// Save data to localStorage before navigating
function goToNextPage(url) {
    const selectedSize = document.querySelector('input[name="size"]:checked');
    const fragranceSliders = document.querySelectorAll('.fragrance-item input[type="range"]');

    let fragranceData = {};

    fragranceSliders.forEach(slider => {
        const name = slider.dataset.name;
        const value = slider.value;
        fragranceData[name] = value;
    });

    const firstPageData = {
        size: selectedSize ? selectedSize.value : null,
        fragrances: fragranceData
    };
debugger;
    // Save to localStorage
    localStorage.setItem("firstPageData", JSON.stringify(firstPageData));

    // Navigate to next page
    window.location.href = url;
}
