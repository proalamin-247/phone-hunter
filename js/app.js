// get all Element by ID 
const searchField = document.getElementById('search-filed');
const searchText = searchField.value;
const wrongMessage = document.getElementById('wrongInputMessage');
const searchResult = document.getElementById('search-result');
const gadgetDetailsArea = document.getElementById('phone-details');
const getSearchResultCount = document.getElementById('searchResultCount');

// call api by searchFiled value
const searchPhone = () => {
    const searchField = document.getElementById('search-filed');
    const searchText = searchField.value;

    //clear input value
    searchField.value = '';

    if (searchText == ''){
        wrongMessage.style.display = 'block';
        notFoundMessage.style.display = 'none';
        gadgetDetailsArea.innerHTML = '';
        searchResult.innerHTML = '';
        getSearchResultCount.innerHTML = '';
    }
    else{
        wrongMessage.style.display = 'none';
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data.slice(0, 20)));
    }
}

// display search result (20)
const displaySearchResult = (gadgets) => {
    getSearchResultCount.innerHTML=`
    getSearchResultCount.style.display = 'block';
    ${gadgets.length}
    `;

    // error handale message
    if(searchText == gadgets){
        notFoundMessage.style.display = 'block';
        searchResult.innerHTML = '';
        getSearchResultCount.style.display = 'none';
        gadgetDetailsArea.innerHTML = '';
    }

    else{
        // clear dispaly
        searchResult.innerHTML = '';
        gadgetDetailsArea.innerHTML = '';
        notFoundMessage.style.display = 'none';
        getSearchResultCount.style.display = 'block';

        gadgets.forEach(gadget => {
            getSearchResultCount.innerHTML = `
            Display total Device : ${gadgets.length}
            `;

            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
                <img src="${gadget.image}" class="card-img-top img-fluid w-50 mx-auto p-3" alt="...">
                <div class="card-body">
                <h5 class="card-title">${gadget.phone_name}</h5>
                <p class="card-text">Brand: ${gadget.brand}</p>
                
                </div>
                <div onclick= "phoneDetails('${gadget.slug}')" class="btn btn-info">More Details</div> 
            </div>
            `;
            searchResult.appendChild(div);
        })
    }
}


// singale phone details area 
const phoneDetails = gadgetId => {
    const url = `https://openapi.programming-hero.com/api/phone/${gadgetId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data));
}

const displayPhoneDetails = gadgetDetails =>{

    gadgetDetailsArea.innerHTML = `
    <div class="card m-5" >
        <img   src="${gadgetDetails.image}" class="card-img-top img-fluid w-auto mx-auto p-3" alt="...">
        <div class="card-body p-2">
            <h5 class="card-title text-center">${gadgetDetails.name} Full Specifications</h5>
            <p class="card-text"><span class="fw-bold">Brand: </span>${gadgetDetails.brand}</p>
            <p class="card-text"><span class="fw-bold">Release Date: </span>${gadgetDetails.releaseDate ? gadgetDetails.releaseDate :`<p class="text-danger">Not yet, as soon as release data will be announced</p>`}</p>
            <hr>
            <h4>Main Fetures</h4>
            <p class="card-text"><span class="fw-bold">ChipSet: </span>${gadgetDetails.mainFeatures.chipSet}</p>
            <p class="card-text"><span class="fw-bold">DisplaySize: </span>${gadgetDetails.mainFeatures.displaySize}</p>
            <p class="card-text"><span class="fw-bold">Memory: </span>${gadgetDetails.mainFeatures.memory}</p>
            <p class="card-text"><span class="fw-bold">Storage: </span>${gadgetDetails.mainFeatures.storage}</p>
            <hr>
            <h4>Sensors</h4>
            <p class="card-text"> ${gadgetDetails.mainFeatures.sensors[0]},
            ${gadgetDetails.mainFeatures.sensors[1]},
            ${gadgetDetails.mainFeatures.sensors[2]},
            ${gadgetDetails.mainFeatures.sensors[3]},
            ${gadgetDetails.mainFeatures.sensors[4]},
            ${gadgetDetails.mainFeatures.sensors[5]}</p>
            <hr>
            <h4>Others</h4>
            <p class="card-text"><span class="fw-bold">Bluetooth: </span>${gadgetDetails.others?.Bluetooth ? gadgetDetails.others.Bluetooth : `<h6 class="text-danger">No have others feature (Bluetooth)</h6>`}</p>
            <p class="card-text"><span class="fw-bold">GPS: </span>${gadgetDetails.others?.GPS ? gadgetDetails.others.GPS : `<h6 class="text-danger">No have others feature (GPS)</h6>`}</p>
            <p class="card-text"><span class="fw-bold">NFC: </span>${gadgetDetails.others?.NFC ? gadgetDetails.others.NFC : `<h6 class="text-danger">No have others feature (NFC)</h6>`}</p>
            <p class="card-text"><span class="fw-bold">Radio: </span>${gadgetDetails.others?.Radio ? gadgetDetails.others.Radio : `<h6 class="text-danger">No have others feature (Radio)</h6>`}</p>
            <p class="card-text"><span class="fw-bold">USB: </span>${gadgetDetails.others?.USB ? gadgetDetails.others.USB :`<h6 class="text-danger">No have others feature (USB)</h6>`}</p>
            <p class="card-text"><span class="fw-bold">WLAN: </span>${gadgetDetails.others?.WLAN ? gadgetDetails.others.WLAN :`<h6 class="text-danger">No have others feature (WAN)</h6>`}</p>
        </div>
    </div>
    `;
    window.scrollTo(0, 0);
}

