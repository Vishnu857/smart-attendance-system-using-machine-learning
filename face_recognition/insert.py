import pymongo

myClient = pymongo.MongoClient("mongodb+srv://vishnu:VueU5Brp66byGA@cluster0.xar7ngm.mongodb.net/?retryWrites=true&w=majority")
mydb = myClient["smartAttendance"]
coll = mydb["student_details"]
mylist=[{"roll_no":"2012045","Name":"Balavishnu.B"},
{"roll_no":"2012018","Name":"Hari.Ks"},
{"roll_no":"2012120","Name":"Tony madhan.MK"}
]
coll.insert_many(mylist)