!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),d=document.body,a=null;t.addEventListener("click",(function(){t.setAttribute("disabled","disabled"),e.removeAttribute("disabled","disabled"),a=setInterval((function(){d.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),e.addEventListener("click",(function(){e.setAttribute("disabled","disabled"),t.removeAttribute("disabled","disabled"),clearInterval(a)}))}();
//# sourceMappingURL=01-color-switcher.94dbbc13.js.map
