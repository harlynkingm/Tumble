// The folder we place all screenshots inside.
// If the folder exists we will append numbers to create an empty folder.
var folder = "ScreenshotMovieOutput";
var frameRate = 25;
var sizeMultiplier : int = 1;
 
private var realFolder = "";
 
function Start () {
    // Set the playback framerate!
    // (real time doesn't influence time anymore)
    Time.captureFramerate = frameRate;
 
    // Find a folder that doesn't exist yet by appending numbers!
    realFolder = folder;
    var count : int = 1;
    while (System.IO.Directory.Exists(realFolder)) {
        realFolder = folder + count;
        count++;
    }
    // Create the folder
    System.IO.Directory.CreateDirectory(realFolder);
}
 
function Update () {
    // name is "realFolder/shot 0005.png"
    var name = String.Format("{0}/shot {1:D04}.png", realFolder, Time.frameCount );
 
    // Capture the screenshot
    Application.CaptureScreenshot (name, sizeMultiplier);
}