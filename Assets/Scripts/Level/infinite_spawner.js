#pragma strict

var object : GameObject;
var interval : int = 10;
var maxNum: int = 5;
var objName : String = "New GameObject";
private var objects : GameObject[];
private var index : int = 0;

function Start(){
	objects = new GameObject[maxNum];
	InvokeRepeating("Spawn", 0, interval);
}

function Spawn(){
//	if (objects[index] != null) Shrink(objects[index]);
	if (objects[index] != null) return;
	objects[index] = GameObject.Instantiate(object, transform.position, transform.rotation);
	objects[index].gameObject.name = objName;
	index = (index + 1) % objects.Length;
}

function Shrink(obj : GameObject){
	while (obj.transform.localScale.x > .01){
		obj.transform.localScale -= Vector3.one * .05;
		yield;
	}
	obj.transform.position = Vector3(0, 0, 0);
	yield;
	GameObject.Destroy(obj);
}