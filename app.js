var searchTerm = $("#search-term").val();
var numberOfRecords = $("#records").val();
var startDate = "";
var endDate = "";
var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&api-key=FDAAvnw2YLNSIgKeB6y6kT9vytThLuMx";
if ($("#start-year").val().length !== 0) {
    startDate = $("#start-year").val();
    startDate = startDate + "0101";
    queryURL = queryURL + "&begin_date=" + startDate;
}
if ($("#end-year").val().length !== 0) {
    endDate = $("#end-year").val();
    endDate = endDate + "1231";
    queryURL = queryURL + "&end_date=" + endDate;
}
$.ajax({
    url: queryURL,
    method: "GET"
})
    .then(function (response) {
        var results = response.docs;
        for (var i = 0; i < results.length; i++) {
            var articleDiv = $("<div>");
            var h = $("<h3>");
            var p = $("<p>");
            h.text(results[i].snippet);
            h.attr("src", results[i].web_url)
            p.text(results[i].lead_paragraph);
            articleDiv.append(h);
            articleDiv.append(p);
            $("#input.articles").prepend(articleDiv);
        }
    });