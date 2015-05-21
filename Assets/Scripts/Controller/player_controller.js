﻿#pragma strict

var explode: GameObject;
var mask: GameObject;
var masks: Sprite[];
var glow: GameObject;
static private var sensitivity: float = .5;
private var force: float = 1;
private var dir: Vector3 = Vector3(1, 0, 0);
private var x : float;
private var rb: Rigidbody;
private var c: Collider;
private var r: Renderer;
private var magnetCrusher: String[];
private var alive: boolean = true;
private var spawnTime: float;
private var exploded : GameObject;
private var spawnPos : Vector3;
private var cubeTotal : int;
private var cubesInLevel : int;
private var collisions : Array;
private var startTime : float;
private var cam: GameObject;
private var camMoving: boolean;

function Start(){
	rb = GetComponent(Rigidbody);
	c = GetComponent(Collider);
	r = GetComponent(Renderer);
	spawnPos = transform.position;
	cubeTotal = 0;
	cubesInLevel = GameObject.FindGameObjectsWithTag("Cube").Length;
	startTime = Time.time;
	cam = GameObject.FindGameObjectWithTag("MainCamera");
	if (PlayerPrefs.HasKey("mask")) SetMask();
//	collisions = new Array();
}

function Update () {
	if (Time.timeScale == 1){
		if (alive){
			magnetCrusher = new String[2];
//			if (collisions.length >= 2){
//				var clsns : Collision[] = collisions.ToBuiltin(Collision) as Collision[];
//				if (checkContacts(clsns[0], clsns[1])){
//					despawn();
//					//Debug.Log(Vector3.Distance(clsns[0].contacts[0].point, clsns[1].contacts[0].point));
//				}
//				else if (collisions.length >= 3 && (checkContacts(clsns[1], clsns[2]) || checkContacts(clsns[0], clsns[2]))) despawn();
//			}
//			collisions = new Array();
			x = Input.acceleration.x * (1/sensitivity);
			rb.AddForce(dir * force * x, ForceMode.VelocityChange);
			}
		else if (spawnTime > 0 && Time.time > spawnTime && camMoving == false){
			camMoving = true;
			cam.SendMessage("NiceMoveBro", Vector3(spawnPos.x, spawnPos.y, -10));
		}
		else if (spawnTime > 0 && Time.time > spawnTime && camMoving == true && Vector3.Distance(cam.transform.position, transform.position) <= 12){
			respawn();
			camMoving = false;
			}
	}
}

function checkContacts(collision1 : Collision, collision2 : Collision){
	return (Vector3.Distance(collision1.contacts[0].point, collision2.contacts[0].point) >= .80);
}

function changeDirection(newDir : Vector3){
	dir = newDir;
}

//function OnCollisionEnter(collision : Collision){
//	if (collision.relativeVelocity.magnitude >= 8){
//		//Debug.Log(collision.relativeVelocity.magnitude);
//		for (var contact : ContactPoint in collision.contacts){
//			Instantiate(circle, contact.point, transform.rotation);
//		}
//	}
//}

function OnCollisionStay(collision: Collision){
	if (collision.gameObject.name == "crusher-"){
		magnetCrusher[0] = collision.gameObject.name;
		}
	else if (collision.gameObject.name == "crusher+"){
		magnetCrusher[1] = collision.gameObject.name;
	}
	if (magnetCrusher[0] != null && magnetCrusher[1] != null) despawn();
//	collisions.Push(collision);
}

function despawn(){
	alive = false;
	r.enabled = false;
	c.enabled = false;
	rb.isKinematic = true;
	spawnTime = Time.time + 2;
	mask.SetActive(false);
	glow.SetActive(false);
	if (exploded == null){
		exploded = Instantiate(explode, transform.position, transform.rotation);
	}
	if (PlayerPrefs.HasKey("vibe") && PlayerPrefs.GetInt("vibe") == 0) return;
	else Handheld.Vibrate();
}

function respawn(){
	transform.localPosition = spawnPos;
	rb.isKinematic = false;
	rb.velocity = Vector3.zero;
	rb.angularVelocity = Vector3.zero;
	r.enabled = true;
	c.enabled = true;
	spawnTime = 0;
	alive = true;
	Destroy(exploded);
	exploded = null;
	mask.SetActive(true);
	glow.SetActive(true);
}

function changeSpawn(pos : Vector3){
	spawnPos = pos;
}

function addCube(){
	cubeTotal += 1;
}

function getCubes(){
	return cubeTotal;
}

function getCubesInLevel(){
	return cubesInLevel;
}

function GetTime(){
	return Mathf.Floor(Time.time - startTime);
}

function SetMask(){
	var maskNum : int = PlayerPrefs.GetInt("mask");
	mask.GetComponent(SpriteRenderer).sprite = masks[maskNum];
}