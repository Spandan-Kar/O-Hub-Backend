import pandas as pd

def get_risk_flags(df):
    flags = []
    # 1. Low Balance/Empty Tank detection
    if len(df[df['Amount'] > 4000]) > 0 and len(df[df['Category'] == 'Needs']) < 2:
        flags.append("High-Value Leak: Large spends detected without matching 'Needs' volume.")
    
    # 2. BNPL/EMI Clustering (SIH Focus)
    emis = df[df['Category'] == 'EMI']
    if len(emis) >= 2:
        flags.append(f"Credit Trap: {len(emis)} BNPL/EMI payments detected this month.")
    
    # 3. Late Night Impulse
    night_spends = df[df['Description'].str.contains('Late Night', case=False)]
    if len(night_spends) >= 2:
        flags.append("Impulse Pattern: Frequent late-night transactions (11 PM - 3 AM).")
        
    return flags if flags else ["Healthy Pattern: No major risk flags detected."]