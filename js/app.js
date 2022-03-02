// get all Element by ID 
const searchField = document.getElementById('search-filed');
const searchText = searchField.value;
const wrongMessage = document.getElementById('wrongInputMessage');
const searchResult = document.getElementById('search-result');
const phoneDetailsArea = document.getElementById('phone-details');
const getSearchResultCount = document.getElementById('searchResultCount');

// call api by search filed value
const searchPhone = () => {
    const searchField = document.getElementById('search-filed');
    const searchText = searchField.value;

    //clear input value
    searchField.value = '';

    if (searchText == ''){
        wrongMessage.style.display = 'block';
        notFoundMessage.style.display = 'none';
        phoneDetailsArea.innerHTML = '';
        searchResult.innerHTML = '';
        getSearchResultCount.innerHTML = '';
    }
    else{
        wrongMessage.style.display = 'none';
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            // .then(data => displaySearchResult(data.data));
            .then(data => displaySearchResult(data.data.slice(0, 20)));
    }
}

// display search result 
const displaySearchResult = (phones) => {
    getSearchResultCount.innerHTML=`
    getSearchResultCount.style.display = 'block';
    ${phones.length}
    `;

    // error handale message
    if(searchText == phones){
        notFoundMessage.style.display = 'block';
        searchResult.innerHTML = '';
        getSearchResultCount.style.display = 'none';
        phoneDetailsArea.innerHTML = '';
    }

    else{
        // clear dispaly
        searchResult.innerHTML = '';
        phoneDetailsArea.innerHTML = '';
        notFoundMessage.style.display = 'none';
        getSearchResultCount.style.display = 'block';

        phones.forEach(phone => {
            getSearchResultCount.innerHTML = `
            Display total Device : ${phones.length}
            `;

            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
                <img src="${phone.image}" class="card-img-top img-fluid w-50 mx-auto p-3" alt="...">
                <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">Brand: ${phone.brand}</p>
                
                </div>
                <div onclick= "phoneDetails('${phone.slug}')" class="btn btn-info">More Details</div> 
            </div>
            `;
            searchResult.appendChild(div);
        })
    }
}


// singale phone details area 
const phoneDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data));
}

const displayPhoneDetails = phoneDetails =>{

    phoneDetailsArea.innerHTML = `
    <div class="card m-5" >
        <img   src="${phoneDetails.image}" class="card-img-top img-fluid w-auto mx-auto p-3" alt="...">
        <div class="card-body p-2">
            <h5 class="card-title text-center">${phoneDetails.name} Full Specifications</h5>
            <p class="card-text"><span class="fw-bold">Brand: </span>${phoneDetails.brand}</p>
            <p class="card-text"><span class="fw-bold">Release Date: </span>${phoneDetails.releaseDate ? phoneDetails.releaseDate :`<p class="text-danger">Not yet, as soon as release data will be announced</p>`}</p>
            <hr>
            <h4>Main Fetures</h4>
            <p class="card-text"><span class="fw-bold">ChipSet: </span>${phoneDetails.mainFeatures.chipSet}</p>
            <p class="card-text"><span class="fw-bold">DisplaySize: </span>${phoneDetails.mainFeatures.displaySize}</p>
            <p class="card-text"><span class="fw-bold">Memory: </span>${phoneDetails.mainFeatures.memory}</p>
            <p class="card-text"><span class="fw-bold">Storage: </span>${phoneDetails.mainFeatures.storage}</p>
            <hr>
            <h4>Sensors</h4>
            <p class="card-text"> ${phoneDetails.mainFeatures.sensors[0]},
            ${phoneDetails.mainFeatures.sensors[1]},
            ${phoneDetails.mainFeatures.sensors[2]},
            ${phoneDetails.mainFeatures.sensors[3]},
            ${phoneDetails.mainFeatures.sensors[4]},
            ${phoneDetails.mainFeatures.sensors[5]}</p>
            <hr>
            <h4>Others</h4>
            <p class="card-text"><span class="fw-bold">Bluetooth: </span>${phoneDetails.others.Bluetooth}</p>
            <p class="card-text"><span class="fw-bold">GPS: </span>${phoneDetails.others.GPS}</p>
            <p class="card-text"><span class="fw-bold">NFC: </span>${phoneDetails.others.NFC}</p>
            <p class="card-text"><span class="fw-bold">Radio: </span>${phoneDetails.others.Radio}</p>
            <p class="card-text"><span class="fw-bold">USB: </span>${phoneDetails.others.USB}</p>
            <p class="card-text"><span class="fw-bold">WLAN: </span>${phoneDetails.others.WLAN}</p>
        </div>
    </div>
    `;
    window.scrollTo(0, 0);
}

