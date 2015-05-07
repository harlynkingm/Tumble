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
private var lastDistance : float;
private var cam : Camera;

function Start () {
	curEuler = transform.eulerAngles;
	player = GameObject.Find("player").GetComponent(player_controller);
	cam = GetComponent(Camera);
	UpdateGravity();
}

function Update () {
	if (Input.touchCount > 0){
		if (Input.touchCount == 1 && Input.GetTouch(0).phase == TouchPhase.Began) checkHits (Input.GetTouch(0));
		else if (Input.touchCount == 2) Zoom();
	}
}

function checkHits(touch : Touch){
	var noTurn : boolean = false;
	var ray : Ray = cam.ScreenPointToRay(touch.position);
	if (Physics.Raycast(ray, hit)){
		if (hit.collider.name == "button"){
			noTurn = true;
		}
	}
	if (noTurn == false) Turn(touch);
}

function Zoom(){
	if (Input.GetTouch(0).phase == TouchPhase.Began || Input.GetTouch(1).phase == TouchPhase.Began){ 
		lastDistance = GetTouchesDistance();
		}
	var delta : float = GetTouchesDistance() - lastDistance;
	cam.orthographicSize -= delta * Time.deltaTime * .5;
	if (cam.orthographicSize < 3) cam.orthographicSize = 3;
	else if (cam.orthographicSize > 10) cam.orthographicSize = 10;
	lastDistance = GetTouchesDistance();
}

function GetTouchesDistance(){
	return Vector2.Distance(Input.GetTouch(0).position, Input.GetTouch(1).position);
}

function Turn(touch : Touch){
	var width : float = Screen.width;
	if ((touch.position.x/width) < .5) RotateLeft();
	else if ((touch.position.x/width) > .5) RotateRight();
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
		curEuler.z = Mathf.Lerp(startAngle, currentAngle, x);
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