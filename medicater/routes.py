import json
from flask import request, jsonify, g
from medicater.models import User, Medicine, Info, db
from medicater import app
import datetime
from datetime import timedelta
from block import addmedicine, addCenter, getMedCenterInfo, getmedicineInfo
import random
from geopy.geocoders import Nominatim
import json
import urllib

# Frontend Routes


@app.route('/', methods=["GET", "POST"])
def catch():
    return app.send_static_file('index.html')


@app.route('/signup', methods=["GET", "POST"])
def catch_signup():
    return app.send_static_file('index.html')


@app.route('/login', methods=["GET", "POST"])
def catch_login():
    return app.send_static_file('index.html')


@app.route('/manufacturer', methods=["GET", "POST"])
def catch_manufacturer():
    return app.send_static_file('index.html')


@app.route('/hospital', methods=["GET", "POST"])
def catch_hospital():
    return app.send_static_file('index.html')


@app.route('/manufacturer/create_record', methods=["GET", "POST"])
def catch_createrecord():
    return app.send_static_file('index.html')


@app.route('/hospital/scan_vaccine', methods=["GET", "POST"])
def catch_scanvaccine():
    return app.send_static_file('index.html')


@app.route('/manufacturer/history', methods=["GET", "POST"])
def catch_history():
    return app.send_static_file('index.html')


@app.route('/know_your_vaccine', methods=["GET", "POST"])
def catch_knowvaccine():
    return app.send_static_file('index.html')


@app.route('/hospital/history', methods=["GET", "POST"])
def catch_hospital_history():
    return app.send_static_file('index.html')

# Backend Routes


@app.route('/backend/getprofilemanu', methods=["GET", "POST"])
def get_profile_manufacturer():
    content = request.get_json()
    uid = content["uid"]
    row = User.query.filter(User.uid == uid).first()

    List = []
    Dict = {
        'name': row.name
    }
    List.append(Dict)
    return json.dumps(List)


@app.route('/backend/getprofilehosp', methods=["GET", "POST"])
def get_profile_hospital():
    content = request.get_json()
    uid = content["uid"]
    row = User.query.filter(User.uid == uid).first()

    List = []
    Dict = {
        'name': row.name
    }
    List.append(Dict)
    return json.dumps(List)


@app.route('/backend/saveprofilemanu', methods=["POST", "GET"])
def save_profile_manufacturer():
    content = request.get_json()
    uid = content["uid"]
    name = content["name"]
    role = "Manufacturer"
    email = content["email"]
    address = content["address"]

    user = User(uid=uid, name=name,
                role=role, email=email, address=address)
    db.session.add(user)
    db.session.commit()

    return 'New user added', 200


@app.route('/backend/saveprofilehosp', methods=["POST", "GET"])
def save_profile_hospital():
    content = request.get_json()
    print(content)
    uid = content["uid"]
    name = content["name"]
    role = "Hospital"
    email = content["email"]
    address = content["address"]

    user = User(uid=uid, name=name, role=role, email=email, address=address)

    db.session.add(user)
    db.session.commit()

    return 'New user added', 200


@app.route('/backend/vaccreate', methods=["POST", "GET"])
def vacCreate():
    content = request.get_json()
    name = content["vaccine_name"]
    mrp = content["MRP"]
    date = content["manufacturing_date"]
    expiry = content["expiry_date"]
    private_key = content["private_key"]
    uid = content["uid"]

    row = User.query.filter(User.uid == uid).first()
    address = row.address

    product_id = random.randint(1000000, 9999999)

    txn = addmedicine(address, private_key, product_id, name, str(date), str(expiry))
    product_id = str(product_id)

    List = []
    Dict = {'product_id': product_id}
    List.append(Dict)

    medd = Medicine(product_id=product_id, name=name,mrp=mrp, date=date, expiry=expiry)
    db.session.add(medd)
    db.session.commit()

    ret = Info(uid=uid, product_id=product_id, date=date,scanned="False")
    db.session.add(ret)
    db.session.commit()

    return json.dumps(List)


@app.route('/backend/hospital', methods=["GET", "POST"])
def retailer():
    content = request.get_json()
    uid = content["uid"]
    productid = content["product_id"]
    product_id = int(productid)
    private_key = content["private_key"]

    date = datetime.datetime.now()
    date = str(date)

    def location_lookup():
        try:
            return json.load(urllib.request.urlopen('http://ipinfo.io/json'))
        except urllib.error.HTTPError:
            return False

    location = location_lookup()
    date = date +" "+ location['city'] +" "+ location['region'] +" "+ location['country'] +" "+ location['loc']

    ret = Info(uid=uid, product_id=product_id, date=date,scanned="True")

    db.session.add(ret)
    db.session.commit()

    user = User.query.filter(User.uid == uid).first()
    name = user.name
    address = user.address

    txn = addCenter(address, name, private_key)

    return "Medicice Added", 200


@app.route('/backend/history', methods=["GET", "POST"])
def history():
    content = request.get_json()
    uid = content["uid"]
    type=content["type"]

    users = Info.query.filter(Info.uid == uid).all()
    
    List = []
    Dict = {}

    for user in users:
        if(type=="manufacturer" and user.scanned=="False"):
            row = Medicine.query.filter(
                Medicine.product_id == user.product_id).first()
            
            if row!=None:
                Dict = {
                    'product_id': row.product_id,
                    'name': row.name,
                    'mrp': row.mrp,
                    'date': row.date,
                    'expiry': row.expiry
                }
            res = not bool(Dict)
            if res==False:
                List.append(Dict)
    for user in users:
        if(type=="hospital" and user.scanned=="True"):
            row = Medicine.query.filter(
                Medicine.product_id == user.product_id).first()
            
            if row!=None:
                Dict = {
                    'product_id': row.product_id,
                    'name': row.name,
                    'mrp': row.mrp,
                    'date': row.date,
                    'expiry': row.expiry
                }
            res = not bool(Dict)
            if res==False:
                List.append(Dict)

    return json.dumps(List)


@app.route('/backend/public', methods=["GET", "POST"])
def public_info():
    content = request.get_json()
    product_id = content['product_id']
    product_id = product_id

    rows = Info.query.filter(Info.product_id == product_id).all()

    List = []
    Dict = {}

    for row in rows:
        # if(row.scanned=="True"):
            user = User.query.filter(User.uid == row.uid).first()
            Dict = {
                'name': user.name,
                'product_id': row.product_id,
                'date': row.date,
                'role': user.role
            }
            List.append(Dict)

    return json.dumps(List)
