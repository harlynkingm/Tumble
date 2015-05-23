using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class lottery_time_display : MonoBehaviour {
	
	private Text timeText;
	private System.TimeSpan diff;
	private string minExt;
	private string secExt;

	void Start () {
		timeText = gameObject.GetComponent<Text>();
	}

	void Update () {
		timeText.text = UpdateTime();
	}

	string UpdateTime(){
		if (System.DateTime.Now.Hour < 8){
			diff = System.DateTime.Today.AddHours(8) - System.DateTime.Now;
		}
		else if (System.DateTime.Now.Hour < 20){
			diff = System.DateTime.Today.AddHours(20) - System.DateTime.Now;
		}
		else if (System.DateTime.Now.Hour <= 23){
			diff = System.DateTime.Today.AddDays(1).AddHours(8) - System.DateTime.Now;
		}
		if (diff.Minutes < 10) minExt = "0";
		else minExt = "";
		if (diff.Seconds < 10) secExt = "0";
		else secExt = "";
		return string.Format("{0}:{3}{1}:{4}{2}", diff.Hours, diff.Minutes, diff.Seconds, minExt, secExt);
	}
}
