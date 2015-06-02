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
		PlayerPrefs.DeleteKey("level_cube_counts");
		if (!PlayerPrefs.HasKey("level_cube_counts")){
			string[] toCombine = new string[10];
			toCombine[0] = "4443455476";
			toCombine[1] = "0000000000";
			toCombine[2] = "0000000000";
			toCombine[3] = "0000000000";
			toCombine[4] = "0000000000";
			toCombine[5] = "0000000000";
			toCombine[6] = "0000000000";
			toCombine[7] = "0000000000";
			toCombine[8] = "0000000000";
			toCombine[9] = "0000000000";
			PlayerPrefs.SetString ("level_cube_counts", string.Concat(toCombine));
		}
		if (!PlayerPrefs.HasKey("player_progress")){
			string temp = "";
			for (int i = 0; i < 100; i++){
				temp = string.Concat(temp, "0");
			}
			PlayerPrefs.SetString("player_progress", temp);
		}
	}

}


