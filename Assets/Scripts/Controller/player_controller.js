#pragma strict

import System.Collections.Generic;

var explode: GameObject;
var mask: GameObject;
var masks: Sprite[];
var glow: GameObject;
static private var sensitivity: float = .6;
private var force: float = 1;
private var dir: Vector3 = Vector3(1, 0, 0);
private var x : float;
private var y : float;
private var rb: Rigidbody;
private var c: Collider;
private var r: Renderer;
private var magnetCrusher: String[];
private var alive: boolean = true;
private var spawnTime: float;
private var exploded : GameObject;
private var spawnPos : Vector3;
private var spawnObj : GameObject;
private var cubeTotal : int;
private var cubesInLevel : int;
private var collisions : List.<Collision>;
private var startTime : float;
private var cam: GameObject;
private var camMoving: boolean;

private var maxSpeed : float = 8;
private var newRotation : Quaternion;

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
	collisions = new List.<Collision>();
}

function Update () {
	if (Time.timeScale == 1){
		if (alive){
			//magnetCrusher = new String[2];
			Move();
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

function Move(){
//	x = Input.acceleration.x * (1/(1 - sensitivity));
//	rb.AddForce(dir * force * x, ForceMode.VelocityChange);
	x = Mathf.Clamp(Input.acceleration.x * 3, -1, 1);
	y = Mathf.Clamp((Input.acceleration.y + .7) * 3, -1, 1);
	if (Mathf.Abs(x) < .1) x = 0;
	if (Mathf.Abs(y) < .1) y = 0;
	//rb.velocity = Vector3(x, y, 0) * 10;
	rb.AddForce(Vector3(x, y, 0) * 1, ForceMode.VelocityChange);
}

function FixedUpdate(){
	collisions.Clear();
	if(rb.velocity.magnitude > maxSpeed){
		rb.velocity = rb.velocity.normalized * maxSpeed;
		}
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
//	if (collision.gameObject.name == "crusher-"){
//		magnetCrusher[0] = collision.gameObject.name;
//		}
//	else if (collision.gameObject.name == "crusher+"){
//		magnetCrusher[1] = collision.gameObject.name;
//	}
//	if (magnetCrusher[0] != null && magnetCrusher[1] != null) despawn();
//	collisions.Push(collision);
	collisions.Add(collision);
	if (collisions.Count < 2) return;
	var new_normal : Vector3 = collision.contacts[0].normal;
	for (var existing_coll : Collision in collisions){
		var existing_normal : Vector3 = existing_coll.contacts[0].normal;
		var normal_angle : float = Vector3.Angle(new_normal, existing_normal);
		if (normal_angle > 170) despawn();
	}
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
	PlayerPrefs.SetInt("times_crushed", PlayerPrefs.GetInt("times_crushed") + 1);
}

function respawn(){
	if (spawnObj == null) transform.localPosition = spawnPos;
	else transform.localPosition = spawnObj.transform.position;
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

function changeSpawn(obj : GameObject){
	spawnObj = obj;
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