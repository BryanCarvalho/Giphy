//js on page load

$(document).ready(function () {
    populateButtons(topics, 'nineties-button', '#nineties-buttons');
    console.log("test");
});

// array of topics - nineties cartoons

let topics = ["Street Sharks", "Biker Mice from Mars", "Captain Planet", "Gargoyles", "Rugrats", "The Tick", "Daria", "Rocko's Modern Life", "Sonic the Hedgehog", "Reboot"];

// function that populates and appends buttons

function populateButtons(topics, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    for (let i = 0; i < topics.length; i++) {
        let a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type', topics[i]);
        a.text(topics[i]);
        $(areaToAddTo).append(a);
    }
};


$(document).on('click', '.nineties-button', function () {
    $('#gif-here').empty();
    let type = $(this).data('type');
    let queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=dc6zaTOxFJmzC&limit=10';

    // ajax request

    $.ajax({ url: queryURL, method: 'GET' })
        .done(function (response) {
            console.log(response);
            for (let i = 0; i < response.data.length; i++) {
                let ninetiesDiv = $('<div class=\"nineties-item\">');
                let rating = response.data[i].rating;
                let p = $('<p class="neon-1">').text('Rating: ' + rating);
                let animated = response.data[i].images.fixed_height.url;
                let still = response.data[i].images.fixed_height_still.url;
                let image = $('<img>');
                image.attr('src', still);
                image.attr('data-still', still);
                image.attr('data-animated', animated);
                image.attr('data-state', 'still');
                image.addClass('ninetiesImage');
                ninetiesDiv.append(p);
                ninetiesDiv.append(image);
                $('#gif-here').append(ninetiesDiv);
            }
        });

});

$(document).on('click', '.ninetiesImage', function () {
    let state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});



$('#add-nineties').on('click', function () {
    let newNineties = $('input').eq(0).val();
    topics.push(newNineties);
    populateButtons(topics, 'nineties-button', '#nineties-buttons');
    return false;
})