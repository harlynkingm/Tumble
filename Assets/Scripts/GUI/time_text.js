#pragma strict


function OnEnable () {
	var totalTime : int = GameObject.FindGameObjectWithTag("Player").GetComponent(player_controller).GetTime();
	var hours : int = Mathf.Floor(totalTime/3600);
	var minutes : int = Mathf.Floor(totalTime/60)%60;
	var seconds : int = totalTime % 60;
	var text : String;
	if (hours > 0){
		text = String.Format("{0}h {1}m {2}s", hours, minutes, seconds);
	}
	else if (minutes > 0){
		text = String.Format("{0}m {1}s", minutes, seconds);
	}
	else{
		text = String.Format("{0}s", seconds);
	}
	gameObject.GetComponent(UI.Text).text = text;
}