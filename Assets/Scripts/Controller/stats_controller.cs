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
		if (!PlayerPrefs.HasKey("rotations_made")){
			PlayerPrefs.SetInt("rotations_made", 0);
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
	}

}
