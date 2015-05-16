#pragma strict

var messages : String[];

function OnEnable () {
	var random : int = Random.Range(0, messages.Length);
	gameObject.GetComponent(UI.Text).text = messages[random];
}