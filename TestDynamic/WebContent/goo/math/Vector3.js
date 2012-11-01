define(["goo/math/Vector"], function(Vector) {
	"use strict";

	Vector3.prototype = Object.create(Vector.prototype);
	Vector3.prototype.setupAliases([['x', 'r'], ['y', 'g'], ['z', 'b']]);

	/**
	 * @name Vector3
	 * @class Vector with 3 components.
	 * @extends Vector
	 * @constructor
	 * @description Creates a new vector.
	 * @param {Float...} arguments Initial values for the components.
	 */

	function Vector3() {
		Vector.call(this, 3);
		this.set(arguments);
	}

	/**
	 * @static
	 * @description Performs a component-wise addition between two vectors and stores the result in a separate vector.
	 * @param {Vector3} lhs Vector on the left-hand side.
	 * @param {Vector3} rhs Vector on the right-hand side.
	 * @param {Vector3} target Target vector for storage. (optional)
	 * @returns {Vector3} A new vector if the target vector cannot be used for storage, else the target vector.
	 */

	Vector3.add = function(lhs, rhs, target) {
		if (!target) {
			target = new Vector3();
		}

		target.x = lhs.x + rhs.x;
		target.y = lhs.y + rhs.y;
		target.z = lhs.z + rhs.z;

		return target;
	};

	/**
	 * @static
	 * @description Performs a component-wise subtraction between two vectors and stores the result in a separate vector.
	 * @param {Vector3} lhs Vector on the left-hand side.
	 * @param {Vector3} rhs Vector on the right-hand side.
	 * @param {Vector3} target Target vector for storage. (optional)
	 * @returns {Vector3} A new vector if the target vector cannot be used for storage, else the target vector.
	 */

	Vector3.sub = function(lhs, rhs, target) {
		if (!target) {
			target = new Vector3();
		}

		target.x = lhs.x - rhs.x;
		target.y = lhs.y - rhs.y;
		target.z = lhs.z - rhs.z;

		return target;
	};

	/**
	 * @static
	 * @description Performs a component-wise multiplication between two vectors and stores the result in a separate vector.
	 * @param {Vector3} lhs Vector on the left-hand side.
	 * @param {Vector3} rhs Vector on the right-hand side.
	 * @param {Vector3} target Target vector for storage. (optional)
	 * @returns {Vector3} A new vector if the target vector cannot be used for storage, else the target vector.
	 */

	Vector3.mul = function(lhs, rhs, target) {
		if (!target) {
			target = new Vector3();
		}

		target.x = lhs.x * rhs.x;
		target.y = lhs.y * rhs.y;
		target.z = lhs.z * rhs.z;

		return target;
	};

	/**
	 * @static
	 * @description Performs a component-wise division between two vectors and stores the result in a separate vector.
	 * @param {Vector3} lhs Vector on the left-hand side.
	 * @param {Vector3} rhs Vector on the right-hand side.
	 * @param {Vector3} target Target vector for storage. (optional)
	 * @returns {Vector3} A new vector if the target vector cannot be used for storage, else the target vector.
	 */

	Vector3.div = function(lhs, rhs, target) {
		if (!target) {
			target = new Vector3();
		}

		target.x = rhs.x < 0.0 || rhs.x > 0.0 ? lhs.x / rhs.x : lhs.x;
		target.y = rhs.y < 0.0 || rhs.y > 0.0 ? lhs.y / rhs.y : lhs.y;
		target.z = rhs.z < 0.0 || rhs.z > 0.0 ? lhs.z / rhs.z : lhs.z;

		return target;
	};

	/**
	 * @static
	 * @description Performs a component-wise addition between a vector and a scalar and stores the result in a separate vector.
	 * @param {Vector3} lhs Vector on the left-hand side.
	 * @param {Float} rhs Scalar on the right-hand side.
	 * @param {Vector3} target Target vector for storage. (optional)
	 * @returns {Vector3} A new vector if the target vector cannot be used for storage, else the target vector.
	 */

	Vector3.scalarAdd = function(lhs, rhs, target) {
		if (!target) {
			target = new Vector3();
		}

		target.x = lhs.x + rhs;
		target.y = lhs.y + rhs;
		target.z = lhs.z + rhs;

		return target;
	};

	/**
	 * @static
	 * @description Performs a component-wise subtraction between a vector and a scalar and stores the result in a separate vector.
	 * @param {Vector3} lhs Vector on the left-hand side.
	 * @param {Float} rhs Scalar on the right-hand side.
	 * @param {Vector3} target Target vector for storage. (optional)
	 * @returns {Vector3} A new vector if the target vector cannot be used for storage, else the target vector.
	 */

	Vector3.scalarSub = function(lhs, rhs, target) {
		if (!target) {
			target = new Vector3();
		}

		target.x = lhs.x - rhs;
		target.y = lhs.y - rhs;
		target.z = lhs.z - rhs;

		return target;
	};

	/**
	 * @static
	 * @description Performs a component-wise multiplication between a vector and a scalar and stores the result in a separate vector.
	 * @param {Vector3} lhs Vector on the left-hand side.
	 * @param {Float} rhs Scalar on the right-hand side.
	 * @param {Vector3} target Target vector for storage. (optional)
	 * @returns {Vector3} A new vector if the target vector cannot be used for storage, else the target vector.
	 */

	Vector3.scalarMul = function(lhs, rhs, target) {
		if (!target) {
			target = new Vector3();
		}

		target.x = lhs.x * rhs;
		target.y = lhs.y * rhs;
		target.z = lhs.z * rhs;

		return target;
	};

	/**
	 * @static
	 * @description Performs a component-wise division between a vector and a scalar and stores the result in a separate vector.
	 * @param {Vector3} lhs Vector on the left-hand side.
	 * @param {Float} rhs Scalar on the right-hand side.
	 * @param {Vector3} target Target vector for storage. (optional)
	 * @returns {Vector3} A new vector if the target vector cannot be used for storage, else the target vector.
	 */

	Vector3.scalarDiv = function(lhs, rhs, target) {
		if (!target) {
			target = new Vector3();
		}

		if (rhs < 0.0 || rhs > 0.0) {
			rhs = 1.0 / rhs;

			target.x = lhs.x * rhs;
			target.y = lhs.y * rhs;
			target.z = lhs.z * rhs;
		} else {
			console.warn("[Vector3.scalarDiv] Attempted to divide by zero!");
		}

		return target;
	};

	/**
	 * @static
	 * @description Computes the cross product of two vectors and stores the result in a separate vector.
	 * @param {Vector3} lhs Vector on the left-hand side.
	 * @param {Vector3} rhs Vector on the right-hand side.
	 * @param {Vector3} target Target vector for storage. (optional)
	 * @returns {Vector3} Resulting vector.
	 */

	Vector3.cross = function(lhs, rhs, target) {
		if (!target) {
			target = new Vector3();
		}

		target.x = rhs.z * lhs.y - rhs.y * lhs.z;
		target.y = rhs.x * lhs.z - rhs.z * lhs.x;
		target.z = rhs.y * lhs.x - rhs.x * lhs.y;

		return target;
	};

	/**
	 * @description Computes the cross product and stores the result locally.
	 * @param {Vector3} rhs Vector on the right-hand side.
	 * @returns {Vector3} Self for chaining.
	 */

	Vector3.prototype.cross = function(vector) {
		return Vector3.cross(this, vector, this);
	};

	return Vector3;
});
