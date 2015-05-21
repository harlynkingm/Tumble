﻿using UnityEngine;
using System.Collections;

public class camera_control : MonoBehaviour {
	public Vector2 offset;
	private Transform t;
	private Transform pt;
	private Vector3 move;

	private bool moving;
	private Vector3 destination;
	private float startTime;
	private Vector3 startPos;
	private float time = 1f;
	private float p;
	private float x;
	private GameObject pl;
	private Renderer plr;
	
	void Start () {
		pl = GameObject.Find ("player");
		pt = pl.transform;
		plr = pl.GetComponent<Renderer>();
		t = gameObject.transform;
		t.position = new Vector3(pt.position.x + offset.x, pt.position.y + offset.y, t.position.z);
	}

	void Update () {
		if (!moving){
			t.position = new Vector3(pt.position.x + offset.x, pt.position.y + offset.y, t.position.z);
		}
		else if (moving && p < 1){
			p = Mathf.Clamp01((Time.time - startTime)/time);
			x = p*p*p*(p*(p*6 - 15) + 10);
			if (plr.enabled) destination = new Vector3(pt.position.x, pt.position.y, -10);
			t.position = Vector3.Lerp(startPos, destination, x);
		}
		else if (moving && p >= 1){
			moving = false;
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
