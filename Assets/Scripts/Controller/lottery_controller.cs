using UnityEngine;
using System.Collections;

public class lottery_controller : MonoBehaviour {
	
	public GameObject normalDisplay;
	public GameObject winDisplay;
	private System.DateTime compare;

	void Start () {
		//The lottery key is stored as follows: DD|MM|YYYY|0 or 1 for 8 AM/PM|1 or 0 for Active/Inactive|Quantity Invested
		//An example lottery key is 10|04|2010|1|0|20
		//That would mean an inactive lottery at 4-10-2010 at 8pm and 20 cubes were invested
		// 0 - 1 gets day
		// 3 - 4 gets month
		// 6 - 9 gets year
		// 11 gets AM/PM
		// 13 gets active/inactive
		// 15+ gets invested
		PlayerPrefs.DeleteKey("lottery");
		if (!PlayerPrefs.HasKey("lottery")){
			PlayerPrefs.SetString("lottery", "00|00|0000|0|0|0");
		}
		//Debug.Log (PlayerPrefs.GetString("lottery"));
		if (GetActive()) UpdateCompare();
	}

	void OnEnable(){
		if (PlayerPrefs.HasKey("lottery") && GetActive()) UpdateCompare();
		else{
			normalDisplay.SetActive(true);
			winDisplay.SetActive(false);
		}
	}

	void Update () {
		if (GetActive()){
			if (System.DateTime.Now > compare){
				if (normalDisplay.activeSelf) normalDisplay.SetActive(false);
				if (!winDisplay.activeSelf) winDisplay.SetActive(true);
			}
			else{
				if (!normalDisplay.activeSelf) normalDisplay.SetActive(true);
				if (winDisplay.activeSelf) winDisplay.SetActive(false);
			}
		}
	}

	void UpdateCompare(){
		compare = new System.DateTime(GetYear (), GetMonth(), GetDay(), GetHour(), 0, 0);
	}

	int GetYear(){
		return int.Parse(PlayerPrefs.GetString("lottery").Substring(6, 4));
	}

	int GetDay(){
		return int.Parse(PlayerPrefs.GetString("lottery").Substring(0, 2));
	}

	int GetMonth(){
		return int.Parse(PlayerPrefs.GetString("lottery").Substring(3, 2));
	}

	int GetHour(){
		if (int.Parse(PlayerPrefs.GetString("lottery").Substring(11, 1)) == 0){
			return 8;
		}
		else return 20;
	}

	bool GetActive(){
		if (int.Parse(PlayerPrefs.GetString("lottery").Substring(13, 1)) == 1){
			return true;
		}
		else return false;
	}

	public void SetInactive(){
		string tempString = string.Format("{0}{1}{2}", PlayerPrefs.GetString("lottery").Substring(0, 13), "0", PlayerPrefs.GetString("lottery").Substring(14));
		PlayerPrefs.SetString("lottery", tempString);
	}
}
