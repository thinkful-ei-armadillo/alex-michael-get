const api_key = 'WjbL0BroTOk7AnDZrrsouUfyOkMf4XHvXGWQb511';
const base_url = 'https://developer.nps.gov/api/v1/parks';

const STATES = [
    {name: 'Alabama', id: 'AL'},
    {name: 'Alaska', id: 'AK'},
    {name: 'Arizona', id: 'AZ'},
    {name: 'Arkansas', id: 'AR'},
    {name: 'California', id: 'CA'},
    {name: 'Colorado', id: 'CO'},
    {name: 'Connecticut', id: 'CT'},
    {name: 'Delaware', id: 'DE'},
    {name: 'Florida', id: 'FL'},
    {name: 'Georgia', id: 'GA'},
    {name: 'Hawaii', id: 'HI'},
    {name: 'Idaho', id: 'ID'},
    {name: 'Illinois', id: 'IL'},
    {name: 'Indiana', id: 'IN'},
    {name: 'Iowa', id: 'IA'},
    {name: 'Kansas', id: 'KS'},
    {name: 'Kentucky', id: 'KY'},
    {name: 'Louisiana', id: 'LA'},
    {name: 'Maine', id: 'ME'},
    {name: 'Maryland', id: 'MD'},
    {name: 'Massachusetts', id: 'MA'},
    {name: 'Michigan', id: 'MI'},
    {name: 'Minnesota', id: 'MN'},
    {name: 'Mississippi', id: 'MS'},
    {name: 'Missouri', id: 'MO'},
    {name: 'Montana', id: 'MT'},
    {name: 'Nebraska', id: 'NE'},
    {name: 'Nevada', id: 'NV'},
    {name: 'New Hampshire', id: 'NH'},
    {name: 'New Jersey', id: 'NJ'},
    {name: 'New Mexico', id: 'NM'},
    {name: 'New York', id: 'NY'},
    {name: 'North Carolina', id: 'NC'},
    {name: 'North Dakota', id: 'ND'},
    {name: 'Ohio', id: 'OH'},
    {name: 'Oklahoma', id: 'OK'},
    {name: 'Oregon', id: 'OR'},
    {name: 'Pennsylvania', id: 'PA'},
    {name: 'Rhode Island', id: 'RI'},
    {name: 'South Carolina', id: 'SC'},
    {name: 'South Dakota', id: 'SD'},
    {name: 'Tennessee', id: 'TN'},
    {name: 'Texas', id: 'TX'},
    {name: 'Utah', id: 'UT'},
    {name: 'Vermont', id: 'VT'},
    {name: 'Virginia', id: 'VA'},
    {name: 'Washington', id: 'WA'},
    {name: 'West Virginia', id: 'WV'},
    {name: 'Wisconsin', id: 'WI'},
    {name: 'Wyoming', id: 'WY'},
];

function renderForm(){
    const stateStringForm = STATES.map(state => {
        return `<input type="checkbox" value="${state.id}">${state.name}</input><br>`;
    }).join('');
    $('form').prepend(stateStringForm);
}

function renderResults(responseJson){
    $('.results').empty();
    for(let i=0; i<responseJson.data.length; i++){
        $('.results').append(`
        <li>
            <h2>${responseJson.data[i].fullName}</h2>
            <small><i>${responseJson.data[i].states.split(',').join(', ')}</i></small>
            <p>${responseJson.data[i].description}</p>
            <p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p>
        </li>
        `);
    };
    $('#resultSection').removeClass('hidden');
}

function handleFormSubmit(){
    $('form').submit(function(event){
        event.preventDefault();
        const maxResults = $('input[type=number]').val() - 1;
        const selectedStates = $('input[type=checkbox]:checked').map((_,idx) => $(idx).val()).get().join(',');
        getParkInfo(selectedStates, maxResults);
    });
}

function getParkInfo(query, maxResults){
    const params = {api_key, stateCode: query, limit: maxResults};
    const queryStr = formatQueryParams(params);
    const url = (base_url + '?' + queryStr);
    fetch(url).then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error(response.description);
    })
    .then(responseJson => renderResults(responseJson))
    .catch(err => {
        alert('asdf');
    });
}

function formatQueryParams(params){
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return queryItems.join('&');
}

function main(){
    renderForm();
    handleFormSubmit();
}

$(main);