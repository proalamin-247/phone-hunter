// call api by search filed value
const searchPhone = () => {
    const searchField = document.getElementById('search-filed');
    const searchText = searchField.value;

    //clear input value
    searchField.value = '';

    if (searchText == '' || null || undefined){
        wrongMessage.style.display = 'block';
        // notFoundMessage.style.display = 'none';
    }
    else{
        wrongMessage.style.display = 'none';
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data));
    }
}
const searchField = document.getElementById('search-filed');
const searchText = searchField.value;


const wrongMessage = document.getElementById('wrongInputMessage');
const searchResult = document.getElementById('search-result');
const phoneDetailsArea = document.getElementById('phone-details');

// display search result 
const displaySearchResult = (phones) => {
    
    if(searchText == phones){
        notFoundMessage.style.display = 'block';
        searchResult.innerHTML = '';
    }

    else{
        searchResult.innerHTML = '';
        phoneDetailsArea.innerHTML = '';
        notFoundMessage.style.display = 'none';

        phones.forEach(phone => {
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
            <p class="card-text">Brand: ${phoneDetails.brand}</p>
            <p class="card-text">Release Date: ${phoneDetails.releaseDate}</p>
            <hr>
            <h5>Main Fetures</h5>
            <p class="card-text">chipSet: ${phoneDetails.mainFeatures.chipSet}</p>
            <p class="card-text">displaySize: ${phoneDetails.mainFeatures.displaySize}</p>
            <p class="card-text">memory: ${phoneDetails.mainFeatures.memory}</p>
            <p class="card-text">storage: ${phoneDetails.mainFeatures.storage}</p>
            <hr>
            <h5>Sensors</h5>
            <p class="card-text"> ${phoneDetails.mainFeatures.sensors[0]},
            ${phoneDetails.mainFeatures.sensors[1]},
            ${phoneDetails.mainFeatures.sensors[2]},
            ${phoneDetails.mainFeatures.sensors[3]},
            ${phoneDetails.mainFeatures.sensors[4]},
            ${phoneDetails.mainFeatures.sensors[5]}</p>
            <hr>
            <h5>Others</h5>
            <p class="card-text">Bluetooth: ${phoneDetails.others.Bluetooth}</p>
            <p class="card-text">GPS: ${phoneDetails.others.GPS}</p>
            <p class="card-text">NFC: ${phoneDetails.others.NFC}</p>
            <p class="card-text">Radio: ${phoneDetails.others.Radio}</p>
            <p class="card-text">USB: ${phoneDetails.others.USB}</p>
            <p class="card-text">WLAN: ${phoneDetails.others.WLAN}</p>
        </div>
    </div>
    `;
    window.scrollTo(0, 0);
}
