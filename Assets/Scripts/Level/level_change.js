#pragma strict

function OnTriggerEnter (other : Collider) {
	if (Application.loadedLevel == Application.levelCount - 1) Application.LoadLevel("Main Menu");
	else{
		if (other.gameObject.tag == "Player") Application.LoadLevel(Application.loadedLevel + 1);
	}
}