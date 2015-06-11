#pragma strict

var other_teleporter : teleporter;
private var cam : GameObject;

function Start(){
	cam = GameObject.FindGameObjectWithTag("MainCamera");	
}

function OnTriggerEnter (other : Collider) {
	if (other.gameObject.CompareTag("Neutral") || other.gameObject.CompareTag("Player")){
		if (other.gameObject.CompareTag("Player") && other.gameObject.GetComponent(player_controller).CanTeleport() == false) return;
		var distBetween : Vector3 = transform.position - other.gameObject.transform.position;
		Shrink(other.gameObject, distBetween);
	}
}

function Shrink(obj : GameObject, distBetween : Vector3){
	if (obj.CompareTag("Player")){
		obj.GetComponent(player_controller).SetTeleport(false);
	}
	var p : float = 0;
	while (p <= 1){
		obj.transform.localScale = Vector3.Lerp(Vector3.one, Vector3.one * .01, p);
		p += .1;
		yield;
	}
	other_teleporter.Receive(obj, distBetween);
	if (obj.CompareTag("Player")) cam.SendMessage("NiceMoveBro", other_teleporter.transform.position);
}

function Grow(obj : GameObject){
	var p : float = 0;
	while (p <= 1){
		obj.transform.localScale = Vector3.Lerp(Vector3.one * .01, Vector3.one, p);
		p += .1;
		yield;
	}
	if (obj.CompareTag("Player")){
		obj.GetComponent(player_controller).SetTeleport(true);
	}
}

function Receive(other : GameObject, relativePos : Vector3){
	Physics.IgnoreCollision(gameObject.GetComponent(Collider), other.GetComponent(Collider));
	var newRelative : Vector3 = Vector3(relativePos.x, -1 * relativePos.y, 0);
	var vel : Vector3 = other.GetComponent(Rigidbody).velocity;
	other.transform.position = transform.position + newRelative;
	Grow(other);
	other.GetComponent(Rigidbody).velocity = vel;
	yield WaitForSeconds(1);
	Physics.IgnoreCollision(gameObject.GetComponent(Collider), other.GetComponent(Collider), false);
}

function EnableCollider(){
	GetComponent(Collider).enabled = true;
}

function OnDrawGizmosSelected(){
	if (other_teleporter != null){
		Gizmos.color = Color.gray;
		Gizmos.DrawLine(transform.position, other_teleporter.gameObject.transform.position);
		}
}