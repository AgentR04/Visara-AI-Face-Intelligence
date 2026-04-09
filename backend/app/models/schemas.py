from pydantic import BaseModel
from typing import Dict, Any

class AnalysisResponse(BaseModel):
    features: Dict[str, Any]
    recommendations: Dict[str, Any]