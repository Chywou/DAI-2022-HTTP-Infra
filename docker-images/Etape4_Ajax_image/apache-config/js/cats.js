$(function () {
    console.log("Loading cats");

    function loadCats() {
        $.getJSON("/api", function( cats ) {
            var message = "No cats found";
            if ( cats.length > 0 ) {
                message = cats[0].prefix + " " + cats[0].firstName;
            }
            $("#cats").text(message);
        });
    }
    loadCats();
    setInterval(loadCats, 1000);
});