from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from gemini_client import analyze_tasks_with_budget
from poster_service import generate_posters
from schemas import TaskRequest, TaskResponse
from schemas import PosterRequest, PosterResponse
import uvicorn

app = FastAPI(title="AI Task & Budget Manager")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

# @app.post("/analyze-task", response_model=TaskResponse)
# async def analyze_task(request: TaskRequest):
#     """
#     Endpoint that:
#     - Breaks down tasks
#     - Assigns to departments
#     - Provides budget estimates
#     """
#     try:
#         result = analyze_tasks_with_budget(
#             task=request.task,
#             departments=request.departments,
#             currency=request.currency
#         )
        
#         if "error" in result:
#             raise HTTPException(status_code=400, detail=result["error"])
            
#         return result
        
#     except Exception as e:
#         raise HTTPException(
#             status_code=500,
#             detail=f"Task analysis failed: {str(e)}"
#         )
def validate_response(response: dict) -> dict:
    """Ensure all budget amounts are positive"""
    for assignment in response.get("assignments", []):
        budget = assignment.get("estimated_budget", {})
        if isinstance(budget, dict):
            if budget.get("amount", 0) <= 0:
                budget["amount"] = 1.0  # Default minimum value
    return response

@app.get("/", tags=["Root"], summary="API Documentation")
async def root():
    """Returns API documentation and available endpoints"""
    return {
        "API": "AI Task & Budget Manager",
        "version": "1.0.0",
        "description": "API for task analysis/budgeting and AI poster generation",
        "endpoints": {
            "/analyze-task": {
                "method": "POST",
                "description": "Analyzes tasks and provides budget breakdown",
                "request_body": {
                    "task": "string (required)",
                    "departments": "list[string] (required)",
                    "currency": "string (optional, default='INR')"
                },
                "response_model": "TaskResponse",
                "example_request": {
                    "task": "Organize college fest",
                    "departments": ["logistics", "marketing"],
                    "currency": "INR"
                }
            },
            "/generate-posters": {
                "method": "POST",
                "description": "Generates AI posters based on specifications",
                "request_body": {
                    "theme": {
                        "name": "string (required)",
                        "description": "string (optional)"
                    },
                    "style": "string (e.g., 'modern', 'vintage')",
                    "color_palette": "list[hex_colors]",
                    "elements": "list[features]",
                    "mood": "string (e.g., 'joyful', 'serious')",
                    "text_placement": "string (e.g., 'center', 'top')"
                },
                "response_model": "PosterResponse",
                "example_request": {
                    "theme": {
                        "name": "Tech Conference",
                        "description": "Annual technology summit"
                    },
                    "style": "modern",
                    "color_palette": ["#2563EB", "#1E40AF"],
                    "elements": ["technology", "people"],
                    "mood": "futuristic",
                    "text_placement": "center"
                }
            }
        },
        "interactive_docs": {
            "Swagger UI": "/docs",
            "ReDoc": "/redoc"
        },
        "note": "All POST endpoints require proper authentication headers"
    }
    
@app.post("/analyze-task")
async def analyze_task(request: TaskRequest):
    try:
        raw_result = analyze_tasks_with_budget(
            request.task, 
            request.departments, 
            request.currency or "INR"
        )
        validated_result = validate_response(raw_result)
        return TaskResponse(**validated_result)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
        
@app.post("/generate-posters", response_model=PosterResponse)
async def create_posters(request: PosterRequest):
    try:
        print("Received data:", request.dict())
        result = generate_posters(request.dict())
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)