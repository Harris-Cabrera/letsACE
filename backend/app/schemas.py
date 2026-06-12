from pydantic import BaseModel, EmailStr


class QuestionResponse(BaseModel):
    id: int
    domain: str
    question_text: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str

    class Config:
        from_attributes = True


class QuizAnswer(BaseModel):
    question_id: int
    selected_answer: str


class QuizResult(BaseModel):
    score: int
    total: int
    percentage: float


class QuizSubmission(BaseModel):
    answers: list[QuizAnswer]


class Token(BaseModel):
    access_token: str
    token_type: str


class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True
