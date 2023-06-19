/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");

//there are 2 ways of writing the 'save' property for dynamic brocks:
//1. you write the content to be returned on the frontend in the 'save' property, then when you want to change this content, write an object in the 'deprecated' property with the old 'save' and 'attributes' properties; then you have to go to the CMS and update each post that uses this block. the code for this way of doing (which is the "official" way) is commented out below.
//2. another way of doing that is to simply return null in the 'save' property, then handling the returned value in the php file; this way you don't have to write 'deprecated' properties and also don't have to update each post in the CMS.

// 1.




//disable Update button in the CMS if there is any are-you-paying-attention block with the correctAnswer attribute set to undefined
(() => {
  let locked = false;
  wp.data.subscribe(function () {
    const results = wp.data.select('core/block-editor').getBlocks().filter(block => block.name == 'ourplugin/are-you-paying-attention' && block.attributes.correctAnswer == undefined);
    if (results.length && locked == false) {
      locked = true;
      wp.data.dispatch('core/editor').lockPostSaving('noanswer');
    }
    if (!results.length && locked) {
      locked = false;
      wp.data.dispatch('core/editor').unlockPostSaving('noanswer');
    }
  });
})();
wp.blocks.registerBlockType('ourplugin/are-you-paying-attention', {
  title: 'Are You Paying Attention?',
  icon: 'smiley',
  category: 'common',
  attributes: {
    question: {
      type: 'string'
    },
    answers: {
      type: 'array',
      default: ['']
    },
    correctAnswer: {
      type: 'number',
      default: undefined
    }
  },
  edit: EditComponent,
  //what the admin sees in the admin's CMS
  save: function (props) {
    return null;
  } //what the actual public will see in the content
});

function EditComponent(props) {
  function updateQuestion(value) {
    props.setAttributes({
      question: value
    });
  }
  function deleteAnswer(indexToDelete) {
    const newAnswers = props.attributes.answers.filter((x, index) => index != indexToDelete);
    props.setAttributes({
      answers: newAnswers
    });
    if (indexToDelete == props.attributes.correctAnswer) {
      props.setAttributes({
        correctAnswer: undefined
      });
    }
  }
  function markAsCorrect(index) {
    props.setAttributes({
      correctAnswer: index
    });
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "paying-attention-edit-block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: "Question:",
    value: props.attributes.question,
    onChange: updateQuestion,
    style: {
      fontSize: '20px'
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    style: {
      fontSize: '13px',
      margin: '20px 0 8px 0'
    }
  }, "Answers:"), props.attributes.answers.map((answer, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Flex, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FlexBlock, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: answer,
    onChange: newValue => {
      const newAnswers = props.attributes.answers.concat([]);
      newAnswers[index] = newValue;
      props.setAttributes({
        answers: newAnswers
      });
    },
    autoFocus: answer == undefined
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FlexItem, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    onClick: () => markAsCorrect(index),
    className: "mark-as-correct",
    icon: props.attributes.correctAnswer == index ? 'star-filled' : 'star-empty'
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FlexItem, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    isLink: true,
    onClick: () => deleteAnswer(index),
    className: "attention-delete"
  }, "Delete")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    isPrimary: true,
    onClick: () => {
      props.setAttributes({
        answers: props.attributes.answers.concat(undefined)
      });
    }
  }, "Add Another Answer"));
}

// 2.
// wp.blocks.registerBlockType('ourplugin/are-you-paying-attention', {
//   title: 'Are You Paying Attention?',
//   icon: 'smiley',
//   category: 'common',
//   attributes: {
//     skyColor: { type: 'string' },
//     grassColor: { type: 'string' },
//   },
//   edit: function (props) {
//     function updateSkyColor(event) {
//       props.setAttributes({ skyColor: event.target.value });
//     }
//     function updateGrassColor(event) {
//       props.setAttributes({ grassColor: event.target.value });
//     }

//     return (
//       <div className=''>
//         <input
//           type='text'
//           placeholder='sky color'
//           onChange={updateSkyColor}
//           value={props.attributes.skyColor}
//         />
//         <input
//           type='text'
//           placeholder='grass color'
//           onChange={updateGrassColor}
//           value={props.attributes.grassColor}
//         />
//       </div>
//     );
//   }, //what the admin sees in the admin's CMS
//   save: function (props) {
//     return (
//       <>
//         <h6>
//           Today the sky is absolutely{' '}
//           <span className='skyColor'>{props.attributes.skyColor}</span> and the
//           grass is{' '}
//           <span className='grassColor'>{props.attributes.grassColor}</span>.
//         </h6>
//       </>
//     );
//   }, //what the actual public will see in the content
//   deprecated: [
//     //this array receives 'attributes' and 'save' properties of the original block, so that we can change the 'save' property without causing errors
//     {
//       attributes: {
//         skyColor: { type: 'string' },
//         grassColor: { type: 'string' },
//       },
//       save: function (props) {
//         return (
//           <>
//             <h1>
//               Today the sky is absolutely{' '}
//               <span className='skyColor'>{props.attributes.skyColor}</span> and
//               the grass is{' '}
//               <span className='grassColor'>{props.attributes.grassColor}</span>.
//             </h1>
//           </>
//         );
//       },
//     },
//     {
//       attributes: {
//         skyColor: { type: 'string' },
//         grassColor: { type: 'string' },
//       },
//       save: function (props) {
//         return (
//           <>
//             <h4>
//               Today the sky is completely{' '}
//               <span className='skyColor'>{props.attributes.skyColor}</span> and
//               the grass is{' '}
//               <span className='grassColor'>{props.attributes.grassColor}</span>.
//             </h4>
//           </>
//         );
//       },
//     },
//     {
//       attributes: {
//         skyColor: { type: 'string' },
//         grassColor: { type: 'string' },
//       },
//       save: function (props) {
//         return (
//           <>
//             <p>
//               Today the sky is{' '}
//               <span className='skyColor'>{props.attributes.skyColor}</span> and
//               the grass is{' '}
//               <span className='grassColor'>{props.attributes.grassColor}</span>.
//             </p>
//           </>
//         );
//       },
//     },
//   ],
// });
})();

/******/ })()
;
//# sourceMappingURL=index.js.map