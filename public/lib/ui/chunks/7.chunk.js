(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{1520:function(e,t,a){"use strict";a(19),a(12),a(14),a(7),a(13),a(9),a(10),a(11),a(16),a(15),a(20),a(18);var n=a(0),c=a.n(n),r=a(6),o=a(3),l=(a(38),a(391)),i=a(71),m=a(47);var s=function(e){var t=Object(l.a)().t,a=e.deletePages,n=e.extractPages,r=e.insertPages,o=e.replacePages;return c.a.createElement(c.a.Fragment,null,c.a.createElement(i.a,{dataElement:"pageManipulationHeader",className:"type"},t("action.pageManipulation")),c.a.createElement(i.a,{className:"row",dataElement:"insertPage",onClick:r},c.a.createElement(m.a,{title:"action.insertPage",img:"icon-page-insertion-insert",role:"option",onClickAnnouncement:"".concat(t("action.insertPage")," ").concat(t("action.modal")," ").concat(t("action.isOpen"))}),c.a.createElement("div",{className:"title"},t("action.insert"))),c.a.createElement(i.a,{className:"row",dataElement:"replacePage",onClick:o},c.a.createElement(m.a,{title:"action.replacePage",img:"icon-page-replacement",role:"option",onClickAnnouncement:"".concat(t("action.replacePage")," ").concat(t("action.modal")," ").concat(t("action.isOpen"))}),c.a.createElement("div",{className:"title"},t("action.replace"))),c.a.createElement(i.a,{className:"row",dataElement:"extractPage",onClick:n},c.a.createElement(m.a,{title:"action.extractPage",img:"icon-page-manipulation-extract",role:"option",onClickAnnouncement:"".concat(t("action.extractPage")," ").concat(t("action.modal")," ").concat(t("action.isOpen"))}),c.a.createElement("div",{className:"title"},t("action.extract"))),c.a.createElement(i.a,{dataElement:"deletePage",className:"row",onClick:a},c.a.createElement(m.a,{title:"option.thumbnailPanel.delete",img:"icon-delete-line",role:"option",onClickAnnouncement:"".concat(t("action.delete")," ").concat(t("action.modal")," ").concat(t("action.isOpen"))}),c.a.createElement("div",{className:"title"},t("action.delete"))))},u=a(1356),p=a(4),b=a.n(p),g=a(2),E=a(36),O=a(5);function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var n,c,r,o,l=[],i=!0,m=!1;try{if(r=(a=a.call(e)).next,0===t){if(Object(a)!==a)return;i=!1}else for(;!(i=(n=r.call(a)).done)&&(l.push(n.value),l.length!==t);i=!0);}catch(e){m=!0,c=e}finally{try{if(!i&&null!=a.return&&(o=a.return(),Object(o)!==o))return}finally{if(m)throw c}}return l}}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return f(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return f(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var A={pageNumbers:b.a.arrayOf(b.a.number),warn:b.a.bool};function P(e){var t=Object(r.d)(),a=e.pageNumbers,n=e.warn,l=d(Object(r.e)((function(e){return[o.a.pageDeletionConfirmationModalEnabled(e)]})),1)[0],i=function(){t(g.a.closeElement(O.a.PAGE_MANIPULATION_OVERLAY)),t(g.a.openElement("insertPageModal"))};return c.a.createElement(s,{insertPages:function(){n?!Object(u.k)(a,t)&&i():i(),Object(E.l)()&&t(g.a.closeElement(O.a.PAGE_MANIPULATION_OVERLAY))},deletePages:function(){n?!Object(u.k)(a,t)&&Object(u.b)(a,t,l):Object(u.b)(a,t,l),Object(E.l)()&&t(g.a.closeElement(O.a.PAGE_MANIPULATION_OVERLAY))},extractPages:function(){n?!Object(u.k)(a,t)&&Object(u.e)(a,t):Object(u.e)(a,t),Object(E.l)()&&t(g.a.closeElement(O.a.PAGE_MANIPULATION_OVERLAY))},replacePages:function(){n?!Object(u.k)(a,t)&&Object(u.m)(t):Object(u.m)(t),Object(E.l)()&&t(g.a.closeElement(O.a.PAGE_MANIPULATION_OVERLAY))}})}P.propTypes=A;var j=P;t.a=j}}]);
//# sourceMappingURL=7.chunk.js.map