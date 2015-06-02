#pragma strict

private var number : int;

function Start(){
	number = int.Parse(gameObject.name);
}

function OnTriggerEnter (other : Collider) {
	if (other.gameObject.tag == "Player"){
		other.gameObject.GetComponent(player_controller).SetCapturePoint(number);
	}
}