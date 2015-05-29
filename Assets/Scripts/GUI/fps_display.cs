using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class fps_display : MonoBehaviour {

	private float deltaTime = 0.0f;
	private float fps;
	private Text txt;
	
	void Start () {
		txt = gameObject.GetComponent<Text>();
	}

	void Update () {
		deltaTime += (Time.deltaTime - deltaTime) * 0.1f;
		fps = 1.0f / deltaTime;
		txt.text = string.Format("{0:0.} fps", fps); 
	}
}
