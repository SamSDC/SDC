/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkstarfire_project_catwalk"] = self["webpackChunkstarfire_project_catwalk"] || []).push([["client_src_components_overview_gallery_Thumbnails_jsx"],{

/***/ "./client/src/components/overview/gallery/Thumbnails.jsx":
/*!***************************************************************!*\
  !*** ./client/src/components/overview/gallery/Thumbnails.jsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _MainOverview_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../MainOverview.module.css */ \"./client/src/components/overview/MainOverview.module.css\");\n\n\n\nvar Thumbnails = function Thumbnails(_ref) {\n  var thumbUrl = _ref.thumbUrl,\n      handleThumb = _ref.handleThumb;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    id: _MainOverview_module_css__WEBPACK_IMPORTED_MODULE_1__.default.thumbImage,\n    style: {\n      background: thumbUrl ? \"url('\".concat(thumbUrl, \"') center / cover\") : null\n    },\n    onClick: function onClick(e) {\n      handleThumb(e, thumbUrl);\n    }\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Thumbnails);\n\n//# sourceURL=webpack://starfire-project-catwalk/./client/src/components/overview/gallery/Thumbnails.jsx?");

/***/ })

}]);