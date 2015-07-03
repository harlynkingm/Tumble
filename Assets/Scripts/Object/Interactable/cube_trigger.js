#pragma strict

var breakable : GameObject;
var local: boolean = false;
var spawnOnObject : boolean = true;

function OnTriggerEnter (other : Collider) {
	if (other.CompareTag("Player") || other.CompareTag("GameController")){
//		if (local) other.gameObject.GetComponent(player_controller).changeSpawn(transform.localPosition);
//		else other.gameObject.GetComponent(player_controller).changeSpawn(transform.position);
		if (spawnOnObject) other.gameObject.GetComponent(player_controller).changeSpawn(gameObject);
		if (other.CompareTag("Player")) other.gameObject.GetComponent(player_controller).addCube();
		else GameObject.FindGameObjectWithTag("Player").GetComponent(player_controller).addCube();
		PlayerPrefs.SetInt ("cubes_collected", PlayerPrefs.GetInt("cubes_collected") + 1);
		//gameObject.SetActive(false);
		GetComponent(Collider).enabled = false;
		GetComponent(Renderer).enabled = false;
		GameObject.Instantiate(breakable, transform.position, transform.rotation);
	}
}