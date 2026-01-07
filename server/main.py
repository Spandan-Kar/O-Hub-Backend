from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io

# Internal Imports
from core.scoring import calculate_nexis_score
from core.risk_radar import get_risk_flags
from core.runway import calculate_runway
from mock_db import get_dbt_readiness

app = FastAPI(title="Nexis OS API")

# Enable CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    # 1. Validate File Type
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Please upload a valid CSV file.")

    try:
        # 2. Read and Parse CSV
        contents = await file.read()
        df = pd.read_csv(io.BytesIO(contents))
        
        # Ensure column names are stripped of whitespace
        df.columns = df.columns.str.strip()

        # 3. Processing Pipeline
        score = calculate_nexis_score(df)
        risks = get_risk_flags(df)
        runway_data = calculate_runway(df)
        
        # 4. DBT Readiness (Mocking user category for Odisha scholarships)
        # In a real app, this would come from a user profile state
        dbt_info = get_dbt_readiness({"category": "SC/ST"})

        # 5. Consolidated Response
        return {
            "status": "success",
            "score": score,
            "risks": risks,
            "runway": runway_data, # Contains days and daily_burn
            "dbt": dbt_info
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)