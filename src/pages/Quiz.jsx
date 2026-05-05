import "../assets/styles/Quiz.css";
import { useEffect, useState, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { shuffleAnswers, isCorrectAnswer, decodeText } from "../helpers/quizHelpers";
import { saveScore } from "../services/scoreService";
import { translateCategory } from "../helpers/categories";
import { useLanguage } from "../context/useLanguage";
import { useAuth } from "../context/useAuth";
import { useScores } from "../context/useScores";
import { useQuiz } from "../context/useQuiz";
import PrimaryButton from "../components/buttons/PrimaryButton.jsx";

const Quiz = () => {

    const { category } = useParams();
    const normalizedCategory = category?.toLowerCase();

    const { user } = useAuth();
    const username = user?.username || "Speler";
    const { t } = useLanguage();
    const { setScores } = useScores();
    const { questions } = useQuiz();

    const storedQuestions = JSON.parse(localStorage.getItem("quizQuestions") || "[]");
    const quizQuestions = questions.length ? questions : storedQuestions;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [quizFinished, setQuizFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(20);


    const scoreStoredRef = useRef(false);

    const currentQuestion = quizQuestions[currentQuestionIndex];

    const percentage = quizQuestions.length
        ? Math.round((score / quizQuestions.length) * 100)
        : 0;

    const shuffledAnswers = useMemo(() => {
        if (!currentQuestion) return [];
        return shuffleAnswers(currentQuestion);
    }, [currentQuestion]);


    //Timer

    useEffect(() => {
        if (quizFinished || !currentQuestion) return;

        const timer = setTimeout(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    if (currentQuestionIndex < quizQuestions.length - 1) {
                        setCurrentQuestionIndex(i => i + 1);
                        setSelectedAnswer(null);
                        return 20;
                    } else {
                        setQuizFinished(true);
                        return 0;
                    }
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, currentQuestionIndex, quizQuestions.length, quizFinished, currentQuestion]);

    // Save score
    useEffect(() => {
        if (!quizFinished || scoreStoredRef.current || !quizQuestions.length) return;

        const storeScore = async () => {
            const newScore = {
                id: Date.now(),
                name: username,
                category: normalizedCategory,
                score,
                total: quizQuestions.length,
                percentage,
                date: new Date().toLocaleDateString()
            };

            await saveScore(newScore);

            setScores(prev =>
                [newScore, ...prev].sort((a, b) => b.score - a.score)
            );
        };

        storeScore().catch(console.error);
        scoreStoredRef.current = true;

    }, [quizFinished, score, quizQuestions.length, normalizedCategory, username, percentage, setScores]);

    //Refresh
    if (!quizQuestions.length) {
        return (
            <section className="quiz_page">
                <div className="quiz_container">
                    <p className="quiz_error">Geen quiz geladen.</p>
                    <PrimaryButton to="/" label="Terug naar home"/>
                </div>
            </section>
        );
    }

    // Quiz afgerond
    if (quizFinished) {
        return (
            <section className="quiz_page">
                <div className="quiz_container">
                    <div className="quiz_finish_header">
                        <h1>{t("quizFinished")}</h1>
                    </div>
                    <div className="quiz_content quiz_finished">
                    <div className="finish_icon">🏁</div>
                    <div className="quiz_finish_stats">
                        <div className="quiz_finish_stat">
                            <span>{t("yourScore")}</span>
                            <h2> {score} / {quizQuestions.length} </h2>
                        </div>
                        <div className="quiz_finish_stat">
                            <span>{t("percentage")}</span>
                            <h2>{percentage}%</h2>
                        </div>
                    </div>
                        <div className="quiz_finish_actions">
                            <PrimaryButton to="/scores" label={t("viewScores")} />
                            <PrimaryButton to="/" label={t("newQuiz")} className="restart_btn" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Answers
    const handleAnswer = (answer) => {
        if (selectedAnswer || !currentQuestion) return;

        setSelectedAnswer(answer);

        if (isCorrectAnswer(answer, currentQuestion.correct_answer)) {
            setScore(prev => prev + 1);
        }
    };

    const nextQuestion = () => {
        if (!selectedAnswer || !currentQuestion) return;

        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setTimeLeft(20);
        } else {
            setQuizFinished(true);
        }
    };


    // Render
    return (
        <section className="quiz_page">
            <div className="quiz_container">

                <div className="quiz_info">
                    <span>{translateCategory(normalizedCategory)} Quiz</span>
                    <span className={`quiz_timer ${timeLeft <= 5 ? "timer_warning" : ""}`}>
                        Timer: {timeLeft}s
                    </span>
                    <span>{currentQuestionIndex + 1} / {quizQuestions.length}</span>
                </div>

                <div className="quiz_content">

                    {currentQuestion && (
                        <div className="quiz_question">
                            <p>{decodeText(currentQuestion.question)}</p>
                        </div>
                    )}

                    <div className="quiz_answers">
                        {shuffledAnswers.map((answer, index) => {

                            let buttonClass = "";

                            if (selectedAnswer) {
                                if (isCorrectAnswer(answer, currentQuestion.correct_answer)) {
                                    buttonClass = "correct";
                                } else if (isCorrectAnswer(answer, selectedAnswer)) {
                                    buttonClass = "wrong";
                                }
                            }

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(answer)}
                                    className={buttonClass}
                                    disabled={!!selectedAnswer}>
                                    {decodeText(answer)}
                                </button>
                            );
                        })}
                    </div>

                </div>

                <div className="quiz_navigation">
                    <button
                        className="next_question"
                        onClick={nextQuestion}
                        disabled={!selectedAnswer}>
                        →
                    </button>
                </div>

            </div>
        </section>
    );
};

export default Quiz;