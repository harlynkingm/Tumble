#pragma strict

var actions : single_animation[];
private var count : int;

function OnCollisionEnter (other : Collision) {
	if (other.gameObject.CompareTag("Player") || other.gameObject.CompareTag("GameController") || other.gameObject.CompareTag("Neutral")){
		GetComponent(single_animation).ActivateMove();
		for (var action : single_animation in actions){
			action.ActivateMove();
		}
	}
}

function OnCollisionExit(other : Collision){
	if (other.gameObject.CompareTag("Player") || other.gameObject.CompareTag("GameController") || other.gameObject.CompareTag("Neutral")){
		if (count > 0) return;
		GetComponent(single_animation).ActivateReverseMove();
		for (var action : single_animation in actions){
			action.ActivateReverseMove();
		}
	}
}

function OnCollisionStay(other : Collision){
	count++;
}

function Update(){
	count = 0;
}