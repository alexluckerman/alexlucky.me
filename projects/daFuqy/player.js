var loadready, loadnow, loadval, curb, curx, cury, curd;
Player = new Object({});
Player.resize = function () {
    player = $("#-player");
    duq = $("#-duq");
    var w = Math.round((window.innerHeight / 9) * 16);
    var h = window.innerHeight;
    if (w > window.innerWidth) {
        w = window.innerWidth;
        h = Math.round((window.innerWidth / 16) * 9);
    }
    player.css("left", (window.innerWidth - w) / 2 + "px");
    player.css("top", (window.innerHeight - h) / 2 + "px");
    player.css({
        width: w + "px",
        height: h + "px"
    });
    if (loadready) {
        player.css("backgroundColor", "rgb(" + curb[0] + "," + curb[1] + "," + curb[2] + ")");
        duq.css({
            left: Math.round(w * 0.01 * curx) + "px",
            height: Math.round(h * 0.01 * curd) + "px",
            width: Math.round(h * 0.01 * curd) + "px",
            top: Math.round(h * 0.01 * cury) + "px"
        });
    }
    if (loadnow) {
        Player.open(loadval);
    }
};
Player.start = function (play, duq) {
    $(document).ready(function () {
        setInterval(function () {
            Player.resize();
        }, 40);
    });
};
Player.open = function (name) {
    $(document).ready(function () {
        var parse = script.split(";");
        var mainpos = 0;
        var j = 0;
        op = setInterval(function () {
            $("#-duq").css("display", "inline");
            var read = parse[j];
            j++;
            console.log("read " + read);
            var subread = read.split(",");
            for (var i = 0; i < subread.length; i++) {
                console.log("subread " + subread[i]);
                ev(subread[i]);
            }
            if (j == parse.length) {
                console.log("clear");
                clearInterval(op);
            }
            console.log(parse.length);
            console.log(j);
        }, 1000);
    });
};

function ev(act) {
    alert("called");
    l = act.length;
    t = act.indexOf("t");
    d = act.indexOf("d");
    x = act.indexOf("x");
    y = act.indexOf("y");
    b = act.indexOf("b");
    a = act.indexOf("a");
    if (b != -1) {
        curb = act.substring(b + 1, l).split(":");
    }
    if (x != -1) {
        curx = act.substring(x + 1, l);
    }
    if (y != -1) {
        cury = act.substring(y + 1, l);
    }
    if (d != -1) {
        curd = act.substring(d + 1, l);
    }
    if (a != -1) {
        console.log("a " + act.substring(a + 1, l));
    }
    loadready = true;
}
Player.load = function () {
    loadnow = true;
    loadval = $("#-script").val();
};