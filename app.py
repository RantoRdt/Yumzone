from flask import Flask, jsonify, request, make_response, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError
from sqlalchemy.dialects.mysql import JSON
from flask_migrate import Migrate
from flask_cors import CORS
from datetime import datetime
from jwt.exceptions import DecodeError
import bcrypt, jwt, uuid, os

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root@127.0.0.1:3306/chatbotdb'
app.config['JWT_KEY'] = 'votre_clé_secrète'

db = SQLAlchemy(app)
migrate = Migrate(app, db)  

# models

class Message(db.Model):
    __tablename__ = 'Message'
    id_mess = db.Column(db.Integer, primary_key=True)
    is_bot = db.Column(db.Boolean, default=False)
    content = db.Column(db.String(255))

    id_user = db.Column(db.Integer, db.ForeignKey('User.id_user'), nullable=False)
    
    def get_id(self): return self.id_mess
    def get_is_bot(self): return self.is_bot
    def get_content(self): return self.content
    def get_id_user(self): return self.id_user

    def serialize(self):
        return {
            'id' : self.get_id(),
            'is_bot': self.get_is_bot(),
            'content': self.get_content()
        }

class User(db.Model):
    __tablename__ = 'User'
    id_user = db.Column(db.Integer, primary_key=True)
    name_user = db.Column(db.String(63))
    mail = db.Column(db.String(63), unique=True)
    password = db.Column(db.String(63))
    is_admin = db.Column(db.Boolean, default=False)

    messages = db.relationship('Message', backref='user', lazy=True)
    orders = db.relationship('Order', backref='user', lazy=True)
    
    def get_id(self): return self.id_user
    def get_name(self): return self.name_user
    def set_name(self, value): self.name_user = value
    def get_mail(self): return self.mail
    def get_is_admin(self): return self.is_admin
    def get_password(self): return self.password.encode('utf-8')
    
    def serialize(self, no_message=False):
        if no_message:
            return {
                'id' : self.get_id(),
                'name': self.get_name(),
                'mail': self.get_mail()
            }  
        messages = MessageService.get_by_id_user(self.get_id())
        return {
            'id' : self.get_id(),
            'name': self.get_name(),
            'mail': self.get_mail(),
            'messages': messages
        }
    
class Category(db.Model):
    __tablename__ = 'Category'
    id_cat = db.Column(db.Integer, primary_key=True)
    name_cat = db.Column(db.String(63))
    
    dishes = db.relationship('Dish', backref='category', lazy=True)
    
    def get_id(self): return self.id_cat
    def get_name(self): return self.name_cat
    def set_name(self, value): self.name_cat = value
    
    def serialize(self):
        return {
            'id' : self.get_id(),
            'name': self.get_name()
        }

class Dish(db.Model):
    __tablename__ = 'Dish'
    id_dish = db.Column(db.Integer, primary_key=True)
    name_dish = db.Column(db.String(63))
    unit_price = db.Column(db.Integer)
    has_pork = db.Column(db.Boolean, default=False)
    image = db.Column(db.String(255))
    
    id_cat = db.Column(db.Integer, db.ForeignKey('Category.id_cat'), nullable=False)
    
    def get_id(self): return self.id_dish
    def get_name(self): return self.name_dish
    def get_image(self): return self.image
    def set_name(self, value): self.name_dish = value
    def get_unit_price(self): return self.unit_price
    def set_nnit_price(self, value): self.unit_price = value
    def get_has_pork(self): return self.has_pork
    def set_has_pork(self, value): self.has_pork = value
    def get_id_cat(self): return self.id_cat
    def set_id_cat(self, value): self.id_cat = value
    def get_category(self):
        category = CategoryService.get_by_id(self.get_id_cat())
        return {
                'id': self.get_id_cat(),
                'name': category['name']   
            }
    
    def serialize(self):
        return {
            'id' : self.get_id(),
            'name': self.get_name(),
            'unit_price': self.get_unit_price(),
            'has_pork': self.get_has_pork(),
            'image': self.get_image(),
            'category': self.get_category()
        }
    
class Order(db.Model):
    __tablename__ = 'Order'
    id_order = db.Column(db.Integer, primary_key=True)
    date_order = db.Column(db.DateTime)
    id_user = db.Column(db.Integer, db.ForeignKey('User.id_user'), nullable=False)
    delivery_place = db.Column(db.String(255))
    dine_in = db.Column(db.Boolean, default=False)
    
    order_lines = db.relationship('OrderLine', backref='order', lazy=True)
    
    def get_id(self): return self.id_order
    def get_date(self): return self.date_order
    def get_delivery_place(self): return self.delivery_place
    def get_dine_in(self): return self.dine_in
    def get_id_user(self): return self.id_user

    def serialize(self):
        user = UserService.get_by_id(self.get_id_user(), no_message=True)
        lines = OrderLineService.get_by_id_order(self.get_id())
        return {
            'id': self.get_id(),
            'date': self.get_date(),
            'place': self.get_delivery_place(),
            'dine_in': self.get_dine_in(),
            'user': user,
            'order_lines': lines
        }

class OrderLine(db.Model):
    __tablename__ = 'OrderLine'
    id_order_line = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer)
    
    id_dish = db.Column(db.Integer, db.ForeignKey('Dish.id_dish'), nullable=False)
    id_order = db.Column(db.Integer, db.ForeignKey('Order.id_order'), nullable=False)

    def get_id(self): return self.id_order_line
    def get_quantity(self): return self.quantity
    def get_id_dish(self): return self.id_dish

    def serialize(self):
        dish = DishService.get_by_id(self.get_id_dish())
        return {
            'id': self.get_id(),
            'quantity': self.get_quantity(),
            'dish': dish
        }

class Info(db.Model):
    __tablename__ = 'Info'
    id_info = db.Column(db.Integer, primary_key=True)
    place = db.Column(db.String(63))
    phone = db.Column(db.String(63))
    schedule = db.Column(JSON)

    def get_place(self): return self.place
    def set_place(self, place): self.place = place
    def get_phone(self): return self.phone
    def set_phone(self, phone): self.phone = phone
    def get_schedule(self): return self.schedule
    def set_schedule(self, schedule): self.schedule = schedule

    def serialize(self):
        return {
            'place': self.get_place(),
            'phone': self.get_phone(),
            'schedule': self.get_schedule()
        }

# services

class UserService:
    @staticmethod
    def create(name_user, mail, password):
        try:
            user = User(name_user=name_user, mail=mail, password=password, is_admin=False)
            db.session.add(user)
            db.session.commit()
            return user, False
        except IntegrityError:
            db.session.rollback()
            return user, True

    @staticmethod
    def get_by_id(id, no_message=False):
        user = User.query.get(id)
        return user.serialize(no_message)

    @staticmethod
    def get_by_mail(mail): return User.query.filter_by(mail=mail).first()

    @staticmethod
    def get_by_mail_and_role(mail, is_admin): return User.query.filter_by(mail=mail, is_admin=is_admin).first()

    @staticmethod
    def generate_token(id): return jwt.encode({'id': id}, app.config['JWT_KEY'], algorithm='HS256')

    @staticmethod
    def check_authorization(token, is_admin_authorized):
        token = request.json['token']

        try:
            payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            return True
        except DecodeError: return False
        #TODO

class CategoryService:
    @staticmethod
    def get_by_id(id):
        categories = Category.query.all()
        if len(categories) == 0:
            for name in ['Pizza', 'Burger', 'Tacos']:
                category = Category(name_cat=name)
                db.session.add(category)
            db.session.commit()
        return Category.query.get(id).serialize()      
    
    def get_by_name(name): return Category.query.get(id).serialize() 
        
    @staticmethod
    def get_all():
        categories = Category.query.all()
        return [category.serialize() for category in categories]

class OrderLineService:
    @staticmethod
    def create(id_order, id_dish, quantity, no_commit=False):
        order_line = OrderLine(id_order=id_order, id_dish=id_dish, quantity=quantity)
        db.session.add(order_line)
        if not no_commit: db.session.commit()

    def get_by_id_order(id_order):
        order_lines = OrderLine.query.filter_by(id_order=id_order).all()
        return [order_line.serialize() for order_line in order_lines]
    
    def get_count_by_dish(id_dish):
        order_lines = OrderLine.query.filter_by(id_dish=id_dish).all()
        count = 0
        for order_line in order_lines: count += order_line.get_quantity()
        return count

class OrderService:
    @staticmethod
    def create(id_user, lines, delivery_place, dine_in, delivery_date):
        order = Order(id_user=id_user, date_order=delivery_date, delivery_place=delivery_place, dine_in=dine_in == "true")
        db.session.add(order)
        db.session.commit()

        id_order = order.get_id()
        for line in lines:
            OrderLineService.create(id_order=id_order, id_dish=line['dish_id'], quantity=line['dish_quantity'], no_commit=True)
        db.session.commit()

    def get_all():
        orders = Order.query.all()

        past_orders = []
        current_orders = []
        current_date = datetime.now()

        for order in orders:
            if order.get_date() < current_date: past_orders.append(order.serialize())
            else: current_orders.append(order.serialize())

        return { "past": past_orders, "current": current_orders }

    def get_by_id_user(id_user):
        orders = Order.query.filter_by(id_user=id_user).all()
        return [order.serialize() for order in orders]

class DishService:
    @staticmethod
    def get_by_id(id, serialize=True):
        dish = Dish.query.get(id)
        if serialize: return dish.serialize()
        return dish

    @staticmethod
    def get_all():
        dishes = Dish.query.all()
        return [dish.serialize() for dish in dishes]
    
    @staticmethod
    def create(name_dish, unit_price, has_pork, image_name, id_cat):
        dish = Dish(name_dish=name_dish, unit_price=unit_price, has_pork=has_pork == "true", image=image_name, id_cat=id_cat)
        db.session.add(dish)
        db.session.commit()

    @staticmethod
    def delete(dish):
        db.session.delete(dish)
        db.session.commit()

class MessageService:
    @staticmethod
    def get_by_id_user(id_user):
        messages = Message.query.filter_by(id_user=id_user).order_by(Message.id_mess.asc()).all()
        return [message.serialize() for message in messages]
    
    def create(is_bot, content, id_user):
        message = Message(is_bot, content, id_user)
        db.session.add(message)
        db.session.commit()

class ImageService:
    @staticmethod
    def upload(image):
        extension = os.path.splitext(image.filename)[1]
        image_name = str(uuid.uuid4()) + extension
        image_path = './images/' + image_name
        image.save(image_path)
        return image_name

class PasswordService:
    @staticmethod
    def hash(password):
        salt = bcrypt.gensalt()
        return bcrypt.hashpw(password.encode('utf-8'), salt)
    
    @staticmethod
    def verify(input, encoded): return bcrypt.checkpw(input.encode('utf-8'), encoded)

class RequestService:
    @staticmethod
    def get_form_data(*field_names):
        data = []
        for field_name in field_names:
            data.append(request.form.get(field_name))
        return data

    def get_files_data(*field_names):
        data = []
        for field_name in field_names: data.append(request.files.get(field_name))
        return data
    
    def get_dict_list_data(*field_names):
        data = []
        for field_name in field_names: data.append(request.form.getlist(field_name))
        return data

class InfoService:
    @staticmethod
    def create():
        df = {
            "place": "Tana",
            "phone": "32 78 997 42"
        }
        df_sch = []
        days = [ 1, 6, 7 ]
        froms = ['11:00', '11:00', '11:00']
        tos = ['21:00', '19:30', '15:30']
        for i, d in enumerate(days):
            f = froms[i]
            t = tos[i]
            df_sch.append({ 'day': d, 'from': f, 'to': t})
        
        info = Info(place=df["place"], phone=df["phone"], schedule=df_sch)
        db.session.add(info)
        db.session.commit()
        return info.serialize()

    @staticmethod
    def get():
        info = Info.query.first()
        if info: return info.serialize()
        return None
    
    @staticmethod
    def edit(place, phone, schedule):
        info = Info.query.first()
        if not info: return '', 404
        info.set_place(place)
        info.set_phone(phone)
        info.set_schedule(schedule)
        db.session.commit()

class SalesService:
    @staticmethod
    def get():
        dishes = DishService.get_all()
        sales = []
        for dish in dishes:
            id = dish['id']
            sales.append({
                'dish' : {
                    'id': id,
                    'name': dish['name']
                },
                'category': dish['category'],
                'sales' : OrderLineService.get_count_by_dish(id)
            })
        return sales

class DateTimeService:
    @staticmethod
    def convert(date):
        format = '%a %b %d %Y %H:%M:%S GMT%z'
        date = date.split('(')[0].strip()
        return datetime.strptime(date, format)

# controllers
@app.route('/api/infos/user/<int:id_user>', methods=['GET'])
def get_user_infos(id_user):
    user = UserService.get_by_id(id_user)
    return jsonify(user)

@app.route('/api/infos/info', methods=['GET'])
def get_info_infos():
    info = InfoService.get()
    if not info: info = InfoService.create()
    return jsonify(info)

@app.route('/api/edit/info', methods=['POST', 'PUT'])
def edit_info():
    place, phone = RequestService.get_form_data('place', 'phone')
    days, froms , tos = RequestService.get_dict_list_data('day', 'from', 'to')
    schedule = []
    for i, d in enumerate(days):
        f = froms[i]
        t = tos[i]
        schedule.append({ 'day': d, 'from': f, 'to': t})
        
    InfoService.edit(place, phone, schedule)
    return make_response('', 200)

@app.route('/api/list/dishes', methods=['GET'])
def get_dishes():
    dishes = DishService.get_all()
    return jsonify(dishes)

@app.route('/api/list/categories', methods=['GET'])
def get_categories():
    categories = CategoryService.get_all()
    return jsonify(categories)

@app.route('/images/<path:path>')
def send_image(path): return send_from_directory('images', path)

@app.route('/api/list/orders', methods=['GET'])
def get_orders():
    orders = OrderService.get_all()
    return jsonify(orders)

@app.route('/api/list/orders/<int:id_user>', methods=['GET'])
def get_orders_by_user(id_user):
    orders = OrderService.get_by_id_user(id_user)
    return jsonify(orders)

@app.route('/api/infos/sales', methods=['GET'])
def get_sales():
    sales = SalesService.get()
    return jsonify(sales)

@app.route('/api/new/order', methods=['POST'])
def create_order():
    id_user, delivery_place, dine_in, delivery_date = RequestService.get_form_data('userId', 'deliveryPlace', 'dineIn', 'deliveryDate')
    
    dish_ids, dish_quantities = RequestService.get_dict_list_data('dish_id', 'dish_quantity')
    lines = []
    for i, dish_id in enumerate(dish_ids):
        dish_quantity = dish_quantities[i]
        lines.append({'dish_id': int(dish_id), 'dish_quantity': int(dish_quantity)})
    OrderService.create(id_user=id_user, lines=lines, delivery_place=delivery_place, dine_in=dine_in, delivery_date=DateTimeService.convert(delivery_date))
    return make_response('', 201)

@app.route('/api/new/dish', methods=['POST'])
def create_dish():
    name, unit_price, has_pork, id_cat = RequestService.get_form_data('name', 'unit_price', 'has_pork', 'id_cat') 
    images = RequestService.get_files_data('image')
    image_name = ImageService.upload(images[0])

    DishService.create(name_dish=name, unit_price=unit_price, has_pork=has_pork, image_name=image_name, id_cat=id_cat)
    return make_response('', 201)

@app.route('/api/delete/dish/<int:id_dish>', methods=['DELETE'])
def delete_dish(id_dish):
    dish = DishService.get_by_id(id_dish, serialize=False)
    if not dish: return make_response('not found', 404)
    DishService.delete(dish)
    return make_response('deleted', 200)

@app.route('/api/auth/signup', methods=['POST'])
def sign_up():
    mail, name, password = RequestService.get_form_data('mail', 'name', 'password')
    hashed_password = PasswordService.hash(password)
    
    user, error = UserService.create(name_user=name, mail=mail, password=hashed_password)

    if error: return make_response('exists', 401)
    token = UserService.generate_token(user.get_id())
    return jsonify({'token': token}), 201

@app.route('/api/auth/login', methods=['POST'])
def log_in():
    mail, password, is_admin = RequestService.get_form_data('mail', 'password', 'is_admin')
    
    user = UserService.get_by_mail_and_role(mail, is_admin=="true")
    if not user: return make_response('', 400)
    
    if PasswordService.verify(password, user.get_password()):
        token = UserService.generate_token(user.get_id())
        return jsonify({'token': token}), 200
    else: return make_response('', 400)
    
@app.route('/api/auth/google', methods=['POST'])
def google_log_in():
    mail, name = RequestService.get_form_data('mail', 'name')
    
    user, _ = UserService.create(name_user=name, mail=mail, password=None)
        
    token = UserService.generate_token(user.get_id())
    return jsonify({'token': token}), 201
    

@app.route('/api/message/save', methods=['POST'])
def save_message():
    id_user, is_bot, content = RequestService.get_form_data('id_user', 'is_bot', 'content')
    MessageService.create(is_bot= is_bot == "true", content=content, id_user=id_user)

    return make_response('', 201)