#pragma strict

private var sucking: boolean = false;
private var player: GameObject;
private var sTime: float;
private var done: boolean;

function OnTriggerEnter (other : Collider) {
	if (other.gameObject.tag == "Player"){
		sucking = true;
		sTime = Time.time;
		player = other.gameObject;
	}
}

function Update () {
	if (sucking && player != null){
		player.transform.position = Vector3.MoveTowards(player.transform.position, transform.position, Time.deltaTime * 8);
		if (done == false && Vector3.Distance(player.transform.position, transform.position) < .1) endGame();
	}
}

function endGame(){
	done = true;
	PlayerPrefs.SetInt ("levels_beaten", PlayerPrefs.GetInt("levels_beaten") + 1);
	var cam: GameObject = GameObject.FindGameObjectWithTag("MainCamera");
	cam.GetComponent(pause_controller).End();
}