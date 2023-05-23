# export FLASK_APP=app.py
# export FLASK_RUN_PORT=5555
# flask db init
# flask db revision --autogenerate -m 'Create tables' 
# flask db upgrade 


from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
import re



from config import db, bcrypt

class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique = True, nullable = False)
    email = db.Column(db.String, nullable = False)
    _password_hash = db.Column(db.String, nullable = False)
    instructor_name = db.Column(db.String)
    instructor_email = db.Column(db.String)
    theme = db.Column(db.String)

    serialize_rules = ('-student_graphs.graphs', '-student_graphs.students')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )
    
    # Add validation for the image, theme and instructor email address

    @validates('email')
    def validate_email(self, key, email):
        print(email)
        if len(email)<5:
            raise ValueError('Please submit a valid email address')
        # if not re.search('@'):
        #     raise ValueError('Please submit a valid email address')
        if email.count('@') != 1:
            raise ValueError('Email address must contain exactly one "@" symbol.')
        return email
    
    @validates('instructor_email')
    def validate_instructor_email(self, key, instructor_email):
        if len(instructor_email)<5:
            raise ValueError('Please submit a valid email address for your instructor')
        # if not re.search('@'):
        #     raise ValueError('Please submit a valid email address')
        if instructor_email.count('@') != 1:
            raise ValueError('Instructor email address must contain exactly one "@" symbol.')
        return instructor_email
    
    # @validates('password_hash')
    # def validate_password(self, key, password):
    #     if len(password)<6:
    #         raise ValueError('Password must be at least 6 characters long')
    #     if not re.search('[a-zA-Z]', password):
    #         raise ValueError('Password must contain at least one letter')
    #     if not re.search('[0-9]', password):
    #         raise ValueError('Password must contain at least one number')
    #     if not re.search('[!@#$%^&*()_-+=?/"~<>[]:;\|]', password):
    #         raise ValueError('Password must contain at least one special character: !@#$%^&*()_-+=?/"~<>[]:;\|')
    #     return password
    
# def __repr__(self):
#     return f'<Player {self.username}>'

class Graph(db.Model, SerializerMixin):
    __tablename__ = 'graphs'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)
    x_1 = db.Column(db.Integer)
    y_1 = db.Column(db.Integer)
    x_2 = db.Column(db.Integer)
    y_2 = db.Column(db.Integer)
    x_3 = db.Column(db.Integer)
    y_3 = db.Column(db.Integer)
    x_4 = db.Column(db.Integer)
    y_4 = db.Column(db.Integer)
    x_5 = db.Column(db.Integer)
    y_5 = db.Column(db.Integer)
    hw_name = db.Column(db.String)
    problem_name = db.Column(db.String)
    equation = db.Column(db.String)
    a = db.Column(db.Float)
    b = db.Column(db.Float)
    c = db.Column(db.Float)
    d = db.Column(db.Float)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    serialize_rules = ('-student_graphs.graphs', '-student_graphs.students')

    # @validates('type')
    # def validate_type(self, key, value):
    #     validate_type = ["Linear", "Quadratic"]
        # Add more function types here as they are added to the frontend 

# Joint table to store the graph ID attached to the student id that created the graph
class Student_Graph(db.Model, SerializerMixin):
    __tablename__ = "student_graphs"

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    graph_id = db.Column(db.Integer, db.ForeignKey('graphs.id'))

    student = db.relationship('Student', backref = 'student_graphs')
    graph = db.relationship('Graph', backref = 'student_graphs')

    serialize_rules = ('-student.student_graphs', '-graph.student_graphs')