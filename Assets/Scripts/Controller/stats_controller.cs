using UnityEngine;
using System.Collections;

public class stats_controller : MonoBehaviour {

	private float secs;
	
	void Start () {
		if (!PlayerPrefs.HasKey("time_played")){
			PlayerPrefs.SetInt("time_played", 0);
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
		secs = Time.time;
	}

	void Update(){
		if ((Time.time - secs) > 1){
			PlayerPrefs.SetInt ("time_played", PlayerPrefs.GetInt("time_played") + 1);
			secs = Time.time;
		}
	}
}
