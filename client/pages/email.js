import React, {useRef} from 'react'
import emailjs from '@emailjs/browser'

const Email = () => {

    const form = useRef()

    
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_d26dps5', 'template_zcchehl', form.current, 'sKoaJ5-AXg8RNDO8G')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
            e.target.reset();
        };


    return (
        <section>
            <div>
                <h2>Contact Your Teacher</h2>
                <form ref={form} onSubmit={sendEmail}>
                    <input type="text" placeholder='Student Name' name = "user_name" required />
                    <input type="email" placeholder='Student email' name = "user_email" required />
                    {/* <input type="text" placeholder='subject' name = "subject_line" required /> */}
                    <br></br>
                    <input type="text" placeholder='Teacher name' name = "teacher_name" required />
                    <input type="email" placeholder='Teacher email' name = "teacher_email" required />
                    <br></br>
                    <textarea name = "message" placeholder = 'message' cols = "30" rows = "10" />
                    <button type = "submit">Send Message</button>
                </form>
            </div>
        </section>
    )
}

export default Email