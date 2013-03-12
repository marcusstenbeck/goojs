define([
	'goo/renderer/MeshData',
	'goo/renderer/Shader',
	'goo/renderer/Camera',
	'goo/math/Plane',
	'goo/renderer/pass/RenderTarget',
	'goo/math/Vector3',
	'goo/renderer/Material',
	'goo/renderer/TextureCreator'
],
/** @lends FlatWaterRenderer */
function (
	MeshData,
	Shader,
	Camera,
	Plane,
	RenderTarget,
	Vector3,
	Material,
	TextureCreator
) {
	"use strict";

	/**
	 * @class Handles pre-rendering of water planes. Attach this to the rendersystem pre-renderers.
	 * @param {ArrayBuffer} data Data to wrap
	 * @property {ArrayBuffer} data Data to wrap
	 */
	function FlatWaterRenderer (camera) {
		this.camera = camera;
		this.waterCamera = new Camera(45, 1, 0.1, 2000);
		this.renderList = [];

		this.waterPlane = new Plane();

		var width = window.innerWidth / 2 || 1;
		var height = window.innerHeight / 2 || 1;
		this.renderTarget = new RenderTarget(width, height);

		var waterMaterial = Material.createMaterial(waterShaderDef, 'WaterMaterial');
		waterMaterial.cullState.enabled = false;
		// waterMaterial.textures[0] = new TextureCreator().loadTexture2D('../resources/water/normalmap3.dds');
		waterMaterial.textures[0] = new TextureCreator().loadTexture2D('../resources/water/waternormals3.png');
		waterMaterial.textures[1] = this.renderTarget;
		this.waterMaterial = waterMaterial;

		this.calcVect = new Vector3();
		this.camReflectDir = new Vector3();
		this.camReflectUp = new Vector3();
		this.camReflectLeft = new Vector3();
		this.camLocation = new Vector3();
		this.camReflectPos = new Vector3();

		this.waterEntity = null;
	}

	FlatWaterRenderer.prototype.process = function (renderer, entities, partitioner) {
		var camera = this.camera;
		var waterPlane = this.waterPlane;

		this.waterCamera.copy(camera);
		waterPlane.constant = this.waterEntity.transformComponent.transform.translation.y;

		var aboveWater = camera.translation.y > waterPlane.constant;
		if (aboveWater) {
			var calcVect = this.calcVect;
			var camReflectDir = this.camReflectDir;
			var camReflectUp = this.camReflectUp;
			var camReflectLeft = this.camReflectLeft;
			var camLocation = this.camLocation;
			var camReflectPos = this.camReflectPos;

			camLocation.set(camera.translation);
			var planeDistance = waterPlane.pseudoDistance(camLocation);
			calcVect.set(waterPlane.normal).mul(planeDistance * 2.0);
			camReflectPos.set(camLocation.sub(calcVect));

			camLocation.set(camera.translation).add(camera._direction);
			planeDistance = waterPlane.pseudoDistance(camLocation);
			calcVect.set(waterPlane.normal).mul(planeDistance * 2.0);
			camReflectDir.set(camLocation.sub(calcVect)).sub(camReflectPos).normalize();

			camLocation.set(camera.translation).add(camera._up);
			planeDistance = waterPlane.pseudoDistance(camLocation);
			calcVect.set(waterPlane.normal).mul(planeDistance * 2.0);
			camReflectUp.set(camLocation.sub(calcVect)).sub(camReflectPos).normalize();

			camReflectLeft.set(camReflectUp).cross(camReflectDir).normalize();

			this.waterCamera.translation.set(camReflectPos);
			this.waterCamera._direction.set(camReflectDir);
			this.waterCamera._up.set(camReflectUp);
			this.waterCamera._left.set(camReflectLeft);
			this.waterCamera.normalize();
			this.waterCamera.update();

			if (this.skybox) {
				var target = this.skybox.transformComponent.worldTransform;
				target.translation.setv(camReflectPos);
				target.update();
			}
		}

		this.waterMaterial.shader.uniforms.abovewater = aboveWater;

		this.waterEntity.skip = true;
		// textured1.uniforms.heightLimit = waterPlane.constant;
		// textured2.uniforms.heightLimit = waterPlane.constant;

		this.renderList.length = 0;
		partitioner.process(this.waterCamera, entities, this.renderList);

		renderer.render(this.renderList, this.waterCamera, [], this.renderTarget, true);

		this.waterEntity.skip = false;
		// textured1.uniforms.heightLimit = -10000.0;
		// textured2.uniforms.heightLimit = -10000.0;

		if (aboveWater && this.skybox) {
			var source = camera.translation;
			var target = this.skybox.transformComponent.worldTransform;
			target.translation.setv(source);
			target.update();
		}
	};

	FlatWaterRenderer.prototype.setSkyBox = function (skyboxEntity) {
		this.skybox = skyboxEntity;
	};

	FlatWaterRenderer.prototype.setWaterEntity = function (entity) {
		this.waterEntity = entity;
		this.waterEntity.meshRendererComponent.materials[0] = this.waterMaterial;
	};

	var waterShaderDef = {
		attributes: {
			vertexPosition: MeshData.POSITION,
			vertexNormal: MeshData.NORMAL
		},
		uniforms: {
			viewMatrix: Shader.VIEW_MATRIX,
			projectionMatrix: Shader.PROJECTION_MATRIX,
			worldMatrix: Shader.WORLD_MATRIX,
			cameraPosition: Shader.CAMERA,
			normalMap: Shader.TEXTURE0,
			reflection: Shader.TEXTURE1,
			vertexTangent: [
				1, 0, 0, 1
			],
			waterColor: [
				// 0.1, 0.1, 0.3, 1.0
				0.0, 0.05, 0.1, 1.0
			],
			waterColorEnd: [
				// 0.2, 0.3, 0.3, 1.0
				0.0, 0.1, 0.1, 1.0
			],
			abovewater: true,
			fogColor: [
				237.0 / 255.0, 252.0 / 255.0, 255.0 / 255.0, 1
			],
			sunDirection: [
				0.66, 0.66, 0.33
			],
			fogStart: 300.0,
			fogScale: 1.0 / 1000.0,
			time: Shader.TIME
		},
		vshader: [ //
			'attribute vec3 vertexPosition;', //
			'attribute vec3 vertexNormal;', //

			'uniform vec4 vertexTangent;', //
			'uniform mat4 viewMatrix;', //
			'uniform mat4 projectionMatrix;',//
			'uniform mat4 worldMatrix;',//
			'uniform vec3 cameraPosition;', //
			'uniform float time;',

			'varying vec2 texCoord0;',//
			'varying vec3 eyeVec;',//
			'varying vec4 viewCoords;',
			'varying vec3 worldPos;',

			'void main(void) {', //
			'	worldPos = (worldMatrix * vec4(vertexPosition, 1.0)).xyz;',

			'	texCoord0 = worldPos.xz * 2.0;',//

			'	mat3 normalMatrix = mat3(worldMatrix);',

			// ' vec3 n = normalize(normalMatrix * vertexNormal);',
			'	vec3 n = normalize(normalMatrix * vec3(vertexNormal.x, vertexNormal.y, -vertexNormal.z));',
			'	vec3 t = normalize(normalMatrix * vertexTangent.xyz);',
			'	vec3 b = cross(n, t) * vertexTangent.w;',
			'	mat3 rotMat = mat3(t, b, n);',

			'	vec3 eyeDir = worldPos - cameraPosition;',
			'	eyeVec = eyeDir * rotMat;',

			'	viewCoords = projectionMatrix * viewMatrix * worldMatrix * vec4(vertexPosition, 1.0);', //
			'	gl_Position = viewCoords;',
			'}'//
		].join('\n'),
		fshader: [//
			'precision mediump float;',//

			'uniform sampler2D normalMap;',//
			'uniform sampler2D reflection;',//
			'uniform vec4 waterColor;',
			'uniform vec4 waterColorEnd;',
			'uniform bool abovewater;',
			'uniform vec4 fogColor;',
			'uniform float fogStart;',
			'uniform float fogScale;',
			'uniform vec3 sunDirection;',
			'uniform float time;',

			'varying vec2 texCoord0;',//
			'varying vec3 eyeVec;',//
			'varying vec4 viewCoords;',
			'varying vec3 worldPos;',

			'const vec3 sunColor = vec3(1.0, 0.96, 0.96);',

			'vec4 getNoise(vec2 uv) {',
			'    vec2 uv0 = (uv/123.0)+vec2(time/17.0, time/29.0);',
			'    vec2 uv1 = uv/167.0-vec2(time/-19.0, time/31.0);',
			'    vec2 uv2 = uv/vec2(827.0, 983.0)+vec2(time/51.0, time/47.0);',
			'    vec2 uv3 = uv/vec2(991.0, 877.0)-vec2(time/59.0, time/-63.0);',
			'    vec4 noise = (texture2D(normalMap, uv0)) +',
			'                 (texture2D(normalMap, uv1)) +',
			'                 (texture2D(normalMap, uv2)*3.0) +',
			'                 (texture2D(normalMap, uv3)*3.0);',
			'    return noise/4.0-1.0;',
			'}',

			'void sunLight(const vec3 surfaceNormal, const vec3 eyeDirection, float shiny, float spec, float diffuse,',
			'              inout vec3 diffuseColor, inout vec3 specularColor){',
			'    vec3 reflection = normalize(reflect(-sunDirection, surfaceNormal));',
			'    float direction = max(0.0, dot(eyeDirection, reflection));',
			'    specularColor += pow(direction, shiny)*sunColor*spec;',
			'    diffuseColor += max(dot(sunDirection, surfaceNormal),0.0)*sunColor*diffuse;',
			'}',

			'void main(void)',//
			'{',//
			'	float fogDist = clamp((viewCoords.z-fogStart)*fogScale,0.0,1.0);',

			'	vec2 normCoords = texCoord0;',
			'	vec4 noise = getNoise(normCoords);',
			'	vec3 normalVector = normalize(noise.xyz*vec3(1.2, 1.2, 1.0));',

			'	vec3 localView = normalize(eyeVec);',
			'	float fresnel = dot(normalize(normalVector*vec3(2.2, 2.2, 1.0)), localView);',
			'	if ( abovewater == false ) {',
			'		fresnel = -fresnel;',
			'	}',
			'	fresnel *= 1.0 - fogDist;',
			'	float fresnelTerm = 1.0 - fresnel;',
			'	fresnelTerm *= fresnelTerm;',
			'	fresnelTerm = fresnelTerm * 0.9 + 0.1;',

			'	vec2 projCoord = viewCoords.xy / viewCoords.q;',
			'	projCoord = (projCoord + 1.0) * 0.5;',
			'	if ( abovewater == true ) {',
			'		projCoord.x = 1.0 - projCoord.x;',
			'	}',

			// '	projCoord += (dudvColor.xy * 0.5 + normalVector.xy * 0.0);',
			'	projCoord += (normalVector.xy * 0.04);',
			'	projCoord = clamp(projCoord, 0.001, 0.999);',

			'	vec4 reflectionColor = texture2D(reflection, projCoord);',
			'	if ( abovewater == false ) {',
			'		reflectionColor *= vec4(0.8,0.9,1.0,1.0);',
			'		vec4 endColor = mix(reflectionColor,waterColor,fresnelTerm);',
			'		gl_FragColor = mix(endColor,waterColor,fogDist);',
			'	}',
			'	else {',
			'		vec3 diffuse = vec3(0.0);',
			'		vec3 specular = vec3(0.0);',
			'	    sunLight(normalVector, localView, 100.0, 2.0, 0.4, diffuse, specular);',

			'		vec4 waterColorNew = mix(waterColor,waterColorEnd,fresnelTerm);',
			'		vec4 endColor = mix(waterColorNew,reflectionColor,fresnelTerm);',

			'		gl_FragColor = (vec4(diffuse*fresnelTerm + specular, 1.0) + mix(endColor,reflectionColor,fogDist)) * (1.0-fogDist) + fogColor * fogDist;',
			// '		gl_FragColor = reflectionColor;',
			// '		gl_FragColor = vec4(diffuse + specular, 1.0);',

			'	}',
			'}'
		].join('\n')
	};

	return FlatWaterRenderer;
});