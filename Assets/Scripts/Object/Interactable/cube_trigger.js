#pragma strict

var local: boolean = false;

function OnTriggerEnter (other : Collider) {
	if (other.gameObject.tag == "Player"){
//		if (local) other.gameObject.GetComponent(player_controller).changeSpawn(transform.localPosition);
//		else other.gameObject.GetComponent(player_controller).changeSpawn(transform.position);
		other.gameObject.GetComponent(player_controller).changeSpawn(gameObject);
		other.gameObject.GetComponent(player_controller).addCube();
		PlayerPrefs.SetInt ("cubes_collected", PlayerPrefs.GetInt("cubes_collected") + 1);
		//gameObject.SetActive(false);
		GetComponent(Collider).enabled = false;
		GetComponent(Renderer).enabled = false;
	}
}