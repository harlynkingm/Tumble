using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class mask_controller : MonoBehaviour {

	public Sprite[] masks;
	public GameObject demoImage;
	public GameObject picture;
//	private int startX;
//	private int endX;
	private int spaceBetween = 200;
	private GameObject[] list;
	private int selected;

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
	}

//	void OnEnable (){
//		changeX(startX + (PlayerPrefs.GetInt("mask") * spaceBetween));
//	}

//	void changeX(float x){
//		Vector2 ancP = gameObject.GetComponent<RectTransform>().anchoredPosition;
//		ancP.x = x;
//		gameObject.GetComponent<RectTransform>().anchoredPosition = ancP;
//	}

//	void Update(){
//		if (Input.touchCount > 0){
//			if (Input.GetTouch (0).phase == TouchPhase.Ended) setNearest();
//			else moveTransform(Input.GetTouch (0));
//		}
//	}

	void Update(){
		selected = Mathf.FloorToInt(Mathf.Abs (getX ()/spaceBetween));
		picture.GetComponent<Image>().sprite = list[selected].GetComponent<Image>().sprite;
	}

//	void moveTransform(Touch touch){
//		Debug.Log (getX());
//		if (getX () >= startX && getX() <= endX){
//			changeX (getX () + (touch.deltaPosition.x * .001f));
//		}
//		else if (gameObject.GetComponent<RectTransform>().anchoredPosition.x < startX){
//			changeX(startX);
//		}
//		else if (gameObject.GetComponent<RectTransform>().anchoredPosition.x > endX){
//			changeX(endX);
//		}
//	}
//
//	void setNearest(){
//		float currentX = getX ();
//		float lowestSoFar = Mathf.Abs (startX - currentX);
//		int pos = 0;
//		for (int i = 0; i < masks.Length; i++){
//			int compare = startX - (spaceBetween * i);
//			if (Mathf.Abs(compare - currentX) < lowestSoFar){
//				lowestSoFar = Mathf.Abs(compare - currentX);
//				pos = i;
//			}
//		}
//		changeX(lowestSoFar);
//		PlayerPrefs.SetInt("mask", pos);
//	}

	float getX(){
		return gameObject.GetComponent<RectTransform>().anchoredPosition.x;
	}

	public void SaveMask(){
		PlayerPrefs.SetInt("mask", selected);
		GameObject.FindGameObjectWithTag("Player").SendMessage("SetMask");
	}

}
