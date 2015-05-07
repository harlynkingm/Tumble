#pragma strict

var levelnum : int = 0;

function OnTriggerEnter (other : Collider) {
	if (levelnum != 0 && other.gameObject.tag == "Player") Application.LoadLevel(levelnum);
}