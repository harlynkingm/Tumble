using UnityEngine;
using System.Collections;

public class main_menu_cam : MonoBehaviour {

	public Transform target;
	private Transform t;
	private Vector3 offset;
	private float maxVal = 3f;


	void Start(){
		t = transform;
	}

	void Update () {
		t.position = new Vector3(target.position.x + offset.x, target.position.y + offset.y, t.position.z);
		t.LookAt(target);
		if (Time.timeScale == 1 && Input.touchCount > 0){
			if (Input.touchCount == 1){
				offset.x = Mathf.Clamp(offset.x - Input.GetTouch(0).deltaPosition.x * .008f, maxVal * -1f, maxVal);
				offset.y = Mathf.Clamp(offset.y - Input.GetTouch(0).deltaPosition.y * .008f, maxVal * -1f, maxVal);
			}
		}
	}
}
