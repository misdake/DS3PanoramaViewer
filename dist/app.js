/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babylonjs/babylon.js":
/*!*******************************************!*\
  !*** ./node_modules/babylonjs/babylon.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs */ "./node_modules/babylonjs/babylon.js");
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_NetUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/NetUtil */ "./src/util/NetUtil.ts");
/* harmony import */ var _drawable_DrawablePanorama__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./drawable/DrawablePanorama */ "./src/drawable/DrawablePanorama.ts");
/* harmony import */ var _drawable_DrawableFootprint__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./drawable/DrawableFootprint */ "./src/drawable/DrawableFootprint.ts");




class App {
    constructor() {
        this.mCanvas = null;
        this.mEngine = null;
        this.scene = null;
        this.camera = null;
        this.panorama = null;
        this.footprints = [];
        this.footprintSpriteManager = null;
        this.maps = [];
        this.mCanvas = document.getElementById("renderCanvas");
        this.mEngine = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Engine"](this.mCanvas, true);
        let scene = this.createScene();
        this.mEngine.runRenderLoop(() => {
            scene.render();
        });
        window.addEventListener("resize", () => {
            this.mEngine.resize();
        });
        let self = this;
        scene.onPointerDown = function (evt) {
            var pickResult = scene.pickSprite(this.pointerX, this.pointerY);
            if (pickResult.hit) {
                self.onPickFootprint(pickResult.pickedSprite);
            }
        };
        this.loadData();
    }
    createScene() {
        this.scene = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Scene"](this.mEngine);
        this.scene.fogMode = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Scene"].FOGMODE_EXP;
        this.scene.fogDensity = 0.01;
        this.scene.fogStart = 5.0;
        this.scene.fogEnd = 200.0;
        this.scene.fogColor = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color3"](0.9, 0.9, 0.85);
        this.camera = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["UniversalCamera"]("Camera", babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Zero(), this.scene);
        this.camera.attachControl(this.mCanvas, true);
        this.camera.fov = Math.PI / 3;
        this.camera.maxZ = 1000;
        this.panorama = new _drawable_DrawablePanorama__WEBPACK_IMPORTED_MODULE_2__["DrawablePanorama"](this.scene, this.camera);
        this.footprintSpriteManager = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["SpriteManager"]("SpriteManager", "texture/footprint.png", 100, 512, this.scene);
        this.footprintSpriteManager.isPickable = true;
        return this.scene;
    }
    loadData() {
        _util_NetUtil__WEBPACK_IMPORTED_MODULE_1__["NetUtil"].get("data/data.json", text => {
            const data = JSON.parse(text);
            this.maps = data.maps;
            const select = document.getElementById("mapSelect");
            select.options.length = 0;
            for (let map of this.maps) {
                select.add(new Option(map.name, "" + map.id));
            }
            select.options[0].selected = true;
            select.onchange = ev => {
                for (let map of this.maps) {
                    if (("" + map.id) === select.options[select.selectedIndex].value) {
                        this.loadMap(map);
                        this.loadPoint(map.points[0]);
                        return;
                    }
                }
            };
            this.loadMap(this.maps[0]);
            this.loadPoint(this.maps[0].points[0]);
        });
    }
    loadMap(map) {
        this.unloadFootprints();
        this.loadFootprints(map);
    }
    loadPoint(point) {
        this.panorama.unload();
        this.panorama.load(point);
        this.camera.position.x = point.x;
        this.camera.position.y = point.y;
        this.camera.position.z = point.z;
        this.footprintShowHide(point);
    }
    footprintShowHide(point) {
        for (let footprint of this.footprints) {
            if (footprint.point === point) {
                footprint.sprite.isVisible = false;
            }
            else {
                footprint.sprite.isVisible = true;
                footprint.update(point);
            }
        }
    }
    onPickFootprint(sprite) {
        for (let footprint of this.footprints) {
            if (footprint.sprite === sprite) {
                this.loadPoint(footprint.point);
                break;
            }
        }
    }
    loadFootprints(map) {
        for (let point of map.points) {
            this.footprints.push(new _drawable_DrawableFootprint__WEBPACK_IMPORTED_MODULE_3__["DrawableFootprint"](point, this.scene, this.footprintSpriteManager));
        }
    }
    unloadFootprints() {
        for (let footprint of this.footprints) {
            footprint.unload();
        }
        this.footprints = [];
    }
}
new App();


/***/ }),

/***/ "./src/drawable/DrawableFootprint.ts":
/*!*******************************************!*\
  !*** ./src/drawable/DrawableFootprint.ts ***!
  \*******************************************/
/*! exports provided: DrawableFootprint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawableFootprint", function() { return DrawableFootprint; });
class DrawableFootprint {
    constructor(point, scene, spriteManager) {
        this.sprite = new BABYLON.Sprite("footprint", spriteManager);
        this.sprite.size = 10;
        this.sprite.position.x = point.x;
        this.sprite.position.y = point.y;
        this.sprite.position.z = point.z;
        this.sprite.isPickable = true;
        this.point = point;
    }
    update(cameraPoint) {
        let dx = cameraPoint.x - this.point.x;
        let dy = cameraPoint.y - this.point.y;
        let dz = cameraPoint.z - this.point.z;
        let length = Math.sqrt(dx * dx + dy * dy + dz * dz);
        this.sprite.size = Math.sqrt(length / 16);
    }
    unload() {
        if (this.sprite) {
            this.sprite.dispose();
            this.sprite = null;
        }
    }
}


/***/ }),

/***/ "./src/drawable/DrawablePanorama.ts":
/*!******************************************!*\
  !*** ./src/drawable/DrawablePanorama.ts ***!
  \******************************************/
/*! exports provided: DrawablePanorama */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawablePanorama", function() { return DrawablePanorama; });
const TEXTURE_FILE_NAMES = ["px.jpg", "py.jpg", "pz.jpg", "nx.jpg", "ny.jpg", "nz.jpg"];
class DrawablePanorama {
    constructor(scene, camera) {
        this.scene = scene;
        this.skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
        this.skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        this.skyboxMaterial.backFaceCulling = false;
        this.skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        this.skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        this.skybox.material = this.skyboxMaterial;
        this.skybox.infiniteDistance = true;
        this.skyboxMaterial.disableLighting = true;
        this.skyboxMaterial.fogEnabled = false;
    }
    load(point) {
        this.skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(`data/${point.mapId}/${point.id}/`, this.scene, TEXTURE_FILE_NAMES);
        this.skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    }
    unload() {
        if (this.skyboxMaterial.reflectionTexture) {
            this.skyboxMaterial.reflectionTexture.dispose();
            this.skyboxMaterial.reflectionTexture = null;
        }
    }
}


/***/ }),

/***/ "./src/util/NetUtil.ts":
/*!*****************************!*\
  !*** ./src/util/NetUtil.ts ***!
  \*****************************/
/*! exports provided: NetUtil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetUtil", function() { return NetUtil; });
class NetUtil {
    static get(url, callback) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                callback(request.responseText);
            }
        };
        request.open("GET", url, true);
        request.send();
    }
}


/***/ })

/******/ });
//# sourceMappingURL=app.js.map