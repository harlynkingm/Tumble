#pragma strict

function Start () {
	gameObject.GetComponent(UI.Text).text = transform.parent.gameObject.name;
}