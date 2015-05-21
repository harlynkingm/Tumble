#pragma strict

var musicBtn: GameObject;
var vibBtn: GameObject;
var musicOn: Sprite;
var musicOff: Sprite;
var vibeOn: Sprite;
var vibeOff: Sprite;
private var lastTime: float;

function Start () {
	if (!PlayerPrefs.HasKey("music")) PlayerPrefs.SetFloat("music", 1);
	if (!PlayerPrefs.HasKey("vibe")) PlayerPrefs.SetInt("vibe", 1);
}

function Refresh(){
	if (PlayerPrefs.GetFloat("music") == 1.0){
		musicBtn.GetComponent(UI.Image).sprite = musicOn;
		AudioListener.volume = 1;
	}
	else{
		musicBtn.GetComponent(UI.Image).sprite = musicOff;
		AudioListener.volume = 0;
	}
	if (PlayerPrefs.GetInt("vibe") == 1){
		vibBtn.GetComponent(UI.Image).sprite = vibeOn;
	}
	else{
		vibBtn.GetComponent(UI.Image).sprite = vibeOff;
	}
	lastTime = getTime();
}

function SetMusic () {
	if (getTime() - lastTime > .3){
		if (PlayerPrefs.GetFloat("music") == 1.0){
			PlayerPrefs.SetFloat("music", 0);
		}
		else{
			PlayerPrefs.SetFloat("music", 1);
		}
		Refresh();
	}
}

function SetVibe () {
	if (getTime() - lastTime > .3){
		if (PlayerPrefs.GetInt("vibe") == 1){
			PlayerPrefs.SetInt("vibe", 0);
		}
		else{
			PlayerPrefs.SetInt("vibe", 1);
		}
		Refresh();
	}
}

function OnEnable(){
	Refresh();
}

function getTime(){
	return (System.DateTime.Now.Second + (System.DateTime.Now.Millisecond * 1/1000.0));
}