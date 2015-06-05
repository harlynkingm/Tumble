using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class mask_controller : MonoBehaviour {

	public Sprite[] masks;
	public int[] costs;
	public GameObject demoImage;
	public GameObject picture;
	public GameObject check;
	public GameObject buyBtn;
	public GameObject buyTxt;
	private int spaceBetween = 160;
	private GameObject[] list;
	private int selected;
	private int lastSelected;
	private float distPerMask;

	void Start () {
		list = new GameObject[masks.Length];
		for (int i = 0; i < masks.Length; i++){
			GameObject temp = GameObject.Instantiate(demoImage);
			temp.transform.SetParent(gameObject.transform, false);
			temp.GetComponent<Image>().sprite = masks[i];
			list[i] = temp;
		}
//		if (masks.Length % 2 == 0){
//			startX = ((masks.Length/2)*spaceBetween) - (spaceBetween/2);
//			endX = ((masks.Length/2)*(spaceBetween * -1)) + (spaceBetween/2);
//		}
//		else{
//			startX = Mathf.FloorToInt(masks.Length/2) * spaceBetween;
//			endX = Mathf.FloorToInt(masks.Length/2) * (spaceBetween * -1);
//		}
		Destroy (demoImage);
		gameObject.GetComponent<RectTransform>().sizeDelta = new Vector2(spaceBetween * masks.Length, 600);
		if (!PlayerPrefs.HasKey("mask")){
			PlayerPrefs.SetInt("mask", 0);
		}
		if (!PlayerPrefs.HasKey("unlocks")){
			string prepString = "";
			for (int i = 0; i < masks.Length; i++){
				if (costs[i] == 0) prepString = string.Concat(prepString, "1");
				else prepString = string.Concat(prepString, "0");
			}
			PlayerPrefs.SetString("unlocks", prepString);
		}
		distPerMask = (float) 1.0/masks.Length;
		transform.parent.GetComponent<ScrollRect>().normalizedPosition = new Vector2(distPerMask * PlayerPrefs.GetInt("mask"), 0);
	}

	void OnEnable (){
		//changeX((PlayerPrefs.GetInt("mask") * spaceBetween * -1));
		transform.parent.GetComponent<ScrollRect>().normalizedPosition = new Vector2(distPerMask * PlayerPrefs.GetInt("mask"), 0);
	}

	void changeX(float x){
		Vector2 ancP = gameObject.GetComponent<RectTransform>().anchoredPosition;
		ancP.x = x;
		gameObject.GetComponent<RectTransform>().anchoredPosition = ancP;
	}

	void Update(){
		//selected = Mathf.FloorToInt(Mathf.Abs (getX ()/spaceBetween));
		selected = Mathf.Clamp(Mathf.RoundToInt(transform.parent.GetComponent<ScrollRect>().normalizedPosition.x / distPerMask), 0, masks.Length - 1);
		picture.GetComponent<Image>().sprite = list[selected].GetComponent<Image>().sprite;
		if (selected != lastSelected) UpdateSelections();
		lastSelected = selected;
	}

	void UpdateSelections(){
		if (PlayerPrefs.GetString("unlocks")[selected] == "1"[0]){
			check.SetActive(true);
			buyBtn.SetActive(false);
		}
		else if (PlayerPrefs.GetString("unlocks")[selected] == "0"[0]){
			check.SetActive(false);
			buyBtn.SetActive(true);
			buyTxt.GetComponent<Text>().text = string.Format("Buy: {0} Cubes", costs[selected]);
			if (CanAffordSelected()){
				buyTxt.GetComponent<Text>().color = Color.black;
			}
			else{
				buyTxt.GetComponent<Text>().color = Color.red;
			}
		}
	}

	bool CanAffordSelected(){
		if (PlayerPrefs.GetInt("cubes") >= costs[selected]) return true;
		else return false;
	}

	float getX(){
		return gameObject.GetComponent<RectTransform>().anchoredPosition.x;
	}

	public void SaveMask(){
		PlayerPrefs.SetInt("mask", selected);
		if (Application.loadedLevelName != "Main Menu") GameObject.FindGameObjectWithTag("Player").SendMessage("SetMask");
	}

	public void buySelected(){
		if (CanAffordSelected()){
			string prepString = "";
			string curUnlocks = PlayerPrefs.GetString("unlocks");
			for (int i = 0; i < masks.Length; i++){
				if (i == selected) prepString = string.Concat(prepString, "1");
				else prepString = string.Concat(prepString, curUnlocks[i]);
			}
			PlayerPrefs.SetString("unlocks", prepString);
			PlayerPrefs.SetInt("cubes", PlayerPrefs.GetInt("cubes") - costs[selected]);
			UpdateSelections();
		}
	}

}
