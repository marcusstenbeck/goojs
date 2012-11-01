define(["goo/math/Vector"], function(Vector) {
	"use strict";

	Vector2.prototype = Object.create(Vector.prototype);
	Vector2.prototype.setupAliases([['x', 'u', 's'], ['y', 'v', 't']]);

	/**
	 * @name Vector2
	 * @class Vector with 2 components.
	 * @extends Vector
	 * @constructor
	 * @description Creates a new vector.
	 * @param {Float...} arguments Initial values for the components.
	 */

	function Vector2() {
		Vector.call(this, 2);
		this.set(arguments);
	}

	/**
	 * @static
	 * @description Performs a component-wise addition between two vectors and stores the result in a separate vector.
	 * @param {Vector2} lhs Vector on the left-hand side.
	 * @param {Vector2} rhs Vector on the right-hand side.
	 * @param {Vector2} target Target vector for storage. (optional)
	 * @returns {Vector2} A new vector if the target vector cannot be used for storage, else the target vector.
	 */

	Vector2.add = function(lhs, rhs, target) {
		if (!target) {
			target = new Vector2();
		}

		target.x = lhs.x + rhs.x;
		target.y = lhs.y + rhs.y;

		return target;
	};

	/**
	 * @static
	 * @description Performs a component-wise subtraction between two vectors and stores the result in a separate vector.
	 * @param {Vector2} lhs Vector on the left-hand side.
	 * @param {Vector2} rhs Vector on the right-hand side.
	 * @param {Vector2} target Target vector for storage. (optional)
	 * @returns {Vector2} A new vector if the target vector cannot be used for storage, else the target vector.
	 */

	Vector2.sub = function(lhs, rhs, target) {
		if (!target) {
			target = new Vector2();
		}

		target.x = lhs.x - rhs.x;
		target.y = lhs.y - rhs.y;

		return target;
	};

	/**
	 * @static
	 * @description Performs a component-wise multiplication between two vectors and stores the result in a separate vector.
	 * @param {Vector2} lhs Vector on the left-hand side.
	 * @param {Vector2} rhs Vector on the right-hand side.
	 * @param {Vector2} target Target vector for storage. (optional)
	 * @returns {Vector2} A new vector if the target vector cannot be used for storage, else the target vector.
	 */

	Vector2.mul = function(lhs, rhs, target) {
		if (!target) {
			target = new Vector2();
		}

		target.x = lhs.x * rhs.x;
		target.y = lhs.y * rhs.y;

		return target;
	};

	/**
	 * @static
	 * @description Performs a component-wise division between two vectors and stores the result in a separate vector.
	 * @param {Vector2} lhs Vector on the left-hand side.
	 * @param {Vector2} rhs Vector on the right-hand side.
	 * @param {Vector2} target Target vector for storage. (optional)
	 * @returns {Vector2} A new vector if the target vector cannot be used for storage, else the target vector.
	 */

	Vector2.div = function(lhs, rhs, target) {
		if (!target) {
			target = new Vector2();
		}

		target.x = rhs.x < 0.0 || rhs.x > 0.0 ? lhs.x / rhs.x : lhs.x;
		target.y = rhs.y < 0.0 || rhs.y > 0.0 ? lhs.y / rhs.y : lhs.y;

		return target;
	};

	/**
	 * @static
	 * @description Performs a component-wise addition between a vector and a scalar and stores the result in a separate vector.
	 * @param {Vector2} lhs Vector on the left-hand side.
	 * @param {Float} rhs Scalar on the right-hand side.
	 * @param {Vector2} target Target vector for storage. (optional)
	 * @returns {Vector2} A new vector if the target vector cannot be used for storage, else the target vector.
	 */

	Vector2.scalarAdd = function(lhs, rhs, target) {
		if (!target) {
			target = new Vector2();
		}

		target.x = lhs.x + rhs;
		target.y = lhs.y + rhs;

		return target;
	};

	/**
	 * @static
	 * @description Performs a component-wise subtraction between a vector and a scalar and stores the result in a separate vector.
	 * @param {Vector2} lhs Vector on the left-hand side.
	 * @param {Float} rhs Scalar on the right-hand side.
	 * @param {Vector2} target Target vector for storage. (optional)
	 * @returns {Vector2} A new vector if the target vector cannot be used for storage, else the target vector.
	 */

	Vector2.scalarSub = function(lhs, rhs, target) {
		if (!target) {
			target = new Vector2();
		}

		target.x = lhs.x - rhs;
		target.y = lhs.y - rhs;

		return target;
	};

	/**
	 * @static
	 * @description Performs a component-wise multiplication between a vector and a scalar and stores the result in a separate vector.
	 * @param {Vector2} lhs Vector on the left-hand side.
	 * @param {Float} rhs Scalar on the right-hand side.
	 * @param {Vector2} target Target vector for storage. (optional)
	 * @returns {Vector2} A new vector if the target vector cannot be used for storage, else the target vector.
	 */

	Vector2.scalarMul = function(lhs, rhs, target) {
		if (!target) {
			target = new Vector2();
		}

		target.x = lhs.x * rhs;
		target.y = lhs.y * rhs;

		return target;
	};

	/**
	 * @static
	 * @description Performs a component-wise division between a vector and a scalar and stores the result in a separate vector.
	 * @param {Vector2} lhs Vector on the left-hand side.
	 * @param {Float} rhs Scalar on the right-hand side.
	 * @param {Vector2} target Target vector for storage. (optional)
	 * @returns {Vector2} A new vector if the target vector cannot be used for storage, else the target vector.
	 */

	Vector2.scalarDiv = function(lhs, rhs, target) {
		if (!target) {
			target = new Vector2();
		}

		if (rhs < 0.0 || rhs > 0.0) {
			rhs = 1.0 / rhs;

			target.x = lhs.x * rhs;
			target.y = lhs.y * rhs;
		} else {
			console.warn("[Vector2.scalarDiv] Attempted to divide by zero!");
		}

		return target;
	};

	return Vector2;
});
