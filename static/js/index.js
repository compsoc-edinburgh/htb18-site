var interested = false;
var interestedBtn = null;
var interestedEdit = null;
var interestedForm = null;

function onClick() {
	console.log("beep")
	if (interested) {
		return true;
	}

	interested = true;
	interestedBtn.text("register interest")
	interestedEdit.show();
	interestedEdit.focus();
	return false;
}

$(document).ready(function(){
	$('.parallax').parallax();

	interestedBtn = $("#mc-embedded-subscribe");
	interestedEdit = $("#mce-EMAIL");
	interestedForm = $("#mc-embedded-subscribe-form");
	if (interestedBtn && interestedEdit && interestedForm) {
		interestedForm.submit(onClick);
	}
})