"use strict";var l=function(o){console.log(o)},so={$w:$(window),$d:$(document),$b:$("body"),page:""};so.$d.keypress(function(o){console.log(o.keyCode),103==o.keyCode&&($(".grid").toggleClass("active"),console.log("triggered"))}),so.updateMenu=function(){var o=so.$w[0].location.pathname;$("nav li a").each(function(){var e=$(this).text().toLowerCase();o.indexOf(e)>-1&&($("nav li a").removeClass("active"),$(this).addClass("active")),("/"===o||"/index.html"===o||"/so/"===o)&&$("nav li a").removeClass("active")})},so.fadeInItems=function(){("/"===so.$w[0].location.pathname||"/index.html"===so.$w[0].location.pathname||"/so/"===so.$w[0].location.pathname)&&setTimeout(function(){$(".intro").children().removeClass("out")},500)},so.$d.ready(function(){so.updateMenu(),so.productSwitch()}),so.pageLoad=function(){so.updateMenu()},so.cartIcon=function(){so.page.indexOf("shop")>-1?$("header a.cart").addClass("active"):$("header a.cart").removeClass("active")},so.ajaxCall=function(o,e){$("html").animate({scrollTop:0},500,"easeInOutQuint"),$("#wrap").addClass("out"),o.indexOf("about")>-1||o.indexOf("contact")>-1?$("body").addClass("invert"):$("body").removeClass("invert"),so.cartIcon(),history.pushState({},null,o),setTimeout(function(){$("#wrap > *").remove(),$("#wrap").load(e,function(){so.productSwitch(),setTimeout(function(){$("#wrap").removeClass("out")},300)})},500),so.updateMenu()},so.$w.load(function(){so.page=so.$w[0].location.pathname,l(so.page),so.fadeInItems()}),so.$d.on("click","a.top",function(){$("html, body").animate({scrollTop:0},700,"easeInOutQuint")}).on("click","header a, .product:not(.page) a, footer a",function(o){o.preventDefault(),so.page=$(this)[0].pathname;var e=so.page+" #wrap > *";so.ajaxCall(so.page,e)}).on("click",".intro a.view",function(o){o.preventDefault(),$("html, body").animate({scrollTop:so.introH},800)}).on("click",".thumbs a",function(o){o.preventDefault();var e=$(this).find("img").attr("src");$(".gallery > img").attr("src",e)}).on("click",".dropdown li a",function(o){o.preventDefault(),l("clicked"),$(this).toggleClass("active"),$(this).next().toggleClass("hide")}),so.$w.on("popstate",function(o){so.page=window.location.href;var e=so.page+" #wrap > *";null!==o.originalEvent.state&&(l(so.page),$("html").animate({scrollTop:0},500,"easeInOutQuint"),$("#wrap").addClass("out"),so.page.indexOf("about")>-1||so.page.indexOf("contact")>-1?$("body").addClass("invert"):$("body").removeClass("invert"),so.cartIcon(),setTimeout(function(){$("#wrap > *").remove(),$("#wrap").load(e,function(){setTimeout(function(){$("#wrap").removeClass("out")},300)})},500),so.updateMenu())}),so.introH=$("section.intro").height(),so.intro=!0,so.position=so.$w.scrollTop(),so.$d.on("scroll touchmove",function(o){var e=so.$w[0].pageYOffset;e>=so.introH&&so.intro===!0&&($("section.intro").remove(),$("html, body").animate({scrollTop:0},0),$(".homething").addClass("out"),so.intro=!1),e>=so.introH/2&&$("#wrap").hasClass("out")&&$("#wrap").removeClass("out");so.$w.scrollTop();so.intro===!1&&(so.$d.scrollTop()>60?$("header").addClass("locked"):$("header").removeClass("locked"))}),so.productSwitch=function(){/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&$(".info").before($(".gallery"))};