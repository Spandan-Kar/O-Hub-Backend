def calculate_nexis_score(df):
    score = 100
    # Rule 1: BNPL/EMI Penalty
    emis = len(df[df['Category'] == 'EMI'])
    score -= (emis * 12)
    
    # Rule 2: Impulse Spending (Late Night)
    impulses = len(df[df['Description'].str.contains('Late Night', case=False)])
    score -= (impulses * 8)
    
    # Rule 3: Needs vs Wants Ratio
    wants = df[df['Category'] == 'Wants']['Amount'].sum()
    needs = df[df['Category'] == 'Needs']['Amount'].sum()
    if wants > needs:
        score -= 15
        
    return max(10, min(100, score))