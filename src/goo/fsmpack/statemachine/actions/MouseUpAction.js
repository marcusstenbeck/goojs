define([
	'goo/fsmpack/statemachine/actions/Action'
], function (
	Action
) {
	'use strict';

	function MouseUpAction(/*id, settings*/) {
		Action.apply(this, arguments);
	}

	MouseUpAction.prototype = Object.create(Action.prototype);
	MouseUpAction.prototype.constructor = MouseUpAction;

	MouseUpAction.external = {
		name: 'Mouse Up / Touch end',
		type: 'controls',
		description: 'Listens for a mouseup event (or touchend) on the canvas and performs a transition',
		canTransition: true,
		parameters: [],
		transitions: [{
			key: 'mouseLeftUp',
			name: 'Left mouse up',
			description: 'State to transition to when the left mouse button is released'
		}, {
			key: 'middleMouseUp',
			name: 'Middle mouse up',
			description: 'State to transition to when the middle mouse button is released'
		}, {
			key: 'rightMouseUp',
			name: 'Right mouse up',
			description: 'State to transition to when the right mouse button is released'
		}, {
			key: 'touchUp',
			name: 'Touch release',
			description: 'State to transition to when the touch event ends'
		}]
	};

	MouseUpAction.prototype.enter = function (fsm) {
		var update = function (button) {
			if (button === 'touch') {
				fsm.send(this.transitions.touchUp);
			} else {
				fsm.send([
					this.transitions.mouseLeftUp,
					this.transitions.middleMouseUp,
					this.transitions.rightMouseUp
				][button]);
			}
		}.bind(this);

		this.mouseEventListener = function (event) {
			update(event.button);
		}.bind(this);

		this.touchEventListener = function () {
			update('touch');
		}.bind(this);

		document.addEventListener('mouseup', this.mouseEventListener);
		document.addEventListener('touchend', this.touchEventListener);
	};

	MouseUpAction.prototype.exit = function () {
		document.removeEventListener('mouseup', this.mouseEventListener);
		document.removeEventListener('touchend', this.touchEventListener);
	};

	return MouseUpAction;
});