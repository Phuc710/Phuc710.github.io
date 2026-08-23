!function (n) {
    function t(n, t, e) {
        let i = new Date(Date.now() + 864e5 * e).toUTCString();
        document.cookie = `${n}=${t}; expires=${i}; path=/`;
    }
    function e(n) {
        let t = document.cookie.split("; ").reduce((n, t) => {
            let [e, i] = t.split("=");
            return n[e] = i, n;
        }, {});
        return t[n];
    }
    function i(n) {
        $("html").removeClass("light").addClass("dark");
        t("theme", "dark", 365);
    }
    function c() {
        return Date.now();
    }
    i("dark");
    $("body").on("click", ".change-theme", function () {
        let n = $(this).find(".ri-sun-line"),
            t = $(this).find(".ri-moon-clear-line");
        t.is(":visible") ? (t.hide(), n.fadeIn(200)) : (n.hide(), t.fadeIn(200));
    });
    "close" === e("toast") && $("#toast-prompt").hide();
    $("body").on("click", ".close-btn", function () {
        $("#toast-prompt").slideUp("fast", function () {
            let n = new Date(Date.now() + 6e5).toUTCString();
            document.cookie = `toast=close; expires=${n}; path=/`;
        });
        FuiToast.success("Không hiển thị lại trong 10 phút.");
    });
    $("body").on("click", ".confirm-btn", function () {
        !function n() {
            fetch("https://api.thanhdieu.com/rand-music.php")
                .then(n => n.json())
                .then(t => {
                    let e = t.musicUrl,
                        i = new Audio(e),
                        h = new Promise((e, h) => {
                            i.play().then(() => { e(t) }).catch(n => { h("Không thể phát nhạc ngay lúc này.") });
                            i.addEventListener("ended", function () { e("Đã chuyển sang bài hát mới."), n(); });
                        });
                    FuiToast.promise(h, { loading: "Đang chờ phát nhạc...", success: n => n.titleTracks, error: "Có lỗi khi phát nhạc!" }, { isClose: !0 });
                    $("#toast-prompt").slideUp("fast");
                })
                .catch(n => { FuiToast.error("Có lỗi khi lấy nhạc từ API!"); });
        }();
    });
    let o = 0;
    $("body").append(`<div id="fui-toast"></div><div class="td-lock-screen"><section class="td-welcome"><div class="medias"><video class="pc item_video" autoplay loop muted playsinline><source src="./assets/video/pc_1.mp4?v=${c()}" type="video/mp4"></video><video class="mobile item_video" autoplay loop muted playsinline><source src="./assets/video/mb.mp4?v=${c()}" type="video/mp4"></video><div class="date"></div></div><div class="infos"><div class="logo-web-title"><img class="logo-ws" src="https://i.imghippo.com/files/xhRv2509V.jpg" alt="Nguyễn Thanh Phúc"><span class="web-title">${$("html").attr("data-title-loader") || "Màn Hình Khoá"}</span></div><span class="web_desc"></span><div><div class="close-lockscreen"><i class="ri-cursor-fill"></i> Click</div></div></div></section></div>`);
    let a = (n, t) => Math.floor(Math.random() * (t - n + 1)) + n,
        s = n => {
            n.style.setProperty("--star-left", `${a(-10, 100)}%`);
            n.style.setProperty("--star-top", `${a(-40, 80)}%`);
            n.style.animation = "none";
            n.offsetHeight;
            n.style.animation = "";
        };
    for (let r of document.getElementsByClassName("magic-star")) setTimeout(() => { s(r), setInterval(() => s(r), 1e3) }, o++ * (1e3 / 3));
    let l = document.getElementById("croll-to-top"),
        g = l.querySelector(".text"),
        m = l.querySelector("i");
    0 === window.scrollY && (l.style.display = "none");
    window.addEventListener("scroll", function () {
        let n = window.scrollY,
            t = document.documentElement.scrollHeight,
            e = window.innerHeight,
            i = 0;
        t > e && (i = n / (t - e) * 100);
        g.textContent = Math.round(i);
        n > 0 ? l.style.display = "block" : l.style.display = "none";
    });
    l.addEventListener("mouseenter", function () { g.style.display = "none", m.style.display = "inline-block"; });
    l.addEventListener("mouseleave", function () { g.style.display = "inline-block", m.style.display = "none"; });
    l.addEventListener("click", function () { $("html, body").animate({ scrollTop: 0 }, "fast"); });
    $(document).on({ contextmenu: function (n) { n.preventDefault(); } });
    class p {
        constructor(n) { this.element = $(n), this.TimeNows(), setInterval(() => this.TimeNows(), 1e3); }
        TimeNows() {
            let n = new Date,
                t = n.getHours().toString().padStart(2, "0"),
                e = n.getMinutes().toString().padStart(2, "0"),
                i = n.getSeconds().toString().padStart(2, "0");
            this.element.text(`${t}:${e}:${i}`);
        }
    }
    function y() {
        $.ajax({
            url: "https://api.thanhdieu.com/cham-ngon",
            type: "get",
            dataType: "json",
            success: function (n) {
                $("#cham-ngon").fadeOut(300, function () { $(this).text(n.msg).fadeIn(300); });
            },
            error: function (n, t, e) { }
        });
    }
    new p("#real-time");
    $("[data-fancybox]").length && Fancybox.bind("[data-fancybox]", {});
    y();
    let f = new class n {
        constructor(n) { this.element = n; }
        MessageRmd() {
            let n = new Date().getHours(), t;
            return (t = n >= 3 && n <= 10 ? ["Chúc các bạn có một buổi sáng vui vẻ, và may mắn 😇", "Sáng nay thật đẹp, hãy bắt đầu một ngày mới tràn đầy năng lượng nhé! ☀️", "Chào buổi sáng, đừng quên ăn sáng để có năng lượng cho cả ngày!", "Khi ông Mặt trời thức dậy, mẹ lên rẫy, em đến trường rồi mà sao mày vẫn còn ngủ hả, dậy mà đón lấy ánh nắng tích cực, khởi đầu ngày mới tràn đầy năng lượng đi."] : n >= 11 && n <= 15 ? ["Buổi trưa này, đừng quên ăn uống đầy đủ đấy nhé 🤤", "Trưa nay hơi nóng, nếu có cần mua gì thì nhắn anh mua giúp cho nhé 🌤️", "Chúc bạn có một buổi nghỉ trưa tràn đầy sức khoẻ!"] : n >= 16 && n <= 18 ? ["Chúc bạn có một buổi chiều thư giãn sau những giờ làm việc căng thẳng.", "Chúc buổi chiều tràn đầy năng lượng tích cực, để tối nay có thể cày phim thả ga!", "Cả ngày hôm nay tôi không thể ngừng nghĩ về bạn chúc bạn một buổi chiều vui vẻ! 🌄"] : n >= 19 && n <= 21 ? ["Chúc các bạn có một buổi tối tràn đầy hạnh phúc!", "Buổi tối là lúc để thư giãn và tận hưởng cuộc sống 🌘", "Chào buổi tối, đừng quên dành thời gian cho gia đình nhé ❤️"] : ["Onichan~ sao giờ này chưa ngủ nữa ୧(๑•̀⌄•́๑)૭", "Khuya rồi, hãy đi ngủ để mơ những giấc mơ thật đẹp nhé 🌌", "Đêm muộn thế này, đừng quên chăm sóc sức khỏe nha 🌘"])[Math.floor(Math.random() * t.length)];
        }
    }($("#waiting-loader"));
    setTimeout(() => { let n = f.MessageRmd(); $("#waiting-loader").text(n); }, 111);
    setInterval(y, 5321);
    let b = new class n {
        constructor(n) { this.descriptions = n, this.element = $(".web_desc"), this.Description(); }
        Description() {
            let n = this.descriptions[Math.floor(Math.random() * this.descriptions.length)];
            this.element.fadeOut(500, () => { this.element.html(n).fadeIn(500); });
        }
    }(["Gọi em là công chúa vì hoàng tử đang đứng chờ em nè!", "Chưa được sự cho phép mà đã tự ý thích em, anh xin lỗi nhé công chúa!", "Em nhìn rất giống người họ hàng của anh, đó chính là con dâu của mẹ anh!", "Trái Đất quay quanh Mặt Trời, còn em thì quay mãi trong tâm trí anh!", "Vector chỉ có một chiều, anh dân chuyên toán chỉ yêu một người.", "Anh béo thế này là bởi vì trong lòng anh có em nữa.", "Nghe đây! Em đã bị bắt vì tội quá xinh đẹp.", "Anh chỉ muốn bên cạnh em hai lần đó là bây giờ và mãi mãi.", "Bao nhiêu cân thính cho vừa, bao nhiêu cân bả mới lừa được em?", "Vũ trụ của người ta là màu đen huyền bí, còn vũ trụ của anh bé tí, thu nhỏ lại là em.", "Anh rất yêu thành phố này, không phải vì nó có gì, mà vì nó có em.", "Anh bận với tất cả mọi điều, nhưng vẫn luôn rảnh để nhớ đến em.", "Cành cây còn có lá. Chú cá vẫn đang bơi, sao em cứ mải chơi. Chẳng chịu yêu anh thế!", "Em nhà ở đâu thế? Cứ tới lui trong tim anh không biết đường về nhà à?", "Cuộc đời anh vốn là một đường thẳng, chỉ vì gặp em mà rẽ ngang.", "Với thế giới em chỉ là một người, nhưng với anh, em là cả thế giới.", "Em có thể đừng cười nữa được không, da anh đen hết rồi.", "Anh đây chẳng thích nhiều lời, nhìn em là biết cả đời của anh.", "Cảm lạnh có thể do gió, nhưng, cảm nắng thì chắc chắn do em.", "Trứng rán cần mỡ, bắp cần bơ, yêu không cần cớ, cần em cơ!", "Cafe đắng thêm đường sẽ ngọt, còn cuộc đời anh thêm em sẽ hạnh phúc.", "Giữa cuộc đời hàng ngàn cám dỗ, nhưng, anh vẫn chỉ cần bến đỗ là em.", "Có người rủ anh đi ăn tối, nhưng anh từ chối vì thực đơn không có em.", "Em có biết vì sao đầu tuần lại bắt đầu bằng thứ hai không, bởi vì em là thứ nhất!", "Oxy là nguồn sống của nhân loại, còn em chính là nguồn sống của anh.", "Em bị cận thị à? Nếu không tại sao không nhìn thấy anh thích em chứ?", "Hôm qua anh gặp ác mộng vì trong giấc mộng đó không có em.", "Uống nhầm một ánh mắt, cơn say theo cả đời, thương nhầm một nụ cười, cả một đời phiêu lãng.", "Dạo này em có thấy mỏi chân không, sao cứ đi mãi trong đầu anh thế?", "Hình như em thích trà sữa lắm phải không, anh cũng thích em như thế đấy.", "Nếu em là nước mắt thì anh sẽ không bao giờ khóc để lạc mất em đâu.", "Đôi mắt em còn xanh hơn cả Đại Tây Dương và anh thì bị lạc trên biển cả mất rồi.", "Nếu nụ hôn là những bông tuyết thì anh sẽ gửi đến em một cơn bão tuyết", "Phải chăng em là một ảo thuật gia, bởi mỗi khi anh nhìn em là mọi thứ xung quanh đều biến mất.", "Anh có thể chụp ảnh em được không, để chứng minh với lũ bạn rằng thiên thần là có thật.", "Anh có thể đi theo em được không, bởi anh được bố mẹ dạy rằng phải theo đuổi giấc mơ của mình.", "Nếu khi anh nghĩ đến em mà có một ngôi sao biến mất, vậy chắc cả bầu trời này không còn sao."]);
    setInterval(() => b.Description(), 7e3);
    $(".td-lock-screen").click(function () { $(".td-welcome").slideUp("slow"), $(".td-lock-screen").animate({ opacity: 0 }, "slow").css("pointer-events", "none"); });
    $(document).on("swiperight", function () { $(".td-welcome").slideDown("slow"), $(".td-lock-screen").animate({ opacity: 1 }, "fast").css("pointer-events", "auto"); });
    $(document).on("swipeleft", function () { $(".td-welcome").slideUp("slow"), $(".td-lock-screen").animate({ opacity: 0 }, "slow").css("pointer-events", "none"); });
    $(document).on("visibilitychange", function () {
        document.hidden || setTimeout(function () {
            var n = $(window).scrollTop(), t = $(window).height(), e = $(document).height();
            0 === n && ($(".td-welcome").slideDown("slow"), $(".td-lock-screen").animate({ opacity: 1 }, "fast").css("pointer-events", "auto"));
            100 == n / (e - t) * 100 && ($(".td-welcome").slideUp("slow"), $(".td-lock-screen").animate({ opacity: 0 }, "slow").css("pointer-events", "none"));
        }, 200);
    });
    new p(".date");
    let v = $("#loading-percentage"), w;
    w = setInterval(function () {
        var n = $(".pace-progress");
        if (n.length) {
            var t = n.attr("data-progress-text");
            if (t !== v.text()) {
                v.text(t);
                var e = parseInt(t);
                n.css("transform", "translate3d(" + e + "%, 0px, 0px)");
                "100%" === t && ($(".pace-active").animate({ top: "-100px" }, "slow", function () { $(this).hide(); }), $("#loading-box").is(":visible") ? (x(), WsLoaded = !0, $(".td-loading-v2").fadeOut("slow"), $("#loading-box").fadeOut("slow")) : $(".td-loading-v2").fadeOut("slow"), clearInterval(w));
            }
        }
    }, 100);
    let k = {
        endLoading() { x(), $(".td-loading-v2").fadeOut("slow"), $("#loading-box").fadeOut("slow"), WsLoaded = !0; },
        initLoading() { document.body.style.overflow = "", $("#loading-box").removeClass("loaded"); }
    };
    function x() { $("body").removeClass("loading"); }
    $(window).on("load", () => { k.endLoading(); });
    $(document).on("pjax:send", () => { k.initLoading(); });
    $(document).on("pjax:complete", () => { k.endLoading(); });
    $("body").on("click", "[data-ws-copy]", function (n) {
        n.preventDefault();
        var t = $(this).data("ws-copy");
        if (navigator.clipboard) navigator.clipboard.writeText(t).then(function () { FuiToast.success("Đã sao chép vào bộ nhớ tạm!"); }, function (n) { FuiToast.error("Sao chép thất bại: " + n); });
        else {
            var e = $("<textarea>").val(t).appendTo("body").select();
            try { document.execCommand("copy"), FuiToast.success("Đã sao chép vào bộ nhớ tạm!"); } catch (i) { FuiToast.error("Sao chép thất bại: " + i); }
            e.remove();
        }
    });
}();