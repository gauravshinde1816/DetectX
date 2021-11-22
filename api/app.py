import os
from flask import Flask, flash, request, redirect, url_for, session, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import logging
from flask import jsonify
from func import *
from flask_session import Session


logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')
SESSION_TYPE = 'memcache'

#UPLOAD_FOLDER = 'F:/Web Projects/Hack-O-Holics-Bajaj-Hackathon-main/src/static'
UPLOAD_FOLDER = '../src/static'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(
    __name__, static_folder='D:\Gaurav\HCIL\src\static')
CORS(app)
sess = Session()
app.secret_key = "Secret Key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

fPathDest = ''
filename = ''


@app.route('/api/upload', methods=['POST'])
def handle_form():
    global fPathDest, filename
    target = os.path.join(UPLOAD_FOLDER)
    if not os.path.isdir(target):
        os.mkdir(target)
        logger.info("welcome to upload`")

    print("Fine till here")

    files = request.files
    #file = request.files['file']
    file = files.get('file')

    print(file)

    filename = secure_filename(file.filename)
    destination = "/".join([target, filename])
    # print(destination)
    file.save(destination)

    fpath = destination

    print(f"\n\nfpath = {fpath}\n\n")
    results = predict_covid(fpath)
    session['uploadFilePath'] = destination

    #fPathDest = "".join(["./static/", filename])
    fPathDest = "".join(["../../static/", filename])
    lst = [
        {"key": 0, "name" : "covid" , "result": str(results[0])},
        {"key": 1, "name" : "Normal" , "result":str(results[1])},
        {"key": 2, "name" : "Viral Pneumonia" , "result":str(results[2])}
    ]
    return jsonify({
        'fileName': filename,
        'filePath': fPathDest,
        'ls': lst
    })


if(__name__) == '__main__':
    app.config['SESSION_TYPE'] = 'filesystem'

    sess.init_app(app)

    app.debug = True

    app.run(5000)
