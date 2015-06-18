#pragma strict

var parent : Transform;
private var parentS: Vector3;
private var selfS: Vector3;

function Start () {
	parentS = parent.position;
	selfS = transform.position;
}

function Update () {
	transform.position = selfS + (parent.position - parentS);
}