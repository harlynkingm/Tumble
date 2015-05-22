#pragma strict

var newName: String = "GameObject";
var delay: int = 0;

function Start () {
	Invoke("ChangeName", delay);
}

function ChangeName () {
	gameObject.name = newName;
}