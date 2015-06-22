#pragma strict

var actions : single_animation[];
var animations : constant_animation[];
var orange : Material;
var green : Material;
var pressOnStart : boolean = false;
private var p : GameObject;
private var cam : Camera;
private var coll : Collider;
private var hit : RaycastHit;
private var pressed : boolean;

function Start () {
	p = GameObject.FindGameObjectWithTag("Player");
	cam = Camera.main;
	coll = GetComponent(Collider);
	if (pressOnStart) Press();
}

function Update () {
	if (p != null && p.GetComponent(Renderer).enabled == false){ 
		if (actions.Length > 0 && actions[0].GetMoving() == true) transform.GetChild(0).GetComponent(Renderer).material = orange;
		return;
	}
	if (Input.touchCount == 1 && Time.timeScale == 1){
		if (Input.GetTouch(0).phase == TouchPhase.Began) checkHits (Input.GetTouch(0).position);
	}
	else if (Input.GetMouseButtonDown(0) && Time.timeScale == 1){
		checkHits(Input.mousePosition);
	}
}

function checkHits(position : Vector2){
	var ray : Ray = cam.ScreenPointToRay(position);
	if (Physics.Raycast(ray, hit)){
		if (hit.collider == coll){
			Press();
		}
	}
}

function Press(){
	if (pressed){ 
		pressed = false;
		transform.GetChild(0).GetComponent(Renderer).material = orange;
		for (var action : single_animation in actions) action.ActivateReverseMove();
		for (var animation : constant_animation in animations) animation.Begin();
		}
	else{
		pressed = true;
		transform.GetChild(0).GetComponent(Renderer).material = green;
		for (var action : single_animation in actions) action.ActivateMove();
		for (var animation : constant_animation in animations) animation.Stop();
		}
}