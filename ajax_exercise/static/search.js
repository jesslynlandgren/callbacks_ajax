$(document).ready(function () {
    $('#search-form').submit(function(event){
        event.preventDefault();
        var queryparam = $(this).serialize();
        $.get('/search', queryparam, function gotData(data){
            data.forEach(function(result){
                $('#result-list').append('<li>' + result.title + '</li');
            });
        });
    });
});
