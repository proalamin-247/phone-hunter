// call api by search filed value
const searchPhone = () => {
    const searchField = document.getElementById('search-filed');
    const searchText = searchField.value;

    //clear input value
    searchField.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data));

}

// display search result 
const displaySearchResult = (phones) => {
    const searchResult = document.getElementById('search-result');

    phones.forEach(phone => {

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 w-50">
            <img src="${phone.image}" class="card-img-top" alt="...">
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
