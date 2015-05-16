using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class fade_in : MonoBehaviour {

	private bool fadeIn = true;
	private bool fadeOut = false;
	private Color text;
	private Color touchColor;
	private Color panelColor;
	public GameObject convo;
	public GameObject touchText;
	public GameObject intro;
	public GameObject panel;

	void Start(){
		convo.SetActive(false);
		text = gameObject.GetComponent<Text>().color;
		touchColor = touchText.GetComponent<Text>().color;
		panelColor = panel.GetComponent<Image>().color;
	}

	void Update(){
		if (fadeIn){
			if (text.a < 1){
				text.a += .01f;
				gameObject.GetComponent<Text>().color = text;
			}
			else{
				fadeIn = false;
			}
		}
		else{
			if (touchColor.a < .75 && Input.touchCount == 0){
				touchColor.a += .01f;
				touchText.GetComponent<Text>().color = touchColor;
			}
			else if (Input.touchCount > 0){
				fadeOut = true;
			}
		}
		if (fadeOut){
			convo.SetActive(true);
			if (text.a > 0){
				text.a -= .02f;
				touchColor.a -= .02f;
				panelColor.a -= .02f;
				gameObject.GetComponent<Text>().color = text;
				panel.GetComponent<Image>().color = panelColor;
				touchText.GetComponent<Text>().color = touchColor;
				convo.SetActive(true);
			}
			else{
				intro.SetActive(false);
			}
		}
	}
}
