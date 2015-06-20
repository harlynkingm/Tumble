using UnityEngine;
using System.Collections;

public class PipeBuilder : MonoBehaviour {

	public GameObject straight;
	public GameObject curved;
	public Vector3 startDir = new Vector3(1, 0, 0);
	private ArrayList pipeline = new ArrayList();
	private GameObject head;

	private class Pipe{
		public GameObject obj;
		public Vector3 direction;
		public bool curved;

		public Pipe(GameObject o, Vector3 dir, bool c){
			obj = o;
			direction = dir;
			curved = c;
		}
	}

	Pipe GetLatestPipe(){
		return (Pipe) pipeline[pipeline.Count - 1];
	}

	Pipe GetOldPipe(){
		if (pipeline.Count >= 2) return (Pipe) pipeline[pipeline.Count - 2];
		else return (Pipe) pipeline[0];
	}

	public void Build(Vector3 dir){
		if (straight == null || curved == null) return;
		if (head == null) head = gameObject;
		if (pipeline.Count == 0){
			Pipe pipe = new Pipe(gameObject, startDir, false);
			pipeline.Add (pipe);
		}
		Pipe cp = GetLatestPipe();
		if (dir == cp.direction * -1) return;
		else if (dir == cp.direction){
			GameObject o;
			if (dir.x != 0){
				o = SpawnStraight(new Vector3(1, 0, 0));
			}
			else if (dir.y != 0){
				o = SpawnStraight(new Vector3(0, 1, 0));
			}
			else{
				o = SpawnStraight(new Vector3(0, 0, 1));
			}
			Pipe newPipe = new Pipe(o, cp.direction, false);
			pipeline.Add (newPipe);
		}
		else if (dir.x != 0){
			Vector3 rot = new Vector3(0, 0, 0);
//			if (dir.x == -1) rot.y = 90;
//			else if (dir.x == 1) rot.y = 270;
//			if (currentDir.z == -1) rot.z = 180;
//			else if (currentDir.y == -1) rot.z = 270;
//			else if (currentDir.y == 1) rot.z = 90;
			if (dir.x == 1) rot.z = 180;
			if (cp.direction.z == -1) rot.x = 180;
			else if (cp.direction.y == -1) rot.x = 90;
			else if (cp.direction.y == 1) rot.x = 270;
			GameObject o = SpawnCurved(rot);
			Pipe newPipe = new Pipe(o, dir, true);
			pipeline.Add (newPipe);
		}
		else if (dir.y != 0){
			Vector3 rot = new Vector3(0, 0, 0);
//			if (dir.y == -1) rot.x = 270;
//			else if (dir.y == 1) rot.x = 90;
//			if (currentDir.x == -1) rot.y = 180;
//			else if (currentDir.z == -1) rot.y = 90;
//			else if (currentDir.z == 1) rot.y = 270;
			if (dir.y == 1) rot.z = 270;
			else if (dir.y == -1) rot.z = 90;
			if (cp.direction.x == 1) rot.y = 90;
			else if (cp.direction.x == -1) rot.y = 270;
			else if (cp.direction.z == -1) rot.y = 180;
			GameObject o = SpawnCurved(rot);
			Pipe newPipe = new Pipe(o, dir, true);
			pipeline.Add (newPipe);
		}
		else if (dir.z != 0){
			Vector3 rot = new Vector3(0, 0, 0);
//			if (dir.z == 1) rot.y = 180;
//			if (currentDir.x == -1 && dir.z == -1) rot.z = 180;
//			else if (currentDir.x == 1 && dir.z == 1) rot.z = 180;
//			else if (currentDir.y == 1) rot.z = 90;
//			else if (currentDir.y == -1) rot.z = 270;
			if (cp.direction.x == 1){
				rot.y = 90;
				if (dir.z == -1) rot.z = 180;
			}
			else if (cp.direction.x == -1){
				rot.y = 270;
				if (dir.z == 1) rot.z = 180;
			}
			else if (cp.direction.y == 1){
				rot.x = 270;
				if (dir.z == 1) rot.z = 90;
				else if (dir.z == -1) rot.z = 270;
			}
			else if (cp.direction.y == -1){
				rot.x = 90;
				if (dir.z == 1) rot.y = 90;
				else if (dir.z == -1) rot.y = 270;
			}
			GameObject o = SpawnCurved(rot);
			Pipe newPipe = new Pipe(o, dir, true);
			pipeline.Add (newPipe);
		}
	}

	GameObject SpawnStraight(Vector3 q){
		Pipe cp = GetLatestPipe();
		Quaternion rot = Quaternion.Euler (0, 90, 0);
		if (q.y == 1) rot = Quaternion.Euler(90, 180, 0);
		else if (q.z == 1) rot = Quaternion.Euler(0, 180, 0);
		Vector3 pos = cp.obj.transform.position + (cp.direction * 1.8f);
		if (cp.curved){
			pos = cp.obj.transform.position + (cp.direction * 2.3f);
			pos += GetOldPipe().direction;
		}
		GameObject obj = (GameObject) GameObject.Instantiate(straight, pos, rot);
		obj.transform.parent = head.transform;
		return obj;
	}

	GameObject SpawnCurved(Vector3 q){
		Pipe cp = GetLatestPipe();
		Quaternion rot = Quaternion.Euler(q);
		Vector3 pos = cp.obj.transform.position + (cp.direction * 1.4f);
		if (cp.curved){
			pos = cp.obj.transform.position + (cp.direction * 2f);
			pos += GetOldPipe().direction;
		}
		GameObject obj = (GameObject) GameObject.Instantiate(curved, pos, rot);
		obj.transform.parent = head.transform;
		return obj;
	}

	public void Delete(){
		if (pipeline.Count <= 1) return;
		GameObject obj = GetLatestPipe().obj;
		GameObject.DestroyImmediate(obj);
		pipeline.RemoveAt(pipeline.Count - 1);
	}
}
