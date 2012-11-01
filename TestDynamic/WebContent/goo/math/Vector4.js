define(["goo/math/Vector"], function(Vector) {
	"use strict";

	Vector4.prototype = Object.create(Vector.prototype);
	Vector4.prototype.setupAliases([['x', 'r'], ['y', 'g'], ['z', 'b'], ['w', 'a']]);

	/**
	 * @name Vector4
	 * @class Vector with 4 components.
	 * @extends Vector
	 * @constructor
	 * @description Creates a new vector.
	 * @param {Float...} arguments Initial values for the components.
	 */

	function Vector4() {
		Vector.call(this, 4);
		this.set(arguments);
	}

	/**
	 * @static
	 * @description Performs a component-wise addition between two vectors and stores the result in a separate vector.
	 * @param {Vector4} lhs Vector on the left-hand side.
	 * @param {Vector4} rhs Vector on the right-hand side.
	 * @param {Vector4} target Target vector for storage. (optional)
	 * @returns {Vector4} A new vector if the target vector cannot be used for storage, else the target vector.
	 */

	Vector4.add = function(lhs, rhs, target) {
		if (!target) {
			target = new Vector4();
		}

		target.x = lhs.x + rhs.x;
		target.y = lhs.y + rhs.y;
		target.z = lhs.z + rhs.z;
		target.w = lhs.w + rhs.w;

		return target;
	};

	/**
	 * @static
	 * @description Performs a component-wise subtraction between two vectors and stores the result in a separate vector.
	 * @param {Vector4} lhs Vector on the left-hand side.
	 * @param {Vector4} rhs Vector on the right-hand side.
	 * @param {Vector4} target Target vector for storage. (optional)
	 * @returns {Vector4} A new vector if the target vector cannot be used for storage, else the target vector.
	 */

	Vector4.sub = function(lhs, rhs, target) {
		if (!target) {
			target = new Vector4();
		}

		target.x = lhs.x - rhs.x;
		target.y = lhs.y - rhs.y;
		target.z = lhs.z - rhs.z;
		target.w = lhs.w - rhs.w;

		return target;
	};

	/**
	 * @static
	 * @description Performs a component-wise multiplication between two vectors and stores the result in a separate vector.
	 * @param {Vector4} lhs Vector on the left-hand side.
	 * @param {Vector4} rhs Vector on the right-hand side.
	 * @param {Vector4} target Target vector for storage. (optional)
	 * @returns {Vector4} A new vector if the target vector cannot be used for storage, else the target vector.
	 */

	Vector4.mul = function(lhs, rhs, target) {
		if (!target) {
			target = new Vector4();
		}

		target.x = lhs.x * rhs.x;
		target.y = lhs.y * rhs.y;
		target.z = lhs.z * rhs.z;
		target.w = lhs.w * rhs.w;

		return target;
	};

	/**
	 * @static
	 * @description Performs a component-wise division between two vectors and stores the result in a separate vector.
	 * @param {Vector4} lhs Vector on the left-hand side.
	 * @param {Vector4} rhs Vector on the right-hand side.
	 * @param {Vector4} target Target vector for storage. (optional)
	 * @returns {Vector4} A new vector if the target vector cannot be used for storage, else the target vector.
	 */

	Vector4.div = function(lhs, rhs, target) {
		if (!target) {
			target = new Vector4();
		}

		var clean = true;

		target.x = (clean &= (rhs.x < 0.0 || rhs.x > 0.0)) ? lhs.x / rhs.x : 0.0;
		target.y = (clean &= (rhs.y < 0.0 || rhs.y > 0.0)) ? lhs.y / rhs.y : 0.0;
		target.z = (clean &= (rhs.z < 0.0 || rhs.z > 0.0)) ? lhs.z / rhs.z : 0.0;
		target.w = (clean &= (rhs.w < 0.0 || rhs.w > 0.0)) ? lhs.w / rhs.w : 0.0;

		if (clean == false) {
			console.warn("[Vector4.div] Attempted to divide by zero!");
		}

		return target;
	};

	/**
	 * @static
	 * @description Performs a component-wise addition between a vector and a scalar and stores the result in a separate vector.
	 * @param {Vector4} lhs Vector on the left-hand side.
	 * @param {Float} rhs Scalar on the right-hand side.
	 * @param {Vector4} target Target vector for storage. (optional)
	 * @returns {Vector4} A new vector if the target vector cannot be used for storage, else the target vector.
	 */

	Vector4.scalarAdd = function(lhs, rhs, target) {
		if (!target) {
			target = new Vector4();
		}

		target.x = lhs.x + rhs;
		target.y = lhs.y + rhs;
		target.z = lhs.z + rhs;
		target.w = lhs.w + rhs;

		return target;
	};

	/**
	 * @static
	 * @description Performs a component-wise subtraction between a vector and a scalar and stores the result in a separate vector.
	 * @param {Vector4} lhs Vector on the left-hand side.
	 * @param {Float} rhs Scalar on the right-hand side.
	 * @param {Vector4} target Target vector for storage. (optional)
	 * @returns {Vector4} A new vector if the target vector cannot be used for storage, else the target vector.
	 */

	Vector4.scalarSub = function(lhs, rhs, target) {
		if (!target) {
			target = new Vector4();
		}

		target.x = lhs.x - rhs;
		target.y = lhs.y - rhs;
		target.z = lhs.z - rhs;
		target.w = lhs.w - rhs;

		return target;
	};

	/**
	 * @static
	 * @description Performs a component-wise multiplication between a vector and a scalar and stores the result in a separate vector.
	 * @param {Vector4} lhs Vector on the left-hand side.
	 * @param {Float} rhs Scalar on the right-hand side.
	 * @param {Vector4} target Target vector for storage. (optional)
	 * @returns {Vector4} A new vector if the target vector cannot be used for storage, else the target vector.
	 */

	Vector4.scalarMul = function(lhs, rhs, target) {
		if (!target) {
			target = new Vector4();
		}

		target.x = lhs.x * rhs;
		target.y = lhs.y * rhs;
		target.z = lhs.z * rhs;
		target.w = lhs.w * rhs;

		return target;
	};

	/**
	 * @static
	 * @description Performs a component-wise division between a vector and a scalar and stores the result in a separate vector.
	 * @param {Vector4} lhs Vector on the left-hand side.
	 * @param {Float} rhs Scalar on the right-hand side.
	 * @param {Vector4} target Target vector for storage. (optional)
	 * @returns {Vector4} A new vector if the target vector cannot be used for storage, else the target vector.
	 */

	Vector4.scalarDiv = function(lhs, rhs, target) {
		if (!target) {
			target = new Vector4();
		}

		if (rhs < 0.0 || rhs > 0.0) {
			rhs = 1.0 / rhs;

			target.x = lhs.x * rhs;
			target.y = lhs.y * rhs;
			target.z = lhs.z * rhs;
			target.w = lhs.w * rhs;
		} else {
			console.warn("[Vector4.scalarDiv] Attempted to divide by zero!");
		}

		return target;
	};

	return Vector4;
});
