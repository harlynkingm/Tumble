#pragma strict

var actions : single_animation[];

function OnCollisionEnter (other : Collision) {
	if (other.gameObject.CompareTag("Player") || other.gameObject.CompareTag("GameController")){
		GetComponent(single_animation).ActivateMove();
		for (var action : single_animation in actions){
			action.ActivateMove();
		}
	}
}

function OnCollisionExit(other : Collision){
	if (other.gameObject.CompareTag("Player") || other.gameObject.CompareTag("GameController")){
		GetComponent(single_animation).ActivateReverseMove();
		for (var action : single_animation in actions){
			action.ActivateReverseMove();
		}
	}
}