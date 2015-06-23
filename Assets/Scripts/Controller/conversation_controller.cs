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
	public Image eyes;
	public Image brows;
	public Sprite puzzled_brow;
	public Sprite sad_brow;
	public Sprite angry_brow;
	public Sprite surprised_brow;
	public Sprite question_brow;
	private ConversationNode currentNode;
	private Text qText;
	private Text a1Text;
	private Text a2Text;
	private Animator anim;
	private bool touchable = true;

	public class ConversationNode {
		public string question;
		public string response1;
		public string response2;
		public string emotion;
		private ConversationNode leftNode;
		private ConversationNode rightNode;

		public ConversationNode(string q, string r1, string r2, string e = "Neutral"){
			question = q;
			response1 = r1;
			response2 = r2;
			emotion = e;
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

		public string getEmotion(){
			return emotion;
		}
	}

	void Awake(){
		anim = eyes.gameObject.GetComponent<Animator>();
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
		case "Level 10":
			return LevelTen();
		case "Level 11":
			return LevelEleven();
		case "Level 14":
			return LevelFourteen();
		case "Level 16":
			return LevelSixteen();
		case "Level 17":
			return LevelSeventeen();
		case "Level 19":
			return LevelNineteen();
		default:
			return null;
		}
	}

	ConversationNode LevelOne(){
		ConversationNode head = new ConversationNode("Hello there!\n\nMy name is Friendly the Evil Robot!", "Hi!", "Why is your name 'Evil?'");
		ConversationNode oneB = new ConversationNode("That's just my name.\nI'm actually quite friendly.", "Okay...", "Whatever.", "Sad");
		head.setRight(oneB);
		ConversationNode oneA = new ConversationNode("Is this your first day at the LERP Factory?", "No.", "Yes.", "Question");
		head.setLeft(oneA);
		oneB.setBoth(oneA);
		ConversationNode twoA = new ConversationNode("Oh, then you probably know about the situation we're in.", "What situation?", "Yeah.", "Puzzled");
		ConversationNode twoB = new ConversationNode("You picked a good time to arrive. Our factory's been in chaos since someone placed Cubes everywhere.", "Oh no!", "I can help.", "Surprised");
		ConversationNode threeA = new ConversationNode("Our factory's been a mess since someone put Cubes everywhere. We can't get any work done!", "Bummer.", "I can help.", "Angry");
		ConversationNode fourA = new ConversationNode("Maybe you can help destroy the Cubes!", "Okay.", "Maybe.", "Surprised");
		ConversationNode five = new ConversationNode("Tilt your device to move, and roll over cubes to destroy them.", "Okay.", "Fine.");
		ConversationNode fiveA = new ConversationNode("Could you? Tilt your device to move, and roll over cubes to destroy them.", "Okay.", "Fine.");
		ConversationNode six = new ConversationNode("Just destroy as many Cubes as you can!\nYou don't have to destroy them all.", "Okay.", "Cool.");
		ConversationNode seven = new ConversationNode("Use the Exit Pipe to go to the next Room.", "Sounds good!", "Roger that.");
		oneA.setLeft (twoA);
		oneA.setRight(twoB);
		twoA.setBoth(threeA);
		twoB.setLeft(fourA);
		twoB.setRight(fiveA);
		threeA.setLeft(fourA);
		threeA.setRight(fiveA);
		fourA.setBoth(five);
		five.setBoth(six);
		fiveA.setBoth(six);
		six.setBoth(seven);
		return head;
	}

	ConversationNode LevelTwo(){
		ConversationNode head = new ConversationNode("Good job on that last room. I'm still looking into who caused this mess.", "Okay.", "Who could it be?", "Surprised");
		ConversationNode head2 = new ConversationNode("I have a few suspects, but nothing conclusive.", "Aw.", "Alright...", "Puzzled");
		ConversationNode one = new ConversationNode("Slide across the screen to move the camera.", "Nice.", "Okay.");
		ConversationNode two = new ConversationNode("Pinch with two fingers to zoom in and out.", "Okay.", "Fun.");
		head.setLeft(one);
		head.setRight(head2);
		head2.setBoth(one);
		one.setBoth(two);
		return head;
	}

	ConversationNode LevelThree(){
		ConversationNode intro = new ConversationNode("Here at the LERP Factory, we highly value individuality.", "Huh.", "Alright?");
		ConversationNode intro2 = new ConversationNode("Express yourself by becoming a Persona!", "Cool.", "How?", "Surprised");
		ConversationNode masks = new ConversationNode("You can choose and buy new Personas in the Pause Menu by spending the Cubes you've destroyed.", "Cool.", "Lame.");
		intro.setBoth(intro2);
		intro2.setBoth(masks);
		ConversationNode head = new ConversationNode("Now, let's get going on destroying more cubes!", "Whatever.", "Okay.");
		masks.setBoth(head);
		return intro;
	}

	ConversationNode LevelSix(){
		ConversationNode head = new ConversationNode("This next room is going to be a bit different.", "Okay.", "How?", "Puzzled");
		ConversationNode one = new ConversationNode("This time, the Cubes will be coming towards you.", "Oh boy.", "Sounds fun.", "Surprised");
		head.setBoth(one);
		return head;
	}

	ConversationNode LevelSeven(){
		ConversationNode one = new ConversationNode("It's time for you to meet my friend: The Conveyor Belt.", "Ooh.", "Ahh.", "Question");
		ConversationNode two = new ConversationNode("Conveyor Belts push you in the direction they are rolling.\nBe careful, they can be forceful.", "Got it.", "Aye-aye.", "Angry");
		one.setBoth(two);
		return one;
	}

	ConversationNode LevelEight(){
		ConversationNode head = new ConversationNode("Doors inside our factory are powered by the energy of small creatures called Lerpers.", "Aww.", "Meh.");
		ConversationNode two = new ConversationNode("Since someone put Cubes everywhere, Lerpers haven't been able to do their jobs properly.", "Such a shame.", "Okay.", "Sad");
		ConversationNode one = new ConversationNode("Push Lerpers to their stations to open doors.", "Okay.", "Maybe.");
		head.setBoth(two);
		two.setBoth(one);
		return head;
	}

	ConversationNode LevelTen(){
		ConversationNode head = new ConversationNode("You're almost done with the first floor!", "Yay!", "Aww.", "Surprised");
		ConversationNode one = new ConversationNode("If you get the Lerpers through this level, we'll be one step closer to figuring out who made this mess.", "Okay.", "Sounds good.");
		head.setBoth(one);
		return head;
	}

	ConversationNode LevelEleven(){
		ConversationNode head = new ConversationNode("Before the Cubes showed up, Buttons used to move pieces of the factory automatically.", "Huh.", "Alright.");
		ConversationNode one = new ConversationNode("Now you have to press them manually to get them to work!", "How?", "Interesting.", "Angry");
		ConversationNode two = new ConversationNode("Use your finger to touch Buttons and flip them on and off.", "Cool.", "Wow.", "Surprised");
		head.setBoth(one);;
		one.setBoth(two);
		return head;
	}

	ConversationNode LevelFourteen(){
		ConversationNode head = new ConversationNode("Apart from making things move, Buttons can also make things stop moving!", "Really?", "Okay.", "Surprised");
		ConversationNode one = new ConversationNode("Machinery that is moving too fast can usually be stopped with a Button.", "Okay.", "Sounds good.");
		head.setBoth(one);
		return head;
	}

	ConversationNode LevelSixteen(){
		ConversationNode head = new ConversationNode("In this room, the Cubes will be coming your way once again.", "Alright.", "I'm ready.");
		return head;
	}

	ConversationNode LevelSeventeen(){
		ConversationNode head = new ConversationNode("For ultimate efficiency, the LERP Factory uses a system of teleporters to move things around!", "Woah.", "Nice.", "Surprise");
		ConversationNode one = new ConversationNode("Teleporters can help you get to places that are hard to reach.", "Okay.", "How?");
		ConversationNode two = new ConversationNode("Enter one teleporter to come out of the one it is linked to.", "Interesting.", "Alright.");
		head.setBoth(one);
		one.setBoth(two);
		return head;
	}

	ConversationNode LevelNineteen(){
		ConversationNode head = new ConversationNode("Lerpers can go through teleporters also!", "Nice.", "Okay.");
		return head;
	}

	void displayText(){
		qText.text = currentNode.question;
		a1Text.text = currentNode.response1;
		a2Text.text = currentNode.response2;
		string emo = currentNode.getEmotion();
		switch (emo){
		case "Puzzled":
			brows.sprite = puzzled_brow;
			brows.color = new Color(1f, 1f, 1f, 1f);
			anim.Play("neutral");
			break;
		case "Sad":
			brows.sprite = sad_brow;
			brows.color = new Color(1f, 1f, 1f, 1f);
			anim.Play("neutral");
			break;
		case "Angry":
			brows.sprite = angry_brow;
			brows.color = new Color(1f, 1f, 1f, 1f);
			anim.Play("neutral");
			break;
		case "Surprised":
			brows.sprite = surprised_brow;
			brows.color = new Color(1f, 1f, 1f, 1f);
			anim.Play("neutral");
			break;
		case "Question":
			brows.sprite = question_brow;
			brows.color = new Color(1f, 1f, 1f, 1f);
			anim.Play("neutral");
			break;
		default:
			brows.sprite = null;
			brows.color = new Color(1f, 1f, 1f, 0f);
			anim.Play("roving");
			break;
		}
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
