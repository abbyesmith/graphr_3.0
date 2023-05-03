# export FLASK_APP=app.py
# export FLASK_RUN_PORT=5555
# flask db init
# flask db revision --autogenerate -m 'Create tables' 
# flask db upgrade 


from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from config import db, bcrypt

class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique = True, nullable = False)
    email = db.Column(db.String, nullable = False)
    _password_hash = db.Column(db.String)
    # image = db.Column(db.String)
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

    def __repr__(self):
        return f'<Player {self.username}>'

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
