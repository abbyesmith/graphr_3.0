# export FLASK_APP=app.py
# export FLASK_RUN_PORT=5555
# flask db init
# flask db revision --autogenerate -m 'Create tables'
# flask db upgrade

#!/usr/bin/env python3


from flask import request, session, make_response, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
# from flask_serialize import SerializerMixin


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


api.add_resource(Signup, '/signupUser', endpoint='signup')

class AllGraphs(Resource):
    def post(self):
        
        request_json = request.get_json()

        type = request_json.get('type')
        x_1 = request_json.get('x_1')
        y_1 = request_json.get('y_1')
        x_2 = request_json.get('x_2')
        y_2 = request_json.get('y_2')
        x_3 = request_json.get('x_3')
        y_3 = request_json.get('y_3')
        x_4 = request_json.get('x_4')
        y_4 = request_json.get('y_4')
        x_5 = request_json.get('x_5')
        y_5 = request_json.get('y_5')
        hw_name = request_json.get('hw_name')
        problem_name = request_json.get('problem_name')

        graph = Graph(
            type = type,
            x_1 = x_1,
            y_1 = y_1,
            x_2 = x_2,
            y_2 = y_2,
            x_3 = x_3,
            y_3 = y_3,
            x_4 = x_4,
            y_4 = y_4,
            x_5 = x_5,
            y_5 = y_5,
            hw_name = hw_name,
            problem_name = problem_name
        )

        db.session.add(graph)
        db.session.commit()

        session ['graph_id'] = graph.id

        print(graph.to_dict(), 201)
        return(graph.to_dict(), 201)

api.add_resource(AllGraphs, '/all_graphs', endpoint = "all_graphs")

class StudentGraph(Resource):
    def post(self):
        request_json = request.get_json()

        student_id = request_json.get('student_id')
        graph_id = request_json.get('graph_id')

        student_graph = Student_Graph (
            student_id = student_id,
            graph_id = graph_id
        )

        db.session.add(student_graph)
        db.session.commit()

        session ['student_graph_id'] = student_graph.id
        print(student_graph.to_dict(), 201)
        return(student_graph.to_dict(), 201)

api.add_resource(StudentGraph, '/student_graph')

# This code gets TypeError: Object of type Response is not JSON serializable
class Graph_By_Student_Id(Resource):

    def get(self, student_id):
        student_graphs = Student_Graph.query.filter_by(student_id=student_id).all()
        if not student_graphs:
            return {'message': 'No graphs found for this user'}
        
        serialized_student_graphs = []
        for sg in student_graphs:
            # print(sg.student.to_dict())
            serialized_student_graphs.append({
                'id': sg.id,
                'student_id': sg.student_id,
                'graph_id': sg.graph_id,
                # 'student': sg.student.to_dict(),
                # 'graph': sg.graph.to_dict()
            })
        print(serialized_student_graphs)
        return (serialized_student_graphs), 200

api.add_resource(Graph_By_Student_Id, '/graph_by_student_id/<int:student_id>')


class One_Student_Graph(Resource):

    def delete(self, id):
        one_student_graph = Student_Graph.query.filter(Student_Graph.id == id).first()
        db.session.delete(one_student_graph)
        db.session.commit()
        return make_response(jsonify(one_student_graph.to_dict()), 200)
api.add_resource(One_Student_Graph, '/one_student_graph/<int:id>')


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
