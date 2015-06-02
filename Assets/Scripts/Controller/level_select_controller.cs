using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;
using System.Collections;

public class level_select_controller : MonoBehaviour {

	public Color selectColor;
	private Color defaultColor;
	private GameObject selected;
	private int selectedLevel = 1;
	public Text levelText;
	public Text countText;
	public GameObject playButton;

	void Start () {
		UpdateLevelText();
		UpdateCountText();
	}
	
	public void SelectButton(GameObject button){
		if (selected != null) selected.GetComponent<Image>().color = defaultColor;
		selected = button;
		defaultColor = selected.GetComponent<Image>().color;
		selected.GetComponent<Image>().color = selectColor;
		selectedLevel = int.Parse(selected.name);
		UpdateLevelText();
		UpdateCountText();
		Color temp = playButton.GetComponent<Image>().color;
		if (isPlayable(selectedLevel)) temp.a = 1f;
		else temp.a = .5f;
		playButton.GetComponent<Image>().color = temp;
	}

	void UpdateLevelText(){
		levelText.text = string.Format("Level {0}", selectedLevel);
	}

	void UpdateCountText(){
		countText.text = string.Format("{0}/{1} Cubes", PlayerPrefs.GetString("player_progress")[selectedLevel - 1], PlayerPrefs.GetString ("level_cube_counts")[selectedLevel - 1]);
	}

	public void TryPlay(){
		string levelname = string.Format("Level {0}", selectedLevel);
		if (isPlayable(selectedLevel)) Application.LoadLevel(levelname);
	}

	bool isPlayable(int level){
		if (level == 1) return true;
		if (int.Parse(PlayerPrefs.GetString("level_cube_counts").Substring(level - 1, 1)) == 0) return false;
		if (int.Parse(PlayerPrefs.GetString("player_progress").Substring(level - 2, 1)) > 0) return true;
		else return false;
	}

	public void PlayLatest(){
		for (int i = 0; i < 100; i++){
			if (int.Parse(PlayerPrefs.GetString("player_progress").Substring(i, 1)) == 0 && isPlayable(i + 1)){
				string levelname = string.Format("Level {0}", i + 1);
				Application.LoadLevel(levelname);
				return;
			}
		}
		bool stop = false;
		while (stop == false){
			int rand = Random.Range (1, 100);
			if (isPlayable(rand)){
				string levelname = string.Format("Level {0}", rand);
				Application.LoadLevel(levelname);
				stop = true;
			}
		}
	}
}
