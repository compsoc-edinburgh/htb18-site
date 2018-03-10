var events = $(".timeline-event");

for (i = events.length - 1; i > 0; i--) {
	if ($(events[i]).data("time") <= getTime()) {
		$("body").scrollTop($(events[i]).position().top);
	};
	console.log("scrolled");
};


