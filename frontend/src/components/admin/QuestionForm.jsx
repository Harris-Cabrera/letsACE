import { useEffect, useState } from "react";
import "../../styles/admin.css";

function QuestionForm({ onCreate, editingQuestion }) {
    const [form, setForm] = useState({
        domain: "",
        question_text: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        correct_answer: "",
        explanation: "",
    });

    useEffect(() => {
        if (editingQuestion) {
            setForm({
                domain: editingQuestion.domain,
                question_text: editingQuestion.question_text,
                option_a: editingQuestion.option_a,
                option_b: editingQuestion.option_b,
                option_c: editingQuestion.option_c,
                option_d: editingQuestion.option_d,
                correct_answer: editingQuestion.correct_answer,
                explanation: editingQuestion.explanation,
            });
        }
    }, [editingQuestion]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        onCreate(form);

        setForm({
            domain: "",
            question_text: "",
            option_a: "",
            option_b: "",
            option_c: "",
            option_d: "",
            correct_answer: "",
            explanation: "",
        });
    };


    return (
        <form
            className="admin-form"
            onSubmit={handleSubmit}
        >
            <input
                name="domain"
                placeholder="Domain"
                value={form.domain}
                onChange={handleChange}
            />

            <textarea
                name="question_text"
                placeholder="Question"
                value={form.question_text}
                onChange={handleChange}
            />

            <div className="admin-options">

                <input
                    name="option_a"
                    placeholder="Option A"
                    value={form.option_a}
                    onChange={handleChange}
                />

                <input
                    name="option_b"
                    placeholder="Option B"
                    value={form.option_b}
                    onChange={handleChange}
                />

                <input
                    name="option_c"
                    placeholder="Option C"
                    value={form.option_c}
                    onChange={handleChange}
                />

                <input
                    name="option_d"
                    placeholder="Option D"
                    value={form.option_d}
                    onChange={handleChange}
                />

            </div>

            <input
                name="correct_answer"
                placeholder="Correct Answer (A/B/C/D)"
                value={form.correct_answer}
                onChange={handleChange}
            />

            <textarea
                name="explanation"
                placeholder="Explanation"
                value={form.explanation}
                onChange={handleChange}
            />

            <button type="submit">
                {editingQuestion ? "Update Question" : "Add Question"}
            </button>

        </form>
    );
}


export default QuestionForm;