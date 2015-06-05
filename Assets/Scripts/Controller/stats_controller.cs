using UnityEngine;
using System.Collections;

public class stats_controller : MonoBehaviour {

	void Start () {
		if (!PlayerPrefs.HasKey("times_crushed")){
			PlayerPrefs.SetInt("times_crushed", 0);
		}
		if (!PlayerPrefs.HasKey("levels_beaten")){
			PlayerPrefs.SetInt("levels_beaten", 0);
		}
		if (!PlayerPrefs.HasKey("cubes_collected")){
			PlayerPrefs.SetInt("cubes_collected", 0);
		}
		if (!PlayerPrefs.HasKey("lottery_winnings")){
			PlayerPrefs.SetInt("lottery_winnings", 0);
		}
		if (!PlayerPrefs.HasKey("times_restarted")){
			PlayerPrefs.SetInt("times_restarted", 0);
		}
		if (!PlayerPrefs.HasKey("buttons_pressed")){
			PlayerPrefs.SetInt("buttons_pressed", 0);
		}
		if (!PlayerPrefs.HasKey("jump_pads_used")){
			PlayerPrefs.SetInt("jump_pads_used", 0);
		}
		//PlayerPrefs.DeleteKey("level_cube_counts");
		if (!PlayerPrefs.HasKey("level_cube_counts")){
			string temp = CreateZeros(100);
			PlayerPrefs.SetString ("level_cube_counts", temp);
		}
		if (!PlayerPrefs.HasKey("player_progress")){
			string temp = CreateZeros(100);
			PlayerPrefs.SetString("player_progress", temp);
		}
		Screen.sleepTimeout = SleepTimeout.NeverSleep;
	}

	string CreateZeros(int num){
		string temp = "";
		for (int i = 0; i < num; i++){
			temp = string.Concat(temp, "0");
		}
		return temp;
	}
}
