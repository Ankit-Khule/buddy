from flask import Flask, jsonify, request, send_from_directory
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import and_

# app = Flask(__name__)
app = Flask(__name__, static_url_path='', static_folder='dist/buddy-app')
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins='*')
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://umbioacu:1j9KWmSadiqqKZdi9pP0qcW2rqSTBREm@manny.db.elephantsql.com/umbioacu'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class user_registertable(db.Model):
    __tablename__ = 'user_registertable'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    email = db.Column(db.String,unique=True)
    password = db.Column(db.String)

    def __init__(self,id,username,email,password):
        self.id = id
        self.username = username
        self.email = email
        self.password = password
    def to_json(self):
        return {
            'email': self.email,
            'username': self.username,
            'id' : self.id
        }

class userprofile(db.Model):
    __tablename__ = 'userprofile'
    studentid = db.Column(db.Integer, primary_key=True)
    bio = db.Column(db.String)
    module = db.Column(db.String, nullable  = False)
    startdate = db.Column(db.Date)
    enddate = db.Column(db.String)
    country = db.Column(db.String, nullable = False)
    hobby = db.Column(db.String)
    name = db.Column(db.String, nullable = False)
    isbuddy = db.Column(db.String)
    studentassignedname = db.Column(db.String)
    studentassignedid = db.Column(db.Integer)

    def __init__(self,studentid,bio,module,startdate,enddate,country,hobby,name,isbuddy,studentassignedname,studentassignedid):
        self.studentid = studentid
        self.bio = bio
        self.module = module
        self.startdate = startdate
        self.enddate = enddate
        self.country = country
        self.hobby = hobby
        self.name = name
        self.isbuddy = isbuddy
        self.studentassignedname = studentassignedname
        self.studentassignedid = studentassignedid
    
 

    def to_json(self):
        return {
            'studentid': self.studentid,
            'bio': self.bio,
            'module': self.module,
            'startdate': self.startdate.strftime("%Y-%m-%d"),
            'enddate': self.enddate.strftime("%Y-%m-%d"),
            'country': self.country,
            'hobby': self.hobby,
            'name' : self.name,
            'isbuddy' : self.isbuddy,
            'studentassignedname' : self.studentassignedname,
            'studentassignedid' : self.studentassignedid
        }
     
class college_news(db.Model):
    __tablename__ = 'college_news'
    news_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    heading = db.Column(db.String)
    content = db.Column(db.String)
    author = db.Column(db.String)
    dateofnews = db.Column(db.Date)

    def __init__(self,heading,content,author,dateofnews):
        self.heading = heading
        self.content = content
        self.author = author
        self.dateofnews = dateofnews
    
    def to_json(self):
        return {
            'news_id': self.news_id,
            'heading': self.heading,
            'content': self.content,
            'author': self.author,
            'dateofnews': self.dateofnews.strftime("%Y-%m-%d")
        }

class buddy_feedback(db.Model):
    __tablename__ = 'buddy_feedback'
    studentid = db.Column(db.Integer, primary_key=True)
    answer1 = db.Column(db.String)
    answer2 = db.Column(db.String)
    answer3 = db.Column(db.String)
    answer4 = db.Column(db.String)
    answer5 = db.Column(db.String)
    answer6 = db.Column(db.String)
    answer7 = db.Column(db.String)

    def __init__(self,studentid,answer1,answer2,answer3,answer4,answer5,answer6,answer7):
        self.studentid = studentid
        self.answer1 = answer1
        self.answer2 = answer2
        self.answer3 = answer3
        self.answer4 = answer4
        self.answer5 = answer5
        self.answer6 = answer6
        self.answer7 = answer7
    
    def to_json(self):
        return {
            'studentid': self.studentid,
            'answer1': self.answer1,
            'answer2': self.answer2,
            'answer3': self.answer3,
            'answer4': self.answer4,
            'answer5': self.answer5,
            'answer6': self.answer6,
            'answer7': self.answer7
        }
class buddy_messages(db.Model):
    __tablename__ = 'buddy_messages'
    message_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    messagers_id = db.Column(db.String)
    messages = db.Column(db.String)
    message_publish_time = db.Column(db.Date)
    sender_name = db.Column(db.String)

    def __init__(self,messagers_id,messages,message_publish_time,sender_name):
        self.messagers_id = messagers_id
        self.messages = messages
        self.message_publish_time = message_publish_time
        self.sender_name = sender_name
    
    def to_json(self):
        return {
            'message_id': self.message_id,
            'messagers_id': self.messagers_id,
            'messages': self.messages,
            'message_publish_time': self.message_publish_time.strftime("%d-%m-%Y %H:%M"),
            'sender_name': self.sender_name
        }


@app.route('/')
def root():
  return send_from_directory('./', 'index.html')

@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        userid = request.json['id'],
        uname = request.json['username'],
        useremail = request.json['email'],
        userpassword = request.json['password']

        if userid == '' or useremail == '' or uname == '' or userpassword == '':
            return jsonify('Please enter required fields')
        else:
             if userid != '' and useremail != '' and uname != '' and userpassword != '':
                  getUser = user_registertable.query.filter_by(id=userid).first()
                  if getUser:
                       return jsonify('You are already registered with this student id.')
                  else:
                       data = user_registertable(id=userid,email=useremail,username=uname,password=userpassword)
                       db.session.add(data)
                       db.session.commit()
                       return jsonify('You have registered successfully.')

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        emailid = request.json['email'],
        passw = request.json['password']
        
        if emailid == '' or passw == '':
            return jsonify('Please enter the required fields.')
        else:
            user = user_registertable.query.filter_by(email=emailid,password=passw).first()
            if user:
                return user.to_json()
            return jsonify('User not found. You need to register first.')

@app.route('/saveProfile', methods=['POST'])
def saveProfile():
    if request.method == 'POST':
        studentids = request.json['studentid'],
        bios = request.json['bio'],
        modules = request.json['module'],
        startdates = request.json['startdate'],
        enddates = request.json['enddate'],
        countrys = request.json['country'],
        hobbys = request.json['hobby'],
        names = request.json['name'],
        isbuddys = request.json['isbuddy'],
        studentassignednames = request.json['studentassignedname'],
        studentassignedids = request.json['studentassignedid']

        if studentids == '' or names == '' or modules == '' or countrys == '':
            return jsonify('Please enter the required fields.')
        else:
            saveProfile = userprofile(studentid=studentids,bio=bios,module=modules,startdate=startdates,enddate=enddates,country=countrys,hobby=hobbys,name=names,isbuddy=isbuddys,studentassignedname=studentassignednames,studentassignedid=studentassignedids)
            db.session.add(saveProfile)
            db.session.commit()
            return jsonify(**request.json)

@app.route('/getProfile', methods=['GET'])
def getProfile():
    if request.method == 'GET':
        studentids = request.args['id']
        getProfile = userprofile.query.filter_by(studentid=studentids).first()
        if getProfile:
               return getProfile.to_json()
        return jsonify('Profile not found.')

@app.route('/updateProfile', methods=['PUT'])
def updateProfile():
    if request.method == 'PUT':
        studentids = request.args['id']
        getProfile = userprofile.query.filter_by(studentid=studentids).first()

        if 'bio' in request.json:
             getProfile.bio = request.json['bio']

        if 'module' in request.json:
             getProfile.module = request.json['module']

        if 'startdate' in request.json:
             getProfile.startdate = request.json['startdate']

        if 'enddate' in request.json:
             getProfile.enddate = request.json['enddate']

        if 'country' in request.json:
             getProfile.country = request.json['country']

        if 'hobby' in request.json:
             getProfile.hobby = request.json['hobby']
          
        if 'name' in request.json:
             getProfile.name = request.json['name']

        if 'isbuddy' in request.json:
             getProfile.isbuddy = request.json['isbuddy']

        if 'studentassignedname' in request.json:
             getProfile.studentassignedname = request.json['studentassignedname']
          
        if 'studentassignedid' in request.json:
             getProfile.studentassignedid = request.json['studentassignedid']
        
        db.session.commit()
        return getProfile.to_json()

@app.route('/getUnassignedBuddys', methods=['GET'])
def getUnassignedBuddys():
    if request.method == 'GET':
        getUnassignedBuddys = userprofile.query.filter_by(isbuddy='True' , studentassignedid = None).all()
        return jsonify([i.to_json() for i in getUnassignedBuddys])  
    return jsonify('No Buddy found.')

@app.route('/getYourAssignedBuddy', methods=['GET'])
def getYourAssignedBuddy():
    if request.method == 'GET':
        studentids = request.args['id']
        getYourAssignedBuddy = userprofile.query.filter_by(studentassignedid=studentids).first()
        if getYourAssignedBuddy:
               return getYourAssignedBuddy.to_json()
        return jsonify('Profile not found.')

@app.route('/getConnections', methods=['GET'])
def getConnections():
    if request.method == 'GET':
        modules = request.args['module']
        startdates = request.args['startdate']
        getConnections = userprofile.query.filter_by(module=modules , startdate = startdates).all()
        return jsonify([i.to_json() for i in getConnections])  
    return jsonify('No Buddy found.')

@app.route('/getCollegeNews', methods=['GET'])
def getCollegeNews():
    if request.method == 'GET':
        getCollegeNews = college_news.query.filter_by().all()
        return jsonify([i.to_json() for i in getCollegeNews])  
    return jsonify('No college news found.')

@app.route('/postCollegeNews', methods=['POST'])
def postCollegeNews():
    if request.method == 'POST':
        headings = request.json['heading'],
        contents = request.json['content'],
        authors = request.json['author'],
        newsdates = request.json['dateofnews']

        if headings == '' or contents == '' or authors == '' or newsdates == '':
            return jsonify('Please enter the required fields.')
        else:
            postCollegeNews = college_news(heading=headings,content=contents,author=authors,dateofnews=newsdates)
            db.session.add(postCollegeNews)
            db.session.commit()
            return jsonify(**request.json)

@app.route('/updateCollegeNews', methods=['PUT'])
def updateCollegeNews():
    if request.method == 'PUT':
        news_ids = request.args['news_id']
        getNews = college_news.query.filter_by(news_id=news_ids).first()

        if 'heading' in request.json:
             getNews.heading = request.json['heading']

        if 'content' in request.json:
             getNews.content = request.json['content']

        if 'author' in request.json:
             getNews.author = request.json['author']

        if 'dateofnews' in request.json:
             getNews.dateofnews = request.json['dateofnews']

        db.session.commit()
        return getNews.to_json()


@app.route('/deleteCollegeNews', methods=['DELETE'])
def deleteCollegeNews():
    if request.method == 'DELETE':
        news_ids = request.args['news_id']
        deleteCollegeNews = college_news.query.filter_by(news_id=news_ids).delete()
        db.session.commit()
        return jsonify('Data deleted successfully!')
    return jsonify('No college news found.')

@app.route('/<path:path>')
def static_proxy(path):
  return send_from_directory('./', path)

@app.route('/buddyFeedback', methods=['POST'])
def buddyFeedback():
    if request.method == 'POST':
        studentids = request.json['studentid'],
        answers1 = request.json['answer1'],
        answers2 = request.json['answer2'],
        answers3 = request.json['answer3'],
        answers4 = request.json['answer4'],
        answers5 = request.json['answer5'],
        answers6 = request.json['answer6'],
        answers7 = request.json['answer7']

        if answers2 == '' or answers3 == '' or answers4 == '' or answers5 == '' or answers6 == '':
            return jsonify('Please enter the required fields.')
        else:
            postbuddyFeedback = buddy_feedback(studentid=studentids,answer1=answers1,answer2=answers2,answer3=answers3,answer4=answers4,answer5=answers5,answer6=answers6,answer7=answers7)
            db.session.add(postbuddyFeedback)
            db.session.commit()
            return jsonify('Feedback added successfully!')

@app.route('/sendMessages', methods=['POST'])
def sendMessages():
    if request.method == 'POST':
        messagers_ids = request.json['messagers_id'],
        messagess = request.json['messages'],
        message_publish_times = request.json['message_publish_time']
        sender_names = request.json['sender_name']

        if messagers_ids == '' or messagess == '' or message_publish_times == '' or sender_names == '':
            return jsonify('Please enter the required fields.')
        else:
            postMessage = buddy_messages(messagers_id=messagers_ids,messages=messagess,message_publish_time=message_publish_times,sender_name=sender_names)
            db.session.add(postMessage)
            db.session.commit()
            return jsonify('Message sent successfully!')

@app.route('/getMessages', methods=['GET'])
def getMessages():
    if request.method == 'GET':
        messagers_ids = request.args['messagers_id']
        msgid1=messagers_ids.split(" ")
        getMessages = buddy_messages.query.filter(and_(buddy_messages.messagers_id.contains(msgid1[1]),buddy_messages.messagers_id.contains(msgid1[0]))).all()
        return jsonify([i.to_json() for i in getMessages])  
    return jsonify('No Message history found.')

# @socketio.on('handleMessage')
# def handleMessage(data):
#     emit('my response', data, broadcast=True)
#     print('Receiving Message : ' + str(data))
#     return data

# @socketio.on('handleMessage')
# def handle_my_custom_event(data):
#     print('Receiving Message : ' + data)
#     emit('my response', data, broadcast=True)
    
    # emit('my response',json, broadcast=True)
    # send(message, broadcast = True)

if __name__ == '__main__':  
    app.run(debug=True)
    # socketio.run(app, debug=True)
