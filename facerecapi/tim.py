from datetime import datetime,date
# timestamp = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%fZ')
# print(timestamp)
# t=datetime.now()
# print(t.strftime("%H:%M:%S"))
t=str(date.today().day)+"/"+str(date.today().month)+"/"+str(date.today().year)[2:]

print(t)