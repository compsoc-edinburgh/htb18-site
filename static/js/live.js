---
---
var timer;
function checkMouseMove() {
    // if (timer) {
    //     clearTimeout(timer);
    //     timer = 0;
    // }

    // $('nav').fadeIn();

    // if (window.location.hash == "#stream") {
    //     timer = setTimeout(function() {
    //         $('nav').fadeOut()
    //     }, 3000)
    // }
}

var deadline;
function getTimeRemaining(){
    var t = Date.parse(deadline) - Date.parse(new Date());
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    return {
        'total': t,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function updateClock(clock){
    var t = getTimeRemaining();

    if (t.total >= 0) {
        var hours = clock.find('#countdown-hours');
        var minutes = clock.find('#countdown-minutes');
        var seconds = clock.find('#countdown-seconds');
        hours.text(('0' + t.hours).slice(-2));
        minutes.text(('0' + t.minutes).slice(-2));
        seconds.text(('0' + t.seconds).slice(-2));
    } else {
        $("#countdown").html("&nbsp;")
        $("#countdown-name").html("&nbsp;")
    }
}

function updateDeadline(d, t) {
    deadline = d;
    $("#countdown").html('<span id="countdown-hours"></span>:<span id="countdown-minutes"></span>:<span id="countdown-seconds"></span>');
    $("#countdown-name").text(t)
    updateClock($("#countdown"))
}

var notification;
function announceText(t, noNotif) {
    var obj = $("#announce-text");
    obj.fadeOut();
    if (t !== "") {
        setTimeout(() => {
            obj.html(t);
            obj.fadeIn();

            if (!noNotif) {
                if (!("Notification" in window)) {
                    console.log("This browser does not support desktop notification");
                }
                else if (Notification.permission === "granted") {
                    // If it's okay let's create a notification
                    if (notification != null) {
                        notification.close()
                    }

                    notification = new Notification("Hack the Burgh", {
                        icon: "{{ site.baseurl }}/static/img/logo-htb-print.png",
                        body: t,
                    });

                    notification.onclick = function() {
                        window.focus();
                        notification.close();
                    }
                }
            }

        }, 400)
    }
}

window.onbeforeunload = () => {
    if (notification != null) {
        notification.close()
    }
}

var startWebsocket;
var first = true;
var msg = ""
function startWebsocket(){
    var sock = new WebSocket("wss://hacktheburgh.com/stream/ws");
    
    sock.onmessage = (event) => {
        if (event.data === "refresh") {
            location.reload();
            return;
        }

        if (msg === event.data) {
            return;
        }
        msg = event.data;
        
        announceText(event.data, first);

        if (first) {
            first = false;
        }
    }
    sock.onclose = function(){
        //try to reconnect in 5 seconds
        setTimeout(startWebsocket, 5000);
    };
}

$(document).ready(function(){
    Notification.requestPermission()

    $('.tabs').tabs({
        onShow: function(tab) {
            window.location.hash = '#' + tab.attr('id');
            $("body").scrollTop(0);
        }
    });
    $('.tabs').tabs('select_tab', window.location.hash);

    particleground(document.getElementById('particles'), {
        dotColor: '#5cbdaa',
        lineColor: '#5cbdaa',
        maxSpeedX: .4,
        maxSpeedY: .4,
        parallaxMultiplier: 15,
    });

    // $(document).mousemove(checkMouseMove);
    checkMouseMove();

    var clock = $('#countdown');
    // updateDeadline('March 18 2017 11:00:00 GMT+0000', "until opening ceremony!");
    // updateDeadline('March 18 2017 12:00:00 GMT+0000', "until hacking begins!");
    updateDeadline('March 11 2018 09:00:00 GMT+0000', "until breakfast!");

    updateClock(clock); // run function once at first to avoid delay
    var timeinterval = setInterval(updateClock,1000, clock)

    startWebsocket();

});