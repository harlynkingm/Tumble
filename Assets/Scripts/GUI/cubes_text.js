#pragma strict

private var text: String;

function Start(){
	if (!PlayerPrefs.HasKey("cubes")){
		PlayerPrefs.SetInt("cubes", 0);
	}
}

function Update () {
	text = String.Format("{0} Cubes", PlayerPrefs.GetInt("cubes"));
	gameObject.GetComponent(UI.Text).text = text;
}