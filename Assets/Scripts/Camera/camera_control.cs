using UnityEngine;
using System.Collections;

public class camera_control : MonoBehaviour {
	public bool follow_player = true;
	public bool player_box = false;
	public Vector2 offset;
	private Transform t;
	private Transform pt;
	private Vector3 move;
	
	void Start () {
		pt = GameObject.Find ("player").transform;
		t = gameObject.transform;
		t.position = new Vector3(pt.position.x + offset.x, pt.position.y + offset.y, t.position.z);
	}

	void Update () {
		if (follow_player){
			t.position = new Vector3(pt.position.x + offset.x, pt.position.y + offset.y, t.position.z);
		}
		else if (player_box){
			if (pt.position.x > t.position.x & pt.position.x - t.position.x > offset.x){
				t.position = new Vector3(pt.position.x - offset.x, pt.position.y, t.position.z);
			}
			else if (pt.position.x < t.position.x & t.position.x - pt.position.x > offset.x){
				t.position = new Vector3(pt.position.x + offset.x, pt.position.y, t.position.z);
			}
			else{
				t.position = new Vector3(t.position.x, pt.position.y, t.position.z);
			}
		}
	}
}
