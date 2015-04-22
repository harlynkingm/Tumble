#pragma strict

var speed: float = 90.0;
private var curEuler: Vector3;
private var rotating: String = "";
private var currentAngle: float;

function Start () {
	curEuler = transform.eulerAngles;
}

function RotateRight() {
	if (rotating != "") return;
	currentAngle -= 90;
	RotateAngle(currentAngle);
}

function RotateLeft() {
	if (rotating != "") return;
	currentAngle += 90;
	RotateAngle(currentAngle);
}

function RotateAngle(angle: float){
	if (rotating != "") return;
	if (angle > curEuler.z) rotating = "right";
	else rotating = "left";
	if (rotating == "right"){
		while (curEuler.z < angle){
			curEuler.z = Mathf.MoveTowards(curEuler.z, angle, speed*Time.deltaTime*-1);
			transform.eulerAngles = curEuler;
			yield;
		}
	}
	else if (rotating == "left"){
		while (curEuler.z > angle){
			curEuler.z = Mathf.MoveTowards(curEuler.z, angle, speed*Time.deltaTime*-1);
			transform.eulerAngles = curEuler;
			yield;
		}
	}
	rotating = "";
}