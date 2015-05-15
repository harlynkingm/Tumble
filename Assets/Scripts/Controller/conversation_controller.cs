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
		case "Level 6":
			return LevelSix();
		case "Level 7":
			return LevelSeven();
		default:
			return null;
		}
	}

	ConversationNode LevelOne(){
		int random = Random.Range(12256, 2566891);
		ConversationNode head = new ConversationNode(System.String.Format("Hello, Collector #{0}!\nWelcome to LERP Corporation.\nDo you know why you're here?", random), "No.", "Yes.");
		ConversationNode oneA = new ConversationNode("Wonderful. Well, you'll get started in a moment- Right after you take your PEAS.", "Okay.", "What are PEAS?");
		head.setRight(oneA);
		ConversationNode oneB = new ConversationNode("Wonderful... You're here to help us complete our mission to collect every Cube in the known world.", "Why?", "Cool.");
		head.setLeft(oneB);
		ConversationNode twoA = new ConversationNode("You'll find out more as you go along- but first, you have to take your PEAS!", "Okay.", "What are PEAS?");
		oneB.setRight(twoA);
		oneB.setLeft(twoA);
		ConversationNode twoB = new ConversationNode("PEAS- Personality Examination Aptitude Surveys. They let us know if you're collecting at your full potential.", "I hate tests.", "Okay, sure.");
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
		ConversationNode sixA = new ConversationNode("Question 3:\n You are in a truck filled with lima beans.\nDo you choose to partake in the pizza party?", "Yes.", "No.");
		fiveA.setBoth(sixA);
		ConversationNode sevenA = new ConversationNode("Congratulations! You passed your first PEAS. The choices you made have been recorded permanently.", "Yay!", "Aww.");
		sixA.setBoth(sevenA);
		ConversationNode eightA = new ConversationNode("COLLECT THE BLUE CUBE\n\nGOLD CUBES ACT AS CHECKPOINTS\n\nTILT YOUR DEVICE TO MOVE.", "Sounds good.", "Whatever.");
		sevenA.setBoth(eightA);
		return head;
	}

	ConversationNode LevelTwo(){
		ConversationNode head = new ConversationNode("Now that you've collected your first Cubes, it's time for us to teach you how to collect more effectively.", "How?", "Okay.");
		ConversationNode one = new ConversationNode("PRESS THE LEFT OR RIGHT SIDE OF THE SCREEN TO ROTATE", "What?", "Sure.");
		head.setBoth(one);
		return head;
	}

	ConversationNode LevelThree(){
		ConversationNode head = new ConversationNode("It seems like you're getting the hang of this. Keep up the good work.", "Thanks.", "Eh.");
		ConversationNode one = new ConversationNode("Now we can send you to a Cube that's a little more... Challenging.", "Bring it!", "Whatever.");
		head.setBoth(one);
		return head;
	}

	ConversationNode LevelFour(){
		ConversationNode head = new ConversationNode("Just two more collections and then you'll be ready for your next PEAS.", "I'm excited.", "I don't care.");
		ConversationNode oneA = new ConversationNode("We're excited to measure your progress too. Now lets get going on that next task.", "Okay.", "Sweet.");
		ConversationNode oneB = new ConversationNode("I would maybe think about changing your attitude. Going through collections angrily may affect your performance.", "Go away.", "Whatever...");
		head.setLeft(oneA);
		head.setRight(oneB);
		return head;
	}

	ConversationNode LevelFive(){
		ConversationNode head = new ConversationNode("This Cube should check your skills thus far. It's a bit of a brain bender, so get ready.", "I was born ready.", "I do what I want.");
		ConversationNode one = new ConversationNode("Good luck.\n\nSee you with the Cube.", "Yessir.", "See ya.");
		head.setBoth(one);
		return head;
	}

	ConversationNode LevelSix(){
		ConversationNode head = new ConversationNode("Alright, it's time for your second PEAS.", "Yes.", "Maybe.");
		ConversationNode one = new ConversationNode("Question 1:\n2 + 3A = ?", "3", "B");
		head.setBoth(one);
		ConversationNode two = new ConversationNode("Question 2:\nThat's right, Mrs. Pan. I did fill up the ________.", "Paint Bucket", "Grocery Bag");
		one.setBoth(two);
		ConversationNode three = new ConversationNode("Question 3:\nBees...", "Knees.", "Honey.");
		two.setBoth(three);
		ConversationNode four = new ConversationNode("Hmm...", "What?", "Did I pass?");
		three.setBoth(four);
		ConversationNode five = new ConversationNode("It seems like you have a bit more... work to do.", "I failed?", "I passed?");
		four.setBoth(five);
		ConversationNode six = new ConversationNode("The next Cube might crush you.\nGood luck.", "What?", "Why?");
		five.setBoth(six);
		return head;
	}

	ConversationNode LevelSeven(){
		ConversationNode head = new ConversationNode("I'm sorry I did that to you.", "Are you mad?", "I dislike you.");
		ConversationNode one = new ConversationNode("I just... thought you would be better at collecting by now.", "I'm doing my best.", "I'll try harder.");
		head.setLeft(one);
		ConversationNode two = new ConversationNode("Unfortunately, how much you like me has nothing to do with your progress as a Cube collector.", "Good.", "Hmpf.");
		head.setRight(two);
		ConversationNode blah = new ConversationNode("Blargh.", "Ha.", "Shh.");
		two.setRight(blah);
		ConversationNode three = new ConversationNode("In any case, the next Cube will require some speed.", "Okay.", "I'll go slow then.");
		blah.setBoth(three);
		two.setLeft(three);
		one.setBoth(three);
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
