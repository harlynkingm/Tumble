#pragma strict

private var time: float = 1;
private var curEuler: Vector3;
private var currentAngle: float;
private var startTime: float;
private var p: float;
private var x: float;
private var startAngle: float;
private var player : player_controller;
private var hit : RaycastHit;

function Start () {
	curEuler = transform.eulerAngles;
	player = GameObject.Find("player").GetComponent(player_controller);
}

function FixedUpdate () {
	if (Input.touchCount > 0){
		for (var touch : Touch in Input.touches){
			if (touch.phase == TouchPhase.Began) checkHits (touch);
		}
	}
}

function checkHits(touch : Touch){
	var noTurn : boolean = false;
	var ray : Ray = GetComponent(Camera).ScreenPointToRay(touch.position);
	if (Physics.Raycast(ray, hit)){
		if (hit.collider.name == "button"){
			noTurn = true;
		}
	}
	if (noTurn == false) Turn(touch);
	noTurn = false;
}

function Turn(touch : Touch){
	var width : float = Screen.width;
	if ((touch.position.x/width) < .4) RotateLeft();
	else if ((touch.position.x/width) > .6) RotateRight();
}

function RotateRight() {
	Rotate(90);
}

function RotateLeft() {
	Rotate(-90);
}

function Rotate(angle : int){
	currentAngle += angle;
	RotateAngle(currentAngle);
	UpdateGravity();
}

function RotateAngle(angle: float){
	startTime = Time.time;
	startAngle = curEuler.z;
	p = 0;
	while (p < 1){
		p = Mathf.Clamp01((Time.time - startTime)/time);
		x = p*p*p*(p*(p*6 - 15) + 10);
		curEuler.z = Mathf.LerpAngle(startAngle, currentAngle, x);
		transform.eulerAngles = curEuler;
		yield;
	}
}

function UpdateGravity(){
	if (currentAngle >= 0){
		if (currentAngle % 360 == 0) Physics.gravity = Vector3(0, -9.81, 0);
		else if (currentAngle % 360 == 90) Physics.gravity = Vector3(9.81, 0, 0);
		else if (currentAngle % 360 == 180) Physics.gravity = Vector3(0, 9.81, 0);
		else if (currentAngle % 360 == 270) Physics.gravity = Vector3(-9.81, 0, 0);
		}
	else if (currentAngle < 0){
		if (currentAngle % 360 == 0) Physics.gravity = Vector3(0, -9.81, 0);
		else if (currentAngle % 360 == -270) Physics.gravity = Vector3(9.81, 0, 0);
		else if (currentAngle % 360 == -180) Physics.gravity = Vector3(0, 9.81, 0);
		else if (currentAngle % 360 == -90) Physics.gravity = Vector3(-9.81, 0, 0);
	}
	if (Physics.gravity.y == -9.81) player.changeDirection(Vector3(1, 0, 0));
	else if (Physics.gravity.y == 9.81) player.changeDirection(Vector3(-1, 0, 0));
	else if (Physics.gravity.x == 9.81) player.changeDirection(Vector3(0, 1, 0));
	else if (Physics.gravity.x == -9.81) player.changeDirection(Vector3(0, -1, 0));
}