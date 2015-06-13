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
private var startSize : Vector3;
private var cam: GameObject;
private var camMoving: boolean;
private var capturePoint : int = 0;
private var capturePoints : GameObject[];
private var backwards : boolean = false;
private var canTeleport : boolean = true;
private var maxSpeed : float = 7;
private var newRotation : Quaternion;

function Start(){
	rb = GetComponent(Rigidbody);
	c = GetComponent(Collider);
	r = GetComponent(Renderer);
	spawnPos = transform.position;
	cubeTotal = 0;
	cubesInLevel = GameObject.FindGameObjectsWithTag("Cube").Length;
	UpdateLevelCubeCount();
	if (GetProgressForLevel(ParseLevel()) > cubesInLevel) ResetLevelProgress(ParseLevel());
	startTime = Time.time;
	startSize = transform.localScale;
	cam = GameObject.FindGameObjectWithTag("MainCamera");
	if (PlayerPrefs.HasKey("mask")) SetMask();
	collisions = new List.<Collision>();
	capturePoints = GameObject.FindGameObjectsWithTag("Respawn");
	GetComponent(Renderer).sortingOrder = 100;
}

function UpdateLevelCubeCount(){
	var level : int = ParseLevel();
	var temp : String = String.Format("{0}{1}{2}", PlayerPrefs.GetString("level_cube_counts").Substring(0, level - 1), cubesInLevel, PlayerPrefs.GetString("level_cube_counts").Substring(level));
	PlayerPrefs.SetString("level_cube_counts", temp);
}

function GetProgressForLevel(level : int){
	return int.Parse(PlayerPrefs.GetString("player_progress").Substring(level - 1, 1));
}

function ResetLevelProgress(level : int){
	var temp : String = String.Format("{0}{1}{2}", PlayerPrefs.GetString("player_progress").Substring(0, level - 1), 0, PlayerPrefs.GetString("player_progress").Substring(level));
	PlayerPrefs.SetString("player_progress", temp);
}

function ParseLevel(){
 	var name : String = Application.loadedLevelName.Substring(5);
	return parseInt(name);
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
	y = Mathf.Clamp((Input.acceleration.y + .5) * 3, -1, 1);
	if (Mathf.Abs(x) < .05) x = 0;
	if (Mathf.Abs(y) < .05) y = 0;
//	rb.velocity = Vector3(x, y, 0) * 10;
	rb.AddForce(Vector3(x, y, 0), ForceMode.VelocityChange);
	if (x == 0) rb.AddForce(Vector3(rb.velocity.x * -.15, 0, 0), ForceMode.VelocityChange);
	if (y == 0) rb.AddForce(Vector3(0, rb.velocity.y * -.15, 0), ForceMode.VelocityChange);
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
	//blockMove += collision.contacts[0].normal;
	if (collisions.Count < 2) return;
	if (collision.gameObject.CompareTag("Neutral")) return;
	var new_normal : Vector3 = collision.contacts[0].normal;
	for (var existing_coll : Collision in collisions){
		if (existing_coll.gameObject.CompareTag("Neutral")) return;
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
	backwards = false;
	capturePoint = 0;
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
	Shrink(exploded);
	exploded = null;
	mask.SetActive(true);
	glow.SetActive(true);
	transform.localScale = Vector3.one * .05;
	Grow();
}

function Grow(){
	while (transform.localScale.x < startSize.x){
		transform.localScale += Vector3.one * .05;
		yield;
	}
}

function Shrink(obj : GameObject){
	var p : float = 0;
	while (p <= 1){
		obj.transform.localScale = Vector3.Lerp(Vector3.one, Vector3.one * .01, p);
		p += .1;
		yield;
	}
	Destroy(obj);
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
	if (maskNum == 0){
		mask.GetComponent(SpriteRenderer).sprite = null;
		r.material.color = new Color(1f, 1f, 1f, 1f);
	}
	else{
		mask.GetComponent(SpriteRenderer).sprite = masks[maskNum];
		r.material.color = new Color(1f, 1f, 1f, 0f);
	}
}

function SetCapturePoint(newCP : int){
	if (newCP < capturePoint) backwards = true;
	else backwards = false;
	capturePoint = newCP;
}

function NearestCapturePoint(){
	var name : String = String.Format("{0}", capturePoint + 1);
	var obj : GameObject;
	for (var cp : GameObject in capturePoints){
		if (cp.name == name){
			obj = cp;
		}
	}
	if (obj == null){
		obj = GameObject.FindGameObjectWithTag("Finish");
	}
	return obj;
}

function GetBackwards(){
	return backwards;
}

function CanTeleport(){
	return canTeleport;
}

function SetTeleport(val : boolean){
	canTeleport = val;
}