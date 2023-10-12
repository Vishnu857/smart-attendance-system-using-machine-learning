from datetime import datetime, date
import time
import cv2
import pymongo
from simple_facerec import SimpleFacerec
import pyttsx3

engine = pyttsx3.init()
# convert this text to speech
text = "Python is a great programming language"


def speach(text):
    engine.say(text)
    # play the speech
    engine.runAndWait()


myClient = pymongo.MongoClient(
    "mongodb+srv://vishnu:VueU5Brp66byGA@cluster0.xar7ngm.mongodb.net/?retryWrites=true&w=majority"
)
mydb = myClient["smartAttendance"]
attendance = mydb["attendances"]
processed_names = {}  # Store processed names and their last appearance timestamp

sfr = SimpleFacerec()
sfr.load_encoding_images("images/")


def update(name, datestr, time):
    attd = {"roll_no": name, "date": datestr, "time": time}
    attendance.insert_one(attd)
    print("Saved")


exclude_names = ["Unknown", "HOD", "Principal"]
# Load Camera
cap = cv2.VideoCapture(1)

while True:
    ret, frame = cap.read()

    # Detect Faces
    face_locations, face_names = sfr.detect_known_faces(frame)
    today = str(date.today())
    # To create a file if it doesn't exists
    f = open(f"Records/record_{today}.csv", "a")
    f.close()

    for face_loc, name in zip(face_locations, face_names):
        y1, x2, y2, x1 = face_loc[0], face_loc[1], face_loc[2], face_loc[3]

        cv2.putText(
            frame, name, (x1, y1 - 10), cv2.FONT_HERSHEY_DUPLEX, 1, (0, 0, 200), 2
        )
        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 200), 4)
        with open(f"Records/record_{today}.csv", "r") as f:
            data = f.readlines()
            names = []
            for line in data:
                entry = line.split(",")
                names.append(entry[0])
        with open(f"Records/record_{today}.csv", "a") as fs:
            if name not in names:
                timestamp = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S.%fZ")
                datestr = (
                    str(date.today().day)
                    + "/"
                    + str(date.today().month)
                    + "/"
                    + str(date.today().year)[2:]
                )

                time = datetime.now().strftime("%H:%M:%S")
                if name not in exclude_names:
                    fs.write(f"\n{name}, {timestamp}")
                    speach("Hello " + name)
                    update(name, datestr, time)
            else:
                speach("already marked")

    cv2.imshow("Frame", frame)
    key = cv2.waitKey(1)
    if key == 27:
        break

cap.release()
cv2.destroyAllWindows()
