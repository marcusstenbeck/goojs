require.config({
	baseUrl: "./",
	paths: {
		goo: "../src/goo",
		'goo/lib': '../lib'
	}
});
require([
	'goo/entities/World',
	'goo/renderer/Material',
	'goo/entities/GooRunner',
	'goo/loaders/JSONImporter',
	'goo/entities/components/ScriptComponent',
	'goo/shapes/ShapeCreator',
	'goo/entities/EntityUtils',
	'goo/entities/components/LightComponent',
	'goo/renderer/light/PointLight',
	'goo/renderer/Camera',
	'goo/entities/components/CameraComponent',
	'goo/scripts/OrbitCamControlScript',
	'goo/math/Vector3',
	'goo/renderer/shaders/ShaderLib',
	'goo/scripts/WASDControlScript',
	'goo/scripts/MouseLookControlScript',
	'goo/renderer/MeshData',
	'goo/renderer/Shader',
	'goo/renderer/Util',
	'goo/renderer/TextureCreator',
	'goo/renderer/pass/RenderTarget',
	'goo/math/Plane',
	'goo/addons/water/FlatWaterRenderer'
], function (
	World,
	Material,
	GooRunner,
	JSONImporter,
	ScriptComponent,
	ShapeCreator,
	EntityUtils,
	LightComponent,
	PointLight,
	Camera,
	CameraComponent,
	OrbitCamControlScript,
	Vector3,
	ShaderLib,
	WASDControlScript,
	MouseLookControlScript,
	MeshData,
	Shader,
	Util,
	TextureCreator,
	RenderTarget,
	Plane,
	FlatWaterRenderer
) {
	"use strict";

	var cameraEntity = null;
	var skybox = null;

	function init () {
		var goo = new GooRunner({
			showStats: true,
			antialias: true
		});
		goo.renderer.setClearColor(0.0, 0.0, 0.0, 1.0);
		goo.renderer.domElement.id = 'goo';
		document.body.appendChild(goo.renderer.domElement);
		
		var camera = new Camera(45, 1, 0.1, 2000);
		cameraEntity = goo.world.createEntity("CameraEntity");
		cameraEntity.transformComponent.transform.translation.setd(20,150,250);
		cameraEntity.transformComponent.transform.lookAt(new Vector3(0, 0, 0), Vector3.UNIT_Y);
		cameraEntity.setComponent(new CameraComponent(camera));
		cameraEntity.addToWorld();

		var scripts = new ScriptComponent();
		scripts.scripts.push(new WASDControlScript({
			domElement: goo.renderer.domElement,
			walkSpeed: 45.0,
			crawlSpeed: 10.0
		}));
		scripts.scripts.push(new MouseLookControlScript({
			domElement: goo.renderer.domElement
		}));
		cameraEntity.setComponent(scripts);

		// Setup light
		var light = new PointLight();
		var entity = createBox(goo, ShaderLib.simple, 1, 1, 1);
		entity.transformComponent.transform.translation.x = -1000;
		entity.transformComponent.transform.translation.y = 500;
		entity.transformComponent.transform.translation.z = -1000;
		entity.setComponent(new LightComponent(light));
		entity.addToWorld();

		// Examples of model loading
		loadSkybox(goo);
		loadModels(goo);

		var entity = createBox(goo, ShaderLib.simpleLit, 10, 10, 10);
		entity.addToWorld();
		var script = {
			run: function (entity) {
				var t = entity._world.time;

				var transformComponent = entity.transformComponent;
				entity.transformComponent.transform.setRotationXYZ(
					World.time * 1.2,
					World.time * 2.0,
					0
				);
				transformComponent.transform.translation.y = Math.sin(t) * 5 + 5;
				transformComponent.setUpdated();
			}
		};
		entity.setComponent(new ScriptComponent(script));

		var meshData = ShapeCreator.createQuad(10000, 10000, 10, 10);
		var waterEntity = EntityUtils.createTypicalEntity(goo.world, meshData);
		var material = Material.createMaterial(ShaderLib.simple, 'mat');
		waterEntity.meshRendererComponent.materials.push(material);
		waterEntity.transformComponent.transform.setRotationXYZ(-Math.PI / 2, 0, 0);
		waterEntity.transformComponent.transform.translation.y = -10;
		waterEntity.addToWorld();

		var waterRenderer = new FlatWaterRenderer(camera);
		goo.renderSystem.preRenderers.push(waterRenderer);

		waterRenderer.setWaterEntity(waterEntity);
		waterRenderer.setSkyBox(skybox);
	}

	function loadSkybox (goo) {
		var environmentPath = '../resources/skybox/';
		// left, right, bottom, top, back, front
		var textureCube = new TextureCreator().loadTextureCube([
			environmentPath + '1.jpg',
			environmentPath + '3.jpg',
			environmentPath + '5.jpg',
			environmentPath + '6.jpg',
			environmentPath + '4.jpg',
			environmentPath + '2.jpg'
		]);
		skybox = createBox(goo, skyboxShader, 10, 10, 10);
		skybox.meshRendererComponent.materials[0].textures.push(textureCube);
		skybox.meshRendererComponent.materials[0].cullState.cullFace = 'Front';
		skybox.meshRendererComponent.materials[0].depthState.enabled = false;
		skybox.meshRendererComponent.materials[0].renderQueue = 0;
		skybox.meshRendererComponent.cullMode = 'Never';
		skybox.addToWorld();

		goo.callbacksPreRender.push(function (tpf) {
			var source = cameraEntity.transformComponent.worldTransform;
			var target = skybox.transformComponent.worldTransform;
			target.translation.setv(source.translation);
			target.update();
		});
	}

	function loadModels (goo) {
			var importer = new JSONImporter(goo.world);

			// Load asynchronous with callback
			importer.load('../resources/girl.model', '../resources/', {
				onSuccess : function(entities) {
					for ( var i in entities) {
						entities[i].addToWorld();
					}
					entities[0].transformComponent.transform.scale.set(0.15, 0.15, 0.15);
					var script = {
						run : function(entity) {
							var t = entity._world.time;

							var transformComponent = entity.transformComponent;
							transformComponent.transform.translation.x = Math.sin(t * 0.5) * 30;
							transformComponent.transform.translation.z = Math.cos(t * 0.5) * 30;
							transformComponent.transform.setRotationXYZ(0, Math.sin(t * 1.0) * 3, 0);
							transformComponent.setUpdated();
						}
					};
					entities[0].setComponent(new ScriptComponent(script));
				},
				onError : function(error) {
					console.error(error);
				}
			});
	}

	function createBox (goo, shader, w, h, d) {
		var meshData = ShapeCreator.createBox(w, h, d);
		var entity = EntityUtils.createTypicalEntity(goo.world, meshData);
		var material = Material.createMaterial(shader, 'mat');
		entity.meshRendererComponent.materials.push(material);
		return entity;
	}

	var skyboxShader = {
		attributes: {
			vertexPosition: MeshData.POSITION
		},
		uniforms: {
			viewMatrix: Shader.VIEW_MATRIX,
			projectionMatrix: Shader.PROJECTION_MATRIX,
			worldMatrix: Shader.WORLD_MATRIX,
			cameraPosition: Shader.CAMERA,
			diffuseMap: Shader.TEXTURE0
		},
		vshader: [ //
			'attribute vec3 vertexPosition;', //

			'uniform mat4 viewMatrix;', //
			'uniform mat4 projectionMatrix;',//
			'uniform mat4 worldMatrix;',//
			'uniform vec3 cameraPosition;', //

			'varying vec3 eyeVec;',//

			'void main(void) {', //
			'	vec4 worldPos = worldMatrix * vec4(vertexPosition, 1.0);', //
			'	gl_Position = projectionMatrix * viewMatrix * worldPos;', //
			'	eyeVec = cameraPosition - worldPos.xyz;', //
			'}'//
		].join('\n'),
		fshader: [//
			'precision mediump float;',//

			'uniform samplerCube diffuseMap;',//

			'varying vec3 eyeVec;',//

			'void main(void)',//
			'{',//
			'	vec4 cube = textureCube(diffuseMap, eyeVec);',//
			'	gl_FragColor = cube;',//
			// ' gl_FragColor = vec4(1.0,0.0,0.0,1.0);',//
			'}'//
		].join('\n')
	};

	init();
});
