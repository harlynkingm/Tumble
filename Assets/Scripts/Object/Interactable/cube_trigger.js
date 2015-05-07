#pragma strict

function OnTriggerEnter (other : Collider) {
	if (other.gameObject.tag == "Player"){
		other.gameObject.GetComponent(player_controller).changeSpawn(transform.position);
		gameObject.SetActive(false);
	}
}