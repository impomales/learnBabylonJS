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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./babylon/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./babylon/index.js":
/*!**************************!*\
  !*** ./babylon/index.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs */ \"./node_modules/babylonjs/babylon.js\");\n/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs__WEBPACK_IMPORTED_MODULE_0__);\n\n\nwindow.addEventListener(\"DOMContentLoaded\", () => {\n  // engine set up\n  const canvas = document.getElementById(\"gameCanvas\");\n  const engine = new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"Engine\"](canvas, true);\n  const scene = new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"](engine);\n\n  // camera set up\n  const camera = new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"FreeCamera\"](\n    \"camera\",\n    new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](5, 5, -5),\n    scene\n  );\n  camera.setTarget(babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"].Zero());\n\n  // ambient light\n  const light = new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"HemisphericLight\"](\n    \"light\",\n    new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 1, 0),\n    scene\n  );\n\n  const cube = babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"Mesh\"].CreateBox(\"myBox\", 1, scene);\n\n  // render loop.\n  engine.runRenderLoop(() => {\n    scene.render();\n  });\n});\n\n\n//# sourceURL=webpack:///./babylon/index.js?");

/***/ }),

/***/ "./node_modules/babylonjs/babylon.js":
/*!*******************************************!*\
  !*** ./node_modules/babylonjs/babylon.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/***/ }),

/***/ "./node_modules/cannon/build/cannon.js":
/*!*********************************************!*\
  !*** ./node_modules/cannon/build/cannon.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/***/ }),

/***/ "./node_modules/earcut/src/earcut.js":
/*!*******************************************!*\
  !*** ./node_modules/earcut/src/earcut.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = earcut;\nmodule.exports.default = earcut;\n\nfunction earcut(data, holeIndices, dim) {\n\n    dim = dim || 2;\n\n    var hasHoles = holeIndices && holeIndices.length,\n        outerLen = hasHoles ? holeIndices[0] * dim : data.length,\n        outerNode = linkedList(data, 0, outerLen, dim, true),\n        triangles = [];\n\n    if (!outerNode) return triangles;\n\n    var minX, minY, maxX, maxY, x, y, invSize;\n\n    if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim);\n\n    // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox\n    if (data.length > 80 * dim) {\n        minX = maxX = data[0];\n        minY = maxY = data[1];\n\n        for (var i = dim; i < outerLen; i += dim) {\n            x = data[i];\n            y = data[i + 1];\n            if (x < minX) minX = x;\n            if (y < minY) minY = y;\n            if (x > maxX) maxX = x;\n            if (y > maxY) maxY = y;\n        }\n\n        // minX, minY and invSize are later used to transform coords into integers for z-order calculation\n        invSize = Math.max(maxX - minX, maxY - minY);\n        invSize = invSize !== 0 ? 1 / invSize : 0;\n    }\n\n    earcutLinked(outerNode, triangles, dim, minX, minY, invSize);\n\n    return triangles;\n}\n\n// create a circular doubly linked list from polygon points in the specified winding order\nfunction linkedList(data, start, end, dim, clockwise) {\n    var i, last;\n\n    if (clockwise === (signedArea(data, start, end, dim) > 0)) {\n        for (i = start; i < end; i += dim) last = insertNode(i, data[i], data[i + 1], last);\n    } else {\n        for (i = end - dim; i >= start; i -= dim) last = insertNode(i, data[i], data[i + 1], last);\n    }\n\n    if (last && equals(last, last.next)) {\n        removeNode(last);\n        last = last.next;\n    }\n\n    return last;\n}\n\n// eliminate colinear or duplicate points\nfunction filterPoints(start, end) {\n    if (!start) return start;\n    if (!end) end = start;\n\n    var p = start,\n        again;\n    do {\n        again = false;\n\n        if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {\n            removeNode(p);\n            p = end = p.prev;\n            if (p === p.next) break;\n            again = true;\n\n        } else {\n            p = p.next;\n        }\n    } while (again || p !== end);\n\n    return end;\n}\n\n// main ear slicing loop which triangulates a polygon (given as a linked list)\nfunction earcutLinked(ear, triangles, dim, minX, minY, invSize, pass) {\n    if (!ear) return;\n\n    // interlink polygon nodes in z-order\n    if (!pass && invSize) indexCurve(ear, minX, minY, invSize);\n\n    var stop = ear,\n        prev, next;\n\n    // iterate through ears, slicing them one by one\n    while (ear.prev !== ear.next) {\n        prev = ear.prev;\n        next = ear.next;\n\n        if (invSize ? isEarHashed(ear, minX, minY, invSize) : isEar(ear)) {\n            // cut off the triangle\n            triangles.push(prev.i / dim);\n            triangles.push(ear.i / dim);\n            triangles.push(next.i / dim);\n\n            removeNode(ear);\n\n            // skipping the next vertice leads to less sliver triangles\n            ear = next.next;\n            stop = next.next;\n\n            continue;\n        }\n\n        ear = next;\n\n        // if we looped through the whole remaining polygon and can't find any more ears\n        if (ear === stop) {\n            // try filtering points and slicing again\n            if (!pass) {\n                earcutLinked(filterPoints(ear), triangles, dim, minX, minY, invSize, 1);\n\n            // if this didn't work, try curing all small self-intersections locally\n            } else if (pass === 1) {\n                ear = cureLocalIntersections(ear, triangles, dim);\n                earcutLinked(ear, triangles, dim, minX, minY, invSize, 2);\n\n            // as a last resort, try splitting the remaining polygon into two\n            } else if (pass === 2) {\n                splitEarcut(ear, triangles, dim, minX, minY, invSize);\n            }\n\n            break;\n        }\n    }\n}\n\n// check whether a polygon node forms a valid ear with adjacent nodes\nfunction isEar(ear) {\n    var a = ear.prev,\n        b = ear,\n        c = ear.next;\n\n    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear\n\n    // now make sure we don't have other points inside the potential ear\n    var p = ear.next.next;\n\n    while (p !== ear.prev) {\n        if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&\n            area(p.prev, p, p.next) >= 0) return false;\n        p = p.next;\n    }\n\n    return true;\n}\n\nfunction isEarHashed(ear, minX, minY, invSize) {\n    var a = ear.prev,\n        b = ear,\n        c = ear.next;\n\n    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear\n\n    // triangle bbox; min & max are calculated like this for speed\n    var minTX = a.x < b.x ? (a.x < c.x ? a.x : c.x) : (b.x < c.x ? b.x : c.x),\n        minTY = a.y < b.y ? (a.y < c.y ? a.y : c.y) : (b.y < c.y ? b.y : c.y),\n        maxTX = a.x > b.x ? (a.x > c.x ? a.x : c.x) : (b.x > c.x ? b.x : c.x),\n        maxTY = a.y > b.y ? (a.y > c.y ? a.y : c.y) : (b.y > c.y ? b.y : c.y);\n\n    // z-order range for the current triangle bbox;\n    var minZ = zOrder(minTX, minTY, minX, minY, invSize),\n        maxZ = zOrder(maxTX, maxTY, minX, minY, invSize);\n\n    var p = ear.prevZ,\n        n = ear.nextZ;\n\n    // look for points inside the triangle in both directions\n    while (p && p.z >= minZ && n && n.z <= maxZ) {\n        if (p !== ear.prev && p !== ear.next &&\n            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&\n            area(p.prev, p, p.next) >= 0) return false;\n        p = p.prevZ;\n\n        if (n !== ear.prev && n !== ear.next &&\n            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, n.x, n.y) &&\n            area(n.prev, n, n.next) >= 0) return false;\n        n = n.nextZ;\n    }\n\n    // look for remaining points in decreasing z-order\n    while (p && p.z >= minZ) {\n        if (p !== ear.prev && p !== ear.next &&\n            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&\n            area(p.prev, p, p.next) >= 0) return false;\n        p = p.prevZ;\n    }\n\n    // look for remaining points in increasing z-order\n    while (n && n.z <= maxZ) {\n        if (n !== ear.prev && n !== ear.next &&\n            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, n.x, n.y) &&\n            area(n.prev, n, n.next) >= 0) return false;\n        n = n.nextZ;\n    }\n\n    return true;\n}\n\n// go through all polygon nodes and cure small local self-intersections\nfunction cureLocalIntersections(start, triangles, dim) {\n    var p = start;\n    do {\n        var a = p.prev,\n            b = p.next.next;\n\n        if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {\n\n            triangles.push(a.i / dim);\n            triangles.push(p.i / dim);\n            triangles.push(b.i / dim);\n\n            // remove two nodes involved\n            removeNode(p);\n            removeNode(p.next);\n\n            p = start = b;\n        }\n        p = p.next;\n    } while (p !== start);\n\n    return p;\n}\n\n// try splitting polygon into two and triangulate them independently\nfunction splitEarcut(start, triangles, dim, minX, minY, invSize) {\n    // look for a valid diagonal that divides the polygon into two\n    var a = start;\n    do {\n        var b = a.next.next;\n        while (b !== a.prev) {\n            if (a.i !== b.i && isValidDiagonal(a, b)) {\n                // split the polygon in two by the diagonal\n                var c = splitPolygon(a, b);\n\n                // filter colinear points around the cuts\n                a = filterPoints(a, a.next);\n                c = filterPoints(c, c.next);\n\n                // run earcut on each half\n                earcutLinked(a, triangles, dim, minX, minY, invSize);\n                earcutLinked(c, triangles, dim, minX, minY, invSize);\n                return;\n            }\n            b = b.next;\n        }\n        a = a.next;\n    } while (a !== start);\n}\n\n// link every hole into the outer loop, producing a single-ring polygon without holes\nfunction eliminateHoles(data, holeIndices, outerNode, dim) {\n    var queue = [],\n        i, len, start, end, list;\n\n    for (i = 0, len = holeIndices.length; i < len; i++) {\n        start = holeIndices[i] * dim;\n        end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;\n        list = linkedList(data, start, end, dim, false);\n        if (list === list.next) list.steiner = true;\n        queue.push(getLeftmost(list));\n    }\n\n    queue.sort(compareX);\n\n    // process holes from left to right\n    for (i = 0; i < queue.length; i++) {\n        eliminateHole(queue[i], outerNode);\n        outerNode = filterPoints(outerNode, outerNode.next);\n    }\n\n    return outerNode;\n}\n\nfunction compareX(a, b) {\n    return a.x - b.x;\n}\n\n// find a bridge between vertices that connects hole with an outer ring and and link it\nfunction eliminateHole(hole, outerNode) {\n    outerNode = findHoleBridge(hole, outerNode);\n    if (outerNode) {\n        var b = splitPolygon(outerNode, hole);\n        filterPoints(b, b.next);\n    }\n}\n\n// David Eberly's algorithm for finding a bridge between hole and outer polygon\nfunction findHoleBridge(hole, outerNode) {\n    var p = outerNode,\n        hx = hole.x,\n        hy = hole.y,\n        qx = -Infinity,\n        m;\n\n    // find a segment intersected by a ray from the hole's leftmost point to the left;\n    // segment's endpoint with lesser x will be potential connection point\n    do {\n        if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {\n            var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);\n            if (x <= hx && x > qx) {\n                qx = x;\n                if (x === hx) {\n                    if (hy === p.y) return p;\n                    if (hy === p.next.y) return p.next;\n                }\n                m = p.x < p.next.x ? p : p.next;\n            }\n        }\n        p = p.next;\n    } while (p !== outerNode);\n\n    if (!m) return null;\n\n    if (hx === qx) return m.prev; // hole touches outer segment; pick lower endpoint\n\n    // look for points inside the triangle of hole point, segment intersection and endpoint;\n    // if there are no points found, we have a valid connection;\n    // otherwise choose the point of the minimum angle with the ray as connection point\n\n    var stop = m,\n        mx = m.x,\n        my = m.y,\n        tanMin = Infinity,\n        tan;\n\n    p = m.next;\n\n    while (p !== stop) {\n        if (hx >= p.x && p.x >= mx && hx !== p.x &&\n                pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {\n\n            tan = Math.abs(hy - p.y) / (hx - p.x); // tangential\n\n            if ((tan < tanMin || (tan === tanMin && p.x > m.x)) && locallyInside(p, hole)) {\n                m = p;\n                tanMin = tan;\n            }\n        }\n\n        p = p.next;\n    }\n\n    return m;\n}\n\n// interlink polygon nodes in z-order\nfunction indexCurve(start, minX, minY, invSize) {\n    var p = start;\n    do {\n        if (p.z === null) p.z = zOrder(p.x, p.y, minX, minY, invSize);\n        p.prevZ = p.prev;\n        p.nextZ = p.next;\n        p = p.next;\n    } while (p !== start);\n\n    p.prevZ.nextZ = null;\n    p.prevZ = null;\n\n    sortLinked(p);\n}\n\n// Simon Tatham's linked list merge sort algorithm\n// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html\nfunction sortLinked(list) {\n    var i, p, q, e, tail, numMerges, pSize, qSize,\n        inSize = 1;\n\n    do {\n        p = list;\n        list = null;\n        tail = null;\n        numMerges = 0;\n\n        while (p) {\n            numMerges++;\n            q = p;\n            pSize = 0;\n            for (i = 0; i < inSize; i++) {\n                pSize++;\n                q = q.nextZ;\n                if (!q) break;\n            }\n            qSize = inSize;\n\n            while (pSize > 0 || (qSize > 0 && q)) {\n\n                if (pSize !== 0 && (qSize === 0 || !q || p.z <= q.z)) {\n                    e = p;\n                    p = p.nextZ;\n                    pSize--;\n                } else {\n                    e = q;\n                    q = q.nextZ;\n                    qSize--;\n                }\n\n                if (tail) tail.nextZ = e;\n                else list = e;\n\n                e.prevZ = tail;\n                tail = e;\n            }\n\n            p = q;\n        }\n\n        tail.nextZ = null;\n        inSize *= 2;\n\n    } while (numMerges > 1);\n\n    return list;\n}\n\n// z-order of a point given coords and inverse of the longer side of data bbox\nfunction zOrder(x, y, minX, minY, invSize) {\n    // coords are transformed into non-negative 15-bit integer range\n    x = 32767 * (x - minX) * invSize;\n    y = 32767 * (y - minY) * invSize;\n\n    x = (x | (x << 8)) & 0x00FF00FF;\n    x = (x | (x << 4)) & 0x0F0F0F0F;\n    x = (x | (x << 2)) & 0x33333333;\n    x = (x | (x << 1)) & 0x55555555;\n\n    y = (y | (y << 8)) & 0x00FF00FF;\n    y = (y | (y << 4)) & 0x0F0F0F0F;\n    y = (y | (y << 2)) & 0x33333333;\n    y = (y | (y << 1)) & 0x55555555;\n\n    return x | (y << 1);\n}\n\n// find the leftmost node of a polygon ring\nfunction getLeftmost(start) {\n    var p = start,\n        leftmost = start;\n    do {\n        if (p.x < leftmost.x) leftmost = p;\n        p = p.next;\n    } while (p !== start);\n\n    return leftmost;\n}\n\n// check if a point lies within a convex triangle\nfunction pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {\n    return (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 &&\n           (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 &&\n           (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0;\n}\n\n// check if a diagonal between two polygon nodes is valid (lies in polygon interior)\nfunction isValidDiagonal(a, b) {\n    return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) &&\n           locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b);\n}\n\n// signed area of a triangle\nfunction area(p, q, r) {\n    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);\n}\n\n// check if two points are equal\nfunction equals(p1, p2) {\n    return p1.x === p2.x && p1.y === p2.y;\n}\n\n// check if two segments intersect\nfunction intersects(p1, q1, p2, q2) {\n    if ((equals(p1, q1) && equals(p2, q2)) ||\n        (equals(p1, q2) && equals(p2, q1))) return true;\n    return area(p1, q1, p2) > 0 !== area(p1, q1, q2) > 0 &&\n           area(p2, q2, p1) > 0 !== area(p2, q2, q1) > 0;\n}\n\n// check if a polygon diagonal intersects any polygon segments\nfunction intersectsPolygon(a, b) {\n    var p = a;\n    do {\n        if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i &&\n                intersects(p, p.next, a, b)) return true;\n        p = p.next;\n    } while (p !== a);\n\n    return false;\n}\n\n// check if a polygon diagonal is locally inside the polygon\nfunction locallyInside(a, b) {\n    return area(a.prev, a, a.next) < 0 ?\n        area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 :\n        area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;\n}\n\n// check if the middle point of a polygon diagonal is inside the polygon\nfunction middleInside(a, b) {\n    var p = a,\n        inside = false,\n        px = (a.x + b.x) / 2,\n        py = (a.y + b.y) / 2;\n    do {\n        if (((p.y > py) !== (p.next.y > py)) && p.next.y !== p.y &&\n                (px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x))\n            inside = !inside;\n        p = p.next;\n    } while (p !== a);\n\n    return inside;\n}\n\n// link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;\n// if one belongs to the outer ring and another to a hole, it merges it into a single ring\nfunction splitPolygon(a, b) {\n    var a2 = new Node(a.i, a.x, a.y),\n        b2 = new Node(b.i, b.x, b.y),\n        an = a.next,\n        bp = b.prev;\n\n    a.next = b;\n    b.prev = a;\n\n    a2.next = an;\n    an.prev = a2;\n\n    b2.next = a2;\n    a2.prev = b2;\n\n    bp.next = b2;\n    b2.prev = bp;\n\n    return b2;\n}\n\n// create a node and optionally link it with previous one (in a circular doubly linked list)\nfunction insertNode(i, x, y, last) {\n    var p = new Node(i, x, y);\n\n    if (!last) {\n        p.prev = p;\n        p.next = p;\n\n    } else {\n        p.next = last.next;\n        p.prev = last;\n        last.next.prev = p;\n        last.next = p;\n    }\n    return p;\n}\n\nfunction removeNode(p) {\n    p.next.prev = p.prev;\n    p.prev.next = p.next;\n\n    if (p.prevZ) p.prevZ.nextZ = p.nextZ;\n    if (p.nextZ) p.nextZ.prevZ = p.prevZ;\n}\n\nfunction Node(i, x, y) {\n    // vertice index in coordinates array\n    this.i = i;\n\n    // vertex coordinates\n    this.x = x;\n    this.y = y;\n\n    // previous and next vertice nodes in a polygon ring\n    this.prev = null;\n    this.next = null;\n\n    // z-order curve value\n    this.z = null;\n\n    // previous and next nodes in z-order\n    this.prevZ = null;\n    this.nextZ = null;\n\n    // indicates whether this is a steiner point\n    this.steiner = false;\n}\n\n// return a percentage difference between the polygon area and its triangulation area;\n// used to verify correctness of triangulation\nearcut.deviation = function (data, holeIndices, dim, triangles) {\n    var hasHoles = holeIndices && holeIndices.length;\n    var outerLen = hasHoles ? holeIndices[0] * dim : data.length;\n\n    var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));\n    if (hasHoles) {\n        for (var i = 0, len = holeIndices.length; i < len; i++) {\n            var start = holeIndices[i] * dim;\n            var end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;\n            polygonArea -= Math.abs(signedArea(data, start, end, dim));\n        }\n    }\n\n    var trianglesArea = 0;\n    for (i = 0; i < triangles.length; i += 3) {\n        var a = triangles[i] * dim;\n        var b = triangles[i + 1] * dim;\n        var c = triangles[i + 2] * dim;\n        trianglesArea += Math.abs(\n            (data[a] - data[c]) * (data[b + 1] - data[a + 1]) -\n            (data[a] - data[b]) * (data[c + 1] - data[a + 1]));\n    }\n\n    return polygonArea === 0 && trianglesArea === 0 ? 0 :\n        Math.abs((trianglesArea - polygonArea) / polygonArea);\n};\n\nfunction signedArea(data, start, end, dim) {\n    var sum = 0;\n    for (var i = start, j = end - dim; i < end; i += dim) {\n        sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);\n        j = i;\n    }\n    return sum;\n}\n\n// turn a polygon in a multi-dimensional array form (e.g. as in GeoJSON) into a form Earcut accepts\nearcut.flatten = function (data) {\n    var dim = data[0][0].length,\n        result = {vertices: [], holes: [], dimensions: dim},\n        holeIndex = 0;\n\n    for (var i = 0; i < data.length; i++) {\n        for (var j = 0; j < data[i].length; j++) {\n            for (var d = 0; d < dim; d++) result.vertices.push(data[i][j][d]);\n        }\n        if (i > 0) {\n            holeIndex += data[i - 1].length;\n            result.holes.push(holeIndex);\n        }\n    }\n    return result;\n};\n\n\n//# sourceURL=webpack:///./node_modules/earcut/src/earcut.js?");

/***/ }),

/***/ "./node_modules/oimo/build/oimo.module.js":
/*!************************************************!*\
  !*** ./node_modules/oimo/build/oimo.module.js ***!
  \************************************************/
/*! exports provided: Math, Vec3, Quat, Mat33, Shape, Box, Sphere, Cylinder, Plane, Particle, ShapeConfig, LimitMotor, HingeJoint, BallAndSocketJoint, DistanceJoint, PrismaticJoint, SliderJoint, WheelJoint, JointConfig, RigidBody, World, REVISION, BR_NULL, BR_BRUTE_FORCE, BR_SWEEP_AND_PRUNE, BR_BOUNDING_VOLUME_TREE, BODY_NULL, BODY_DYNAMIC, BODY_STATIC, BODY_KINEMATIC, BODY_GHOST, SHAPE_NULL, SHAPE_SPHERE, SHAPE_BOX, SHAPE_CYLINDER, SHAPE_PLANE, SHAPE_PARTICLE, SHAPE_TETRA, JOINT_NULL, JOINT_DISTANCE, JOINT_BALL_AND_SOCKET, JOINT_HINGE, JOINT_WHEEL, JOINT_SLIDER, JOINT_PRISMATIC, AABB_PROX, printError, InfoDisplay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\r\n\r\n// This works in non-strict mode\r\ng = (function() {\r\n\treturn this;\r\n})();\r\n\r\ntry {\r\n\t// This works if eval is allowed (see CSP)\r\n\tg = g || Function(\"return this\")() || (1, eval)(\"this\");\r\n} catch (e) {\r\n\t// This works if the window reference is available\r\n\tif (typeof window === \"object\") g = window;\r\n}\r\n\r\n// g can still be undefined, but nothing to do about it...\r\n// We return undefined, instead of nothing here, so it's\r\n// easier to handle this case. if(!global) { ...}\r\n\r\nmodule.exports = g;\r\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ })

/******/ });