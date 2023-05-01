# export FLASK_APP=app.py
# export FLASK_RUN_PORT=5555
# flask db init
# flask db revision --autogenerate -m 'Create tables'
# flask db upgrade

#!/usr/bin/env python3


from flask import request, session, make_response, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError


from config import app, db, api
from models import Student, Student_Graph, Graph


@app.route('/')
def index():
    return '<h1>Graphr Backend</h1>'


class Signup(Resource):
    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')
        email = request_json.get('email')
        # image = request_json.get('image')
        instructor_name = request_json.get('instructor_name')
        instructor_email = request_json.get('instructor_email')
        theme = request_json.get('theme')

        student = Student(
            username=username,
            email=email,
            # image = image,
            instructor_name=instructor_name,
            instructor_email=instructor_email,
            theme=theme
        )

        student.password_hash = password
        print('First')

        try:
            print('here')

            db.session.add(student)
            db.session.commit()

            session['student_id'] = student.id

            print(student.to_dict(), 201)

        except IntegrityError:
            print('nope')

            return {'error': '422 Unprocessable Entity'}, 422


api.add_resource(Signup, '/signup', endpoint='signup')


class Login(Resource):

    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')

        student = Student.query.filter(Student.username == username).first()

        if student:
            if student.authenticate(password):
                print("authenticate")
                session['student_id'] = student.id
                return student.to_dict(), 200

        return make_response({'error': '401 Unauthorized'}, 401)


api.add_resource(Login, '/loginUser', endpoint='login')


class CheckSession(Resource):

    def get(self):
        if session.get('student_id'):
            student = Student.query.filter(
                Student.id == session['student_id']).first()
            return student.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401


api.add_resource(CheckSession, '/check_session', endpoint='check_session')


class Logout(Resource):

    def delete(self):

        if session.get('student_id'):
            session['student_id'] = None
            return {}, 204

        return {'error': '401 Unauthorized'}, 401


api.add_resource(Logout, '/logout', endpoint='logout')


class Profile(Resource):
    def get(self, id):
        one_student = Student.query.filter(Student.id == id).first()
        res = make_response(jsonify(one_student.to_dict()), 200)
        return res

    def patch(self, id):
        one_student = Student.query.filter(Student.id == id).first()
        data = request.get_json()
        for attr in data:
            setattr(one_student, attr, data[attr])
        db.session.add(one_student)
        db.session.commit()
        res = make_response(jsonify(one_student.to_dict()), 200)
        return res

    def delete(self, id):
        one_student = Student.query.filter(Student.id == id).first()
        db.session.delete(one_student)
        db.session.commit()
        return make_response(jsonify(one_student.to_dict()), 200)


api.add_resource(Profile, '/profile/<int:id>', endpoint='profile/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
