#pragma strict

private var sucking: boolean = false;
private var player: GameObject;

function OnTriggerEnter (other : Collider) {
	if (other.gameObject.tag == "GameController"){
		sucking = true;
		player = other.gameObject;
	}
}

function Update () {
	if (sucking && player != null){
		player.transform.position = Vector3.MoveTowards(player.transform.position, transform.position, Time.deltaTime * 8);
	}
}