"use strict";var l=function(o){console.log(o)},so={$w:$(window),$d:$(document),$b:$("body"),page:""};so.$d.keypress(function(o){console.log(o.keyCode),103==o.keyCode&&($(".grid").toggleClass("active"),console.log("triggered"))}),so.updateMenu=function(){var o=so.$w[0].location.pathname;$("nav li a").each(function(){var a=$(this).text().toLowerCase();o.indexOf(a)>-1&&($("nav li a").removeClass("active"),$(this).addClass("active")),("/"===o||"/index.html"===o)&&$("nav li a").removeClass("active")})},so.fadeInItems=function(){("/"===so.$w[0].location.pathname||"/index.html"===so.$w[0].location.pathname||"/so/"===so.$w[0].location.pathname)&&setTimeout(function(){$(".intro").children().removeClass("out")},500)},so.$d.ready(function(){so.updateMenu()}),so.pageLoad=function(){so.updateMenu()},so.cartIcon=function(){so.page.indexOf("shop")>-1?$("header a.cart").addClass("active"):$("header a.cart").removeClass("active")},so.ajaxCall=function(o,a){$("html").animate({scrollTop:0},500,"easeInOutQuint"),$("#wrap").addClass("out"),o.indexOf("about")>-1||o.indexOf("contact")>-1?$("body").addClass("invert"):$("body").removeClass("invert"),so.cartIcon(),history.pushState({},null,o),setTimeout(function(){$("#wrap > *").remove(),$("#wrap").load(a,function(){setTimeout(function(){$("#wrap").removeClass("out")},300)})},500),so.updateMenu()},so.$w.load(function(){so.page=so.$w[0].location.pathname,l(so.page),so.fadeInItems()}),so.$d.on("click","a.top",function(){$("html, body").animate({scrollTop:0},700,"easeInOutQuint")}).on("click",'a:not([href^="http"]), a:not([href^="https"])',function(o){o.preventDefault(),so.page=$(this)[0].pathname;var a=so.page+" #wrap > *";so.ajaxCall(so.page,a)}).on("click",".intro a.view",function(o){o.preventDefault(),$("html, body").animate({scrollTop:so.introH},800,"easeInOutQuint")}),so.$w.on("popstate",function(o){so.page=window.location.href;var a=so.page+" #wrap > *";null!==o.originalEvent.state&&(l(so.page),$("html").animate({scrollTop:0},500,"easeInOutQuint"),$("#wrap").addClass("out"),so.page.indexOf("about")>-1||so.page.indexOf("contact")>-1?$("body").addClass("invert"):$("body").removeClass("invert"),so.cartIcon(),setTimeout(function(){$("#wrap > *").remove(),$("#wrap").load(a,function(){setTimeout(function(){$("#wrap").removeClass("out")},300)})},500),so.updateMenu())}),so.introH=$("section.intro").height(),so.intro=!0,so.position=so.$w.scrollTop(),so.$d.on("scroll",function(o){var a=so.$w[0].pageYOffset;a>=so.introH&&so.intro===!0&&($("section.intro").remove(),$("html, body").animate({scrollTop:0},0),$(".homething").addClass("out"),so.intro=!1),a>=so.introH/2&&$("#wrap").hasClass("out")&&$("#wrap").removeClass("out");so.$w.scrollTop();so.intro===!1&&(so.$d.scrollTop()>60?$("header").addClass("locked"):$("header").removeClass("locked"))});