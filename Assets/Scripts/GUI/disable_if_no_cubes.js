#pragma strict

function OnEnable () {
	var player : player_controller = GameObject.FindGameObjectWithTag("Player").GetComponent(player_controller);
	if (player.getCubes() == 0){
		GetComponent(EventSystems.EventTrigger).enabled = false;
		GetComponent(UI.Image).color.a = .5;
		transform.GetChild(0).GetComponent(UI.Text).color.a = .5;
		transform.GetChild(1).gameObject.SetActive(true);
	}
}