"use strict";

require(["goo/math/Vector", "goo/math/Vector2", "goo/math/Vector3", "goo/math/Vector4", "goo/math/Matrix", "goo/math/Matrix2x2",
		"goo/math/Matrix3x3", "goo/math/Matrix4x4"], function(Vector, Vector2, Vector3, Vector4, Matrix, Matrix2x2, Matrix3x3, Matrix4x4) {

	function init() {
		testVector();
		testVector2();
		testVector3();
		testVector4();
		testMatrix();
		testMatrix2x2();
		testMatrix3x3();
		testMatrix4x4();
	}

	function testVector() {
		console.log("\nTesting Vector\n");

		var a = new Vector(2).set(3.0, 4.0);
		console.log(Vector.add(a, a, a) + " expected [ 6.0, 8.0 ]");

		var b = new Vector(2).set(3.0, 4.0);
		console.log(Vector.sub(b, b, b) + " expected [ 0.0, 0.0 ]");

		var c = new Vector(2).set(3.0, 4.0);
		console.log(Vector.mul(c, c, c) + " expected [ 9.0, 16.0 ]");

		var d = new Vector(2).set(3.0, 4.0);
		console.log(Vector.div(d, d, d) + " expected [ 1.0, 1.0 ]");

		var e = new Vector(2).set(3.0, 4.0);
		console.log(Vector.scalarAdd(e, 2.0, e) + " expected [ 5.0, 6.0 ]");

		var f = new Vector(2).set(3.0, 4.0);
		console.log(Vector.scalarSub(f, 2.0, f) + " expected [ 1.0, 2.0 ]");

		var g = new Vector(2).set(3.0, 4.0);
		console.log(Vector.scalarMul(g, 2.0, g) + " expected [ 6.0, 8.0 ]");

		var h = new Vector(2).set(3.0, 4.0);
		console.log(Vector.scalarDiv(h, 2.0, h) + " expected [ 1.5, 2.0 ]");

		var i = new Vector(2).set(3.0, 4.0);
		console.log(i.invert() + " expected [ -3.0, -4.0 ]");

		var j = new Vector(2).copy(i);
		console.log(j + " expected [ -3.0, -4.0 ]");

		var k = new Vector(2).set(3.0, 4.0);
		console.log(k + " expected [ 3.0, 4.0 ]");
		console.log(Vector.dot(k, k) + " expected 25.0");
		console.log(k.length() + " expected 5.0");
		console.log(k.normalize() + " expected [ ~0.6, ~0.8 ]");
	}

	function testVector2() {
		console.log("\nTesting Vector2\n");

		var a = new Vector2(1.0, 2.0);
		console.log(a + " expected [ 1.0, 2.0 ]");

		a[0] = 2.0;
		a[1] = 3.0;

		console.log(a + " expected [ 2.0, 3.0 ]");
		console.log(a[0] + " expected 2.0");
		console.log(a[1] + " expected 3.0");

		a.x = 1.0;
		a.y = 2.0;

		console.log(a + " expected [ 1.0, 2.0 ]");
		console.log(a.x + " expected 1.0");
		console.log(a.y + " expected 2.0");

		a['x'] = 2.0;
		a['y'] = 3.0;

		console.log(a + " expected [ 2.0, 3.0 ]");
		console.log(a['x'] + " expected 2.0");
		console.log(a['y'] + " expected 3.0");

		a.u = 1.0;
		a.v = 2.0;

		console.log(a + " expected [ 1.0, 2.0 ]");
		console.log(a.u + " expected 1.0");
		console.log(a.v + " expected 2.0");

		a['u'] = 2.0;
		a['v'] = 3.0;

		console.log(a + " expected [ 2.0, 3.0 ]");
		console.log(a['u'] + " expected 2.0");
		console.log(a['v'] + " expected 3.0");

		a.s = 1.0;
		a.t = 2.0;

		console.log(a + " expected [ 1.0, 2.0 ]");
		console.log(a.s + " expected 1.0");
		console.log(a.t + " expected 2.0");

		a['s'] = 2.0;
		a['t'] = 3.0;

		console.log(a + " expected [ 2.0, 3.0 ]");
		console.log(a['s'] + " expected 2.0");
		console.log(a['t'] + " expected 3.0");
	}

	function testVector3() {
		console.log("\nTesting Vector3\n");

		var a = new Vector3(1.0, 2.0, 3.0);
		console.log(a + " expected [ 1.0, 2.0, 3.0 ]");

		a[0] = 2.0;
		a[1] = 3.0;
		a[2] = 4.0;

		console.log(a + " expected [ 2.0, 3.0, 4.0 ]");
		console.log(a[0] + " expected 2.0");
		console.log(a[1] + " expected 3.0");
		console.log(a[2] + " expected 4.0");

		a.x = 1.0;
		a.y = 2.0;
		a.z = 3.0;

		console.log(a + " expected [ 1.0, 2.0, 3.0 ]");
		console.log(a.x + " expected 1.0");
		console.log(a.y + " expected 2.0");
		console.log(a.z + " expected 3.0");

		a['x'] = 2.0;
		a['y'] = 3.0;
		a['z'] = 4.0;

		console.log(a + " expected [ 2.0, 3.0, 4.0 ]");
		console.log(a['x'] + " expected 2.0");
		console.log(a['y'] + " expected 3.0");
		console.log(a['z'] + " expected 4.0");

		a.r = 1.0;
		a.g = 2.0;
		a.b = 3.0;

		console.log(a + " expected [ 1.0, 2.0, 3.0 ]");
		console.log(a.r + " expected 1.0");
		console.log(a.g + " expected 2.0");
		console.log(a.b + " expected 3.0");

		a['r'] = 2.0;
		a['g'] = 3.0;
		a['b'] = 4.0;

		console.log(a + " expected [ 2.0, 3.0, 4.0 ]");
		console.log(a['r'] + " expected 2.0");
		console.log(a['g'] + " expected 3.0");
		console.log(a['b'] + " expected 4.0");
	}

	function testVector4() {
		console.log("\nTesting Vector4\n");

		var a = new Vector4(1.0, 2.0, 3.0, 4.0);
		console.log(a + " expected [ 1.0, 2.0, 3.0, 4.0 ]");

		a[0] = 2.0;
		a[1] = 3.0;
		a[2] = 4.0;
		a[3] = 5.0;

		console.log(a + " expected [ 2.0, 3.0, 4.0, 5.0 ]");
		console.log(a[0] + " expected 2.0");
		console.log(a[1] + " expected 3.0");
		console.log(a[2] + " expected 4.0");
		console.log(a[3] + " expected 5.0");

		a.x = 1.0;
		a.y = 2.0;
		a.z = 3.0;
		a.w = 4.0;

		console.log(a + " expected [ 1.0, 2.0, 3.0, 4.0 ]");
		console.log(a.x + " expected 1.0");
		console.log(a.y + " expected 2.0");
		console.log(a.z + " expected 3.0");
		console.log(a.w + " expected 4.0");

		a['x'] = 2.0;
		a['y'] = 3.0;
		a['z'] = 4.0;
		a['w'] = 5.0;

		console.log(a + " expected [ 2.0, 3.0, 4.0, 5.0 ]");
		console.log(a['x'] + " expected 2.0");
		console.log(a['y'] + " expected 3.0");
		console.log(a['z'] + " expected 4.0");
		console.log(a['w'] + " expected 5.0");

		a.r = 1.0;
		a.g = 2.0;
		a.b = 3.0;
		a.a = 4.0;

		console.log(a + " expected [ 1.0, 2.0, 3.0, 4.0 ]");
		console.log(a.r + " expected 1.0");
		console.log(a.g + " expected 2.0");
		console.log(a.b + " expected 3.0");
		console.log(a.a + " expected 4.0");

		a['r'] = 2.0;
		a['g'] = 3.0;
		a['b'] = 4.0;
		a['a'] = 5.0;

		console.log(a + " expected [ 2.0, 3.0, 4.0, 5.0 ]");
		console.log(a['r'] + " expected 2.0");
		console.log(a['g'] + " expected 3.0");
		console.log(a['b'] + " expected 4.0");
		console.log(a['a'] + " expected 5.0");
	}

	function testMatrix() {
		console.log("\nTesting Matrix\n");

		var matrix = new Matrix(2, 2).set(2, 4, 6, 8);

		console.log("Matrix.combine: " + Matrix.combine(matrix, matrix) + " expected " + new Matrix(2, 2).set(28, 40, 60, 88));
		console.log("Matrix.copy: " + Matrix.copy(matrix) + " expected " + new Matrix(2, 2).set(2, 4, 6, 8));
		console.log("Matrix.add: " + Matrix.add(matrix, matrix) + " expected " + new Matrix(2, 2).set(4, 8, 12, 16));
		console.log("Matrix.sub: " + Matrix.sub(matrix, matrix) + " expected " + new Matrix(2, 2).set(0, 0, 0, 0));
		console.log("Matrix.mul: " + Matrix.mul(matrix, matrix) + " expected " + new Matrix(2, 2).set(4, 16, 36, 64));
		console.log("Matrix.div: " + Matrix.div(matrix, matrix) + " expected " + new Matrix(2, 2).set(1, 1, 1, 1));
		console.log("Matrix.scalarAdd: " + Matrix.scalarAdd(matrix, 2) + " expected " + new Matrix(2, 2).set(4, 6, 8, 10));
		console.log("Matrix.scalarSub: " + Matrix.scalarSub(matrix, 2) + " expected " + new Matrix(2, 2).set(0, 2, 4, 6));
		console.log("Matrix.scalarMul: " + Matrix.scalarMul(matrix, 2) + " expected " + new Matrix(2, 2).set(4, 8, 12, 16));
		console.log("Matrix.scalarDiv: " + Matrix.scalarDiv(matrix, 2) + " expected " + new Matrix(2, 2).set(1, 2, 3, 4));
	}

	function testMatrix2x2() {
		console.log("\nTesting Matrix2x2\n");

		var matrix = new Matrix2x2(1, 2, 3, 4);

		console.log("Matrix2x2.combine: " + Matrix2x2.combine(matrix, matrix) + " expected " + new Matrix2x2(7, 10, 15, 22));
	}

	function testMatrix3x3() {
		console.log("\nTesting Matrix3x3\n");

		var matrix = new Matrix3x3(1, 2, 3, 4, 5, 6, 7, 8, 9);

		console.log("Matrix3x3.combine: " + Matrix3x3.combine(matrix, matrix) + " expected " + new Matrix3x3(30, 36, 42, 66, 81, 96, 102, 150));
	}

	function testMatrix4x4() {
		console.log("\nTesting Matrix4x4\n");

		var matrix = new Matrix4x4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);

		console.log("Matrix4x4.combine: " + Matrix4x4.combine(matrix, matrix) + " expected "
			+ new Matrix4x4(90, 100, 110, 120, 202, 228, 254, 280, 314, 356, 398, 440, 426, 484, 542, 600));
	}

	init();
});
