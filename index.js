const YOUTUBE_SEARCH_API = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_CLIENT_ID = 'AIzaSyBovnEGsMxB0EFHIy7Y8ew8PurY__Ja-EE';


function getDataFromApi (searchTerm, callback) {
	let q = $(`.js-input`).val()
	const query = {
	q: q,
	maxResults: 10,
	part: 'snippet',
	key: YOUTUBE_CLIENT_ID,
	}
 	$.getJSON(YOUTUBE_SEARCH_API, query, callback);
}

function renderResults (item) {
	return `<div>
				<a class="js-videoReturnTitle" href="https://www.youtube.com/watch?v=${item.id.videoId}" target="blank_">${item.snippet.title}</a> Video:
				<iframe title="${item.snippet.title}" type="text/html"class="js-videoReturnVideoId" src="https://www.youtube.com/embed/${item.id.videoId}" target="blank_" width="240" height="160"><img src="${item.snippet.thumbnails.default.url}"></iframe>
				<p>Check out related videos here:<a class="js-relatedVideos" href="https://www.youtube.com/watch?v=${item.id.videoId}&list=${item.snippet.channelId}">Click Here For More</a></p>
			</div>`
}

function displayYouTubeResults (data) {
	console.log(data)
	let results = data.items.map((item,index) =>
		renderResults(item));
	$(`.js-searchResults`).html(results)
}

function renderNextPrevButtons () {
	return `<button class="js-prevButton">Previous</button>
			<button class="js-nextButton">Next</button>`
	
}

function displayNextPrevButtons () {
	query.push({nextPageToken: "CAoQAA"});
	$(`.js-searchResults`).html(renderNextPrevButtons)
}

function addNextPrevToken () {
	$(`.js-searchContainer`).on('click', 'js-nextButton', function () {
		getDataFromApi(query, displayNextPrevButtons)
	})
	
}

function watchSubmitResults () {
	$(`.js-searchContainer`).on('submit', '.js-searchForm', function (event) {
		event.preventDefault();
		const query = $(`.js-input`).val();
		getDataFromApi(query, displayYouTubeResults);
	});
}

$(watchSubmitResults);
$(addNextPrevToken);
