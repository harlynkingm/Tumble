using UnityEngine;
using System.Collections;

public class main_menu_cam : MonoBehaviour {

	public Transform target;
	private Transform t;
	private Vector3 offset;
	private float maxVal = 3f;
	private float sensitivity = .016f;
	private Vector2 inertia;

	void Start(){
		t = transform;
	}

	void Update () {
		t.position = new Vector3(target.position.x + offset.x, target.position.y + offset.y, t.position.z);
		t.LookAt(target);
		if (Input.touchCount == 1){
			if (Input.GetTouch(0).phase == TouchPhase.Began) inertia = new Vector2(0, 0);
			else inertia = new Vector2(Mathf.Clamp(Input.GetTouch(0).deltaPosition.x, -100, 100), Mathf.Clamp(Input.GetTouch(0).deltaPosition.y, -100, 100));
			offset.x = Mathf.Clamp(offset.x - Input.GetTouch(0).deltaPosition.x * sensitivity, maxVal * -1f, maxVal);
			offset.y = Mathf.Clamp(offset.y - Input.GetTouch(0).deltaPosition.y * sensitivity, maxVal * -1f, maxVal);
		}
		else if (Input.touchCount == 0 && (Mathf.Abs(inertia.x) > 0 || Mathf.Abs(inertia.y) > 0)){
			if (Mathf.Abs(inertia.x) < .0001) inertia.x = 0;
			if (Mathf.Abs(inertia.y) < .0001) inertia.y = 0;
			if (Mathf.Abs (offset.x) >= maxVal) inertia.x *= -1;
			if (Mathf.Abs (offset.y) >= maxVal) inertia.y *= -1;
			offset.x = Mathf.Clamp(offset.x - inertia.x * sensitivity, maxVal * -1f, maxVal);
			offset.y = Mathf.Clamp(offset.y - inertia.y * sensitivity, maxVal * -1f, maxVal);
			inertia *= .9f;
		}
	}
}
