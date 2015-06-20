using UnityEngine;
using System.Collections;

public class camera_control : MonoBehaviour {
	public Vector2 offset;
	private Transform t;
	private Transform pt;
	private Vector3 move;
	private float maxVal = 1.5f;
	private bool moving;
	private Vector3 destination;
	private float startTime;
	private Vector3 startPos;
	private float time = 1f;
	private float p;
	private float x;
	private GameObject pl;
	private Renderer plr;
	private RaycastHit hit;
	private bool movable = true;
	private bool still = false;
	
	void Start () {
		pl = GameObject.Find ("player");
		pt = pl.transform;
		plr = pl.GetComponent<Renderer>();
		t = gameObject.transform;
		int level = int.Parse(Application.loadedLevelName.Substring(6));
		if (level % 10 == 6){
			still = true;
			return;
		}
		t.position = new Vector3(pt.position.x + offset.x, pt.position.y + offset.y, t.position.z);
	}

	void Update () {
		if (!still){
		if (!moving){
			t.position = new Vector3(pt.position.x + offset.x, pt.position.y + offset.y, t.position.z);
			//t.LookAt(pt);
		}
		else if (moving && p < 1){
			p = Mathf.Clamp01((Time.time - startTime)/time);
			x = p*p*p*(p*(p*6 - 15) + 10);
			if (plr.enabled) destination = new Vector3(pt.position.x + offset.x, pt.position.y + offset.y, t.position.z);
			t.position = Vector3.Lerp(startPos, destination, x);
		}
		else if (moving && p >= 1){
			moving = false;
		}
		if (Time.timeScale == 1 && Input.touchCount > 0){
			if (Input.touchCount == 1){
				if (CheckHit(Input.GetTouch(0))) movable = false;
				if (Input.GetTouch(0).phase == TouchPhase.Ended) movable = true;
				if (movable){
					offset.x = Mathf.Clamp(offset.x - Input.GetTouch(0).deltaPosition.x * .008f, maxVal * -1f, maxVal);
					offset.y = Mathf.Clamp(offset.y - Input.GetTouch(0).deltaPosition.y * .008f, maxVal * -1f, maxVal);
				}
			}
			else if (Input.touchCount == 3){
				StartCoroutine(ResetOffset(offset));
			}
		}
		}
	}

	bool CheckHit(Touch touch){
		Ray ray = GetComponent<Camera>().ScreenPointToRay(touch.position);
		if (Physics.Raycast(ray, out hit)){
			if (hit.collider.CompareTag("Neutral")){
				return true;
			}
		}
		return false;
	}

	IEnumerator ResetOffset(Vector2 startPos){
		for (float f = 0; f < 1f; f += .05f){
			offset = Vector2.Lerp(startPos, Vector2.zero, f);
			yield return null;
		}
	}

	void NiceMoveBro(Vector3 move){
		moving = true;
		destination = move;
		startTime = Time.time;
		startPos = t.position;
		p = 0;
	}
}
