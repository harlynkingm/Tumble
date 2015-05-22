using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class lottery_controller : MonoBehaviour {

	public GameObject time;
	private Text timeText;
	private System.TimeSpan diff;

	void Start () {
		timeText = time.GetComponent<Text>();
	}

	void Update () {
		timeText.text = UpdateTime();
	}

	string UpdateTime(){
		if (System.DateTime.Now.Hour >= 12){
			diff = System.DateTime.Today.AddDays(1).AddHours(12) - System.DateTime.Now;
		}
		else{
			diff = System.DateTime.Today.AddHours(12) - System.DateTime.Now;
		}
		return string.Format("{0}:{1}:{2}", diff.Hours, diff.Minutes, diff.Seconds);
	}
}
