import React, { useEffect, useRef, useState } from 'react'
import '../style/register.css'
import img from '../img/ITpark.png'
function RegisterPage() {
    let res_name = useRef()
    let res_surname = useRef()
    let res_phone = useRef()
    let res_time = useRef()
    let res_teacher = useRef()
    let res_sub = useRef()
    let propt = useRef()
let modal = useRef()
    // language choosing //
    let language = useRef()
    const [choosen__language, setChoosen_language] = useState("1")
    const handleChange = () => {
        const til = language.current.value;
        setChoosen_language(til)
    }

    // message uchun state
    const [message, setMessage] = useState("")

    // language data //
    const languages = [
        {
            id: "1",
            log: "Malumotingizni kiriting",
            log2: "Ismingiz",
            log3: "Familiyangiz",
            log4: "Raqamingiz",
            log5: "O'zingizga qulay vaqt",
            log6: "O'zingizga ustozni tanlang.",
            log7: "O'qimoqchi bo'lgan faningizni tanlang",
            log8: "Yuborish",
            def_time: "Hohlagan vaqt",
            def_teacher: "Hohlagan ustoz",
            def_sub: "Hohlagan fan",
            mes_success: "Siz muvaffaqiyatli ro'yxatdan o'tdingiz",
            mes_fail: "Siz ro'yxatdan o'tmadingiz"
        },
        {
            id: "2",
            log: "Введите свои данные",
            log2: "Ваше имя",
            log3: "Ваша фамилия",
            log4: "Ваш номер",
            log5: "Удобное для вас время",
            log6: "Выберите для себя учителя",
            log7: "Выберите предмет, который хотите изучать",
            log8: "Отправить",
            def_time: "Любое время",
            def_teacher: "Любой учитель",
            def_sub: "Любой предмет",
            mes_success: "Вы успешно зарегистрировались",
            mes_fail: "Вы не зарегистрировались"
        },
        {
            id: "3",
            log: "Enter your information",
            log2: "Your first name",
            log3: "Your last name",
            log4: "Your phone number",
            log5: "Convenient time for you",
            log6: "Choose a teacher for yourself",
            log7: "Choose the subject you want to study",
            log8: "Submit",
            def_time: "Any time",
            def_teacher: "Any teacher",
            def_sub: "Any subject",
            mes_success: "You have successfully registered",
            mes_fail: "You did not register"
        }
    ];

    const chooseLang = languages.find((lang) => lang.id === choosen__language);

    useEffect(() => {
        getTeacher()
        getSubject()
    }, [])

    // get teachers //
    const [teachers, setTeachers] = useState([])
    async function getTeacher() {
        let fetchTeachers = await fetch("https://dev.itpark.edu-devosoft.uz/api/employee/web");
        let json = await fetchTeachers.json()
        setTeachers(json)
    }

    // get subject //
    const [subjects, setSubjects] = useState([])
    async function getSubject() {
        let fetchSubject = await fetch("https://dev.itpark.edu-devosoft.uz/api/subject/1");
        let json = await fetchSubject.json()
        setSubjects(json)
    }

    // customer create function //
    async function handleSubmit(e) {
        e.preventDefault()
        let ready = {
            full_name: `${res_name.current.value} ${res_surname.current.value}`,
            phone_number: res_phone.current.value,
            time: res_time.current.value,
            teacher_name: res_teacher.current.value,
            subject_id: Number(res_sub.current.value),
        }

        try {
            let response = await fetch(`https://dev.itpark.edu-devosoft.uz/api/customer/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(ready)
            });

            if (response.ok) {
                setMessage(chooseLang?.mes_success) // muvaffaqiyatli
            } else {
                setMessage(chooseLang?.mes_fail) // muvaffaqiyatsiz
            }
        } catch (err) {
            setMessage("Server bilan ulanishda muammo bor!")
            console.error(err)
        }
        openPropt()
    }

    // alert //
    function openPropt() {
        propt.current.classList.add("show")
        modal.current.classList.add("show1")
        setTimeout(() => {
            propt.current.classList.remove("show")
            modal.current.classList.remove("show1")
        }, 2000)
        res_name.current.value = "";
        res_surname.current.value = "";
        res_phone.current.value = "+998"; // default qiymat
        res_time.current.value = "hohlagan vaqt"; 
        res_teacher.current.value = "hohlagan ustoz";
        res_sub.current.value = "2"; // default fan
    }

    return (
        subjects.length > 0 ?
            <div>
                <div className="header">
                    <div className="succes" ref={propt}>
                        {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
                    </div>
                    <div className="modal" ref={modal}></div>
                    <div className="header__wrapper">
                        <div className="logo">
                        <img src={img} alt="" />
                        </div>
                        <select className='til' ref={language} onChange={handleChange}>
                            <option value="1">Uz</option>
                            <option value="2">Rus</option>
                            <option value="3">Eng</option>
                        </select>
                    </div>
                </div>

                <form className='form' onSubmit={handleSubmit}>
                    <label htmlFor='ism'>{chooseLang?.log2}</label>
                    <input id='ism' ref={res_name} type="text" placeholder='John ' required />

                    <label htmlFor='familiya'>{chooseLang?.log3}</label>
                    <input id='familiya' ref={res_surname} type="text" placeholder='Doe' required />

                    <label htmlFor='number'>{chooseLang?.log4}</label>
                    <input ref={res_phone}
                        type="tel"
                        id='number'
                        name='phone'
                        pattern="^\+998\d{9}$"
                        defaultValue={"+998"}
                        placeholder='99 *** ** **'
                        required
                    />

                    <div className="select">
                        <div className="teacher">
                            <label htmlFor="teacher" className='leb'>{chooseLang?.log6}</label>
                      
                            <select id='teacher' ref={res_teacher} required>
                                <option value="hohlagan ustoz">{chooseLang?.def_teacher}</option>
                                {teachers?.map((item, index) => (
                                    <option key={index} value={item?.full_name}>{item?.full_name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="time">
                            <label htmlFor="time" className='leb'>{chooseLang?.log5}</label>
                        
                            <select ref={res_time} id='time'>
                                <option value="hoxlagan vaqt">{chooseLang?.def_time}</option>
                                <option value="8:00-10:00">8:00-10:00</option>
                                <option value="10:00-12:00">10:00-12:00</option>
                                <option value="12:00-14:00">12:00-14:00</option>
                                <option value="14:00-16:00">14:00-16:00</option>
                                <option value="16:00-18:00">16:00-18:00</option>
                            </select>
                        </div>

                        <div className="subject">
                            <label htmlFor="sub" className='leb'>{chooseLang?.log7}</label>
                            <select id="sub" ref={res_sub}>
                                <option value="">{chooseLang?.def_sub}</option>
                                {subjects?.map((item) => (
                                    <option key={item?.id} value={item?.id}>{item?.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button type='submit'>{chooseLang?.log8}</button>
                </form>
            </div>
            :
            <div className="load">
                <span className="loader"></span>
            </div>
    )
}

export default RegisterPage
