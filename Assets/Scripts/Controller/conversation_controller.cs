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
		if (currentNode != null){
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
		case "Level 4":
			return LevelFour();
		case "Level 5":
			return LevelFive();
		default:
			return null;
		}
	}

	ConversationNode LevelOne(){
		int random = Random.Range(12256, 2566891);
		ConversationNode head = new ConversationNode(System.String.Format("Hello, Subject #{0}!\nWe're glad you made it.\nDo you know why you're here?", random), "No.", "Yes.");
		ConversationNode oneA = new ConversationNode("Wonderful. Well, we'll get started in a moment- Right after you take your PEAS.", "Okay.", "What are PEAS?");
		head.setRight(oneA);
		ConversationNode oneB = new ConversationNode("Wonderful... You're here to help us find the evidence we need to complete our experiment.", "Tell me more.", "Cool.");
		head.setLeft(oneB);
		ConversationNode twoA = new ConversationNode("You'll find out more as you go along- but first, you have to take your PEAS!", "Okay.", "What are PEAS?");
		oneB.setRight(twoA);
		oneB.setLeft(twoA);
		ConversationNode twoB = new ConversationNode("PEAS- Personality Examination Aptitude Surveys. They help us see how we'll you're doing.", "I hate tests.", "Okay, sure.");
		oneA.setRight(twoB);
		twoA.setRight(twoB);
		ConversationNode twoC = new ConversationNode("In case you were wondering, PEAS stands for Personality Examination Aptitude Surveys.", "I don't care.", "Nice.");
		oneA.setLeft (twoC);
		twoA.setLeft(twoC);
		ConversationNode threeA = new ConversationNode("So, are you ready to begin?", "Just start.", "Sure!");
		twoC.setBoth(threeA);
		twoB.setBoth(threeA);
		ConversationNode fourA = new ConversationNode("Question 1:\n What is your favorite color?", "Red", "Blue");
		threeA.setBoth(fourA);
		ConversationNode fiveA = new ConversationNode("Question 2:\n If you could be anywhere right now, where would you be?", "Right here.", "Somewhere else.");
		fourA.setBoth(fiveA);
		ConversationNode sixA = new ConversationNode("Question 3:\n You are in a truck filled with lima beans.\nDo you choose to partake in the pizza party?", "Yes.", "Um...");
		fiveA.setBoth(sixA);
		ConversationNode sevenA = new ConversationNode("Congratulations! You passed your first PEAS. The choices you made have been recorded permanently.", "Yay!", "Aww.");
		sixA.setBoth(sevenA);
		ConversationNode eightA = new ConversationNode("COLLECT THE BLUE CUBE\n\nGOLD CUBES ACT AS CHECKPOINTS\n\nTILT YOUR DEVICE TO MOVE.", "Sounds good.", "Whatever.");
		sevenA.setBoth(eightA);
		return head;
	}

	ConversationNode LevelTwo(){
		ConversationNode head = new ConversationNode("Now that you've passed your first cognitive task, it's time for us to change your world view.", "How?", "Okay.");
		ConversationNode one = new ConversationNode("PRESS THE LEFT OR RIGHT SIDE OF THE SCREEN TO ROTATE", "What?", "Sure.");
		head.setBoth(one);
		return head;
	}

	ConversationNode LevelThree(){
		ConversationNode head = new ConversationNode("Our system analysts just informed me you're getting the hang of this. Keep up the good work.", "Thanks.", "Eh.");
		ConversationNode one = new ConversationNode("Maybe it's time we moved you onto something a little more... Challenging.", "Bring it!", "Whatever.");
		head.setBoth(one);
		return head;
	}

	ConversationNode LevelFour(){
		ConversationNode head = new ConversationNode("Just two more cognitive tasks and then you'll be ready for your next PEAS.", "I'm excited.", "I don't care.");
		ConversationNode oneA = new ConversationNode("We're excited to measure your progress too. Now lets get going on that next task.", "Okay.", "Sweet.");
		ConversationNode oneB = new ConversationNode("I would maybe think about changing your attitude. Going through these tasks angrily may affect your performance.", "Go away.", "Whatever...");
		head.setLeft(oneA);
		head.setRight(oneB);
		return head;
	}

	ConversationNode LevelFive(){
		ConversationNode head = new ConversationNode("This task should check your progress thus far. It's a bit of a brain bender, so get ready.", "I was born ready.", "I do what I want.");
		ConversationNode one = new ConversationNode("Good luck.\n\nSee you on the other side.", "Yessir.", "See ya.");
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
