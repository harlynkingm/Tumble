using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using UnityEngine.EventSystems;

public class conversation_controller : MonoBehaviour {

	public GameObject display;
	public GameObject qDisplay;
	public GameObject a1Display;
	public GameObject a2Display;
	public GameObject pause;
	public bool developerMode = false;
	private ConversationNode currentNode;
	private Text qText;
	private Text a1Text;
	private Text a2Text;
	private bool touchable = true;

	public class ConversationNode {
		public string question;
		public string response1;
		public string response2;
		private ConversationNode leftNode;
		private ConversationNode rightNode;

		public ConversationNode(string q, string r1, string r2){
			question = q;
			response1 = r1;
			response2 = r2;
		}

		public void setLeft(ConversationNode left){
			leftNode = left;
		}

		public void setRight(ConversationNode right){
			rightNode = right;
		}

		public void setBoth(ConversationNode node){
			leftNode = node;
			rightNode = node;
		}

		public ConversationNode getLeft(){
			return leftNode;
		}

		public ConversationNode getRight(){
			return rightNode;
		}
	}

	void Awake(){
		currentNode = DefineTree(Application.loadedLevelName);
		GameObject destroy = GameObject.FindGameObjectWithTag ("EditorOnly");
		if (destroy != null){
			GameObject.Destroy(destroy);
			return;
		}

		if (currentNode != null && developerMode == false){
			qText = qDisplay.GetComponent<Text>();
			a1Text = a1Display.GetComponent<Text>();
			a2Text = a2Display.GetComponent<Text>();
			displayText();
			openDialog();
		}
	}

	void Update(){
		if (touchable == false && Input.touchCount == 0){
			touchable = true;
		}
	}

	ConversationNode DefineTree(string levelname){
		switch(levelname){
		case "Level 1":
			return LevelOne();
		case "Level 2":
			return LevelTwo();
		case "Level 3":
			return LevelThree();
		case "Level 6":
			return LevelSix();
		case "Level 7":
			return LevelSeven();
		case "Level 8":
			return LevelEight();
		default:
			return null;
		}
	}

	ConversationNode LevelOne(){
		int random = Random.Range(12256, 2566891);
		ConversationNode head = new ConversationNode(System.String.Format("Hello, Collector #{0}!\nWelcome to LERP Corporation.\nDo you know why you're here?", random), "No.", "Yes.");
		ConversationNode oneA = new ConversationNode("Wonderful. Then I'm sure you'll collect Cubes for us quite efficiently.", "Okay.", "Hm...");
		head.setRight(oneA);
		ConversationNode oneB = new ConversationNode("Wonderful... You're here to help us complete our mission to collect every Cube in the known world.", "Okay...", "Cool.");
		head.setLeft(oneB);
		ConversationNode three = new ConversationNode("Tilt your device to move, and roll over cubes to collect them.", "Okay.", "Fine.");
		oneA.setBoth (three);
		oneB.setBoth(three);
		ConversationNode eightA = new ConversationNode("Collect as many Cubes as you can, then drop them off to complete your first task.", "Sounds good.", "Whatever.");
		three.setBoth(eightA);
		return head;
	}

	ConversationNode LevelTwo(){
		ConversationNode head = new ConversationNode("Now that you know how to collect Cubes, it's time for you to see the world like a Collector.", "How?", "Okay.");
		ConversationNode one = new ConversationNode("Slide across the screen to move the camera.\nUse three fingers to reset the camera.", "Nice.", "Ew.");
		ConversationNode two = new ConversationNode("Pinch with two fingers to zoom in and out.", "Okay.", "Fun.");
		head.setBoth(one);
		one.setBoth(two);
		return head;
	}

	ConversationNode LevelThree(){
		ConversationNode intro = new ConversationNode("Here at LERP Corporation, individualism is highly valued.\nWe encourage all Collectors to become a Persona while working.", "Huh.", "Alright?");
		ConversationNode masks = new ConversationNode("You can choose and buy new Personas in the Pause Menu using the Cubes you've collected.", "Cool.", "Lame.");
		intro.setBoth(masks);
		ConversationNode head = new ConversationNode("Now, let's get going on collecting more cubes!", "Whatever.", "Okay.");
		masks.setBoth(head);
		return intro;
	}

	ConversationNode LevelSix(){
		ConversationNode head = new ConversationNode("This next mission is going to be a bit different.", "Okay.", "How?");
		ConversationNode one = new ConversationNode("This time, the Cubes will be coming towards you.", "Oh boy.", "Sounds fun.");
		head.setBoth(one);
		return head;
	}

	ConversationNode LevelSeven(){
		ConversationNode one = new ConversationNode("It's time for you to meet our friend: The Conveyor Belt.", "Ooh.", "Ahh.");
		ConversationNode two = new ConversationNode("Conveyor Belts push you in the direction they are rolling.\nBe careful, they can be forceful.", "Got it.", "Aye-aye.");
		one.setBoth(two);
		return one;
	}

	ConversationNode LevelEight(){
		ConversationNode head = new ConversationNode("Doors inside our factory are powered by the energy of small creatures called Lerpers.", "Aww.", "Meh.");
		ConversationNode one = new ConversationNode("Sometimes, Lerpers don't go where they should.\nDeliver Lerpers to their stations to open doors.", "Okay.", "Maybe.");
		head.setBoth(one);
		return head;
	}

	void displayText(){
		qText.text = currentNode.question;
		a1Text.text = currentNode.response1;
		a2Text.text = currentNode.response2;
	}

	public void ChooseLeft(){
		if (touchable){
			touchable = false;
			if (currentNode.getLeft() == null) closeDialog();
			else currentNode = currentNode.getLeft();
			displayText();
		}
	}

	public void ChooseRight(){
		if (touchable){
			touchable = false;
			if (currentNode.getRight() == null) closeDialog();
			else currentNode = currentNode.getRight();
			displayText();
		}
	}

	void openDialog(){
		display.SetActive(true);
		pause.SetActive(false);
		Time.timeScale = 0;
	}

	void closeDialog(){
		display.SetActive(false);
		pause.SetActive(true);
		Time.timeScale = 1;
	}
}
