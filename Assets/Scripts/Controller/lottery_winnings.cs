using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class lottery_winnings : MonoBehaviour {

	public Text cubesWon;

	void OnEnable () {
		int won = GetRandomCubes(GetInvested ());
		PlayerPrefs.SetInt("cubes", PlayerPrefs.GetInt("cubes") + won);
		cubesWon.text = string.Format("{0}", won);
	}

	int GetRandomCubes(int cubeBase){
		int lower = Mathf.FloorToInt(cubeBase * .4f);
		int upper = cubeBase * 2;
		int pseudoupper = Mathf.FloorToInt(cubeBase * 1.5f);
		int randomHundred = Random.Range (1, 100);
		Debug.Log (randomHundred);
		if (randomHundred > 20) return Random.Range (cubeBase, upper);
		else return Random.Range (lower, pseudoupper);
	}

	int GetInvested(){
		return int.Parse(PlayerPrefs.GetString("lottery").Substring(15));
	}
}
