#pragma strict

var explode: GameObject;
var circle: GameObject;
static private var sensitivity: float = .5;
private var force: float = .3;
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

function Start(){
	rb = GetComponent(Rigidbody);
	c = GetComponent(Collider);
	r = GetComponent(Renderer);
	spawnPos = transform.position;
}

function Update () {
	if (alive){
		magnetCrusher = new String[2];
		x = Input.acceleration.x * (1/sensitivity);
		rb.AddForce(dir * force * x, ForceMode.VelocityChange);
		}
	else if (spawnTime > 0 && Time.time > spawnTime){
		respawn();
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
	if (collision.gameObject.name == "crusher-"){
		magnetCrusher[0] = collision.gameObject.name;
		}
	else if (collision.gameObject.name == "crusher+"){
		magnetCrusher[1] = collision.gameObject.name;
	}
	if (magnetCrusher[0] != null && magnetCrusher[1] != null) despawn();
}

function despawn(){
	alive = false;
	r.enabled = false;
	c.enabled = false;
	rb.isKinematic = true;
	spawnTime = Time.time + 2;
	if (exploded == null){
		exploded = Instantiate(explode, transform.position, transform.rotation);
	}
}

function respawn(){
	transform.position = spawnPos;
	rb.isKinematic = false;
	rb.velocity = Vector3.zero;
	rb.angularVelocity = Vector3.zero;
	r.enabled = true;
	c.enabled = true;
	spawnTime = 0;
	alive = true;
	Destroy(exploded);
	exploded = null;
}

function changeSpawn(pos : Vector3){
	spawnPos = pos;
}