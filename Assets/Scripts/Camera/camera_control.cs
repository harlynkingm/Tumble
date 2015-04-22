using UnityEngine;
using System.Collections;

public class camera_control : MonoBehaviour {
	bool follow_player = true;
	private Transform t;
	private Transform pt;
	private Vector3 move;
	
	void Start () {
		if (follow_player){
			pt = GameObject.Find ("player").transform;
		}
		t = gameObject.transform;
	}

	void Update () {
		if (follow_player){
			t.position = new Vector3(pt.position.x, pt.position.y, t.position.z);
		}
	}
}
