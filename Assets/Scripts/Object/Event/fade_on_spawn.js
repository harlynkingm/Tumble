#pragma strict

private var rends : Renderer[];

function Start () {
	rends = new Renderer[transform.childCount];
	for (var i : int = 0; i < transform.childCount; i++){
		rends[i] = transform.GetChild(i).GetComponent(Renderer);
	}
	GoAway();
}

function GoAway () {
	for (var f : float = 1; f > 0; f -= .02){
		for (var i : int = 0; i < transform.childCount; i++){
			rends[i].material.color.a = f;
		}
		yield;
	}
	GameObject.Destroy(gameObject);
}