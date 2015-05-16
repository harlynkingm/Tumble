#pragma strict

function OnEnable () {
	var totalTime : int = PlayerPrefs.GetInt("time_played");
	var hours : int = Mathf.Floor(totalTime/3600);
	var minutes : int = Mathf.Floor(totalTime/60)%60;
	var seconds : int = totalTime % 60;
	var time : String;
	if (hours > 0){
		time = String.Format("{0}h {1}m {2}s", hours, minutes, seconds);
	}
	else if (minutes > 0){
		time = String.Format("{0}m {1}s", minutes, seconds);
	}
	else{
		time = String.Format("{0}s", seconds);
	}
	var text : String;
	text = String.Format("{0}\n{1}\n{2}\n{3}\n{4}\n{5}\n{6}", time, 
						PlayerPrefs.GetInt("levels_beaten"), 
						PlayerPrefs.GetInt("cubes_collected"), 
						PlayerPrefs.GetInt("rotations_made"), 
						PlayerPrefs.GetInt("times_restarted"), 
						PlayerPrefs.GetInt("buttons_pressed"),
						PlayerPrefs.GetInt("jump_pads_used"));
	gameObject.GetComponent(UI.Text).text = text;
}