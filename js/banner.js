function Banner(element) {
    this.current = 0;
    this.delay = 5000;
    this.selfScrolling = true;
    this.timer = 0;
    this.jq = $(element);
    this.slides = this.jq.children("div[class!='prev'][class!='next']");
    //var oslides = this.slides.children("div");
    this.count = this.slides.children("div:first-of-type").children("div").length;
    this.disable = function() {
        window.clearInterval(this.timer);
        this.setScrolling = false;
    };
    this.enable = function() {
        var context = this;
        this.timer = window.setInterval(function() {
            context.scroll.call(context);
            }, this.delay);
        this.seftScrolling = true;
    };
    this.scroll = function() {
        if (this.current < (this.count - 1)) {
            this.slides.animate({"scrollLeft" : "+=500"});
            this.current++;
        } else {
            this.slides.animate({"scrollLeft" : ("-=" + (this.count - 1) * 500)});
            this.current = 0;
        }
    };
    this.prev = function() {
        if (this.current > 0) {
            this.disable();
            this.slides.animate({"scrollLeft" : "-=500"});
            if (this.selfScrolling) this.enable();
            this.current--;
        } else {
            this.disable();
            this.slides.animate({"scrollLeft" : ("+=" + (this.count - 1) * 500)});
            if (this.selfScrolling) this.enable();
            this.current = this.count - 1;
        }
    };
    this.next = function() {
        if (this.current < (this.count - 1)) {
            this.disable();
            this.slides.animate({"scrollLeft" : "+=500"});
            if (this.selfScrolling) this.enable();
            this.current++;
        } else {
            this.disable();
            this.slides.animate({"scrollLeft" : ("-=" + (this.count - 1) * 500)});
            if (this.selfScrolling) this.enable();
            this.current = 0;
        }
    };
    this.slides.children("div:first-of-type").width(this.count * 500);
    var prevb = this.jq.children("div.prev");
    var nextb = this.jq.children("div.next");
    this.jq.hover(function() {
        prevb.fadeIn();
        nextb.fadeIn();
    }, function(e) {
        prevb.fadeOut();
        nextb.fadeOut();
    });
    var context = this;
    prevb.click(function() {
        context.prev.call(context);
    });
    nextb.click(function() {
        context.next.call(context);
    });
}