using UnityEngine;
using System.Collections;

public class camera_control : MonoBehaviour {
	public Vector2 offset;
	public float left; public float right; public float up; public float down;
	public GameObject switchButton;
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
	private GameObject pl2;
	private Renderer plr;
	private RaycastHit hit;
	private bool movable = true;
	
	void Start () {
		t = gameObject.transform;
		left = t.position.x - left;
		right = t.position.x + right;
		up = t.position.y + up;
		down = t.position.y - down;
		pl = GameObject.FindGameObjectWithTag("Player");
		if (GameObject.FindGameObjectWithTag("GameController") != null){
			pl2 = GameObject.FindGameObjectWithTag("GameController");
			switchButton.SetActive(true);
		}
		pt = pl.transform;
		plr = pl.GetComponent<Renderer>();
		if (left != t.position.x || right != t.position.x || up != t.position.y || down != t.position.y) t.position = new Vector3(pt.position.x + offset.x, pt.position.y + offset.y, t.position.z);
	}

	void Update () {
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
					offset.x = Mathf.Clamp(offset.x - Input.GetTouch(0).deltaPosition.x * .016f, maxVal * -1f, maxVal);
					offset.y = Mathf.Clamp(offset.y - Input.GetTouch(0).deltaPosition.y * .016f, maxVal * -1f, maxVal);
				}
			}
			else if (Input.touchCount == 3){
				if (pl2 == null) StartCoroutine(ResetOffset(offset));
			}
		}
	}

	public void Switch(){
		if (pt == pl.transform){
			pt = pl2.transform;
			pl.SendMessage("StopMoving");
			pl2.SendMessage("StartMoving");
		}
		else if (pt == pl2.transform){
			pt = pl.transform;
			pl.SendMessage("StartMoving");
			pl2.SendMessage("StopMoving");
		}
		NiceMoveBro(pt.position);
	}

	void LateUpdate(){
		t.position = new Vector3(Mathf.Clamp(t.position.x, left, right), Mathf.Clamp(t.position.y, down, up), t.position.z);
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

	void OnDrawGizmosSelected(){
		Gizmos.color = Color.red;
		float width = left + right;
		float height = up + down;
		Vector3 relativeCenter = new Vector3(width/2f - left, height/2f - down, 0);
		Gizmos.DrawWireCube(transform.position + relativeCenter, new Vector3(width, height, .5f));
	}
}
