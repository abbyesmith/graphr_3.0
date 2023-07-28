import React, {useRef} from 'react'
import emailjs from '@emailjs/browser'
import NavBar from './navbar';
import Footer from './footer';



const Email = ({currUser}) => {

        // use this when you are using currUser 
    if (!currUser){
        return(
            <div>
                Loading
            </div>
        )
    }
    const form = useRef()

    
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_d26dps5', 'template_zcchehl', form.current, 'sKoaJ5-AXg8RNDO8G')
            .then((result) => {
                console.log(result.text);
                window.alert("Email successfully sent!")
            }, (error) => {
                console.log(error.text);
            });
            e.target.reset();
        };


    return (
        <section>
            <div>
                <NavBar/>
                <h2>Contact Your Teacher</h2>
                <form ref={form} onSubmit={sendEmail}>
                    <p>Your Name:</p>
                    <input type="text" placeholder='Student Name' name = "user_name"  defaultValue = {currUser.username} required/>
                    <p>Your Email:</p>
                    <input type="email" placeholder='Student email' name = "user_email" defaultValue = {currUser.email} required />
                    <p>Your Instructor's Name:</p>
                    <input type="text" placeholder='Teacher name' name = "teacher_name" defaultValue = {currUser.instructor_name} required />
                    <p>Your Instructor's Email:</p>
                    <input type="email" placeholder='Teacher email' name = "teacher_email" defaultValue = {currUser.instructor_email} required />
                    <p>Assignment</p>
                    <input type="text" placeholder='Assignment Name (if applicable)' name = "assignment"  />
                    <p>Problem Number</p>
                    <input type="text" placeholder='Problem Number (if applicable' name = "problem"  />

                    <br></br>
                    <textarea name = "message" placeholder = 'message' cols = "30" rows = "10" />
                    <button type = "submit">Send Message</button>
                </form>
            </div>
            <p><i>Did you know that you can update your profile to change your username, email, instructor's name & their email?</i></p>
            <Footer/>
        </section>
    )
}

export default Email