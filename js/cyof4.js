
window.addeventlistener("domcontentloaded", () => {
    const firstpagedata = json.parse(localstorage.getitem("firstpagedata"));
    const secondpagedata = json.parse(localstorage.getitem("secondpagedata"));
    const thirdpagedata = json.parse(localstorage.getitem("thirdpagedata"));
    
     const summarydiv = document.getelementbyid("summarydata");

    let html = "";

    // ✅ first page summary
    if (firstpagedata) {
        html += `<h3 class="text-2xl font-bold mb-2">selected size:</h3>`;
        html += `<p>${firstpagedata.size || 'not selected'}</p>`;

         html += `<h3 class="text-2xl font-bold mt-4 mb-2">fragrance mix:</h3><ul>`;
         for (let [name, value] of object.entries(firstpagedata.fragrances || {})) {
             html += `<li>${name}: ${value}%</li>`;
         }
         html += `</ul>`;
     }

    // ✅ second page summary
    if (secondpagedata) {
        html += `<h3 class="text-2xl font-bold mt-6 mb-2">selected bottle(s):</h3>`;
        if (secondpagedata.bottle.length > 0) {
            html += `<ul>` + secondpagedata.bottle.map(item =>
                `<li>${item.name} <img src="${item.img}" width="50" style="display:inline-block; vertical-align:middle;"></li>`
            ).join('') + `</ul>`;
        } else {
            html += `<p>none selected</p>`;
        }

         html += `<h3 class="text-2xl font-bold mt-4 mb-2">selected box(es):</h3>`;
         if (secondpagedata.box.length > 0) {
             html += `<ul>` + secondpagedata.box.map(item =>
                 `<li>${item.name} <img src="${item.img}" width="50" style="display:inline-block; vertical-align:middle;"></li>`
             ).join('') + `</ul>`;
         } else {
             html += `<p>none selected</p>`;
         }
     }

     // ✅ third page summary
     if (thirdpagedata) {
         if (thirdpagedata.customcard) {
             html += `<h3 class="text-2xl font-bold mt-6 mb-2">custom card:</h3>`;
             html += `<p>${thirdpagedata.customcard.name} <img src="${thirdpagedata.customcard.img}" width="50" style="display:inline-block; vertical-align:middle;"></p>`;
             html += `<p><strong>message:</strong> ${thirdpagedata.custommessage}</p>`;
         } else {
             html += `<h3 class="text-2xl font-bold mt-6 mb-2">gift card(s):</h3>`;
             if (thirdpagedata.giftcard.length > 0) {
                 html += `<ul>` + thirdpagedata.giftcard.map(item =>
                     `<li>${item.name} <img src="${item.img}" width="50" style="display:inline-block; vertical-align:middle;"></li>`
                 ).join('') + `</ul>`;
             } else {
                 html += `<p>none selected</p>`;
             }
         }

         html += `<h3 class="text-2xl font-bold mt-4 mb-2">gift wrapping:</h3>`;
         if (thirdpagedata.giftwrapping.length > 0) {
             html += `<ul>` + thirdpagedata.giftwrapping.map(item =>
                 `<li>${item.name} <img src="${item.img}" width="50" style="display:inline-block; vertical-align:middle;"></li>`
             ).join('') + `</ul>`;
         } else {
             html += `<p>none selected</p>`;
         }
     }

     summarydiv.innerhtml = html;
 });