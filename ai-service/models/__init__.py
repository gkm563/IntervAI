# AI Models Schema (Pydantic)
from pydantic import BaseModel, Field
from typing import List, Optional

class ResumeParseRequest(BaseModel):
    storage_path: str
    file_name: str

class QuestionGenerateRequest(BaseModel):
    interview_id: str
    target_role: str
    target_company: Optional[str] = None
    difficulty: str = "MEDIUM"
    category: str = "TECHNICAL"
    turn_number: int = 1
    previous_context: Optional[List[dict]] = None

class AnswerEvaluationRequest(BaseModel):
    question_text: str
    candidate_answer: str
    target_role: str
    difficulty: str = "MEDIUM"
