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
	private int levelsInGame = 10;

	void Start () {
		if (Application.loadedLevel > 0) selectedLevel = ParseLevel();
		else if (Application.loadedLevel == 0) selectedLevel = FindLatest();
		GameObject tempBtn = FindButtonForLevel(selectedLevel);
		SelectButton(tempBtn);
	}

	GameObject FindButtonForLevel(int level){
		GameObject content = gameObject.transform.GetChild(0).GetChild(0).GetChild(0).gameObject;
		int floor = (int) Mathf.Floor(level / 10f);
		if (level % 10 == 0) floor -= 1;
		int room = level % 10;
		if (room == 0) room = 10;
		int set = 0;
		if (room > 5){
			set = 1;
			room -= 5;
		}
		GameObject button = content.transform.GetChild(floor).GetChild(1 + set).GetChild(room - 1).gameObject;
		return button;
	}

	int ParseLevel(){
		string name = Application.loadedLevelName.Substring(5);
		return int.Parse(name);
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
		//if (int.Parse(PlayerPrefs.GetString("level_cube_counts").Substring(level - 1, 1)) == 0) return false;
		if (level > levelsInGame) return false;
		if (int.Parse(PlayerPrefs.GetString("player_progress").Substring(level - 2, 1)) > 0) return true;
		else return false;
	}

	int FindLatest(){
		for (int i = 0; i < 100; i++){
			if (int.Parse(PlayerPrefs.GetString("player_progress").Substring(i, 1)) == 0 && isPlayable(i + 1)){
				return i + 1;
			}
		}
		bool stop = false;
		while (stop == false){
			int rand = Random.Range (1, 100);
			if (isPlayable(rand)){
				stop = true;
				return rand;
			}
		}
		return -1;
	}

	public void PlayLatest(){
		int level = FindLatest();
		string levelname = string.Format("Level {0}", level);
		Application.LoadLevel(levelname);
	}
}
